const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const urldev = "http://localhost:3333/showhighscore";
const urlprod = "";

// Este fetch coge el array de Highscores dentro de una promesa y NO LO BORRA de la BD
async function fetchHighscores() {
  try {
    const response = await fetch(urldev);
    highscores = await response.json();

    highScoresList.innerHTML = highscores
      .map((score) => {
        return `<li class="high-score">${score.name} -  ${score.score}</li>`;
      })
      .join("");
  } catch (error) {
    console.error(error);
  }
}
fetchHighscores();
