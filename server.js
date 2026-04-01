const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// ====================== DATA ======================
const cauChuDaiBi = [
  "Nam Mô Đại Bi Hội Thượng Phật Bồ Tát",
  "Thiên Thủ Thiên Nhãn Vô Ngại Đại Bi Tâm Đà La Ni",
  "Nam Mô Hắc Ra Đát Na Đa Ra Dạ Da",
  "Nam Mô A Rị Da",
  "Bà Lô Yết Đế Thước Bát Ra Da",
  "Bồ Đề Tát Đỏa Bà Da",
  "Ma Ha Tát Đỏa Bà Da",
  "Ma Ha Ca Lô Ni Ca Da",
  "Án",
  "Tát Bàn Ra Phạt Duệ",
  "Số Đát Na Đát Tỏa",
  "Nam Mô Tất Kiết Lật Đỏa Y Mông A Rị Da",
  "Bà Lô Kiết Đế Thất Phật Ra Lăng Đà Bà",
  "Nam Mô Na Ra Cẩn Trì",
  "Hê Rị Ma Ha Bàn Đa Sa Mế",
  "Tát Bà A Tha Đậu Du Bằng",
  "A Thệ Dựng",
  "Tát Bà Tát Đa Na Ma Bà Già",
  "Ma Phạt Đạt Đậu",
  "Đát Điệt Tha",
  "Án A Bà Lô Hê",
  "Lô Ca Đế",
  "Ca Ra Đế",
  "Di Hê Rị",
  "Ma Ha Bồ Đề Tát Đỏa",
  "Tát Bà Tát Bà",
  "Ma Ra Ma Ra",
  "Ma Hê Ma Hê Rị Đà Dựng",
  "Cu Lô Cu Lô Yết Mông",
  "Độ Lô Độ Lô Phạt Xà Da Đế",
  "Ma Ha Phạt Xà Da Đế",
  "Đà Ra Đà Ra",
  "Địa Rị Ni",
  "Thất Phật Ra Da",
  "Giá Ra Giá Ra",
  "Mạ Mạ Phạt Ma Ra",
  "Mục Đế Lệ",
  "Y Hê Y Hê",
  "Thất Na Thất Na",
  "A Ra Sâm Phật Ra Xá Lợi",
  "Phạt Sa Phạt Sâm",
  "Phật Ra Xá Da",
  "Hô Lô Hô Lô Ma Ra",
  "Hô Lô Hô Lô Hê Rị",
  "Ta Ra Ta Ra",
  "Tất Rị Tất Rị",
  "Tô Rô Tô Rô",
  "Bồ Đề Dạ Bồ Đề Dạ",
  "Bồ Đà Dạ Bồ Đà Dạ",
  "Di Đế Rị Dạ",
  "Na Ra Cẩn Trì",
  "Địa Rị Sắc Ni Na",
  "Ba Dạ Ma Na",
  "Ta Bà Ha",
  "Tất Đà Dạ",
  "Ta Bà Ha",
  "Ma Ha Tất Đà Dạ",
  "Ta Bà Ha",
  "Tất Đà Du Nghệ",
  "Thất Bàn Ra Dạ",
  "Ta Bà Ha",
  "Na Ra Cẩn Trì",
  "Ta Bà Ha",
  "Ma Ra Na Ra",
  "Ta Bà Ha",
  "Tất Ra Tăng A Mục Khê Da",
  "Ta Bà Ha",
  "Ta Bà Ma Ha A Tất Đà Dạ",
  "Ta Bà Ha",
  "Giả Kiết Ra A Tất Đà Dạ",
  "Ta Bà Ha",
  "Ba Đà Ma Yết Tất Đà Dạ",
  "Ta Bà Ha",
  "Na Ra Cẩn Trì Bàn Già Ra Dạ",
  "Ta Bà Ha",
  "Ma Bà Lợi Thắng Yết Ra Dạ",
  "Ta Bà Ha",
  "Nam Mô Hắc Ra Đát Na Đa Ra Dạ Da",
  "Nam Mô A Rị Da",
  "Bà Lô Kiết Đế",
  "Thước Bàn Ra Dạ",
  "Ta Bà Ha",
  "Án Tất Điện Đô",
  "Mạn Đa Ra",
  "Bạt Đà Dạ",
  "Ta Bà Ha"
];

// ====================== NORMALIZE ======================
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFC")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ====================== SESSION ======================
let sessions = {};

app.get('/start', (req, res) => {
  const id = Date.now().toString();

  // ❌ bỏ random → giữ nguyên thứ tự
  sessions[id] = {
    questions: [...cauChuDaiBi],
    current: 0,
    correct: 0,
    history: []
  };

  res.json({ sessionId: id });
});

// ====================== QUESTION ======================
app.get('/question/:id', (req, res) => {
  const session = sessions[req.params.id];

  if (!session) return res.json({ error: "Session not found" });

  if (session.current >= session.questions.length) {
    return res.json({ done: true, result: session });
  }

  const full = session.questions[session.current];

  // vẫn random vị trí từ bị ẩn (cái này vẫn giữ để luyện)
  const words = full.split(' ');
  const removeIndex = Math.floor(Math.random() * words.length);
  words[removeIndex] = '_____';

  res.json({
    question: words.join(' '),
    index: session.current + 1,
    total: session.questions.length
  });
});

// ====================== ANSWER ======================
app.post('/answer', (req, res) => {
  const { sessionId, answer } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.json({ error: "Session not found" });

  const correctAnswer = session.questions[session.current];

  const isCorrect =
    normalizeText(answer) === normalizeText(correctAnswer);

  if (isCorrect) session.correct++;

  session.history.push({
    question: correctAnswer,
    user: answer,
    correct: isCorrect
  });

  session.current++;

  res.json({
    correct: isCorrect,
    correctAnswer
  });
});

// ====================== START ======================
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
