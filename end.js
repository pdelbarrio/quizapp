const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const urldev = "http://localhost:3333/highscore";
const urlprod = "";

// Este fetch coge el array de Highscores dentro de una promesa y LO BORRA de la BD
let highscores; // Declare a global variable to store the highscores

async function fetchHighscores() {
  try {
    const response = await fetch(urldev);
    highscores = await response.json();
    // console.log("highscores inside fetch", highscores);
  } catch (error) {
    console.error(error);
  }
}
fetchHighscores();
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
// console.log("mostRecentScore", mostRecentScore);

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore1 = (e) => {
  e.preventDefault();

  const score = {
    score: Number(mostRecentScore), //get Mosrecentscore
    name: username.value,
  };

  console.log("score to push", score);
  console.log("highscores inside savehighscores function", highscores); // Access the highscores here
  // Perform manipulation with the highscores here
  const filteredScores = highscores.map(({ _id, ...rest }) => rest);
  console.log("array of filtered scores before push:", filteredScores);
  filteredScores.push(score);
  filteredScores.sort((a, b) => b.score - a.score);
  filteredScores.splice(MAX_HIGH_SCORES);
  console.log("array of highscores after push:", filteredScores);

  const postHighscore = async (info) => {
    try {
      const res = await fetch(urldev, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  postHighscore(filteredScores);

  window.location.assign("/");
};

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore, //get Mosrecentscore
    name: username.value,
  };
  console.log("score to push", score);
  //Hacer push al array de scores obtenido en el get
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  console.log("array of highscores after push:", highScores);
  //post highscores to route instead localstorage
  /*const postHighscore = async (info) => {
    try {
      const res = await fetch("http://localhost:3333/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  postHighscore(highScores);
  // localStorage.setItem("highScores", JSON.stringify(highScores));
*/
  window.location.assign("/");
};
