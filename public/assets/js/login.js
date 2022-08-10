const loginBtn = document.getElementById("loginBtn");
const loginUsernameInput = document.getElementById("loginUsernameInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");

loginBtn?.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  // checks to make sure username is not empty
  if (username.trim().length === 0) {
    alert("Please enter a valid username");
    return;
  }
  // checks that password is greater than 6 characters
  if (password.trim().length < 6) {
    alert("Please enter a valid password. Password must be 6 characters long.");
    return;
  }
  // console.log("HIIII");
  // posts the user input to the /api/logup endpoint
  try {
    // [TODO] remove after fixes in auth.js
    // const response = await fetch('/api/login')
    const response = await fetch("/auth/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(
      JSON.stringify({
        username,
        password,
      })
    );
    console.log(username, password);
    if(response.status == 200) {
      loginStatus = await response.json();
      if (loginStatus) {
        console.log("login status success");
        window.location.href = "/home";
      } else {
        console.log("login status fail");
        window.location.href = "/login";
      }
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    alert(error);
  }
});
