const express = require('express');
const {
    Server
} = require('ws');


const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

var toende = {
    "hp": 0
}
let id = 1;

players = [];

wss.on('connection', function connection(ws) {
    console.log(`A new client connected...`);
    ws.send('sup!')

    ws.on('message', function incomming(message) {
        console.log('received: %s', message);
        if (message.startsWith('!!')) {
            console.log(true);
        }
        if (message.startsWith('user:')) {
            message = message.split(" ");
            players.push({
                "name": message[1],
                "id": id
            });
            ws.send(`id: ${id}`);
            id++;
            toende.hp += 25;
            console.log(players);
        } else if (message.startsWith('damage: ')) {
            message = message.split(" ");
            damage(message[3], message[1], ws);
        }
    });
});
