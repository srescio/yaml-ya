import React, { createContext, useContext, useReducer } from 'react';
import { loadTemplates, loadPreselectedTemplate, saveSelectedTemplate, saveTemplates } from '../storage';

const YamlYaContext = createContext();

export function YamlYaContextProvider({ children }) {

    function yamlYaReducer(state, newState) {
        if (newState.reset) {
            localStorage.setItem('yaml-last', '');

            return { ...initialState };
        }

        saveSelectedTemplate(newState?.selectedTemplate);
        saveTemplates(newState?.savedTemplates)

        return { ...state, ...newState };
    }

    const savedTemplates = loadTemplates();
    const selectedTemplate = loadPreselectedTemplate();
    const selected = savedTemplates.find(template => template.name === selectedTemplate);
    
    const initialState = {
        yaml: selected?.yaml || '',
        ya: '',
        name: selected?.name || 'yaml_tpl',
        replace: selected?.replace || '$',
        repeat: selected?.repeat || '2',
        savedTemplates,
        selectedTemplate
    };

    const [state, dispatch] = useReducer(yamlYaReducer, initialState);

    const value = { state, dispatch };

    return <YamlYaContext.Provider value={value}>{children}</YamlYaContext.Provider>
}

export default function useYamlYaContext() {
    const yamlYaContext = useContext(YamlYaContext);
    if (!yamlYaContext) {
        throw new Error('useYamlYaContext must be used within a YamlYaContextProvider');
    }
    return yamlYaContext;
}