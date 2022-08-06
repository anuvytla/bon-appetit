const loginBtn = document.getElementById('loginBtn');
const loginUsernameInput = document.getElementById('loginUsernameInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    // checks to make sure username is not empty
    if(username.trim().length === 0){
        alert('Please enter a valid username');
        return;
    }
    // checks that password is greater than 6 characters
    if(password.trim().length < 6){
        alert('Please enter a valid password. Password must be 6 characters long.');
        return;
    }
    console.log("HIIII");
    // posts the user input to the /api/logup endpoint
    try {
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     })
        // });

        // await response.json();
        // change user window to the /users endpoint
        console.log("going to reservations");
        window.location.href = '/reservation';
    } catch (error) {
        alert(error);
    }
});