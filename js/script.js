const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;

    navButtons.forEach((btn) => btn.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(pageId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const questions = [
  {
    question: "O que significa LAN?",
    answers: ["Rede local", "Rede mundial", "Rede sem fio pública", "Rede de longa distância"],
    correct: 0
  },
  {
    question: "Qual equipamento normalmente conecta redes diferentes?",
    answers: ["Switch", "Roteador", "Mouse", "Monitor"],
    correct: 1
  },
  {
    question: "Qual protocolo é usado para acessar páginas web com segurança?",
    answers: ["HTTP", "FTP", "HTTPS", "DHCP"],
    correct: 2
  },
  {
    question: "Qual serviço traduz nomes de sites em endereços IP?",
    answers: ["DNS", "TCP", "UDP", "VGA"],
    correct: 0
  },
  {
    question: "O que o DHCP faz em uma rede?",
    answers: ["Bloqueia vírus automaticamente", "Distribui endereços IP automaticamente", "Cria páginas web", "Aumenta a memória do computador"],
    correct: 1
  },
  {
    question: "Qual modelo possui 7 camadas?",
    answers: ["Modelo TCP/IP", "Modelo OSI", "Modelo HTTP", "Modelo DNS"],
    correct: 1
  },
  {
    question: "Qual equipamento é mais usado para conectar vários dispositivos dentro de uma mesma rede local?",
    answers: ["Switch", "Impressora", "Teclado", "HD externo"],
    correct: 0
  },
  {
    question: "Qual é a principal função de um firewall?",
    answers: ["Aumentar o brilho da tela", "Controlar e filtrar o tráfego de rede", "Trocar o cabo de rede", "Criar documentos"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const scoreEl = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const quizContent = document.getElementById("quizContent");
const result = document.getElementById("result");
const finalMessage = document.getElementById("finalMessage");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  answersEl.innerHTML = "";

  const item = questions[currentQuestion];
  questionEl.textContent = item.question;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(button, index));
    answersEl.appendChild(button);
  });

  updateProgress();
}

function selectAnswer(button, selectedIndex) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedbackEl.textContent = "Correto! Boa resposta.";
    feedbackEl.classList.add("ok");
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = "Ops! Essa não era a alternativa correta.";
    feedbackEl.classList.add("error");
  }

  scoreEl.textContent = `Pontuação: ${score}`;
  updateProgress(true);
  nextBtn.disabled = false;
}

function updateProgress(questionAnswered = false) {
  const total = questions.length;
  const completed = questionAnswered ? currentQuestion + 1 : currentQuestion;
  const percent = Math.round((completed / total) * 100);

  progressText.textContent = `Questão ${currentQuestion + 1} de ${total}`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  quizContent.style.display = "none";
  result.style.display = "block";
  progressPercent.textContent = "100%";
  progressFill.style.width = "100%";
  progressText.textContent = `Quiz concluído: ${questions.length} de ${questions.length}`;

  const total = questions.length;
  let message = `Você acertou ${score} de ${total} questões.`;

  if (score === total) {
    message += " Excelente! Você está mandando muito bem em fundamentos de redes.";
  } else if (score >= total / 2) {
    message += " Bom resultado! Revise os pontos que errou para fortalecer sua base.";
  } else {
    message += " Continue estudando o roadmap e tente novamente depois.";
  }

  finalMessage.textContent = message;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  scoreEl.textContent = "Pontuação: 0";
  quizContent.style.display = "block";
  result.style.display = "none";
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
tryAgainBtn.addEventListener("click", restartQuiz);

loadQuestion();