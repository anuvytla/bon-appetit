const signUpBtn = document.getElementById("mainSignUpBtn");
const viewMenuBtn = document.getElementById("viewMenuBtn");
const reserveTableBtn = document.getElementById("reserveTableBtn");
const logoutBtn = document.getElementById('signoutBtn');

signUpBtn?.addEventListener("click", async () => {
  console.log("Signup");
  window.location.href = "/signup";
});

viewMenuBtn?.addEventListener("click", async () => {
  window.location.href = "/menu";
});

reserveTableBtn?.addEventListener("click", async () => {
  window.location.href = "/reservation";
});

logoutBtn?.addEventListener("click", async () => { 
  try {        
    const response = await fetch('/auth/logout',{
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

// function updateReservation(event) {
//   event.preventDefault();
//   let formData = new FormData(document.getElementById('new-reservation'));
//   var reservationData = {};
//   reservationData['customerID'] = '1066b85c-d35b-45f4-8731-759ec69e4130';
//   formData.forEach((value, key) => reservationData[key] = value);
//   var json = JSON.stringify(reservationData);
//   fetch('/api/reservations', {
//       method: 'POST',
//       body: json,
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   }).then(function(response) {
//       console.log(response);
//   }).catch(function(err){
//       console.log(err);
//   });
// }