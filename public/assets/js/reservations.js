
async function createReservation(event) {
    // clear any previous alerts.
    clearAlert();
    // prevent the page from reloading.
    event.preventDefault();
    // get the formdata and convert into key-value pair.
    let formData = new FormData(document.getElementById('new-reservation'));
    var reservationData = {};
    formData.forEach((value, key) => reservationData[key] = value);
    var json = JSON.stringify(reservationData);
    try {
        // POST request to create a new reservation.
        let response = await fetch('/api/reservations', {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Handle the response and alert the user of the reservation status.
        if(response.status === 200) {
            let reservation = response.json();
            $("#alert-text").html("Your reservation is confirmed!!");
            $('.alert').addClass('alert-success');
            $('#new-reservation')[0].reset();
        }else if (response.status = 403) {
            $("#alert-text").html("Reservations are full at this time");
            $('.alert').addClass('alert-warning');
        }else {
            $("#alert-text").html("Error occurred. Please try again");
            $('.alert').addClass('alert-danger');
        }
        $('.alert').show();
    } catch (error) {
        $("#alert-text").html("Error occurred. Please try again");
        $('.alert').addClass('alert-danger');
        $('.alert').show();
    }
}

function clearAlert() {
    $('.alert').hide();
    $('.alert').removeClass('alert-danger').removeClass('alert-warning').removeClass('alert-success');
}

clearAlert();

// initialize reservation date input to use jquery date picker.
$('#reservationDate').datepicker();

// initialize reservation time input to use jquery time picker.
$('#reservationTime').timepicker({
    timeFormat: 'HH:mm',
    interval: 15,
    minTime: '09:00',
    maxTime: '21:00',
    dropdown: true,
    scrollbar: true
});

// call createReservation on submitting the form.
document.querySelector('#new-reservation').addEventListener('submit', createReservation);