import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import './App.css';

function App() {
  const [yaml, setYaml] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem('yaml-input');
    if (savedValue) {
      setYaml(savedValue);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <textarea
        id="yaml-input"
        placeholder="Paste your YAML template here"
        value={yaml}
        onChange={e => setYaml(e.target.value)}
      />
      <button onClick={() => localStorage.setItem('yaml-input', yaml)}>
        ya!
      </button>
    </div>
  );
}

export default App;