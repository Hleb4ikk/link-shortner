import { Provider } from 'react-redux';
import './App.css';
import store from './storage/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element="Home Page"></Route>
            <Route path="/links/:id" element="Link Page" />
            <Route path="/links" element="User's links" />
            <Route path="/account" element="User's info" />
            <Route path="*" element="Not Found" />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
