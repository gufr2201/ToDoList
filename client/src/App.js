import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDo from './pages/ToDo';
import AddEdit from './pages/AddEdit';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <ToastContainer position='top-center'/>
      
       <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route path="/todo" element={<ToDo/>}/>
        <Route path="/addTodo" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>

      
       </Routes>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
