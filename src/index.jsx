import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './styles/index.css';

render(() => (
  <Router root={<App />} />
), document.getElementById('root'));
