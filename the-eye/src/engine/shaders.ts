import { paramDefinesGLSL } from './params';

/**
 * GLSL ES 3.00 sources for the visual engine.
 *
 *  scene      — procedural generator (eye, tentacles, superformula, fractal,
 *               liquid warp, particles). One pass per scene slot (A / B).
 *  transition — combines A and B with 7 transition algorithms.
 *  post       — glitch, glow (mip-based bloom) and feedback loop.
 *  output     — master level, blackout, tone-mapping, vignette, grain.
 */

export const VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
out vec2 vUv;
void main(){
  vUv = aPos*0.5+0.5;
  gl_Position = vec4(aPos,0.0,1.0);
}`;

const COMMON = /* glsl */ `
#define PI 3.14159265359
#define TAU 6.28318530718
float hash12(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec2 hash22(vec2 p){ vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); p3+=dot(p3,p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),u.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float a=.5, s=0.; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ s+=a*noise(p); p=m*p; a*=.5; }
  return s;
}
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){ return a+b*cos(TAU*(c*t+d)); }
`;

export const SCENE_FRAG = /* glsl */ `#version 300 es
precision highp float;
${paramDefinesGLSL()}
uniform vec2 uRes;
uniform float uTime;
uniform float uPulse;
uniform float uSeed;
uniform int uKind;
uniform float uP[NP];
in vec2 vUv;
out vec4 fragColor;
${COMMON}

// THE EYE palette: deep violet → electric blue → cyan
vec3 themePal(float t){
  // cyclic gradient through the four theme colours — never leaves the palette
  t = fract(t)*4.0;
  vec3 c0 = vec3(0.30,0.06,0.62);  // deep violet
  vec3 c1 = vec3(0.10,0.32,1.00);  // electric blue
  vec3 c2 = vec3(0.25,0.92,1.00);  // cyan
  vec3 c3 = vec3(0.78,0.22,0.95);  // magenta-purple
  float f = fract(t); f = f*f*(3.0-2.0*f);
  if(t<1.0) return mix(c0,c1,f);
  if(t<2.0) return mix(c1,c2,f);
  if(t<3.0) return mix(c2,c3,f);
  return mix(c3,c0,f);
}

vec3 hueShift(vec3 col, float h){
  const mat3 toYIQ = mat3(0.299,0.596,0.211, 0.587,-0.274,-0.523, 0.114,-0.322,0.312);
  const mat3 toRGB = mat3(1.0,1.0,1.0, 0.956,-0.272,-1.106, 0.621,-0.647,1.703);
  vec3 yiq = toYIQ*col; float a = h*TAU;
  yiq.yz = mat2(cos(a),-sin(a),sin(a),cos(a))*yiq.yz;
  return toRGB*yiq;
}

// Gielis superformula, a=b=1
float superformula(float phi, float m, float n1, float n2, float n3){
  float t = m*phi*0.25;
  float a = pow(abs(cos(t)), n2) + pow(abs(sin(t)), n3);
  return clamp(pow(max(a,1e-4), -1./max(n1,0.05)), 0.0, 3.0);
}
float sfNorm(float phi){
  float r = superformula(phi, P_sfM, P_sfN1, P_sfN2, P_sfN3);
  // normalise so the mean radius stays ~1 for most parameter sets
  float r0 = superformula(0.0, P_sfM, P_sfN1, P_sfN2, P_sfN3);
  float r1 = superformula(PI/max(P_sfM,0.5), P_sfM, P_sfN1, P_sfN2, P_sfN3);
  return r / max(0.5*(r0+r1), 1e-3);
}

// Kali-set fold fractal
vec3 kali(vec2 p, float t, int iters, float zoomK){
  vec2 z = p*zoomK;
  vec2 c = vec2(0.78 + 0.08*sin(t*0.11 + uSeed), 0.52 + 0.08*cos(t*0.13));
  vec3 acc = vec3(0.);
  for(int i=0;i<12;i++){
    if(i>=iters) break;
    z = abs(z)/dot(z,z) - c;
    float l = length(z);
    acc += themePal(float(i)*0.07 + l*0.15 + t*0.02) * exp(-abs(l-1.0)*7.0);
  }
  return acc/float(iters);
}

