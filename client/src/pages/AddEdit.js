import React, {useState} from 'react';
import {useNavigate ,useParams, Link} from 'react-router-dom';
import './styles/AddEdit.component.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    todo_task: ''
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    
    const {todo_task, username} = state;

    const navigate = useNavigate();

    const { id } = useParams();   

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!todo_task) {
            toast.error('Var snäll och fyll i fältet innan du sparar.')
        }
        else{
            //Om aktiviteten inte har id är det en ny aktivitet som skapas.
           if (!id) { 
            axios.post('http://localhost:5000/todo/api/post', {
                todo_task,
                username
                
            }, {
                withCredentials: true
            }).then(() => {
                setState({todo_task: ''});
            })
           
        } else {
            //Om aktiviteten har ett id så uppdateras den.
            axios.patch(`http://localhost:5000/todo/api/update/${id}`, { todo_task })
    .then(() => {
        setState({todo_task: ''});
    })
  
    
}

setTimeout(() => navigate('/todo'), 500);

        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value });
    }; 

    return (
        <div style={{marginTop: '100px'}}>
        <form style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: ' 400px',
            alignContent: 'center'
        }}
        onSubmit={handleSubmit}
        >
            
            <label htmlFor='todo_task'>Att göra</label>
            <input 
            type='text' 
            id='todo_task' 
            name='todo_task' 
            placeholder='Vad har du att göra?'
            value={todo_task || ''}
            onChange={handleInputChange} 
            />
        
            <input type='submit' value={id ? 'Uppdatera existerande aktivitet' : 'Spara ny aktivitet'} />
              <Link to='/todo'>
                <input type='button' value='Gå tillbaka'/>
              </Link>      

        </form>
        </div>
    );
    
    };

export default AddEdit;