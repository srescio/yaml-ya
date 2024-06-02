import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import './App.css';

function App() {
  const [yaml, setYaml] = useState('');
  const [ya, setYa] = useState('');
  const [replace, setReplace] = useState('$');
  const [repeat, setRepeat] = useState('2');

  function process() {
    localStorage.setItem('yaml-input', yaml);
    localStorage.setItem('yaml-replace', replace);
    localStorage.setItem('yaml-repeat', repeat);

    let tempYa = '';

    for (let i = 1; i <= parseInt(repeat); i++) {
      tempYa += yaml.replace(new RegExp('\\' + replace, 'g'), i) + '\n';
    }

    setYa(tempYa);
    
    try {
      navigator.clipboard.writeText(tempYa);
    } catch (err) {
      console.error('Could not copy to clipboard', err);
    }
  }

  useEffect(() => {
    const savedYaml = localStorage.getItem('yaml-input');
    savedYaml && setYaml(savedYaml);

    const savedReplace = localStorage.getItem('yaml-replace');
    savedReplace && setReplace(savedReplace);

    const savedRepeat = localStorage.getItem('yaml-repeat');
    savedRepeat && setRepeat(savedRepeat);
  }, []);

  return (
    <div className="App">
      <Header />
      <section id="yaml-options">
        <label>Replace:
          <input type="text" name="yaml-replace" value={replace} onChange={e => setReplace(e.target.value)} />
        </label>
        <label>Repeat:
          <input type="number" name="yaml-repeat" value={repeat} onChange={e => setRepeat(e.target.value)} />
        </label>
      </section>
      <textarea
        id="yaml-input"
        placeholder="Paste your YAML template here"
        value={yaml}
        onChange={e => setYaml(e.target.value)}
      />
      <button onClick={process}>
        ya!
      </button>

      {ya && (
        <pre>{ya}</pre>
      )}
    </div>
  );
}

export default App;