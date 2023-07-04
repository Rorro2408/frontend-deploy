import React from 'react';
import waterUrl from './assets/img/game_sprites/water.png';
import houseUrl from './assets/img/game_sprites/House_5.png';
import mineUrl from './assets/img/game_sprites/mine.png';
import grassUrl from './assets/img/game_sprites/grass.png';
import castleUrl from './assets/img/game_sprites/castle.png';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSquares: [],
      jugador: 0
    };
  }

  async handleAutomaticChange(casilla, p_id){
    let i = casilla.posicion_eje_x;
    let j = casilla.posicion_eje_y;
    let tipo = casilla.tipo;
    let dueño = casilla.p_id;
    this.setState(prevState => ({
      selectedSquares: [...prevState.selectedSquares, { i, j, tipo, dueño }],
      jugador: p_id
    }));
    console.log("este cambio solo se hace cuando se carga la página")
    console.log(i, j, tipo, dueño, p_id);
  }

  async handleSquareClick(i, j) {
    let tipo;
    if (
      (i === 0 && j >= 0 && j <= 4) ||
      (i === 1 && (j === 0 || j === 1 || j === 6 || j === 7)) ||
      (i === 2 && j === 7) ||
      (i === 4 && j === 0) ||
      (i === 5 && (j === 0 || j === 4 || j === 9)) ||
      (i === 6 && (j === 0 || j === 4 || j === 5 || j === 9)) ||
      (i === 7 && (j === 0 || j === 5 || j === 9)) ||
      (i === 8 && (j === 2 || j === 8))
    ) {
      tipo = 'agua';
    } else if (
      (i === 0 && j === 5) ||
      (i === 1 && j === 8) ||
      (i === 5 && (j === 3 || j === 8)) ||
      (i === 8 && j === 2) ||
      (i === 9 && j === 8)
    ) {
      tipo = 'granja';
    } else if (
      (i === 2 && j === 6) ||
      (i === 3 && j === 1) ||
      (i === 8 && j === 8) ||
      (i === 9 && j === 2)
    ) {
      tipo = 'mina';
    } else {
      tipo = 'pradera';
    }

    let seleccion = [i, j, tipo]
    const casilla_puesta = await this.props.handleSquareClick(seleccion);
    tipo = casilla_puesta.tipo;
    console.log(tipo);
    console.log(casilla_puesta.posicion_eje_x);
    console.log(casilla_puesta.posicion_eje_y);
    let dueño = casilla_puesta.p_id;
    this.setState(prevState => ({
      selectedSquares: prevState.selectedSquares.filter(square => square.i !== i || square.j !== j),
      jugador: dueño
    }));
    this.setState(prevState => ({
      selectedSquares: [...prevState.selectedSquares, { i, j, tipo, dueño }],
      jugador: dueño
    }));

    console.log(i, j, tipo);
  }

  getRandomPosition(a, b) {
    const randomX = Math.floor(a * 100);
    const randomY = Math.floor(b * 100);
    return `${randomX}% ${randomY}%`;
  }

  renderSquare(i, j, a, b) {
    const { selectedSquares, jugador } = this.state;
    const numeroJugadores = 4 //Este hay q cambiarlo por en numero de jugadores que tenga el juego.
    let squareId = `square_${i}_${j}`;
    let squareBackground;
    let additionalBackground;
    let style = {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    if (
      (i === 0 && j >= 0 && j <= 4) ||
      (i === 1 && (j === 0 || j === 1 || j === 6 || j === 7)) ||
      (i === 2 && j === 7) ||
      (i === 4 && j === 0) ||
      (i === 5 && (j === 0 || j === 4 || j === 9)) ||
      (i === 6 && (j === 0 || j === 4 || j === 5 || j === 9)) ||
      (i === 7 && (j === 0 || j === 5 || j === 9)) ||
      (i === 8 && (j === 2 || j === 8))
    ) {
      squareBackground = waterUrl;
    } else if (
      (i === 0 && j === 5) ||
      (i === 1 && j === 8) ||
      (i === 5 && (j === 3 || j === 8)) ||
      (i === 8 && j === 2) ||
      (i === 9 && j === 8)
    ) {
      squareBackground = houseUrl;
      additionalBackground = grassUrl;
    } else if (
      (i === 2 && j === 6) ||
      (i === 3 && j === 1) ||
      (i === 8 && j === 8) ||
      (i === 9 && j === 2)
    ) {
      squareBackground = mineUrl;
      additionalBackground = grassUrl;
    //} else if (i === 7 && j === 8) {
    //  squareBackground = castleUrl;
    //  style.backgroundColor = '#FF0000'; // Color de fondo rojo para castle1
    //} else if (i === 7 && j === 1) {
    //  squareBackground = castleUrl;
    //  style.backgroundColor = '#8B008B'; // Color de fondo verde para castle2
    //} else if (i === 2 && j === 2) {
    //  squareBackground = castleUrl;
    //  style.backgroundColor = '#0000FF'; // Color de fondo azul para castle3
    //} else if (numeroJugadores === 4 && i === 2 && j === 8) {
    //  squareBackground = castleUrl;
    //  style.backgroundColor = '#ffed00'; // Color de fondo azul para castle3 (actualizado para 4 jugadores)
    } else {
      additionalBackground = grassUrl;
      squareBackground = grassUrl
      // Para el pasto, se quitan los atributos de background-size y background-position
      style = {};
    }
    if (squareBackground === grassUrl) {
      style.backgroundPosition = this.getRandomPosition(a, b);
      squareBackground = "";
    }

    const isSelectedSquare = selectedSquares.some(sq => sq.i === i && sq.j === j);
    if (isSelectedSquare) {
      const selectedSquare = selectedSquares.find(sq => sq.i === i && sq.j === j);
      console.log(isSelectedSquare);
      if (selectedSquare.tipo === "castillo"){
        squareBackground = castleUrl;
        style = {
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
      if(selectedSquare.dueño == jugador){
        style.backgroundColor = '#FF0000';
      } else{
        style.backgroundColor = '#0000FF';
      }
      additionalBackground = "";
      
      console.log("Color change");
    }

    style.backgroundImage = `url(${squareBackground}), url(${additionalBackground})`;

    return (
      <div
        key={squareId}
        id={squareId}
        className="square"
        style={style}
        onClick={() => this.handleSquareClick(i, j)}
      />
    );
  }

  render() {
    const boardSize = 10;
    const squares = [];

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        squares.push(this.renderSquare(i, j, i, j));
      }
    }

    return <div id="board">{squares}</div>;
  }
}

export default GameBoard;
