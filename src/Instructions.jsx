import { useState } from 'react';
import './Instructions.css'

function Instructions() {

    const [parrafoActual, setParrafoActual] = useState(0);
    const [fotoActual, setFotoActual] = useState(0);
    const [mostrarBoton, setMostrarBoton] = useState(true);
    const [mostrarPrevio, setMostrarPrevio] = useState(false);


    const parrafos = [
        'Al inicio del juego cada jugador toma turnos, en un orden aleatorio, para colocar sus castillos sobre el tablero.',
        'Solo podrán poner sus castillos sobre casillas de pradera.',
        'Este punto en el tablero servira como punto de partida para la conquista y genera $150 a su dueño al final de cada turno.',
        'Una vez que todos hayan colocado sus castillos todos reciben $500 y empieza la fase de conquista de terreno.',
        'Usando el orden de turnos anterior, los jugadores toman turnos para realizar todas las jugadas que puedan y quieran hacer',
        'Entre las Jugadas que pueden hacer estan: Comprar casillas desocupados, Contratar soldados, Conquistar Terrenos de los otros Jugadores',
        'Comprar casillas desocupadas se refiere a anexar casillas sin dueño previo al terreno del jugador', 
        'Durante su turno, el jugador que desee realizar esta acción debe gastar $100 por cada casilla que anexe, y solo puede anexar casillas adyacientes a su terreno',
        'Esto quiere decir que en un inicio solo puede anexar casillas adyacentes a su castillo',
        'Hay 3 tipos de casilla que se pueden anexar: pradera, granja y mina. Las casillas de lago no pueden ser anexadas y solo sirven como obstaculos',
        'La casilla de pradera no hace nada, pero es la más númerosa en el tablero',
        'La casilla de granja genera $100 a su dueño al final de cada turno',
        'La casilla de mina genera $350 a su dueño cada 3 turnos, al final del tercer turno',
        'Contratar soldados se refiere a gastar $ para obtener soldados',
        'Los soldados son necesarios para conquistar terrenos enemigos, y defenderte de conquistas enemigas',
        'Cada soldado cuesta $150 para ser contratado',
        'Conquistar Terrenos de los otros Jugadores se refiere a anexar casillas que forman parte del territorio de otro jugador',
        'Realizar esta accion cuesta soldados y $150 por casilla, y solo anexa casillas adyacientes',
        'Para que esta accion sea exitosa el numero de soldados debe ser mayor al del jugador al que estamos conquistando su terreno',
        'Al realizar esta acción, independiente de si fue exitosa o no, tanto el jugador que conquista y el conquistado pierden soldados',
        'La cantidad de soldados perdidos es igual al minimo entre el número de soldados de ambos jugadores',
        'El unico tipo de casilla que no puede ser conquistada es la de castillo',
        'Cuando el Jugador haya realizado todas las acciones que quería y podía, puede terminar su turno y comienza el turno del siguiente jugador',
        'El juego acaba una vez que todas las casillas hayan sido conquistadas, el ganador es aquel jugador que haya conquistado el mayor número de casillas'
    ]

    const handleParrafos = () => {
        if (parrafoActual === parrafos.length - 2){
            setParrafoActual(parrafoActual + 1);
            setMostrarBoton(false);
        } else{
            setParrafoActual(parrafoActual + 1);
            setMostrarPrevio(true);
        }
    }

    const handleParrafosReversa = () => {
        if (parrafoActual === 1){
            setParrafoActual(parrafoActual - 1);
            setMostrarPrevio(false);
        } else{
            setParrafoActual(parrafoActual - 1);
            setMostrarBoton(true);
        }
    }


    return (
        <>
        <div>
            <a href="/" id='boton-atras'>Atras</a>
        </div>
        <div className='instructions-display'>
            <h1 className='title'>Instrucciones</h1>
            <div className='text-container'>
                <p className='parrafos'>{parrafos[parrafoActual]}</p>
            </div>
            <div id='botones'>
                {mostrarPrevio && <button onClick={handleParrafosReversa}>Previo</button>}
                {mostrarBoton && <button onClick={handleParrafos}>Siguiente</button>}
            </div>
        </div>
        </>
    )
}

export default Instructions