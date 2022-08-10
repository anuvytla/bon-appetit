const signUpBtn = document.getElementById("mainSignUpBtn");
const orderOnlineBtn = document.getElementById("orderOnlineBtn");
const reserveTableBtn = document.getElementById("reserveTableBtn");
const logoutBtn = document.getElementById("signoutBtn");
const mainLoginBtn = document.getElementById("mainLoginBtn");
const profileBtn = document.getElementById("profileBtn");

signUpBtn?.addEventListener("click", async () => {
  console.log("Signup");
  window.location.href = "/signup";
});

orderOnlineBtn?.addEventListener("click", async () => {
  window.location.href = "/menu";
});

reserveTableBtn?.addEventListener("click", async () => {
  window.location.href = "/reservation";
});

mainLoginBtn?.addEventListener("click", async () => {
  window.location.href = "/login";
});

profileBtn?.addEventListener("click", async () => {
  window.location.href = "/";
});

logoutBtn?.addEventListener("click", async () => {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  } catch (error) {
    alert(error);
  }
});
