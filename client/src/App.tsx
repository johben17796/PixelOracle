import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
function App() {
  //TODO: IMPLEMENT LIGHT/DARK
  return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;

 

