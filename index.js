const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

const client = new Client({
  checkUpdate: false,
});

// TOKEN SEKARANG DIAMBIL DARI RUN.SH SECARA OTOMATIS (AMAN DARI GITHUB)
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error('Token tidak ditemukan! Tolong jalankan bot lewat run.sh');
  process.exit();
}

const CHANNEL_ID = '1488936175187263649';

// Pengaturan Cooldown (dalam milidetik)
const DELAY_W = 62 * 1000;         // 1 menit 2 detik = 62 detik
const DELAY_HU = 12 * 1000;        // 12 detik
const DELAY_BATTLE = 138 * 1000;   // 2,3 menit = 138 detik

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('ready', async () => {
  console.log(`Berhasil login sebagai ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);

  if (!channel) {
    console.error('Channel tidak ditemukan! Pastikan ID benar.');
    process.exit();
  }

  console.log(`-----------------------------------`);
  console.log(`Target Channel: #${channel.name}`);
  console.log(`Server: ${channel.guild.name}`);
  console.log(`-----------------------------------`);

  rl.question('Apakah channel ini sudah benar? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('Memulai proses auto-send (3 Timer Terpisah)...');
      console.log(`[Timer 1] !w             -> Setiap 62 detik`);
      console.log(`[Timer 2] !hu            -> Setiap 11 detik`);
      console.log(`[Timer 3] !battle random -> Setiap 138 detik`);
      console.log(`-----------------------------------`);

      // Eksekusi awal
      sendMsg(channel, '!w');
      setTimeout(() => sendMsg(channel, '!hu'), 1500); 
      setTimeout(() => sendMsg(channel, '!battle random'), 3000); 

      // Looping
      setInterval(() => sendMsg(channel, '!w'), DELAY_W);
      setInterval(() => sendMsg(channel, '!hu'), DELAY_HU);
      setInterval(() => sendMsg(channel, '!battle random'), DELAY_BATTLE);

    } else {
      console.log('Dibatalkan.');
      process.exit();
    }
  });
});

function sendMsg(channel, message) {
  const textChannel = channel.isVoice() ? channel : channel;
  textChannel.send(message)
    .then(() => console.log(`[${new Date().toLocaleTimeString()}] Berhasil kirim ${message}`))
    .catch(err => console.error(`[${new Date().toLocaleTimeString()}] Gagal kirim ${message}:`, err.message));
}

client.login(TOKEN);

