import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './standalone.css';
import './styles.css';
import './layout/layout.css';
import './layout/drawer.css';
import './layout/footer.css';

createRoot(document.getElementById('root')).render(<App />);
