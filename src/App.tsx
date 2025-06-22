import { Suspense } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Home from './routes/index';
import Topics from './routes/topics/index';
import About from './routes/about/index';
import Members from './routes/members/index';

export default function App() {
  console.log('App component rendering...');
  
  return (
    <div class="min-h-screen flex flex-col bg-cream">
      <div class="bg-navy text-white p-4">
        <h1 class="text-2xl font-bold">Solomon's Web - Bible Exploration</h1>
      </div>
      <main class="flex-grow container mx-auto px-4 py-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Welcome to Solomon's Web</h2>
          <p class="text-gray-700">Search for Bible verses and get AI-powered analysis.</p>
          <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
            <Routes>
              <Route path="/" component={Home} />
              <Route path="/topics" component={Topics} />
              <Route path="/about" component={About} />
              <Route path="/members" component={Members} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