// ---------------------------------------------------------------- backgrounds
vec3 bgOrganic(vec2 p, float t){
  float ft = t*mix(.02,.25,P_flow);
  vec2 q = vec2(fbm(p*2.+ft+uSeed), fbm(p*2.+vec2(3.1,1.7)-ft));
  vec2 r = vec2(fbm(p*2.5+q*2.2+vec2(1.7,9.2)+ft*0.7), fbm(p*2.5+q*2.2+vec2(8.3,2.8)-ft*0.5));
  float f = fbm(p*2.5 + r*2.0);
  vec3 c = mix(vec3(.008,.0,.02), vec3(.22,.04,.40), clamp(f*f*1.8,0.,1.));
  c = mix(c, vec3(.04,.18,.55), clamp(length(q)*0.6,0.,1.)*0.55);
  c += vec3(0.,.55,.7)*pow(clamp(r.x,0.,1.),5.)*0.9;
  c *= smoothstep(1.25, 0.05, length(p));
  return c;
}

vec3 bgBloom(vec2 p, float t){
  vec3 c = bgOrganic(p*1.3, t)*0.5;
  float r = length(p), a = atan(p.y,p.x);
  for(int i=6;i>=0;i--){
    float fi = float(i);
    float dir = mod(fi,2.)*2.-1.;
    float R = 0.1 + 0.075*fi*(1.0+0.08*sin(t*0.7+fi)) + 0.03*uPulse*P_pulse;
    float m = max(P_sfM + fi*0.0, 1.0);
    float sf = superformula(a + t*0.06*dir*(1.+fi*0.2) + fi*0.4, m, P_sfN1*(0.6+0.12*fi), P_sfN2, P_sfN3);
    sf /= max(superformula(0.0, m, P_sfN1*(0.6+0.12*fi), P_sfN2, P_sfN3),0.2);
    float d = r - R*sf;
    float fill = smoothstep(0.004, -0.004, d);
    float depth = clamp(-d/(R*sf+1e-3),0.,1.);
    vec3 pc = themePal(fi*0.11 + depth*0.3 + t*0.01);
    pc *= 0.25 + 0.9*pow(1.-depth, 2.0);
    // petal veins
    pc += vec3(.6,.3,1.)*pow(abs(sin(a*m*0.5*2.+fi)),40.)*(1.-depth)*0.5;
    c = mix(c, pc, fill*0.92);
    c += themePal(fi*0.11+.3)*0.0025/(abs(d)+0.004)*0.35;
  }
  return c;
}

vec3 bgTunnel(vec2 p, float t){
  float a = atan(p.y,p.x);
  float sf = mix(1.0, sfNorm(a + t*0.1), 0.6*P_sfAmount);
  float r = length(p)/max(sf,0.2);
  float z = 0.25/(r+0.015) + t*mix(0.3,1.6,P_flow);
  vec2 dir = vec2(cos(a), sin(a));
  vec2 tw = vec2(fract(a/TAU*8.0 + z*0.1), fract(z*0.5));
  vec3 fr = kali((tw-0.5)*1.6, t, 7, 1.0);
  float rings = pow(0.5+0.5*cos(z*TAU), 8.0);
  float n = fbm(dir*2.0 + vec2(z*0.6, -z*0.3));
  vec3 c = themePal(z*0.05 + n*0.4)*(0.15 + 0.85*n*n);
  c += fr*1.6;
  c += vec3(.3,.6,1.)*rings*0.5;
  float fog = smoothstep(0.0, 0.35, r);
  c *= fog;
  c += vec3(.55,.75,1.)*exp(-r*14.)*1.4; // light at the end of the tunnel
  return c;
}

vec3 bgLiquid(vec2 p, float t){
  vec2 q = p*mix(1.,3.,P_warpScale);
  float ft = t*mix(0.05,0.6,P_flow);
  for(int i=1;i<6;i++){
    float fi=float(i);
    q += 0.55/fi*vec2(sin(q.y*1.7*fi + ft + fi + uSeed), cos(q.x*1.4*fi - ft*0.8 + fi*1.3));
  }
  float f = sin(q.x*2.2) + sin(q.y*2.6);
  vec3 c = themePal(f*0.16 + length(q)*0.04 + t*0.01);
  float film = pow(0.5+0.5*sin(f*6.0), 3.0);
  c = c*0.55 + vec3(.6,.9,1.)*film*0.25;
  c *= 0.35 + 0.65*smoothstep(-1.5,1.5,f);
  c *= smoothstep(1.4,0.1,length(p));
  return c;
}

