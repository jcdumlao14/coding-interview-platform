const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity in this MVP
        methods: ["GET", "POST"]
    }
});

// In-memory store for room code state
// Map<roomId, code>
const roomState = new Map();

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);

        // Send existing code if available
        if (roomState.has(roomId)) {
            socket.emit('code-update', roomState.get(roomId));
        }
    });

    socket.on('code-change', ({ roomId, code }) => {
        // Update state
        roomState.set(roomId, code);
        // Broadcast to everyone else in the room
        socket.to(roomId).emit('code-update', code);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
