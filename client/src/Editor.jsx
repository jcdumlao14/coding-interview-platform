import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';

const Editor = ({ code, onCodeChange, language }) => {

    const extensions = useMemo(() => {
        if (language === 'python') {
            return [python()];
        }
        return [javascript({ jsx: true })];
    }, [language]);

    return (
        <div className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CodeMirror
                value={code}
                height="500px"
                theme={dracula}
                extensions={extensions}
                onChange={onCodeChange}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                }}
                style={{ fontSize: '15px' }}
            />
        </div>
    );
};

export default Editor;