vec3 bgGeometric(vec2 p, float t){
  float r = length(p), a = atan(p.y,p.x);
  float seg = TAU/max(floor(P_sfM),3.0);
  float ka = mod(a + t*0.03, seg) - seg*0.5;
  ka = abs(ka);
  vec2 k = r*vec2(cos(ka), sin(ka));
  vec3 c = vec3(0.01,0.005,0.03) + themePal(0.1+r*0.3)*0.06;
  for(int l=0;l<3;l++){
    float fl = float(l);
    vec2 g = k*(4.0+fl*3.0) + vec2(t*0.15*(fl+1.), 0.);
    vec2 id = floor(g), f = fract(g)-0.5;
    float h = hash12(id + fl*13. + uSeed);
    float ang = atan(f.y,f.x) + t*(h-0.5)*1.5;
    float sf = superformula(ang, max(floor(P_sfM)+floor(h*3.),2.), P_sfN1, P_sfN2, P_sfN3);
    sf /= max(superformula(0.0, max(floor(P_sfM)+floor(h*3.),2.), P_sfN1, P_sfN2, P_sfN3), 0.3);
    float d = abs(length(f) - 0.28*sf*(0.7+0.5*h));
    c += themePal(h*0.5 + fl*0.2 + t*0.01) * 0.006/(d+0.006) * (0.8/(1.+fl*0.6));
  }
  c *= smoothstep(1.3, 0.2, r);
  return c;
}

vec3 bgVortex(vec2 p, float t){
  float r = length(p), a = atan(p.y,p.x);
  float sp = a*2.0 + log(r+0.02)*4.0 - t*mix(0.3,2.0,P_partSpeed);
  float n = fbm(vec2(cos(sp), sin(sp))*1.5 + vec2(r*3.0, t*0.1));
  vec3 c = themePal(0.55 + n*0.3)*pow(n,3.0)*0.9;
  c *= smoothstep(0.02,0.4,r)*smoothstep(1.5,0.3,r);
  c += vec3(.35,.2,.8)*exp(-r*5.)*0.4;
  return c;
}

vec3 bgAbstract(vec2 p, float t){
  vec3 c = kali(p*rot(t*0.02), t, 11, 1.25)*2.4;
  c += bgLiquid(p*0.7, t)*0.25;
  return c;
}

// ---------------------------------------------------------------- layers
vec3 sfRings(vec2 p, float t){
  float r = length(p), a = atan(p.y,p.x);
  vec3 c = vec3(0.);
  for(int i=0;i<5;i++){
    float fi = float(i);
    float dir = mod(fi,2.)*2.-1.;
    float R = 0.16 + 0.12*fi + 0.025*uPulse*P_pulse;
    float sf = sfNorm(a + dir*t*0.12*(1.+fi*0.3) + fi);
    float d = abs(r - R*sf);
    c += themePal(fi*0.15 + 0.4) * 0.0018/(d+0.0025) * smoothstep(1.4,0.2,r);
  }
  return c*0.6;
}

vec3 particles(vec2 p, float t){
  vec3 c = vec3(0.);
  float r = length(p), a = atan(p.y,p.x);
  float speed = mix(0.15, 1.6, P_partSpeed);
  for(int l=0;l<3;l++){
    float fl = float(l);
    float K = 28.0 + fl*18.0;              // cells per revolution (integer → seamless)
    float lr = log(r+0.001);
    vec2 q = vec2(a/TAU*K, lr*K/TAU*1.0 - t*speed*(1.0+fl*0.35)*K*0.05);
    vec2 id = floor(q); vec2 f = fract(q)-0.5;
    id.x = mod(id.x, K);
    vec2 h = hash22(id + fl*31.7 + uSeed);
    float exists = step(h.y, 0.15 + 0.85*P_partAmount);
    vec2 off = (h-0.5)*0.6;
    vec2 d2 = f - off;
    d2.y *= mix(1.0, 0.35, P_partSpeed);    // radial streaking
    float d = length(d2);
    float size = mix(0.06, 0.22, P_partSize)*(0.5+h.x);
    float tw = 0.55+0.45*sin(t*(2.0+h.y*5.0) + h.x*30.0);
    vec3 pc = mix(vec3(.5,.35,1.), vec3(.3,.95,1.), h.x);
    c += pc * smoothstep(size, 0.0, d) * tw * exists * (1.2/(1.0+fl*0.6));
  }
  c *= smoothstep(0.02, 0.2, r);
  return c;
}

