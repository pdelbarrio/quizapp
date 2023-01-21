const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
  window.location.href = "/login.html"; // redirect to login page
}

submitForm = () => {
  let category = document.getElementById("category").value;
  let question = document.getElementById("question").value;
  let correctanswer = document.getElementById("correctanswer").value;
  let incorrectanswer1 = document.getElementById("incorrectanswer1").value;
  let incorrectanswer2 = document.getElementById("incorrectanswer2").value;
  let incorrectanswer3 = document.getElementById("incorrectanswer3").value;

  console.log(
    category,
    question,
    correctanswer,
    incorrectanswer1,
    incorrectanswer2,
    incorrectanswer3
  );
  fetch("http://localhost:3333/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
      category: category,
      correct_answer: correctanswer,
      incorrect_answers: [incorrectanswer1, incorrectanswer2, incorrectanswer3],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      if (data) {
        alert("Question added");
      } else {
        alert("Problem adding question");
      }
    })
    .catch((error) => console.error(error));
};
