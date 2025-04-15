import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Topics = lazy(() => import('./pages/Topics'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/topics" component={Topics} />
          <Route path="/about" component={About} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