vec4 tentacles(vec2 p, float t, float eyeS){
  if(P_tentacles < 0.01) return vec4(0.);
  float r = length(p), a = atan(p.y,p.x);
  float N = floor(mix(5., 22., P_tentacles));
  float r0 = eyeS*0.82;
  float len = mix(0.12, 0.85, P_tentLength);
  vec4 acc = vec4(0.);
  float best = 1e9;
  for(int i=0;i<22;i++){
    float fi = float(i);
    if(fi >= N) break;
    float h = hash12(vec2(fi, uSeed+1.7));
    float h2 = hash12(vec2(uSeed, fi+3.3));
    float ca = (fi + 0.5 + (h2-0.5)*0.6)*TAU/N;
    float tl = len*(0.55+0.7*h);
    float rr = r - r0;
    if(rr >= 0.0 && rr <= tl){
    float u = rr/tl;
    float sway = sin(u*3.2 - t*(0.7+h*0.9) + h*TAU) * u;
    float curl = P_tentCurl*(1.2*sway + 1.8*u*u*(h-0.5));
    float aC = ca + curl;
    float da = mod(a - aC + PI, TAU) - PI;
    float d = abs(da)*r;
    float w = (TAU/N)*r0*0.36*pow(1.0-u, 1.15)*(0.7+0.6*h2) + 0.0015;
    if(d < w){
      float x = d/w;
      float nrm = sqrt(max(1.0-x*x,0.));
      vec3 tc = mix(vec3(.22,.03,.30), vec3(.08,.22,.75), smoothstep(0.1,0.9,u));
      float seg = 0.5+0.5*sin(u*tl*90.0 - t*3.0*(0.5+h));
      float sucker = smoothstep(0.35,0.0, length(vec2(fract(u*tl*45.0)-0.5, (da/(w/r))*0.8 - 0.25)))*step(0.0, da);
      tc *= 0.25 + 0.9*nrm;
      tc *= 0.8 + 0.35*seg;
      tc += vec3(.8,.5,1.)*sucker*0.25;
      tc += vec3(.5,.9,1.)*pow(nrm,14.0)*0.55;               // wet specular
      tc += vec3(0.,.85,1.)*smoothstep(0.82,1.0,u)*(0.6+0.4*uPulse); // bioluminescent tips
      float al = smoothstep(1.0, 0.8, x)*smoothstep(0.0, 0.12, u);
      // nearer-to-root tentacles draw on top
      if(u < best && al > 0.01){ best = u; acc = vec4(tc, al); }
    }
    }
  }
  return acc;
}

