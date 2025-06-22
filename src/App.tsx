import { Suspense } from 'solid-js';
import Navbar from './views/Navbar';
import Footer from './views/Footer';

export default function App(props: any) {
  return (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
          {props.children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

