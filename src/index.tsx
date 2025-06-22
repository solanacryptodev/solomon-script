/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';

console.log('Starting SolidJS app...');

const root = document.getElementById('root');
console.log('Root element:', root);

if (!root) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; background: #f3eac0;"><h1>Error: Root element not found</h1></div>';
} else {
  console.log('Rendering app...');
  try {
    render(() => App(), root);
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    root.innerHTML = '<div style="padding: 20px;"><h1>Error rendering app</h1><p>' + error.message + '</p></div>';
  }
}