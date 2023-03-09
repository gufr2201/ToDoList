import React, {useState, useEffect} from 'react';
import {useNavigate ,useParams, Link} from 'react-router-dom';
import './styles/AddEdit.component.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    todo: ''
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {todo} = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!todo) {
            toast.error('Var snäll och fyll i fältet innan du sparar.')
        }
        else{
            axios.post('http://localhost:5000/api/post', {
                todo
            }).then(() => {
                setState({todo: ''});
            }).catch((err) => toast.error(err.response.data));
            setTimeout(() => navigate.push('/'), 500);
        }
    };

    const handleInputChange = (e) => {
        const {todo, value} = e.target;
        setState({...state, [todo]: value });
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
            
            <label htmlFor='todo'>Att göra</label>
            <input 
            type='text' 
            id='todo' 
            name='todo' 
            placeholder='Vad har du att göra?'
            // defaultValue={todo} 
            value={todo || ''}
            onChange={(e) => handleInputChange(e.target.value)} 
            />
        
            <input type='submit' value='Spara' />
              <Link to='/'>
                <input type='button' value='Gå tillbaka'/>
              </Link>      

        </form>
        </div>
    )
}

export default AddEdit;