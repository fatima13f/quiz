const questions = [
  { type: 'true_false', question: 'Is the sky blue?', answer: 'true' },
  { type: 'multiple_choice', question: 'What is 3 + 2?', options: ['1', '2', '5'], answer: '5' },
  { type: 'true_false', question: 'Is grass red?', answer: 'false' },
  { type: 'multiple_choice', question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
];

let score = 0;
let currentQuestionIndex = -1;
document.getElementById('quiz-container')!.style.display = 'none';

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function loadQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    questionElement!.textContent = currentQuestion.question;
    optionsElement!.innerHTML = '';

    if (currentQuestion.type === 'true_false') {
      optionsElement!.innerHTML = `
        <label><input type="radio" name="answer" value="true">True</label>
        <label><input type="radio" name="answer" value="false">False</label>
      `;
    } else if (currentQuestion.type === 'multiple_choice') {
      currentQuestion.options!.forEach((option, index) => {
        optionsElement!.innerHTML += `
          <label><input type="radio" name="answer" value="${option}">${option}</label>
        `;
      });
    }
  } else {
    alert(`Quiz completed! Your score is ${score}/${questions.length}`);
    score = 0;
    currentQuestionIndex = -1;
    document.getElementById('quiz-container')!.style.display = 'none';
    document.getElementById('start-page')!.style.display = 'block';
  }
}

document.getElementById('start-btn')!.addEventListener('click', () => {
  console.log('starting quiz...');

  shuffleQuestions(); // Shuffle questions for a random set
  score = 0;
  currentQuestionIndex = -1;

  document.getElementById('quiz-container')!.style.display = 'block';
  document.getElementById('start-page')!.style.display = 'none';
  loadQuestion();
});

document.getElementById('submit-btn')?.addEventListener('click', () => {
  const answer = document.querySelector('input[name="answer"]:checked')?.value;
  if (!answer) {
    alert('Please select an answer.');
    return;
  }

  if (answer === questions[currentQuestionIndex].answer) {
    score++;
  }

  console.log(`Score: ${score}/${currentQuestionIndex + 1}`);
  loadQuestion();
});
