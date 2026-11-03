import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent unhandled WebSocket closure errors in AI Studio sandbox environment
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (msg.includes('WebSocket') || msg.includes('ws:')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
