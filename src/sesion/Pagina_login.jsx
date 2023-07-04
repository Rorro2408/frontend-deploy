import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import './Pagina_login.css';

function Login() {
    const {token ,setToken} = useContext(AuthContext)
    const [mail, setMail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();

        console.log("info sent")
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/login`,
        {
            mail,
            contrasena
        }).then((response) => {
            console.log("Sent succesfully")

            const accessToken = response.data.access_token;
            setToken(accessToken);

            console.log(response);

            navigate("/");
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <label>
                    Mail:
                    <input
                      type="mail"
                      name="mail"
                      value={mail}
                      onChange={e => setMail(e.target.value)}
                      required
                    />
                </label>
                <label>
                    Contrasena:
                    <input
                      type="contrasena"
                      name="contrasena"
                      value={contrasena}
                      onChange={e => setContrasena(e.target.value)}
                      required
                    />
                </label>
                <button className='boton' type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Login;