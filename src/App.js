import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainComponent from './components/MainComponent';
import { Provider } from 'react-redux';
import myStore from './redux/store';
import ErrorBoundary from "./components/error/ErrorBoundary"
import Error404 from './components/error/Error404';

function App() {
  
  return (
    <div className="App">
      <Provider store={myStore}>
        <BrowserRouter>
          <ErrorBoundary fallback={<Error404 />}>
            <MainComponent />
          </ErrorBoundary>
            
        </BrowserRouter>
      </Provider>
      
      
    </div>
  );
}

export default App;
