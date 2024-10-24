import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Root from './routes/Root.jsx'
import { AuthProvider } from './providers/AuthContext.jsx';
import './App.css';

function App() {

  useEffect(() => {
    //document.body.style.overflow = 'hidden'; // example style
    // Add more styles as needed
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
