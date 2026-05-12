import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout'; // <-- Import the new file here!
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* The Resume Builder Page */}
          <Route path="/app" element={<AppLayout />} /> {/* <-- Use it here! */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;