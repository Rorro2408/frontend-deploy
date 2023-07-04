import { useContext, useState } from "react";
import './Pagina_login.css'
import { AuthContext } from "../auth/AuthContext";

const LogoutButton = () =>{
    const {logout} = useContext(AuthContext)
    const [msg, setMsg] = useState("");

    const handleLogout = () =>{
        logout();
        setMsg("sesión cerrada")
    }

    return(
        <>
            {msg.length > 0 && <div className="msg">{msg}</div>}
            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </>
    )
}

export default LogoutButton;