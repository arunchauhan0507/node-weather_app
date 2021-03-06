console.log('App js javascript file from js folder');
// let url = 'http://puzzle.mead.io/puzzle';
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    // console.log(location);
    // let url = 'http://localhost:3000/weather?address='+location;

    fetch('/weather?address='+location).then((res) => res.json())
        .then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = ''
            }else{
                console.log(data.location);
                console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                
            }
    })
})