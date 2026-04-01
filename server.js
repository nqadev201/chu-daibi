const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const cauChuDaiBi = [
  "Nam mô đại bi hội thượng Phật Bồ Tát",
  "Thiên thủ thiên nhãn vô ngại đại bi tâm đà la ni",
  "Nam mô hắc ra đát na đa ra dạ da",
  "Nam mô a rị da",
  "Bà lô yết đế thước bát ra da",
  "Bồ đề tát đỏa bà da",
  "Ma ha tát đỏa bà da",
  "Ma ha ca lô ni ca da"
];

let sessions = {};

app.get('/start', (req, res) => {
  const id = Date.now().toString();
  const shuffled = [...cauChuDaiBi].sort(() => Math.random() - 0.5);

  sessions[id] = {
    questions: shuffled,
    current: 0,
    correct: 0,
    history: []
  };

  res.json({ sessionId: id });
});

app.get('/question/:id', (req, res) => {
  const session = sessions[req.params.id];

  if (session.current >= session.questions.length) {
    return res.json({ done: true, result: session });
  }

  const full = session.questions[session.current];
  const words = full.split(' ');
  const removeIndex = Math.floor(Math.random() * words.length);
  words[removeIndex] = '_____';

  res.json({
    question: words.join(' '),
    index: session.current + 1,
    total: session.questions.length
  });
});

app.post('/answer', (req, res) => {
  const { sessionId, answer } = req.body;
  const session = sessions[sessionId];

  const correctAnswer = session.questions[session.current];
  const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

  if (isCorrect) session.correct++;

  session.history.push({
    question: correctAnswer,
    user: answer,
    correct: isCorrect
  });

  session.current++;

  res.json({ correct: isCorrect, correctAnswer });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});