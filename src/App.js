import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import useYamlYaContext from './Components/Context'
import { exportJson, importJson } from './storage';

function App() {
  const { state: {
    yaml,
    ya,
    name,
    replace,
    repeat,
    savedTemplates,
    selectedTemplate
  }, dispatch } = useYamlYaContext();


  function reset() {
    localStorage.setItem('yaml-last', '');

    dispatch({
      reset: true
    });
  }

  function process() {
    let tempYa = '';

    for (let i = 1; i <= parseInt(repeat); i++) {
      tempYa += yaml.replace(new RegExp('\\' + replace, 'g'), i) + '\n';
    }

    dispatch({
      savedTemplates: [...savedTemplates, { name, yaml, replace, repeat }],
      selectedTemplate: name,
      ya: tempYa
    });

    try {
      navigator.clipboard.writeText(tempYa);
    } catch (err) {
      console.error('Could not copy to clipboard', err);
    }
  }

  function deleteTemplate() {
    const newTemplates = savedTemplates.filter(template => template.name !== selectedTemplate);
    
    dispatch({ savedTemplates: newTemplates});
    localStorage.setItem('yaml-last', '');
    localStorage.setItem('yaml-templates', JSON.stringify(newTemplates));
    reset();
  }

  return (
    <div className="App">
      <Header />
      {savedTemplates && savedTemplates.length > 0 && (
        <section id="saved-templates" className="yaml-horizontal-ctas">
          <label>Templates:
            <select
              value={selectedTemplate}
              onChange={e => {
                const selectedTemplateValue = e.target.value;
                const selected = savedTemplates.find(template => template.name === selectedTemplateValue);
                if (selected) {
                  localStorage.setItem('yaml-last', selectedTemplateValue);
                  dispatch({
                    selectedTemplate: selectedTemplateValue,
                    yaml: selected.yaml,
                    name: selected.name,
                    replace: selected.replace,
                    repeat: selected.repeat
                  });
                } else {
                  reset();
                }
              }}
            >
              <option value="">Select template</option>
              {savedTemplates.map(template => (
                <option key={template.name} value={template.name}>{template.name}</option>
              ))}
            </select>
            {console.log('selectedTemplate', selectedTemplate)}
          </label>
          {selectedTemplate && (
            <button onClick={deleteTemplate}>
              🗑️ Delete {name}
            </button>
          )}
          <button onClick={exportJson}>💾 Export all</button>
        </section>
      )}
      <button onClick={importJson}>⬇️ Import</button>
      <section id="yaml-options">
        <label>Name:
          <input type="text" name="yaml-name" value={name} onChange={e => dispatch({ name: e.target.value })} />
        </label>
        <label>Replace:
          <input type="text" name="yaml-replace" value={replace} onChange={e => dispatch({ replace: e.target.value })} />
        </label>
        <label>Repeat:
          <input type="number" name="yaml-repeat" value={repeat} onChange={e => dispatch({ repeat: e.target.value })} />
        </label>
      </section>
      <textarea
        id="yaml-input"
        placeholder="Paste your YAML template here"
        value={yaml}
        onChange={e => dispatch({ yaml: e.target.value })}
      />
      <section className='yaml-horizontal-ctas'>
        <button onClick={process} disabled={!yaml || !name || !repeat || !replace}>🚀 ya!</button>
        <button onClick={reset}>🔄 Reset</button>
      </section>
      {ya && (
        <pre>{ya}</pre>
      )}
      <Footer />
    </div>
  );
}

export default App;