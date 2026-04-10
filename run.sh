#!/bin/bash

echo "========================================="
echo "   🚀 YUU DISCORD AUTO-BOT SETUP 🚀      "
echo "========================================="

# 1. Deteksi Node.js
if ! command -v node &> /dev/null; then
    echo "[*] Node.js belum terinstal. Menginstal sekarang..."
    pkg install nodejs -y
else
    echo "[*] Node.js sudah terinstal. Skip instalasi."
fi

# 2. Deteksi inisialisasi NPM (package.json)
if [ ! -f "package.json" ]; then
    echo "[*] package.json belum ada. Menginisialisasi project..."
    npm init -y
else
    echo "[*] Project sudah diinisialisasi. Skip npm init."
fi

# 3. Deteksi Modul Discord.js (node_modules)
if [ ! -d "node_modules/discord.js-selfbot-v13" ]; then
    echo "[*] Modul belum terinstal. Mendownload sekarang..."
    npm install discord.js-selfbot-v13 debug @discordjs/voice libsodium-wrappers
else
    echo "[*] Modul sudah lengkap. Skip download ulang."
fi

echo "========================================="
# Meminta token dari user
read -p "🔑 Masukkan Token Discord Kamu: " DISCORD_TOKEN

echo "========================================="
echo "[*] Setup Selesai! Menjalankan bot..."
echo "========================================="

# Menjalankan script
TOKEN=$DISCORD_TOKEN node index.js

