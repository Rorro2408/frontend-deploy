import './Unirse_Partida.css'
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from "react-router-dom";

function Unirse_Partida() {
  
  const {token, setToken} = useContext(AuthContext)
  const [codigo, setCodigo] = useState("");

  const navigate = useNavigate();

  const config = {
    'method' : 'post',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/joinGame`,
    'headers': {
      'Authorization' : `Bearer ${token}`
    },
    'data': {
      codigo
    }
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    console.log("info sent")

    const response = await axios(config).then((response) => {
        console.log("joined game");
        console.log(response);

        if (response.data.access_token){
          setToken(response.data.access_token);
        }

        navigate("/Sala_Espera");

        return response;
    }).catch((error) => {
      console.log(error);
    });

    console.log(response);



  };



    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='formulario_u'>
            <label >Codigo de la sala:</label>
            <input
              type="codigo"
              name="codigo"
              value={codigo}
              onChange={e => setCodigo(e.target.value)} 
              className="input" 
              required 
            />
          </div>
            <button className='boton' type="submit">Unirse a la Partida</button>
        </form>
        <button className='boton' type="submit">Partida Aleatoria</button>
      </div>
    );
  }


export default Unirse_Partida;

