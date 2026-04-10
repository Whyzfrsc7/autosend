<div align="center">
  <h1>🚀 AutoSend Discord Bot</h1>
  <p>Bot otomatis (Selfbot) super ringan untuk keperluan <i>grinding</i> di Discord. Dioptimalkan penuh untuk Termux (Android) dan Linux.</p>
</div>

---

## ✨ Fitur Utama
- **Triple Timer Berbeda:** Menjalankan 3 perintah dengan *cooldown* masing-masing secara bersamaan tanpa tabrakan.
- **Smart Execution:** Script `run.sh` otomatis mendeteksi apakah Node.js dan modul `npm` sudah terinstal, sehingga tidak perlu *download* ulang setiap kali dijalankan.
- **100% Aman dari Kebocoran Token:** Token Discord tidak disimpan di dalam script `index.js`, melainkan diinput secara *live* melalui terminal untuk mencegah pencurian token oleh bot GitHub.
- **Ringan & Cepat:** Berjalan di *background* menggunakan `discord.js-selfbot-v13`.

## ⏱️ Detail Cooldown Perintah
Bot ini secara otomatis akan mengirimkan pesan ke channel yang dituju dengan interval berikut:
1. `!w` : Setiap **62 detik** (1 menit 2 detik)
2. `!hu` : Setiap **11 detik**
3. `!battle random` : Setiap **138 detik** (2,3 menit)

---

## 🛠️ Cara Install & Menjalankan

### Langkah 1: Persiapan (Install Git)
Sebelum mengunduh script, pastikan aplikasi `git` sudah terpasang di terminal kamu.

**Untuk pengguna Termux (Android):**
```bash
pkg update && pkg install git -y
