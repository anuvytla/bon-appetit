function createReservation(event) {
    event.preventDefault();
    let formData = new FormData(document.getElementById('new-reservation'));
    var reservationData = {};
    reservationData['customerID'] = '1066b85c-d35b-45f4-8731-759ec69e4130';
    formData.forEach((value, key) => reservationData[key] = value);
    var json = JSON.stringify(reservationData);
    fetch('/api/reservations', {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        console.log(response);
    }).catch(function(err){
        console.log(err);
    });
}

document.querySelector('#new-reservation').addEventListener('submit', createReservation);