// ตัวแปรสถานะเกม
let score = 0;
let lives = 3;
const wordsWithHints = [
  { word: "เพลินฤดี", hint: "เป็นผู้หญิงที่ชอบเดินไปเดินมา" },
  { word: "อิทธิวัตร", hint: "เป็นผู้ชายที่ชอบโวยวาย" },
  { word: "จรินทร์", hint: "เป็นผู้หญิงที่ชอบช็อปปิ้ง" },
  { word: "วันดี", hint: "เป็นผู้หญิงที่มือสั่น" },
  { word: "ศิวัช", hint: "เป็นผู้ชายที่เดินชนกระจก" },
  { word: "สรวิศ", hint: "เป็นคนหล่อที่สุดในบ้าน" },
  { word: "ลีโอ", hint: "เป็นสัตว์เลี้ยงแสนน่ารัก" },
];
let currentWord = {};
let clue = [];

function startGame() {
  if (wordsWithHints.length === 0 || lives === 0) {
    document.getElementById(
      "message"
    ).textContent = `จบเกมแล้วจ้า คำนั้นคือ ${currentWord.word} คะแนนรวม: ${score}`;
    document.getElementById("clue").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("lives").textContent = "";
    return;
  }
  // สุ่มคำ
  currentWord = wordsWithHints.splice(
    Math.floor(Math.random() * wordsWithHints.length),
    1
  )[0];
  clue = Array(currentWord.word.length).fill("_");
  updateUI();
}

// บอกสถานะเกม
function updateUI() {
  document.getElementById("clue").textContent = clue.join(" ");
  document.getElementById("hint").textContent = `คำใบ้: ${currentWord.hint}`;
  document.getElementById("lives").textContent = `จำนวนที่ทายได้: ${lives}`;
  document.getElementById("score").textContent = `คะแนน: ${score}`;
}

// ให้คนเล่นพิมพ์
function makeGuess() {
  const guess = document.getElementById("guess").value;
  document.getElementById("guess").value = "";

  if (!guess) {
    document.getElementById("message").textContent = "กรุณาใส่ตัวอักษร";
    return;
  }

  let correct = false;

  for (let i = 0; i < currentWord.word.length; i++) {
    if (currentWord.word[i] === guess[i]) {
      clue[i] = guess[i];
      correct = true;
    }
  }
  // เช็คว่าที่ทายมาถูกหรือผิด
  if (!correct) {
    lives--;
    if (lives === 0) {
      document.getElementById(
        "message"
      ).textContent = `คุณแพ้แล้ว! คำนั้นคือ: ${currentWord.word}`;
      startGame();
    } else {
      document.getElementById("message").textContent = "ผิดจ้า";
    }
  } else {
    if (clue.join("") === currentWord.word) {
      score++;
      document.getElementById(
        "message"
      ).textContent = `ถูกต้อง! คำนั้นคือ: ${currentWord.word}`;
      startGame();
    } else {
      document.getElementById("message").textContent = "";
    }
  }

  updateUI();
}

// เริ่มเกม
startGame();

// กด Enter เพื่อทายได้
document.getElementById("guess").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    makeGuess();
  }
});
