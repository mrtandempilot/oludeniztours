/** One shared requestAnimationFrame for all high-frequency UI readouts. */
type Fn = (now: number) => void;
const subs = new Set<Fn>();
let raf = 0;
function loop(now: number) {
  subs.forEach((f) => f(now));
  raf = subs.size ? requestAnimationFrame(loop) : 0;
}
export function onTick(fn: Fn) {
  subs.add(fn);
  if (!raf && typeof window !== 'undefined') raf = requestAnimationFrame(loop);
  return () => {
    subs.delete(fn);
  };
}
