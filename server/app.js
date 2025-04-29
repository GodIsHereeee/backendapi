import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;

// Setup untuk ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files dari folder 'client'
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

// Roasting lokal
const fallbackRoasts = [
  "@{username} tuh kalo jadi superhero, kekuatannya ngilang pas dibutuhin.",
  "@{username} jangan sedih, jelek tuh bukan dosa… tapi malu dikit gitu loh 😭.",
  "@{username} itu kayak charger abal-abal, bikin hidup makin lowbat.",
  "@{username} cocok jadi influencer… buat ngajarin cara gagal.",
  "@{username} posting tiap hari, tapi yang like cuma dia sendiri.",
  "@{username} definisi ‘udah ganteng, sayangnya khayalan’.",
  "@{username} beneran unik, kaya bug di aplikasi.",
  "@{username} punya aura… aura miskin tapi pede banget.",
  "@{username} jangan GR, yang naksir elu tuh cuma nyamuk.",
  "@{username} chat-nya selalu dibalas ‘wkwk’ biar cepet selesai.",
  "@{username} upload reels motivasi, padahal hidupnya aja buffering.",
  "@{username} tuh vibes-nya kayak ‘udah, gitu doang?’.",
  "@{username} punya potensi… buat bikin orang pindah circle.",
  "@{username} cocok jadi legenda… karena gak ada yang lihat dia real life.",
  "@{username} tuh kayak sinyal 1 bar, gak bisa diandalkan.",
  "@{username} vibes-nya kayak ‘seen doang’ dari Tuhan.",
  "@{username} kayak mie instan — cepat bikin kenyang, tapi menyesal setelahnya.",
  "@{username} kalo nembak, pasti pake tembakan kosong.",
  "@{username} gaya doang sultan, isinya pinjol semua.",
  "@{username} tuh kayak sinetron, makin lama makin gak nyambung."
];

// Kalimat ngatain berdasarkan rating
const ratingRemarks = {
  1: "Akun lu beneran ancur, kaya kuota 2GB sebulan. 🥲",
  2: "Akun lu masih mending lah, kayak jajan seribu dapet sebiji. 😬",
  3: "Akun lu lumayan lah, kaya kopi sachet — ada rasa, tapi tipis. 😌",
  4: "Wih akun lu udah keren dikit, vibes-nya udah mulai masuk! 😎",
  5: "Goks! Akun lu auto di-follow, aura sultan + receh bersatu! 🔥👑"
};

app.get('/api/roast', (req, res) => {
  const username = req.query.username;
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;

  const roastingText = fallbackRoasts[Math.floor(Math.random() * fallbackRoasts.length)].replace('{username}', username);
  const rating = Math.floor(Math.random() * 5) + 1;
  const ratingText = ratingRemarks[rating];

  res.json({
    username,
    avatar: avatarUrl,
    roasting: roastingText,
    rating,
    ratingText
  });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
