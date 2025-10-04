import { Provider } from 'react-redux';
import './App.css';
import store from './storage/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../components/pages/HomePage/HomePage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/links/:id', element: 'Link Id' },
  { path: '/links', element: 'Links' },
  { path: '/account', element: 'Account' },
  { path: '/*', element: 'Not Found' },
];

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, element }, index) =>
              !['/'].includes(path) ? (
                <Route
                  key={index}
                  path={path}
                  element={<AppLayout>{element}</AppLayout>}
                />
              ) : (
                <Route key={index} path={path} element={element} />
              ),
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
