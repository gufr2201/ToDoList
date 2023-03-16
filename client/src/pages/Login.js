import React, {useState, useEffect} from 'react';
import {useNavigate ,useParams, Link} from 'react-router-dom';
import './styles/AddEdit.component.scss';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
          toast.error('Var snäll och fyll i fälten för att logga in.')
        } else {
          axios.post('http://localhost:5000/authentication/login', {
            username: username, 
            password: password
          },{
            withCredentials: true
          }).then((response)=> {
            console.log(response)
           navigate('/todo');
          })
          .catch((err) => toast.error(err.response.data));
       
        }
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
                
                <label htmlFor='login'>Logga in</label>
                <input 
                type='text' 
                id='username' 
                name='username' 
                placeholder='Användarnamn'
                value={username}
                onChange={(e)=> {setUsername(e.target.value)}} 
                />
                 <input 
                type='password' 
                id='password' 
                name='password' 
                placeholder='Lösenord'
                value={password}
                onChange={(e)=> {setPassword(e.target.value)}} 
                
                />
                {/* <button onClick={register}></button> */}
                <input type='submit' value={'Logga in'} />
                  <Link to='/register'>
                    <input type='button' value='Registrera dig'/>
                  </Link>      
    
            </form>
            </div>
);

}


export default Login;