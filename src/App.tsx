import { Suspense } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Test from './test';

export default function App() {
  return (
    <div class="min-h-screen flex flex-col bg-cream">
      <h1 class="text-3xl text-navy p-4">Solomon's Web - Bible Exploration</h1>
      <main class="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" component={Test} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

