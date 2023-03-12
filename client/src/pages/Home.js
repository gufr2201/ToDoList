// import Home from './styles/Home.component.scss'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import './styles/Home.component.scss';
import {toast} from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await axios.get('http://localhost:5000/api/get');
        setData(response.data);
    };
    useEffect(() => {
        loadData();
    }, []);

    // const navigate = useNavigate();


    const deleteTodo = (id) => {
        if(
            window.confirm('Är du säker på att du vill ta bort aktiviteten?')
            ) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success('Aktivitet togs bort');
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{marginTop: "150px"}}>
        <Link to="addTodo">
        <button className='btn btn-todo'>Lägg till att göra</button>
        </Link>
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>Nummer</th>
                    <th style={{textAlign: "center"}}>Att göra</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.todo_task}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                    <button className='btn btn-edit'>Redigera</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteTodo(item.id)}>Ta bort</button>
                                <Link to={`/view/${item.id}`}>
                                    <button className='btn btn-view'>Visa</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>   
    )
}

export default Home;