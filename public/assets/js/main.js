const signUpBtn = document.getElementById("mainSignUpBtn");
const viewMenuBtn = document.getElementById("viewMenuBtn");
const reserveTableBtn = document.getElementById("reserveTableBtn");

signUpBtn.addEventListener("click", async () => {
  console.log("Signup");
  window.location.href = "/signup";
});

viewMenuBtn.addEventListener("click", async () => {
  window.location.href = "/menu";
});

reserveTableBtn.addEventListener("click", async () => {
  window.location.href = "/reservation";
});
