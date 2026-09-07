/**
 * TruthLens AI - Frontend Entrypoint
 * 
 * This file boots the React single-page application (SPA).
 * It mounts the root <App /> component into the DOM container element (#root)
 * using React 19's `createRoot` API wrapped with <StrictMode> for development checks.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize the root React DOM node and render the primary application tree
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

