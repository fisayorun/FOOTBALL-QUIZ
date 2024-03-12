const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json")
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startPlay();
    })
    .catch(err => {
        console.error(err);
    });

// let imageSource = questions[2].image;
// let imageUrl = `"url(${imageSource})"`;
// document.body.style.backgroundImage = imageSource;
// console.log(imageUrl);
// $("body").css(
//     "background-image",`url(${questions[0].image})`
// )

// while i <10 {
 
//     switch(i)
     
//     case 0:
//             // load questions
//             // load picture
//             // use answer
//             break;
//     default:
//             // You have finished the quiz and you scored x
     
//     i++ 

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 18;

startPlay = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    console.log(availableQuestions)
    getNewQuestion();
};
//Lines 44-49 of code inspired by JQ


getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page 
        return window.location.assign("/WK6 JS PROJECT/Quiz Project/end.html");
    }
   
    questionCounter++;
    //progressText.innerText = questionCounter + "/" + MAX_QUESTIONS; ALT CODE
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; 
    // Update progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)*100}%`;
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    let imageSource = availableQuestions[questionIndex].image;
    let imageUrl = `"url(${imageSource})"`;
    document.body.style.backgroundImage = imageSource;
    console.log(imageUrl);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
     if(!acceptingAnswers) return;

     acceptingAnswers = false;
     const selectedChoice = e.target;
     const selectedAnswer = selectedChoice.dataset["number"];

     let classToApply = "incorrect";
      if (selectedAnswer == currentQuestion.answer) {
          classToApply = "correct";
      }

     // const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
     // console.log(classToApply); ALT CODE

     if(classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
     } /*Keeping track of score*/
    
     
     selectedChoice.parentElement.classList.add(classToApply);
     
     setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
  });
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

