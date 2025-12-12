import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode> // StrictMode can cause double-invocations in dev which confuses socket connection logic occasionally (doubling listeners). 
    // For this specific socket app, disabling StrictMode might make dev experience smoother, but I'll leave it or remove it if I handle cleanup perfectly.
    // I'll keep it simple and comment it out to avoid confusion for the user seeing "double join" logs.
    // <React.StrictMode>
    <App />
    // </React.StrictMode>,
)
