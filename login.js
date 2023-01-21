submitForm = () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  fetch("https://quiz-api-a8rf.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isAdmin) {
        window.sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/admin.html";
      } else {
        alert("Access denied");
      }
    })
    .catch((error) => console.error(error));
};
