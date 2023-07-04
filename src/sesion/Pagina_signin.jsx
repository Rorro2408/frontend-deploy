import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Pagina_login.css';

function SignIn() {
    const [nombre, setNombre] = useState("")
    const [mail, setMail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();

        console.log("info sent")
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/signin`,
        {
            nombre,
            mail,
            contrasena
        }).then((response) => {
            console.log("Sent succesfully")

            console.log(response)

            navigate("/");
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                      type="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      required
                    />
                </label>
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

export default SignIn;