vec4 eyeLayer(vec2 p, float t, float s){
  vec2 e = p/s;
  float bt = fract(t*0.11 + uSeed*0.37);
  float blink = smoothstep(0.0,0.015,bt)*smoothstep(0.045,0.015,bt);
  float open = P_eyeOpen*(1.0-blink);
  float x = clamp(e.x, -1., 1.);
  float arch = pow(max(1.0-x*x, 0.0), 0.72);
  float upper = open*0.66*arch + 0.02;
  float lower = -open*0.50*arch - 0.02;
  float dUp = e.y - upper;
  float dLo = lower - e.y;
  float inside = max(max(dUp, dLo), abs(e.x)-1.0);
  float aa = 2.5/(uRes.y*s);
  float mask = 1.0 - smoothstep(-aa, aa, inside);

  // gaze with saccades
  float st = floor(t*0.9 + uSeed);
  vec2 g0 = hash22(vec2(st, uSeed)) - 0.5;
  vec2 g1 = hash22(vec2(st+1., uSeed)) - 0.5;
  vec2 gaze = mix(g0, g1, smoothstep(0.85,1.0,fract(t*0.9+uSeed)));
  gaze += vec2(noise(vec2(t*0.5,uSeed)), noise(vec2(uSeed,t*0.45)))-0.5;
  gaze *= vec2(0.55,0.22)*P_eyeGaze;
  vec2 q = e - gaze;
  float rq = length(q), ang = atan(q.y,q.x);

  float morph = mix(1.0, sfNorm(ang + t*P_irisSpin*0.4), P_irisMorph*0.35);
  float ri = 0.48*morph;
  float rPupil = 0.48*P_pupilSize*(1.0 + 0.18*uPulse)*mix(1.0, sfNorm(ang - t*P_irisSpin), P_irisMorph*0.5);

  // sclera
  vec3 sclera = vec3(0.92,0.86,0.84);
  float shade = smoothstep(1.15, 0.15, length(e*vec2(0.85,1.5)));
  sclera *= mix(0.32, 1.0, shade);
  float vn = 0.; vec2 vp = e*vec2(3.0,4.0) + uSeed; float amp = 1.;
  for(int i=0;i<4;i++){ vn += amp*pow(1.0-abs(2.0*noise(vp)-1.0), 12.0); vp = vp*2.03 + 1.7; amp *= 0.6; }
  float veinMask = smoothstep(ri*1.02, 0.95, rq) * P_eyeVeins;
  sclera = mix(sclera, vec3(.55,.03,.08), clamp(vn*veinMask*0.9, 0., 1.));
  sclera = mix(sclera, vec3(.75,.35,.45), smoothstep(0.55, 1.05, abs(e.x))*0.5);

  // iris
  float rn = rq/ri;
  float a2 = ang + t*P_irisSpin*0.5;
  vec2 dir = vec2(cos(a2), sin(a2));
  float K = mix(8.0, 34.0, P_irisDetail);
  float fib = fbm(dir*K + rn*1.6 + uSeed);
  float fib2 = noise(dir*K*2.2 + rn*5.0 - t*0.08);
  vec3 innerC = vec3(1.0,0.58,0.16);
  vec3 midC   = vec3(0.50,0.18,0.95);
  vec3 outerC = vec3(0.10,0.36,1.00);
  vec3 irisC = mix(innerC, midC, smoothstep(0.28, 0.55, rn));
  irisC = mix(irisC, outerC, smoothstep(0.55, 0.92, rn));
  irisC = mix(irisC, vec3(0.2,0.95,1.0), smoothstep(0.65,0.9,fib2)*0.35);
  irisC *= 0.25 + 1.6*fib*(0.5+fib2);
  float coll = 0.42 + 0.035*sin(a2*13.0 + uSeed);
  irisC += vec3(1.,.72,.35)*0.6*smoothstep(0.07,0.0,abs(rn-coll))*fib;
  irisC *= 1.0 - 0.55*smoothstep(0.55,0.72,noise(dir*K*0.5 + rn*3.0 + 9.0))*smoothstep(0.35,0.85,rn);
  irisC *= mix(1.0, 0.08, smoothstep(0.82,1.0,rn));               // limbal ring
  float pupilEdge = smoothstep(rPupil-0.012, rPupil+0.012, rq);
  vec3 pupilC = vec3(0.0,0.0,0.008) + vec3(0.05,0.25,0.4)*fbm(q*7.0 + t*0.25)*0.35*smoothstep(rPupil,0.0,rq);
  vec3 eyeC = mix(pupilC, irisC, pupilEdge);
  eyeC *= mix(1.0, 0.3, smoothstep(rPupil+0.07, rPupil, rq)*pupilEdge); // pupil inner shadow
  float irisMask = 1.0 - smoothstep(ri-0.012, ri+0.012, rq);
  vec3 c = mix(sclera, eyeC, irisMask);

  // lid shadow + wet waterline
  c *= 1.0 - 0.75*smoothstep(-0.32, 0.0, dUp);
  c *= 1.0 - 0.35*smoothstep(-0.12, 0.0, dLo);
  c += vec3(.9,.6,.7)*smoothstep(-0.03,0.0,dLo)*smoothstep(0.02,0.0,dLo)*0.25;

  // corneal reflections
  vec2 hp = (q - vec2(-0.15, 0.15))*rot(0.5)*vec2(1.0, 1.7);
  float win = pow(smoothstep(0.085, 0.015, length(hp)), 1.6);
  float dotHl = smoothstep(0.03, 0.005, length(q - vec2(0.12,-0.1)));
  c += vec3(0.95,0.97,1.0)*(win*0.8 + dotHl*0.6)*mask;
  c += vec3(.4,.6,1.)*0.08*smoothstep(0.55,0.0,rq); // cornea sheen

  // lid rim (outside)
  float rimD = max(inside, 0.0);
  float rim = smoothstep(0.12, 0.0, rimD)*(1.0-mask);
  vec3 rimC = mix(vec3(.30,.02,.10), vec3(.08,.0,.12), smoothstep(0.0,0.12,rimD));
  rimC += vec3(.5,.3,.9)*smoothstep(0.03,0.0,rimD)*0.4;
  vec3 outC = mix(rimC, c, mask);
  float alpha = max(mask, rim*0.95);
  return vec4(outC, alpha);
}

