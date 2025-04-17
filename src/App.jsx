import { lazy, Suspense } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import Navbar from './views/Navbar';
import Footer from './views/Footer';

const Home = lazy(() => import('./pages/Home'));
const Topics = lazy(() => import('./pages/Topics'));
const About = lazy(() => import('./pages/About'));

const App = () => (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
         <Router>
              <Route path="/" component={Home} />
              <Route path="/topics" component={Topics} />
              <Route path="/about" component={About} />
           </Router>
        </Suspense>
      </main>
      <Footer />
    </div>
  );

export default App