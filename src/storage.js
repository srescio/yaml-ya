export function save(name, yaml, replace, repeat) {
    let savedTemplates = JSON.parse(localStorage.getItem('yaml-templates')) || [];

    let index = savedTemplates.findIndex(template => template.name === name);

    if (index !== -1) {
        // If template already exist, replace it
        savedTemplates[index] = { name, yaml, replace, repeat };
    } else {
        // Otherwise, add new
        savedTemplates.push({ name, yaml, replace, repeat });
    }

    localStorage.setItem('yaml-templates', JSON.stringify(savedTemplates));
    localStorage.setItem('yaml-last', JSON.stringify(name));
}

export function loadPreselectedTemplate() {
    return localStorage.getItem('yaml-last') || '';
}

export function loadTemplates() {
    return JSON.parse(localStorage.getItem('yaml-templates')) || [];
}

export function exportJson() {
    const savedTemplates = loadTemplates();
    const indentedJson = JSON.stringify(savedTemplates, null, 2);
    const blob = new Blob([indentedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const fileName = `yaml-templates_${year}-${month}-${day}.json`;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}


export function importJson() {
  // Crea un input di tipo file
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Quando l'utente seleziona un file, leggi il file e analizzalo come JSON
  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const json = JSON.parse(event.target.result);
          // Salva il JSON in yaml-templates
          localStorage.setItem('yaml-templates', JSON.stringify(json));
        } catch (error) {
          console.error('Errore durante l\'analisi del JSON', error);
        }
      };
      reader.readAsText(file);
    }
  });

  // Triggera un click sull'input del file per aprire il file chooser
  fileInput.click();
}