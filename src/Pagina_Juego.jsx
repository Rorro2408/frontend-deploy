import './Pagina_Juego.css'
import GameBoard from './Tablero';
import React from "react";
import axios from 'axios';
import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from './auth/AuthContext';
import { useNavigate } from "react-router-dom";

async function Castillo(coordenadas, token){
  const posicion_eje_x = coordenadas[0]
  const posicion_eje_y = coordenadas[1]
  const tipo = coordenadas[2]
  const config = {
    'method' : 'post',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/casillas/castillo`,
    'headers': {
      'Authorization' : `Bearer ${token}`
    },
    'data' : {
      posicion_eje_x,
      posicion_eje_y,
      tipo
    }
  };

  const respuesta = await axios(config).then((response) => {
    console.log("Poniendo el castillo");
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.log(error);
  });

  return respuesta;
}

async function comprarCasilla(coordenadas, token){
  const posicion_eje_x = coordenadas[0]
  const posicion_eje_y = coordenadas[1]
  const tipo = coordenadas[2];
  const config = {
    'method' : 'post',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/casillas/buy`,
    'headers': {
      'Authorization' : `Bearer ${token}`
    },
    'data' : {
      posicion_eje_x,
      posicion_eje_y,
      tipo
    }
  };

  const respuesta = await axios(config).then((response) => {
    console.log("comprando casilla");
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.log(error);
  });

  return respuesta;
}

