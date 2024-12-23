//imports
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//imports - css
import './index.css'
//imports - pages
import App from './App.tsx'
import Home from './pages/Home.tsx';
import Error from './pages/Error.tsx';
import Profile from './pages/Profile.tsx';
import RecsPage from './pages/Recs.tsx';

//Router definition

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Profile',
        element: <Profile />,
      },
      {
        path: '/List',
        element: <RecsPage />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}