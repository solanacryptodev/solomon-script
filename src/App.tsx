import { createSignal } from 'solid-js';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Home from './routes/index';
import Topics from './routes/topics/index';
import About from './routes/about/index';
import Members from './routes/members/index';

function App() {
  const [currentRoute, setCurrentRoute] = createSignal('home');

  const renderCurrentPage = () => {
    switch (currentRoute()) {
      case 'topics':
        return <Topics />;
      case 'about':
        return <About />;
      case 'members':
        return <Members />;
      default:
        return <Home />;
    }
  };

  return (
    <div class="h-screen flex flex-col bg-cream font-national-park">
      <header class="sticky top-0 z-50 flex-shrink-0">
        <Navbar setCurrentRoute={setCurrentRoute} currentRoute={currentRoute()} />
      </header>
      <main class="flex-1 overflow-y-auto">
        <div class="min-h-full">
          {renderCurrentPage()}
        </div>
      </main>
      <footer class="sticky bottom-0 z-50 flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

