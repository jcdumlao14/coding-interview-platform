// Basic executor logic

export const executeCode = async (language, code) => {
    if (!code) return "";

    if (language === 'javascript') {
        return executeJavaScript(code);
    } else if (language === 'python') {
        return await executePython(code);
    }
    return "Unsupported language";
};

const executeJavaScript = (code) => {
    let logs = [];
    // Mock console to capture output
    const originalConsole = console.log;
    const mockConsole = {
        log: (...args) => {
            logs.push(args.map(a =>
                typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' '));
            // originalConsole(...args); // Optional: keep logging to devtools
        },
        error: (...args) => logs.push("Error: " + args.join(' ')),
        warn: (...args) => logs.push("Warn: " + args.join(' '))
    };

    try {
        // We create a function to limit scope slightly, though it's still eval
        const run = new Function('console', code);
        const result = run(mockConsole);

        if (result !== undefined) {
            logs.push(String(result));
        }
        return logs.join('\n');
    } catch (err) {
        return err.toString();
    }
};

let pyodideInstance = null;
let pyodideLoadingPromise = null;

const loadPyodideDynamic = async () => {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoadingPromise) return pyodideLoadingPromise;

    pyodideLoadingPromise = new Promise((resolve, reject) => {
        // If already loaded via script tag
        if (window.loadPyodide) {
            window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
            }).then(resolve).catch(reject);
            return;
        }

        // Dynamically inject script
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.onload = async () => {
            try {
                const pyodide = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
                });
                resolve(pyodide);
            } catch (err) {
                reject(err);
            }
        };
        script.onerror = (err) => reject(new Error("Failed to load Pyodide script: " + err));
        document.body.appendChild(script);
    });

    try {
        pyodideInstance = await pyodideLoadingPromise;
        return pyodideInstance;
    } catch (err) {
        pyodideLoadingPromise = null; // Reset on failure
        throw err;
    }
};

const executePython = async (code) => {
    try {
        const pyodide = await loadPyodideDynamic();

        // Reset output capture
        let logs = [];
        pyodide.setStdout({ batched: (msg) => logs.push(msg) });
        pyodide.setStderr({ batched: (msg) => logs.push("Error: " + msg) });

        await pyodide.runPythonAsync(code);
        return logs.join('\n');

    } catch (err) {
        return "Execution Error: " + err.toString();
    }
};
