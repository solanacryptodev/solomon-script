/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';

console.log('Starting SolidJS app...');

const root = document.getElementById('root');
console.log('Root element:', root);

if (!root) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; background: #f3eac0;"><h1>Error: Root element not found</h1></div>';
} else {
  console.log('Rendering app...');
  render(() => (
    <Router>
      <App />
    </Router>
  ), root);
  console.log('App rendered successfully');
}