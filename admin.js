const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
  window.location.href = "/login.html"; // redirect to login page
}
