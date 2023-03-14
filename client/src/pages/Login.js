import React, {useState, useEffect} from 'react';
import {useNavigate ,useParams, Link} from 'react-router-dom';
import './styles/AddEdit.component.scss';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    // const login = () => {
    //     axios.post('http://localhost:5000/login', {
    //     username: username, 
    //     password: password
    // }).then((response)=> {
    //     console.log(response)
    // }) 
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
          toast.error('Var snäll och fyll i fälten för att registrera dig.')
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
// const initialState = {
//     username: '',
//     password: ''
// };

// const RegisterController = () => {
//     const [state, setState] = useState(initialState);
    
//     const {username, password} = state;

//     const navigate = useNavigate();

//     const { user_id } = useParams();

//     // useEffect(() => {
//     //     axios.patch(`http://localhost:5000/api/patch/update:${id}`).then((res) => setState({ ...res.data[0] }))
//     // }, [id]);
//     useEffect(() => {
//         if (user_id) {
//           axios.get(`http://localhost:5000/api/get/${user_id}`)
//             .then(res => setState({ ...res.data[0] })) 
//             .catch(err => console.log(err));
//         }
//       }, [user_id]);
      


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(!username && !password) {
//             toast.error('Var snäll och fyll i fälten innan du registrerar dig.')
//         }
//         else{
//             //Om aktiviteten inte har id är det en ny aktivitet som skapas.
//            if (!id) { 
//             axios.post('http://localhost:5000/api/post', {
//                 username,
//                 password
//             }).then(() => {
//                 setState({todo_task: ''});
//             })
//             .catch((err) => toast.error(err.response.data));
//             toast.success('Du har lagt till något att göra!');
//         } 
// }
//             setTimeout(() => navigate('/'), 500);
//         }
//     // };

//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         setState({...state, [name]: value });
//     }; 

//     return (
//         <div style={{marginTop: '100px'}}>
//         <form style={{
//             margin: 'auto',
//             padding: '15px',
//             maxWidth: ' 400px',
//             alignContent: 'center'
//         }}
//         onSubmit={handleSubmit}
//         >
            
//             <label htmlFor='register'>Registrera</label>
//             <input 
//             type='text' 
//             id='username' 
//             name='username' 
//             placeholder='Användarnamn'
//             // defaultValue={todo} 
//             //value gör att det inte går att skriva i textrutan. defalultValue går att skriva men tolkas som att inget skrivits och felmeddelande om att man måste fylla i rutan kommer upp
//             value={username || ''}
//             onChange={handleInputChange} 
//             />
//              <input 
//             type='text' 
//             id='password' 
//             name='password' 
//             placeholder='Lösenord'
//             // defaultValue={todo} 
//             //value gör att det inte går att skriva i textrutan. defalultValue går att skriva men tolkas som att inget skrivits och felmeddelande om att man måste fylla i rutan kommer upp
//             value={password || ''}
//             onChange={handleInputChange} 
//             />
        
//             <input type='submit' value={'Registrera'} />
//               <Link to='/'>
//                 <input type='button' value='Gå till login sidan'/>
//               </Link>      

//         </form>
//         </div>
//     );
    
//     };

export default Login;