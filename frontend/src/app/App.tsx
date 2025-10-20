import { Provider } from 'react-redux';
import './App.css';
import store from './storage/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../components/pages/HomePage/HomePage';
import LinksPage from '../components/pages/LinksPage/LinksPage';
import AudiencePage from '../components/pages/AudiencePage/AudiencePage';
import NotFoundPage from '../components/pages/NotFoundPage/NotFoundPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/links', element: <LinksPage /> },
  { path: '/links/:id', element: <AudiencePage /> },
  { path: '*', element: <NotFoundPage /> },
];

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AppLayout>
            <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
