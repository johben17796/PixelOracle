import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
function App() {
//TODO: IMPLEMENT LIGHT/DARK
  return (
    <>
      <header>
        <Header />
      </header>
      <div className='bottomFlex'>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      </div>
    </>
  )
}

export default App;

