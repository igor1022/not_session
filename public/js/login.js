let form = document.querySelector('.form');

const send = async(ev) => {
    ev.preventDefault();
    var sendForm = new FormData(form);
    const result = await axios.post('/login', sendForm);
} 

form.addEventListener('submit', (ev) => {send(ev)});

