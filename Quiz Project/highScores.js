const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);
highScoresList.innerHTML = highScores
.map( score => {
   return `<li class="high-score">${score.name} - ${score.score}</li>`;//double check 1st temporal literal username or name
})
.join("");