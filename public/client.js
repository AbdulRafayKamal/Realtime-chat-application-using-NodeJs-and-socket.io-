const socket = io()
//creating variable
let name;
//Using textarea id to get message
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

//saving name in variable
do {
    name = prompt('Please enter your name: ')
} while(!name)

//Adding Event listner to send message
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
//creating Send Message Function
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}
//Creating Append Message Function
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
//username and message
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

//To see new messages
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}