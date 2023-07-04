import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App"
import Pagina_Equipo from "./Pagina_Equipo"
import Pagina_Principal from './Pagina_Principal'
import Instructions from './Instructions'
import Pagina_Juego from './Pagina_Juego'
import Crear_Partida from './Crear_Partida'
import Unirse_Partida from './Unirse_Partida'
import Login from './sesion/Pagina_login'
import SignIn from './sesion/Pagina_signin'
import SalaEspera from './Sala_Espera'
import GameBoard from './Tablero'



function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={"/Pagina_Principal"} element={<Pagina_Principal/>}/>
                <Route path={"/Crear_Partida"} element={<Crear_Partida/>}/>
                <Route path={"/Unirse_Partida"} element={<Unirse_Partida/>}/>
                <Route path={"/Pagina_Equipo"} element={<Pagina_Equipo/>}/>
                <Route path={"/Reglas"} element={<Instructions/>}/>
                <Route path={"/Pagina_Juego"} element={<Pagina_Juego/>}/>
                <Route path={"/Login"} element={<Login/>}/>
                <Route path={"/Signin"} element={<SignIn/>}/>
                <Route path={"/Sala_Espera"} element={<SalaEspera/>}/>
                <Route path={"/Board"} element={<GameBoard/>}/>
                <Route path={"/"} element={<App/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing