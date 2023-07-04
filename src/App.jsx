import './App.css'
import { useContext } from 'react'
import { AuthContext } from './auth/AuthContext'
import LogoutButton from './sesion/Logout'

function App() {

  const {token} = useContext(AuthContext)

  console.log("el token es" + token);
  if (token === "null"){
    console.log(token)
    console.log("token es string")
    console.log(token !== null && token !== "null")
    
  } else{
    console.log("no debería aparecer botones")
    console.log(token === null)
  }

  return (
    <header>
      <p id='p_inicio'><h1>Conquista</h1></p>
      <p id='p_inicio'>Reune y utiliza recuersos para conquistar los 
        reinos de los otros jugadores y proclamarte emperador.
      </p>
      {token !== null && token !== "null" && <a href="/Pagina_Principal" id='boton_inicio'>Ir a jugar</a>}
      <a href="/Pagina_Equipo" id='boton_inicio'>¿Quiénes somos?</a>
      <a href="/Reglas" id='boton_inicio'>Reglas</a>
      {(!token || token === "null") && <a href="/Login" id='boton_inicio'>Inicia Sesión</a>}
      {(!token || token === "null") && <a href="/Signin" id='boton_inicio'>Registrate</a>}
      {token !== null && token !== "null" && <LogoutButton/>}
    </header>
  )
}

export default App
