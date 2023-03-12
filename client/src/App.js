import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <ToastContainer position='top-center'/>
      
       <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/addTodo" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>

      
       </Routes>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
