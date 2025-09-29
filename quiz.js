// For quiz
let quizLink = 'https://raw.githubusercontent.com/Abrar822/Space.A/refs/heads/main/mcqs_rephrased_filler.json';
let quizBtn = document.querySelectorAll('.quizBtn');
let hero = document.querySelector('.hero');
let left = document.querySelector('.left');
let rights = document.querySelector('.right');
let quizContainer = document.querySelector('.quiz-container');

// For quiz button
quizBtn.forEach((btn)=> {
    btn.addEventListener('click', (event) => {
        // For exploreExos section scrolling
        if(getComputedStyle(exploreExosContainer).display === 'flex') {
            savedScrollPos = hiddenContainer.scrollTop;
        }
        // For hiding the rest sections
        for(let section of sections) {
            if(getComputedStyle(section).display === 'flex' && !section.classList.contains('quiz-container')) {
                section.style.top = '2000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70)
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            quizContainer.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            quizContainer.style.top = '80px';
        }, 300);
    });
});

// For homeBtn
let homeBtn = document.querySelectorAll('.homeBtn');
homeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // Generating a new fact for each home loading
        generatingFacts();
        // For exploreExos section scrolling
        if(getComputedStyle(exploreExosContainer).display === 'flex') {
            savedScrollPos = hiddenContainer.scrollTop;
        }
        for(let section of sections) {
            if(getComputedStyle(section).display === 'flex' && !section.classList.contains('hero')) {
                section.style.top = '2000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70)
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            hero.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            hero.style.top = '70px';
        }, 300);
    });
});

// For start quiz button
let initialContent = document.querySelector('.initial-content');
let startQuiz = document.querySelector('.start');
let titlebar = document.querySelector('.titlebar');
let content = document.querySelector('.content');
let myQuestion = document.querySelector('.ques');
let qNo = document.querySelector('.qNo');
let options = document.querySelector('.options');

// variables
let count = 0, score = 0;
let myMcqs = [];
let myOptions = [];
let correctAnswer;

// function to get the questions and store in allMcqs[]
async function getQuiz() {
    let response = await fetch(quizLink);
    let data = await response.json();
    // For storing all the mcqs
    let allMcqs = data.questions;
    // For randomly storing my 10 mcqs
    for(let i = 0; i < 10; i++) {
        let idx = Math.floor(Math.random() * allMcqs.length);
        myMcqs[i] = allMcqs[idx];
    }
}

// function to load the question
let welcome = initialContent.querySelector('.welcome');
let p1 = initialContent.querySelector('.p1');
let p2 = initialContent.querySelector('.p2');
function loadQuestion() {
    if(count == 10) {
        titlebar.style.display = 'none';
        content.style.display = 'none';
        p1.style.display = 'none';
        p2.style.display = 'inline-block';
        initialContent.style.display = 'flex';
        welcome.innerText = 'Score: ' + score;
        showMsg(score, p2);
        return;
    }
    ++count;
    qNo.innerText = count;
    options.innerHTML = '';
    myQuestion.innerText = myMcqs[count - 1].question;
    qNo.innerText = count;
    correctAnswer = myMcqs[count - 1].correct_answer;
    myOptions = [...myMcqs[count - 1].incorrect_answers, myMcqs[count - 1].correct_answer].sort(() => Math.random() - 0.5);
    // creating an element li
    myOptions.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        options.appendChild(btn);
    });
}

// function to check whether the answer is correct or not
let printedScore = document.querySelector('.score');
// For validation in quiz (no ahead until selecting any opt)
let clicked = false;
function checkAnswer() {
    let allOptions = options.querySelectorAll('button');
    allOptions.forEach((opt) => {
        opt.addEventListener('click', (event) => {
            clicked = true;
            // changing the color according to the answer
            if(opt.innerText === correctAnswer) {
                opt.style.border = '3px solid green';
                ++score;
                printedScore.innerText = 'Score: ' + score + ' / 10';
            } else {
                opt.style.border = '3px solid red';
            }
            // disabling the buttons after click
            for(let opte of allOptions) {
                if(opte.innerText === correctAnswer) {
                    opte.style.border = '3px solid green';
                }
                opte.disabled = true;
            }
        });
    });
}

// To start the quiz (generate the first question)
startQuiz.addEventListener('click', async (event) => {
    loader.style.display = 'flex';
    await getQuiz();
    loader.style.display = 'none';
    score = 0, count = 0;
    printedScore.innerText = 'Score: ' + score + ' / 10';
    loadQuestion();
    checkAnswer();
    // hiding the initial-content and displaying the mcq
    content.style.display = 'inline-block';
    titlebar.style.display = 'flex';
    initialContent.style.display = 'none';
    p2.style.display.innerText = '';
    p2.style.display = 'inline-block';
});

// button to go to initial content page of quiz
let restart = document.querySelector('.restart');
restart.addEventListener('click', (event) => {
    welcome.innerText = 'Welcome';
    count = 0;
    score = 0;
    printedScore.innerText = 'Score: ' + score + ' / 10';
    initialContent.style.display = 'flex';
    content.style.display = 'none';
    titlebar.style.display = 'none';
});

// .Button to get next questions (next button)
let next = document.querySelector('.next');
next.addEventListener('click', (event) => {
    if(clicked) {
        loadQuestion();
        checkAnswer();
        clicked = false;
    }
});
function showMsg(score, ele) {
    if(score == 10) {
        ele.innerText = '🌟 Amazing! You are a Space Weather Expert!';
    } else if(score == 0) {
        ele.innerText = '😮 Oops! Time to explore the Sun and its storms!';
    } else if(score >= 8) {
        ele.innerText = '👍 Great job! You really know your Sun stuff!';
    } else if (score >= 6) {
        ele.innerText = '🙂 Not bad! A little more practice and you will shine!';
    } else if(score >= 4) {
        ele.innerText = '🤔 Keep going! Learn more about solar phenomena!';
    } else if(score >= 1) {
        ele.innerText = '😅 Do not worry! The Sun still has secrets for you!';
    }
}

