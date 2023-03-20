// import Home from './styles/Home.component.scss'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import './styles/ToDo.component.scss';
import {toast} from 'react';
import axios from 'axios';

const ToDo = () => {
    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await axios.get('http://localhost:5000/todo/api/get', {
            
                withCredentials: true
              
        });
        setData(response.data);
    };
    useEffect(() => {
        loadData();
    }, []);

   

    const deleteTodo = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          axios.delete(`http://localhost:5000/todo/api/remove/${id}`)
            .then(() => {
              toast.success('Item deleted successfully');
              loadData(); 

            })
            .catch((error) => {
              console.error(error);
              toast.error('Failed to delete item');
            });
        }
      };
      

 

    return (
        <div style={{marginTop: "150px"}}>
        <Link to="/addTodo">
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
                            
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>   
    )
}

export default ToDo;