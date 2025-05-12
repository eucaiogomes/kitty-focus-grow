
import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingCatExtension from './components/FloatingCatExtension';
import './index.css';

// Criar um elemento para montar nossa aplicação React
const mountElement = document.createElement('div');
mountElement.id = 'foco-gatinho-extension-root';
document.body.appendChild(mountElement);

// Inicializar a aplicação React
createRoot(mountElement).render(<FloatingCatExtension />);
