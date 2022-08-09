const signUpBtn = document.getElementById("mainSignUpBtn");
const orderOnlineBtn = document.getElementById("orderOnlineBtn");
const reserveTableBtn = document.getElementById("reserveTableBtn");
const logoutBtn = document.getElementById('signoutBtn');
const mainLoginBtn = document.getElementById('mainLoginBtn');

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

logoutBtn?.addEventListener("click", async () => { 
  try {        
    const response = await fetch('/api/logout',{
      method: 'POST',
    })    
    // no response from backend and it already redirects
    //  await response.json();  
    // TODO: how to use redirect from backend in front end
     
   window.location.href = '/';
} catch (error) {
    alert(error);
} 
});