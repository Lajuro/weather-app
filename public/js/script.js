const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = "";

    e.preventDefault();
    fetch(`/weather?address=${weatherForm.address.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.innerHTML = data.error;
                messageTwo.innerHTML = "";
            } else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast;
            }
        });
    });
});