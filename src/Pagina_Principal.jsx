import './Pagina_Principal.css'
function Pagina_Principal() {

  return (
    <div className='rectangulo_bajo'>
        <div className='rectangulo'>
          <div className='imagen'> </div>
          <div className='resumen'>
            <h2 id='title'>Conquista</h2>
            <p>Conquista es un juego multijugador de estrategia y gestión de 
              recursos basado en turnos. El Objetivo principal del juego es 
              tener el mayor número de casillas conquistadas en el mapa. Para 
              esto, debes contratar soldados para asi apoderarte de las casillas de tus adversarios 
              o defender las tuyas de sus invasiones. Si te quedas con pocos recursos ¡No te preocupes! Podrás
              recolectar más conquistando casillas dedicadas a la producción de estos.
              El último jugador que todavía tenga recursos o que haya conquistado el mayor número 
              de casillas al final de la partida es el ganador.</p>
            <div className='botones'>
            <a href="/Crear_Partida" id='boton_principal'>Crear Partida</a>
            <a href="/Unirse_Partida" id='boton_principal'>Unirse a una Partida</a>
            <a href="/" id='boton_principal'>Atras</a>

            </div>
          </div>
          <div className='partidas'>
          <h2 id='title'>Partidas Recientes</h2>
            <div className='partida'>
            <p>Fecha</p>
            <p>Numero de la Partida</p>
            <p>Ganador</p>
            </div>
            <div className='partida'>
              <p>18/04/2022</p>
              <p>Partida#033</p>
              <p>User033</p>
            </div>
            <div className='partida'>
              <p>16/04/2022</p>
              <p>Partida#028</p>
              <p>User233</p>
            </div>
            <div className='partida'>
              <p>23/03/2022</p>
              <p>Partida#021</p>
              <p>User897</p>
            </div>
            <div className='partida'>
              <p>11/02/2022</p>
              <p>Partida#013</p>
              <p>User065</p>
            </div>

          </div>
        </div>

    </div>
  )
}

export default Pagina_Principal