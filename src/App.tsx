import { Suspense } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Home from './routes/index';
import Topics from './routes/topics/index';
import About from './routes/about/index';
import Members from './routes/members/index';

export default function App() {
  return (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/topics" component={Topics} />
            <Route path="/about" component={About} />
            <Route path="/members" component={Members} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

