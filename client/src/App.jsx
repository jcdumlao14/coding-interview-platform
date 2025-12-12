import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Editor from './Editor';
import Terminal from './Terminal';
import { executeCode } from './utils/executor';

// Generate random room ID if none exists
const getRoomId = () => {
    const path = window.location.pathname.substring(1);
    if (path) return path;
    const randomId = Math.random().toString(36).substring(2, 8);
    window.history.pushState(null, '', `/${randomId}`);
    return randomId;
};

const socket = io('http://localhost:3000'); // Connect to backend within valid scope

function App() {
    const [roomId] = useState(getRoomId());
    const [code, setCode] = useState("// Loading...");
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    // Status
    const [isConnected, setIsConnected] = useState(socket.connected);

    // To prevent loop: only emit if change came from user (not from socket)
    // CodeMirror "onChange" event fires for both. We use a flag or simple comparison.
    // Ideally we can use a ref to track if an update is remote.
    const isRemoteUpdate = useRef(false);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to server');
            socket.emit('join-room', roomId);
        });

        socket.on('disconnect', () => setIsConnected(false));

        socket.on('code-update', (newCode) => {
            if (newCode !== code) {
                isRemoteUpdate.current = true;
                setCode(newCode);
                // Reset flag after a short delay or allow the Controlled component to handle it?
                // Actually with @uiw/react-codemirror, updating the "value" prop updates the editor.
                // We just need to make sure the *next* onChange execution knows it was remote.
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('code-update');
        };
    }, [roomId]);

    const handleCodeChange = (value, viewUpdate) => {
        if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
        }
        setCode(value);
        socket.emit('code-change', { roomId, code: value });
    };

    const handleRun = async () => {
        setIsRunning(true);
        const result = await executeCode(language, code);
        setOutput(result);
        setIsRunning(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            {/* Header */}
            <div className="glass-panel" style={{
                padding: '1rem 2rem',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <div>
                    <h1 className="glow-text" style={{ margin: 0, fontSize: '1.5rem' }}>CodeSync</h1>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Room: <span style={{ color: '#fff', fontWeight: 'bold' }}>{roomId}</span> •
                        Status: <span style={{ color: isConnected ? '#4ade80' : '#f87171' }}>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleCopyLink} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>Share Link</button>
                    <button onClick={handleRun} disabled={isRunning} style={{ minWidth: '100px' }}>
                        {isRunning ? 'Running...' : 'Run Code ▶'}
                    </button>
                </div>
            </div>

            {/* Main Editor Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1.5rem' }}>

                {/* Editor Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Language Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Language:</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                background: 'rgba(30, 41, 59, 0.7)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: '0.9rem',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                    </div>

                    <Editor
                        code={code}
                        onCodeChange={handleCodeChange}
                        language={language}
                    />
                </div>

                {/* Sidebar / Output */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                        <h3 style={{ marginTop: 0, fontSize: '1.1rem' }}>Instructions</h3>
                        <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                            1. Select a language <br />
                            2. Write your code <br />
                            3. Click "Run Code" to execute <br />
                            4. Share the URL to collaborate
                        </p>
                    </div>
                    <Terminal output={output} isLoading={isRunning} />
                </div>
            </div>
        </div>
    );
}

export default App;
