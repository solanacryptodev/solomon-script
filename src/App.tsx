import { lazy } from 'solid-js';
import { Route, Router } from '@solidjs/router';

const Home = lazy(() => import('./routes/index'));
const Topics = lazy(() => import('./routes/topics/index'));
const About = lazy(() => import('./routes/about/index'));
const Members = lazy(() => import('./routes/members/index'));

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/topics" component={Topics} />
      <Route path="/about" component={About} />
      <Route path="/members" component={Members} />
    </Router>
  );
}

export default App;

