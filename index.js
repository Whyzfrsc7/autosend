const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

const client = new Client({
  checkUpdate: false,
});

// Mengambil token dari environment agar aman (TOLONG JANGAN TARUH TOKEN ASLI DI SINI LAGI)
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error('Token tidak ditemukan! Tolong jalankan bot lewat run.sh');
  process.exit();
}

const CHANNEL_ID = '1488936175187263649';

// Pengaturan Cooldown (dalam milidetik)
const DELAY_W = 62 * 1000;         // 62 detik
const DELAY_HU = 11 * 1000;        // 11 detik
const DELAY_BATTLE = 15 * 1000;    // 15 detik

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('ready', async () => {
  console.log(`Berhasil login sebagai ${client.user.tag}`);

  // Cari channel berdasarkan ID
  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);

  if (!channel) {
    console.error('Channel tidak ditemukan! Pastikan ID benar.');
    process.exit();
  }

  // Beritahu nama channel dan minta konfirmasi
  console.log(`-----------------------------------`);
  console.log(`Target Channel: #${channel.name}`);
  console.log(`Server: ${channel.guild.name}`);
  console.log(`-----------------------------------`);

  rl.question('Apakah channel ini sudah benar? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('Memulai proses auto-send (3 Timer Terpisah)...');
      console.log(`[Timer 1] !w             -> Setiap 62 detik`);
      console.log(`[Timer 2] !hu            -> Setiap 11 detik`);
      console.log(`[Timer 3] !br            -> Setiap 15 detik`);
      console.log(`-----------------------------------`);

      // Fungsi agar pesan pertama dikirim dengan jeda sedikit (mencegah spam awal), lalu dilanjut interval
      const startAutoSend = (message, delay, initialDelay = 0) => {
        setTimeout(() => {
          sendMsg(channel, message); // Kirim instan setelah jeda awal terpenuhi
          setInterval(() => {
            sendMsg(channel, message);
          }, delay);
        }, initialDelay);
      };

      // Memulai loop untuk ketiga command (jeda awal: 0d, 1.5d, dan 3d)
      startAutoSend('!w', DELAY_W, 0);
      startAutoSend('!hu', DELAY_HU, 1500);
      startAutoSend('!br', DELAY_BATTLE, 3000);

    } else {
      console.log('Dibatalkan.');
      process.exit();
    }
  });
});

// Fungsi general untuk mengirim pesan
function sendMsg(channel, message) {
  const textChannel = channel.isVoice() ? channel : channel;
  
  textChannel.send(message)
    .then(() => console.log(`[${new Date().toLocaleTimeString()}] Berhasil kirim ${message}`))
    .catch(err => console.error(`[${new Date().toLocaleTimeString()}] Gagal kirim ${message}:`, err.message));
}

client.login(TOKEN);
        
