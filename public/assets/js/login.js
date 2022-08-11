// Selecting the UI elements
const loginBtn = document.getElementById("loginBtn");
const loginUsernameInput = document.getElementById("loginUsernameInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");

// Login button event listener
loginBtn?.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  // checks to make sure username is not empty
  if (username.trim().length === 0) {
    alert("Please enter a valid username");
    return;
  }
  // checks that password is greater than 8 characters
  if (password.trim().length < 8) {
    alert("Please enter a valid password. Password must be 6 characters long.");
    return;
  }

  // Post request sent to the backend for username and password validation
  try {
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
    
    // Rendering the appropriate page based on the username password validation
    if(response.status == 200) {
      loginStatus = await response.json();
      if (loginStatus) {
        
        window.location.href = "/home";
      } else {
        
        window.location.href = "/login";
      }
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    alert(error);
  }
});
