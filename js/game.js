const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const delay = (ms) => new Promise((response) => setTimeout(response, ms));
let timeRemaining = document.querySelector('#timeRemaining');
let timeLeft = 30

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Commonly Used Data Types DO NOT Include:',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'Numbers',
        choice4: 'Alert',
        answer: 4,
    },
    {
        question: 'The Condition In An If/Else Statement Is Enclosed Within:',
        choice1: 'Quotes',
        choice2: 'Curly Brackets',
        choice3: 'Parentheses',
        choice4: 'Square Brackets',
        answer: 3,
    },
    {
        question: 'Arrays In JavaScript Can Be Used To Store:',
        choice1: 'Numbers And Strings',
        choice2: 'Other Arrays',
        choice3: 'Booleans',
        choice4: 'All Of The Above',
        answer: 4,
    },
    {
        question: 'String Values Must Be Enclosed Within _ When Being Assigned To Variables',
        choice1: 'Commas',
        choice2: 'Curly Brackets',
        choice3: 'Quotes',
        choice4: 'Parentheses',
        answer: 3,
    },
    {
        question: 'A Very Useful Tool Used During Development And Debugging For Printing Content To The Debugger Is:',
        choice1: 'JavaScript',
        choice2: 'Terminal/Bash',
        choice3: 'For Loops',
        choice4: 'Console.Log',
        answer: 4,
    },
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

timer = () => {
    let timeInterval = setInterval(function () {
        timeRemaining.textContent = timeLeft;
        timeLeft--;
        if (timeLeft == 0 || questionCounter >= questions.length) {
            clearInterval(timeInterval);
            timeRemaining.textContent = 0;
            localStorage.setItem('mostRecentScore', score)

            return window.location.assign('../html/end.html')
        }
    }, 1000)
}

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    timer();
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../html/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        else {
            timeLeft = timeLeft-5;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 300)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()