const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

socket.on('message', message => {
        outputMessage(message);

        //Scroll to down

        chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const msg = e.target.elements.msg.value;
        socket.emit('chatMessage',msg);
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
});

//output to the dom on new message

function outputMessage(msg){
        const div = document.createElement('div');

        div.classList.add('message');

        div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
        <p class="text">
                ${msg.text}
        </p>`;

        document.querySelector('.chat-messages').appendChild(div);

}