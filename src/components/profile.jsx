import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
const Profile = () => {
    // Crear el estado para almacenar los datos del usuario
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir


    // Fetch para obtener los datos del usuario
    useEffect(() => {
        fetch('http://localhost:3009/auth/user', {
            credentials: 'include', // Asegura que las cookies de sesión se envíen
        })
        .then(response =>{
            if (!response.ok) {
                // Si la respuesta no es ok (por ejemplo, 401), redirigir al inicio
                navigate('/'); // Cambia esto a la ruta que desees
                return;
            }

            return  response.json();

        })
        .then(data => {
            // Actualizar el estado con los datos del usuario
            setUser(data);
            console.log(data)
        })
        .catch(error => console.error('Error al obtener el usuario:', error));
    }, [navigate]);

    // Mostrar una carga o los datos del usuario si están disponibles
    if (user === null) {
        return <div>Cargando...</div>;
    }

    // Determinar qué plataforma de autenticación se utilizó (Google, Facebook, etc.)
    let authMessage = '';
    if (user.google_id) {
        authMessage = 'Iniciaste sesión con Google';
    } else if (user.facebook_id) {
        authMessage = 'Iniciaste sesión con Facebook';
    } else if (user.github_id) {
        authMessage = 'Iniciaste sesión con GitHub';
    } else if (user.twitter_id) {
        authMessage = 'Iniciaste sesión con Twitter';
    } else {
        authMessage = 'No se ha asociado ninguna cuenta social';
    }

    return (
        <div>
            <h1>Bienvenido, {user.nombre}!</h1>
            <p>Correo electrónico: {user.correo}</p>
            <p>Rol: {user.rol }</p>
            <p>{authMessage}</p>

            {/* Si tienes una imagen de perfil, la muestras */}
            {user.imagen && <img src={user.imagen} alt="Imagen de perfil" />}


            <button onClick={() => window.location.href = 'http://localhost:3009/auth/logout'}>
             Cerrar sesión
            </button>

        </div>
    );
}

export default Profile;
