import React  from 'react'
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './mainrouter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () =>
(
    <BrowserRouter>
       <MainRouter />
       <ToastContainer />
    </BrowserRouter>
);
export default App;
