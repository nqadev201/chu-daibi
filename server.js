const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// ===== DATA =====

// CHÚ ĐẠI BI
const chuDaiBi = [
 "Nam Mô Đại Bi Hội Thượng Phật Bồ Tát",
  "Thiên Thủ Thiên Nhãn Vô Ngại Đại Bi Tâm Đà La Ni",
  "Nam Mô Hắc Ra Đát Na Đa Ra Dạ Da",
  "Nam Mô A Rị Da",
  "Bà Lô Yết Đế Thước Bát Ra Da",
  "Bồ Đề Tát Đoả Bà Da",
  "Ma Ha Tát Đoả Bà Da",
  "Ma Ha Ca Lô Ni Ca Da",
  "Án",
  "Tát Bàn Ra Phạt Duệ",
  "Số Đát Na Đát Toả",
  "Nam Mô Tất Kiết Lật Đoả Y Mông A Rị Da",
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
  "Ma Ha Bồ Đề Tát Đoả",
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

// BÁT NHÃ TÂM KINH (dạng mảng)
const batNha = [
  "Quán Tự Tại Bồ Tát Hành Thâm Bát Nhã Ba La Mật Đa Thời",
  "Chiếu Kiến Ngũ Uẩn Giai Không",
  "Độ Nhứt Thiết Khổ Ách",
  "Xá Lợi Tử",
  "Sắc Bất Dị Không",
  "Không Bất Dị Sắc",
  "Sắc Tức Thị Không",
  "Không Tức Thị Sắc",
  "Thọ Tưởng Hành Thức Diệc Phục Như Thị",
  "Xá Lợi Tử",
  "Thị Chư Pháp Không Tướng",
  "Bất Sanh Bất Diệt",
  "Bất Cấu Bất Tịnh",
  "Bất Tăng Bất Giảm",
  "Thị Cố Không Trung Vô Sắc",
  "Vô Thọ Tưởng Hành Thức",
  "Vô Nhãn Nhĩ Tỷ Thiệt Thân Ý",
  "Vô Sắc Thanh Hương Vị Xúc Pháp",
  "Vô Nhãn Giới Nãi Chí Vô Ý Thức Giới",
  "Vô Vô Minh",
  "Diệc Vô Vô Minh Tận",
  "Nãi Chí Vô Lão Tử",
  "Diệc Vô Lão Tử Tận",
  "Vô Khổ",
  "Tập",
  "Diệt",
  "Đạo",
  "Vô Trí Diệc Vô Đắc",
  "Dĩ Vô Sở Đắc Cố",
  "Bồ Đề Tát Đõa Y Bát Nhã Ba La Mật Đa Cố",
  "Tâm Vô Quái Ngại",
  "Vô Quái Ngại Cố",
  "Vô Hữu Khủng Bố",
  "Viễn Ly Điên Đảo Mộng Tưởng",
  "Cứu Cánh Niết Bàn",
  "Tam Thế Chư Phật",
  "Y Bát Nhã Ba La Mật Đa Cố",
  "Đắc A Nậu Đa La Tam Miệu Tam Bồ Đề",
  "Cố Tri Bát Nhã Ba La Mật Đa",
  "Thị Đại Thần Chú",
  "Thị Đại Minh Chú",
  "Thị Vô Thượng Chú",
  "Thị Vô Đẳng Đẳng Chú",
  "Năng Trừ Nhất Thiết Khổ",
  "Chân Thật Bất Hư",
  "Cố Thuyết Bát Nhã Ba La Mật Đa Chú",
  "Tức Thuyết Chú Viết",
  "Yết Đế Yết Đế",
  "Ba La Yết Đế",
  "Ba La Tăng Yết Đế",
  "Bồ Đề Tát Bà Ha"
];

// ===== NORMALIZE =====
function normalizeText(str) {
  return str.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ===== MASK =====
function maskSentence(sentence, level) {
  let words = sentence.split(' ');
  let percent = level === 'medium' ? 0.5 : level === 'hard' ? 0.8 : 0.2;
  let totalHide = level === 'easy' ? 1 : Math.floor(words.length * percent);

  let indexes = [];
  while (indexes.length < totalHide) {
    let i = Math.floor(Math.random() * words.length);
    if (!indexes.includes(i)) indexes.push(i);
  }

  return words.map((w, i) => indexes.includes(i) ? '_____' : w).join(' ');
}

// ===== SESSION =====
let sessions = {};

app.get('/start', (req, res) => {
  const level = req.query.level || 'easy';
  const type = req.query.type || 'daibi';

  const id = Date.now().toString();
  const data = type === 'batnha' ? batNha : chuDaiBi;

  sessions[id] = {
    questions: [...data]
  };

  res.json({
    sessionId: id,
    questions: data.map(q => maskSentence(q, level))
  });
});

// ===== SUBMIT =====
app.post('/submit', (req, res) => {
  const { sessionId, answers } = req.body;
  const session = sessions[sessionId];

  let results = [];
  let correctCount = 0;
  const scorePer = 10 / session.questions.length;

  session.questions.forEach((q, i) => {
    const user = answers[i] || '';
    const isCorrect = normalizeText(user) === normalizeText(q);

    if (isCorrect) correctCount++;

    results.push({
      correctAnswer: q,
      userAnswer: user,
      correct: isCorrect
    });
  });

  res.json({
    results,
    score: correctCount * scorePer
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
