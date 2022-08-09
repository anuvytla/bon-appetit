const signupBtn = document.getElementById('signupBtn');
const signupUsernameInput = document.getElementById('signupUsernameInput');
const signupUseremailInput = document.getElementById('signupUseremailInput');
const signupUserphoneInput = document.getElementById('signupUserphoneInput');
const signupPasswordInput = document.getElementById('signupPasswordInput');

signupBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = signupUsernameInput.value;
    const email = signupUseremailInput.value;
    const phone = signupUserphoneInput.value;
    const password = signupPasswordInput.value;

    // checks to make sure username is not empty
    if(name.trim().length === 0){
        alert('Please enter a valid username');
        return;
    }
    // checks that password is greater than 6 characters
    if(password.trim().length < 6){
        alert('Please enter a valid password. Password must be 6 characters long.');
        return;
    }

    let emailregex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(!emailregex.test(email)){
        alert('Please enter a valid Email address.');
        return;
    }

    console.log(name,email,phone,password);
    // posts the user input to the /api/logup endpoint
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
            })
        });
        console.log(JSON.stringify({
            name,
            email,
            phone,
            password,
        }))
        console.log (email,password,name,phone);
        signupStatus = await response.json();
        if (signupStatus) {
            console.log("signup status success");
            window.location.href = '/home';
        } else {
            console.log("signup status fail");
            window.location.href = '/signup';
        }
       

        // await response.json();
        // change user window to the /users endpoint
        // console.log("going to reservations");
        // window.location.href = '/reservation';
    } catch (error) {
        alert(error);
    }
});
