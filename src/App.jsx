import { lazy, Suspense } from 'solid-js';
import { Route } from '@solidjs/router';
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
        <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
          <Route path="/" component={Home} />
          <Route path="/topics" component={Topics} />
          <Route path="/about" component={About} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
