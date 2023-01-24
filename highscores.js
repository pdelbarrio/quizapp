const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

async function getHighscores() {
  let loadedHighscores;
  loadedHighscores = await fetch("http://localhost:3333/highscore").then(
    (res) => res.json()
  );
  return loadedHighscores
    .map((score) => {
      return `<li class="high-score">${score.name} -  ${score.score}</li>`;
    })
    .join("");
}

console.log(getHighscores());

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} -  ${score.score}</li>`;
  })
  .join("");
