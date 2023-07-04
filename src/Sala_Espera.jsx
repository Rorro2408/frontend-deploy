import './Sala_eespera.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from "react-router-dom";

function SalaEspera() {
    const {token} = useContext(AuthContext);
    const [players, setPlayers] = useState([]);

    const navigate = useNavigate();

    const config = {
        'method' : 'get',
        'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/allStatus`,
        'headers': {
          'Authorization' : `Bearer ${token}`
        }
      };

    const handlePlayerJoin = async (event) =>{
        console.log("Buscando Los Jugadores de la Partida");

        const response = await axios(config).then((response) => {
            console.log("encontramos jugadores");
            console.log(response);
    
            if (response){
              console.log("We did it we got the players of the room")
            }
    
            return response;
        }).catch((error) => {
          console.log(error);
        });

        setPlayers(response.data);

        console.log(players);
    }

    const handleIrATablero = async (event) =>{
        console.log("Checkeamos si la sala se ha llenado")

        const config = {
            'method' : 'get',
            'url' : `${import.meta.env.VITE_BACKEND_URL}/juegos/status`,
            'headers': {
                'Authorization' : `Bearer ${token}`
            }
        };

        const response = await axios(config).then((response) => {
            console.log("Checkeando si todos los jugadores se han unido");
            const gameInfo = response.data;
            console.log(gameInfo);

            console.log(gameInfo.fase);

            if(gameInfo.fase == "inicio"){
                console.log("Si se cumplen las condiciones para que empieze el juego, yendo al tablero...")
                navigate("/Pagina_Juego");
            }

            return response.data;
        }).catch((error) => {
          console.log(error);
        });
    }

    return(
        <div className='descrpcion'>
            <div>
            {players.map((player) => (
                <p>{player.nombre}</p>
            ))}
            </div>
            <div>
                <button className='boton' onClick={handlePlayerJoin}>Actualizar jugadores</button>
            </div>
            <div>
                <button className='boton' onClick={handleIrATablero}>Ir A Tablero, Si la sala se ha llenado</button>
            </div>
        </div>
    )
}

export default SalaEspera;