async function conquistarCasilla(coordenadas, token){
  const x = coordenadas[0]
  const y = coordenadas[1]
  const config = {
    'method' : 'put',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/casillas/conquistar`,
    'headers': {
      'Authorization' : `Bearer ${token}`
    },
    'data' : {
      x,
      y
    }
  };

  const respuesta = await axios(config).then((response) => {
    console.log("conquistando casilla");
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.log(error);
  });

  return respuesta;
}

function Pagina_Juego() {
  const {token} = useContext(AuthContext);
  const gameBoardRef = useRef(null);
  const [Dinero, setDinero] = useState(500);
  const [Soldados, setSoldados] = useState(0);
  const [esTuTurno, setTurno] = useState(false);
  const [fase, setFase] = useState("");
  const [playType, setPlayType] = useState("");

  const navigate = useNavigate();

  const handleSquareClick = async (result) => {

    console.log(result);
    console.log("thx gpt");
    if(fase == "inicio"){
      const casilla_puesta = await Castillo(result, token);
      console.log("se puso " + casilla_puesta);
      return casilla_puesta;
    } else if(fase == "conquista"){
      if(playType != "conquistar"){
        const respuesta = await comprarCasilla(result, token);
        const jugador = respuesta.jugador;
        const casilla_puesta = respuesta.casilla;
        setDinero(jugador.dinero);
        setSoldados(jugador.soldados);
        console.log("se puso " + casilla_puesta.tipo);
        return casilla_puesta;
      } else{
        const respuesta = await conquistarCasilla(result, token);
        const jugador = respuesta.jugador;
        setDinero(jugador.dinero);
        setSoldados(jugador.soldados);
        const casilla_puesta = respuesta.casilla;
        console.log("se puso " + casilla_puesta.tipo);
        return casilla_puesta;
      }
      
    }
  };

  const ComprarSoldados = () => {  
    const config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/buySoldiers`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };

    axios(config).then((response) => {
      console.log("comprando soldados");
      console.log(response.data);
      const soldados = response.data.soldados;
      const dinero = response.data.dinero;

      setDinero(parseInt(dinero));
      setSoldados(parseInt(soldados));

    }).catch((error) => {
      console.log(error);
    });
  };

  const TerminarTurno = async () => {  //Aca tambien se tiene que actualizar el dinero
    let config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/endTurn`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };
    //Terminando turno
    const datajuego = await axios(config).then((response) => {
      console.log("terminando turno");
      console.log(response.data);

    }).catch((error) => {
      console.log(error);
    });

    config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/jugadors/getMoney`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };
    //Recibiendo Pago
    const pago = await axios(config).then((response) => {
      console.log("getting paid");
      console.log(response.data);
      setDinero(parseInt(response.data.dinero));

    }).catch((error) => {
      console.log(error);
    });
    //Actualizando si es nuestro truno
    config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/juegos/isYourTurn`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };

    axios(config).then((response) => {
      console.log("Sacamos si es tu turno")
      console.log(response.data);
      setTurno(response.data.isYourTurn);
      navigate("/Pagina_Juego");
    }).catch((error) => {
      console.log(error);
    });


  };

  useEffect(() => {
    const config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/juegos/isYourTurn`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };

    axios(config).then((response) => {
      console.log("Sacamos si es tu turno")
      console.log(response.data);
      setTurno(response.data.isYourTurn);
    }).catch((error) => {
      console.log(error);
    });
    
  }, []);

  useEffect(() => {
    const config = {
      'method' : 'get',
      'url' : `${import.meta.env.VITE_BACKEND_URL}/juegos/fullstatus`,
      'headers': {
        'Authorization' : `Bearer ${token}`
      }
    };

    axios(config).then((response) => {
      console.log("Establecemos la fase en la que estamos")
      console.log(response.data);
      setFase(response.data.juego.fase);
      const casillas = response.data.casillas;
      for(let i = 0; i < casillas.length; i++){
        const casilla = casillas[i];
        gameBoardRef.current.handleAutomaticChange(casilla, response.data.p_id);
      }
      console.log("Actualizando soldados y dinero")
      const jugador = response.data.jugadores.find(jugador => jugador.id == response.data.p_id);
      console.log(response.data.jugadores)
      setDinero(jugador.dinero);
      setSoldados(jugador.soldados);
      console.log(response.data.juego.fase);
      if(response.data.juego.fase == "fin"){
        console.log(response.data.juego.fase);
        navigate("/Pagina_Principal");
      }

    }).catch((error) => {
      console.log(error);
    });
    
  }, []);

  //chatgpt ayudo a crear el componente GameBoard en gran parte, como por ejemplo acceder respuestas de sus funciones
  //en su componente padre, que el componente padre pueda llamar sus funciones, etc.
  //la lógica respecto a las llamadas a las api fueron hechas por nosotros.
    return (
        <div className="contenedor">
          <GameBoard ref={gameBoardRef} handleSquareClick={handleSquareClick} />
          <div className='jugada'> 
            <h1>Posibles Jugadas</h1>
            <p className='datos'>Nombre: </p>
            <p className='datos'> Dinero: {Dinero}</p> 
            <p className='datos'>Soldados: {Soldados}</p>
            <div className='botones'>
              {esTuTurno && (fase !== "inicio") && <a href="#" onClick={() => ComprarSoldados()}>Comprar Soldados ($150 c/u)</a>}
              {esTuTurno && (fase !== "inicio") && <a href="#" onClick={() => TerminarTurno()}>Terminar Turno</a>}
              {esTuTurno && (playType != "conquistar") && (fase !== "inicio") && <a href="#" onClick={() => setPlayType("conquistar")}>Cambiar a modo conquista</a>}
              {esTuTurno && (playType == "conquistar") && (fase !== "inicio") && <a href="#" onClick={() => setPlayType("")}>Cambiar a modo compra</a>}
              {!esTuTurno && <a href="/Pagina_Juego">Actualizar Tablero</a>}
            </div>
            <p className='texto'>Haz click en las casillas que quieres anexar ($100 c/u) o conquistar 
              ($150 + soldados c/u)
            </p>
          </div>
          <div className='feed'>
          <h1>Feed de jugadas</h1>
        <p>Jugador 1: Coloca castillo en (2,2)</p>
        <p>Jugador 2: Coloca castillo en (7, 1)</p>
        <p>Jugador 3: Coloca castillo en (7, 8)</p>
        <p>Jugador 4: Coloca castillo en (2, 8)</p>
          </div>
        </div>

      );
    }
  
  export default Pagina_Juego;