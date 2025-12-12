import React from 'react';

const Terminal = ({ output, isLoading }) => {
    return (
        <div className="glass-panel" style={{
            height: '250px',
            marginTop: '1rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '0.5rem'
            }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' }}>CONSOLE OUTPUT</span>
                {isLoading && <span style={{ color: '#dbeafe' }}>Running...</span>}
            </div>
            <pre className="terminal-text" style={{
                flex: 1,
                overflowY: 'auto',
                margin: 0,
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: "'Fira Code', monospace"
            }}>
                {output || <span style={{ color: '#64748b' }}>// Output will appear here...</span>}
            </pre>
        </div>
    );
};

export default Terminal;
