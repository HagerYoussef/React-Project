import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import {QueryClient} from 'react-query';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';   
import store from './components/Store.js';   
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ReactQueryDevtools,ReactQueryDevtoolsPanel} from 'react-query/devtools';
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient= new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>
    <ReactQueryDevtools></ReactQueryDevtools>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

