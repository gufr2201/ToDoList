import React, {useState, useEffect} from 'react';
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

    // useEffect(() => {
    //     axios.patch(`http://localhost:5000/api/patch/update:${id}`).then((res) => setState({ ...res.data[0] }))
    // }, [id]);
    // useEffect(() => {
    //     if (id) {
    //       axios.get(`http://localhost:5000/api/get/${id}`)
    //         .then(res => setState({ ...res.data[0] })) 
    //         .catch(err => console.log(err));
    //     }
    //   }, [id]);
      

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!todo_task) {
            toast.error('Var snäll och fyll i fältet innan du sparar.')
        }
        else{
            //Om aktiviteten inte har id är det en ny aktivitet som skapas.
           if (!id) { 
            axios.post('http://localhost:5000/api/post', {
                todo_task,
                username
                
            }, {
                withCredentials: true
            }).then(() => {
                setState({todo_task: ''});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success('Du har lagt till något att göra!');
        } else {
            //Om aktiviteten har ett id så uppdateras den.
            axios.patch(`http://localhost:5000/api/update/${id}`, { todo_task })
    .then(() => {
        setState({todo_task: ''});
    })
    .catch((err) => toast.error(err.response.data));
    toast.success('Du har nu uppdaterat aktiviteten');
 
                  }
        
}
            setTimeout(() => navigate('/todo'), 500);
        }
    // };

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
            // defaultValue={todo} 
            //value gör att det inte går att skriva i textrutan. defalultValue går att skriva men tolkas som att inget skrivits och felmeddelande om att man måste fylla i rutan kommer upp
            value={todo_task || ''}
            onChange={handleInputChange} 
            />
        
            <input type='submit' value={id ? 'Uppdatera' : 'Spara'} />
              <Link to='/addTodo'>
                <input type='button' value='Gå tillbaka'/>
              </Link>      

        </form>
        </div>
    );
    
    };

export default AddEdit;