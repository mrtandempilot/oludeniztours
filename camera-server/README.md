# Canlı Kamera Kurulumu

```
Kamera (10.64.188.9, yerel ağ)
   │  RTSP
Yerinde küçük cihaz (Raspberry Pi / mini PC)  ── Tailscale ──►  VPS
                                                                 │ MediaMTX: RTSP → HLS
                                                                 │ Caddy: HTTPS
Web sitesi /canli  ◄──── https://kamera.alanadiniz.com/cam/index.m3u8
```

`10.64.188.9` özel (yerel) bir IP: internetten erişilemez. Bu yüzden VPS kameraya
**Tailscale** (ücretsiz VPN) üzerinden ulaşır. Kamerayla aynı ağda 7/24 açık bir cihaz gerekir.

## Gerekenler
1. **VPS** — Ubuntu 22/24, 1 vCPU / 1 GB RAM yeter (Hetzner, Contabo vb., aylık ~4-5 €).
   Görüntü yeniden kodlanmaz, sadece aktarılır; CPU yükü çok düşüktür.
2. **Yerinde cihaz** — Raspberry Pi 4/5 veya kamera ağında sürekli açık bir bilgisayar.
3. **Alt alan adı** — ör. `kamera.alanadiniz.com`, A kaydı VPS IP'sine.
4. **Tailscale hesabı** — https://tailscale.com (ücretsiz).
5. **Yükleme hızı** — yerindeki internetin upload'u en az ~3 Mbps olmalı.
   VPS sadece 1 akış çeker; izleyici sayısı ne olursa olsun kamera ağı 1 kez yüklenir.

## 1) Yerinde cihaz (Raspberry Pi)
```bash
curl -fsSL https://tailscale.com/install.sh | sh
echo 'net.ipv4.ip_forward = 1' | sudo tee /etc/sysctl.d/99-tailscale.conf && sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
sudo tailscale up --advertise-routes=10.64.188.0/24
```
Tailscale panelinde (Machines → cihaz → Edit route settings) `10.64.188.0/24` rotasını onaylayın.

## 2) VPS
```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --accept-routes
nc -zv 10.64.188.9 554          # "succeeded" görmelisiniz

curl -fsSL https://get.docker.com | sh
git clone <bu repo> && cd oludeniztours/camera-server
cp .env.example .env && nano .env   # kamera şifresi ve alan adı
sudo ufw allow 80,443/tcp
docker compose up -d
```
Test: tarayıcıda `https://kamera.alanadiniz.com/cam/` açılınca görüntü gelmeli.

## 3) Web sitesi (Vercel)
Vercel → Project → Settings → Environment Variables:
```
NEXT_PUBLIC_CAMERA_HLS = https://kamera.alanadiniz.com/cam/index.m3u8
```
Yeniden deploy edin. Sayfa: `https://oludeniztours.vercel.app/canli`

## Güvenlik
- Kamera şifresi sadece VPS'teki `.env` dosyasında durur; tarayıcıya ve git'e asla gitmez.
- MediaMTX sadece izlemeye izin verir, dışarıdan yayın basılamaz.
- Kamera yerel ağda kalır, router'da port açmanıza gerek yoktur.
