import './Crear_Partida.css'
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from "react-router-dom";

function Crear_Partida() {

  const {token, setToken} = useContext(AuthContext)
  const [codigo, setCodigo] = useState("");
  const [privado, setPrivado] = useState(true);
  const [numero_de_jugadores, setNumero_de_jugadores] = useState(0);
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  let config = {
    'method' : 'post',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/juegos/create`,
    'headers': {
      'Authorization' : `Bearer ${token}`
    },
    'data': {
      codigo,
      privado,
      numero_de_jugadores,
      nombre
    }
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    console.log("info sent")
    //Creamos Juego
    const response1 = await axios(config).then((response) => {

        console.log("Sent succesfully")
        console.log(response)

        return response;
    }).catch((error) => {
        console.log(error);
    });
    //nos unimos al juego que creamos
    config = {
      'method' : 'post',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/joinGame`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      },
      'data': {
        codigo
      }
    };
    console.log("joining game...")
    const response2 = await axios(config).then((response) => {
      console.log("joined succesfully");
      console.log(response);

      if (response.data.access_token){
        setToken(response.data.access_token);
      }

      navigate("/Sala_Espera")

      return response;
    }).catch((error) => {
      console.log(error);
  });

    console.log(response2);
}

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='formulario'>
            <label >Número de jugadores:</label>
            <input 
              type="numero_de_jugadores" 
              name="numero_de_jugadores" 
              value={numero_de_jugadores}
              onChange={e => setNumero_de_jugadores(e.target.value)} 
              className='input' 
              min="1" 
              max="4"
              required
            />
          </div>

          <div className='formulario'>
            <label >Nombre de la sala:</label>
            <input 
              type="nombre"
              name="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)} 
              className="input" 
              required
            />
          </div>

          <div className='formulario'>
            <label >¿Sala privada?</label>
            <select 
              type="privado"
              name="privado"
              value={privado}
              onChange={e => setPrivado(e.target.value === "yes")}
              className="input"
            >
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className='formulario'>
            <label >Codigo:</label>
            <input 
              type="codigo"
              name="codigo"
              value={codigo}
              onChange={e => setCodigo(e.target.value)} 
              className="input" 
              required
            />
          </div>

          <button className='boton' type="submit">Crear sala</button>
        </form>
      </div>
    );
  }


export default Crear_Partida;