void main(){
  vec2 uv = (vUv*uRes - 0.5*uRes)/uRes.y;
  float t = uTime + fract(uSeed*0.37)*40.0;
  float pulse = uPulse*P_pulse;
  uv /= max(P_zoom, 0.05)*(1.0 + 0.12*pulse);

  // liquid distortion (shared)
  float ws = mix(1.2, 6.0, P_warpScale);
  float ft = t*mix(0.04, 0.7, P_flow);
  vec2 w = vec2(fbm(uv*ws + vec2(0.,ft) + uSeed), fbm(uv*ws + vec2(5.2,1.3) - ft + uSeed)) - 0.5;
  vec2 uvE = uv + w*P_liquid*0.08;           // eye only lightly distorted
  vec2 uvB = uv + w*P_liquid*0.45;
  float r0 = length(uvB);
  uvB *= rot(t*P_rotSpeed*0.7 + P_rotTwist*3.0*r0);

  vec3 col;
  if(uKind==0) col = bgOrganic(uvB, t);
  else if(uKind==1) col = bgBloom(uvB, t);
  else if(uKind==2) col = bgTunnel(uvB, t);
  else if(uKind==3) col = bgLiquid(uvB, t);
  else if(uKind==4) col = bgGeometric(uvB, t);
  else if(uKind==5) col = bgVortex(uvB, t);
  else col = bgAbstract(uvB, t);

  if(P_fractal > 0.01 && uKind != 6) col += kali(uvB, t, 7, 1.6)*P_fractal*1.6*smoothstep(0.1,0.6,length(uvB));
  if(P_sfAmount > 0.01 && uKind != 1 && uKind != 4) col += sfRings(uvB, t)*P_sfAmount;
  if(P_partAmount > 0.01) col += particles(uvB, t)*mix(0.4, 1.4, P_partAmount);

  float eyeS = mix(0.06, 0.42, P_eyeSize);
  vec4 tn = tentacles(uv*rot(t*P_rotSpeed*0.25) + w*P_liquid*0.2, t, eyeS);
  col = mix(col, tn.rgb, tn.a);
  if(P_eyeSize > 0.01){
    vec4 ey = eyeLayer(uvE, t, eyeS);
    // aura behind the eye
    col += vec3(.35,.2,.9)*exp(-length(uvE/eyeS*vec2(0.8,1.3))*2.2)*0.25*(1.0-ey.a);
    col = mix(col, ey.rgb, ey.a);
  }

  col = hueShift(col, P_hue + P_colorCycle*0.35*sin(t*0.07));
  float l = dot(col, vec3(.299,.587,.114));
  col = mix(vec3(l), col, P_saturation);
  col = (col - 0.18)*P_contrast + 0.18;
  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export const TRANSITION_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uA;
uniform sampler2D uB;
uniform sampler2D uPrev;
uniform float uMix;
uniform float uIntensity;
uniform int uType;
uniform float uTime;
uniform vec2 uRes;
in vec2 vUv;
out vec4 fragColor;
${COMMON}

float ordered(float p, float g, float w){ return smoothstep(0.0, 1.0, (p*(1.0+w) - w*g)/max(1.0-0.0,1e-3)); }

void main(){
  vec2 uv = vUv;
  float p = clamp(uMix, 0.0, 1.0);
  float I = uIntensity;
  float bell = sin(PI*p);
  float asp = uRes.x/uRes.y;
  vec2 c = (uv-0.5)*vec2(asp,1.0);
  float r = length(c);
  vec3 col;

  if(uType==0){ // MORPH
    vec2 n = vec2(fbm(uv*3.0+uTime*0.3), fbm(uv*3.0+7.3-uTime*0.3)) - 0.5;
    vec3 a = texture(uA, uv + n*p*0.35*I).rgb;
    vec3 b = texture(uB, uv - n*(1.0-p)*0.35*I).rgb;
    float g = fbm(uv*2.2 + 3.0);
    col = mix(a, b, ordered(p, g, 0.4+0.8*I));
  } else if(uType==1){ // LIQUID
    float wave = sin(r*28.0 - uTime*6.0)*bell;
    vec2 d = normalize(c+1e-4)*wave*0.03*I + (vec2(fbm(uv*4.0+uTime), fbm(uv*4.0-uTime))-0.5)*bell*0.12*I;
    vec3 a = texture(uA, uv + d).rgb;
    vec3 b = texture(uB, uv - d*0.7).rgb;
    float front = p*(asp*0.6+0.5)*1.15;
    float m = smoothstep(r-0.12, r+0.12, front + (fbm(uv*5.0+uTime*0.5)-0.5)*0.25*I);
    col = mix(a, b, m);
    col += vec3(.3,.7,1.)*smoothstep(0.06,0.0,abs(r-front))*bell*0.6*I;
  } else if(uType==2){ // DISSOLVE
    float g = mix(fbm(uv*6.0), hash12(floor(uv*uRes/3.0)), 0.35);
    float e = p*1.2 - 0.1;
    float m = smoothstep(g-0.03, g+0.03, e);
    vec3 a = texture(uA, uv).rgb, b = texture(uB, uv).rgb;
    col = mix(a, b, m);
    float edge = smoothstep(0.08, 0.0, abs(g - e))*bell;
    col += mix(vec3(.6,.3,1.), vec3(.2,.9,1.), g)*edge*1.5*I;
  } else if(uType==3){ // FEEDBACK
    float z = 1.0 + p*2.5*I;
    vec2 ua = 0.5 + (uv-0.5)*rot(p*1.2*I)/z;
    vec3 a = texture(uA, ua).rgb;
    vec2 ub = 0.5 + (uv-0.5)*mix(2.5, 1.0, p);
    vec3 b = texture(uB, ub).rgb;
    vec3 prev = texture(uPrev, 0.5 + (uv-0.5)*0.97*rot(0.03)).rgb;
    col = mix(a, b, smoothstep(0.35, 0.85, p));
    col = mix(col, prev*1.02, 0.6*bell*I);
  } else if(uType==4){ // GLITCH
    float tt = floor(uTime*20.0);
    vec2 blk = floor(uv*vec2(12.0, 28.0)*(1.0+floor(hash12(vec2(tt,1.))*3.0)));
    float h = hash12(blk + tt);
    float show = step(h, p);
    vec2 off = vec2((hash12(blk*1.3+tt)-0.5)*0.25*bell*I*step(0.6,hash12(blk+tt*0.5)), 0.0);
    float split = 0.02*bell*I;
    vec3 a = vec3(texture(uA, uv+off+vec2(split,0)).r, texture(uA, uv+off).g, texture(uA, uv+off-vec2(split,0)).b);
    vec3 b = vec3(texture(uB, uv-off+vec2(split,0)).r, texture(uB, uv-off).g, texture(uB, uv-off-vec2(split,0)).b);
    col = mix(a, b, show);
    col *= 1.0 - 0.25*bell*I*step(0.5, fract(uv.y*uRes.y*0.25));
    col += vec3(.2,.8,1.)*step(0.985, hash12(blk*2.1+tt))*bell*I;
  } else if(uType==5){ // TUNNEL
    float ang = atan(c.y,c.x);
    float twist = bell*I*4.0*(1.0-r);
    vec2 ca = c*rot(twist)*(1.0 + p*p*6.0);
    vec2 ua = ca/vec2(asp,1.0)+0.5;
    vec2 cb = c*rot(-twist*0.6)*mix(6.0, 1.0, smoothstep(0.0,1.0,p));
    vec2 ub = cb/vec2(asp,1.0)+0.5;
    vec3 a = texture(uA, ua).rgb;
    vec3 b = texture(uB, ub).rgb;
    float front = p*1.25*(asp*0.6);
    float m = smoothstep(front, front-0.08, r);
    col = mix(a, b, m);
    col += vec3(.5,.4,1.)*smoothstep(0.05,0.0,abs(r-front))*bell*I;
    col *= 1.0 - 0.6*bell*I*smoothstep(0.6, 0.0, r)*(1.0-m);
  } else { // PARTICLE EXPLOSION
    vec3 b = texture(uB, uv).rgb;
    float N = 48.0;
    float k = p*p*2.5*I + p*0.4;
    vec2 q = c/(1.0+k);               // pull grid back to where shards came from
    vec2 g = q*N;
    vec2 id = floor(g);
    vec2 f = fract(g)-0.5;
    float h = hash12(id);
    vec2 jit = (hash22(id)-0.5)*k*0.15;
    float size = 0.5*(1.0 - p*(0.6+0.8*h));
    float shard = step(max(abs(f.x),abs(f.y)), size);
    vec2 src = (q - jit)/vec2(asp,1.0) + 0.5;
    vec3 a = texture(uA, src).rgb;
    float alive = shard*step(h*0.9, 1.0-p);
    col = mix(b*smoothstep(0.1,0.7,p), a*(1.0+bell*1.5*I), alive);
    col += vec3(.6,.5,1.)*exp(-r*6.0)*bell*2.0*I*smoothstep(0.3,0.0,p);
    col = mix(col, b, smoothstep(0.85,1.0,p));
  }
  fragColor = vec4(col, 1.0);
}`;

export const POST_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uSrc;
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform float uTime;
uniform float uFbAmount;
uniform float uFbZoom;
uniform float uFbRotate;
uniform float uGlitch;
uniform float uGlow;
uniform float uGlowTh;
in vec2 vUv;
out vec4 fragColor;
${COMMON}
void main(){
  vec2 uv = vUv;
  float asp = uRes.x/uRes.y;
  // glitch
  float gt = floor(uTime*12.0);
  float row = floor(uv.y*mix(18.0,60.0,hash12(vec2(gt,4.0))));
  float gh = hash12(vec2(row, gt));
  float gOn = step(1.0 - uGlitch*0.5, gh);
  vec2 guv = uv;
  guv.x += (hash12(vec2(gt,row*3.0))-0.5)*0.18*uGlitch*gOn;
  float split = 0.012*uGlitch*(0.3+gOn);
  vec3 col = vec3(texture(uSrc, guv+vec2(split,0.)).r, texture(uSrc, guv).g, texture(uSrc, guv-vec2(split,0.)).b);
  // glow from mip chain
  vec3 bl = textureLod(uSrc, uv, 2.0).rgb*0.45 + textureLod(uSrc, uv, 3.5).rgb*0.35 + textureLod(uSrc, uv, 5.0).rgb*0.3;
  float bL = dot(bl, vec3(.333));
  bl *= smoothstep(uGlowTh*0.5, uGlowTh*0.5+0.35, bL);
  col += bl*uGlow;
  // feedback
  vec2 cc = (uv-0.5)*vec2(asp,1.0);
  cc *= rot(uFbRotate*0.04);
  cc *= 1.0 - uFbZoom*0.025;
  vec3 prev = texture(uPrev, cc/vec2(asp,1.0)+0.5).rgb;
  col = max(col, prev*uFbAmount) + prev*uFbAmount*0.04;
  fragColor = vec4(col, 1.0);
}`;

export const OUTPUT_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uSrc;
uniform vec2 uRes;
uniform float uTime;
uniform float uMaster;
uniform float uBlack;
in vec2 vUv;
out vec4 fragColor;
${COMMON}
vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
void main(){
  vec3 col = texture(uSrc, vUv).rgb*uMaster*1.15;
  col = aces(col);
  vec2 c = vUv-0.5;
  col *= 1.0 - 0.45*dot(c,c)*1.6;
  col += (hash12(vUv*uRes + fract(uTime)*100.0)-0.5)*0.025;
  col *= 1.0 - uBlack;
  fragColor = vec4(max(col,0.0), 1.0);
}`;

export const BLIT_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uSrc;
in vec2 vUv;
out vec4 fragColor;
void main(){ fragColor = vec4(texture(uSrc, vUv).rgb, 1.0); }`;
