var socket = io.connect('http://localhost:8080');
socket.emit('connection','bonjour');

socket.on('message', function(message) {
    alert('Le serveur a un message pour vous : ' + message);
})
socket.on('bienvenue', function(message) {
    alert('Le serveur vous souhaite la bienvenue : ' + message);
    socket.emit('message', 'Merci bien');
})
