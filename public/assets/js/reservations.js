
async function createReservation(event) {
    clearAlert();
    event.preventDefault();
    let formData = new FormData(document.getElementById('new-reservation'));
    var reservationData = {};
    formData.forEach((value, key) => reservationData[key] = value);
    var json = JSON.stringify(reservationData);
    try {
        let response = await fetch('/api/reservations', {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        });

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

$('#reservationDate').datepicker();

$('#reservationTime').timepicker({
    timeFormat: 'HH:mm',
    interval: 15,
    minTime: '09:00',
    maxTime: '21:00',
    dropdown: true,
    scrollbar: true
});

document.querySelector('#new-reservation').addEventListener('submit', createReservation);