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
    <div class="min-h-screen flex flex-col bg-cream font-national-park">
      <Navbar setCurrentRoute={setCurrentRoute} currentRoute={currentRoute()} />
      <main class="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;

