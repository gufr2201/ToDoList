import React, {useState, useEffect} from 'react';
import {useNavigate ,useParams, Link} from 'react-router-dom';
import './styles/AddEdit.component.scss';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const navigate = useNavigate();

  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usernameReg || !passwordReg) {
          toast.error('Var snäll och fyll i fälten för att registrera dig.')
        } else {
          axios.post('http://localhost:5000/authentication/register', {
            username: usernameReg, 
            password: passwordReg
          }).then((response)=> {
            console.log(response)
          })
          .catch((err) => toast.error(err.response.data));
          toast.success('Du har registrerat dig!');
          setTimeout(() => navigate('/'), 500);
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
                
                <label htmlFor='register'>Registrera</label>
                <input 
                type='text' 
                id='username' 
                name='username' 
                placeholder='Användarnamn'
                value={usernameReg}
                onChange={(e)=> {setUsernameReg(e.target.value)}} 
                />
                 <input 
                type='password' 
                id='password' 
                name='password' 
                placeholder='Lösenord'
                value={passwordReg}
                onChange={(e)=> {setPasswordReg(e.target.value)}} 
                
                />
                <button type='submit'>Registrera</button>
                {/* <button onClick={register}>Registrera</button> */}
                {/* <input type='submit' value={'Registrera'}/> */}
                  <Link to='/'>
                    <input type='button' value='Gå till login sidan'/>
                  </Link>      
    
            </form>
            </div>
);};
export default Register;

