import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebookF,faTwitter,faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    // Manejar el login tradicional
    const handleTraditionalLogin = (e) => {
        e.preventDefault();

        // Realizar la solicitud POST al endpoint de login de tu API
        fetch('http://localhost:3009/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include',  // Asegura que las cookies de sesión se envíen
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login exitoso', data);
            // Redirigir al usuario o actualizar el estado según sea necesario
            // Ejemplo: redirigir al perfil
            window.location.href = '/profile';
        })
        .catch(error => {
            console.error('Error de login:', error);
            setError(error.message); // Mostrar el mensaje de error
        });
    };

    const togglePassword = () =>{
        setShowPassword(!showPassword);
    }

    // Manejar el login con proveedor
    const handleLogin = (provider) => {
        window.location.href = `http://localhost:3009/auth/${provider}`;
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>

            {/* Formulario de login tradicional */}
            <form onSubmit={handleTraditionalLogin} className='form-login'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='password-container'>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ flex: 1, marginRight: '8px' }} // Para que el input ocupe el espacio disponible
                    />
                    <button type="button" onClick={togglePassword} style={{ cursor: 'pointer' }} className="password-toggle" >
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </div>
                {error && <p className='error' style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>

            {/* Botones de inicio de sesión con redes sociales */}
            <div className='media'>
                <button className='google-button'  onClick={() => handleLogin('google')}>Continuar con Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button className='twitter-button' onClick={() => handleLogin('twitter')}>Continuar con Twitter <FontAwesomeIcon icon={faTwitter} /> </button>
                <button className='github-button' onClick={() => handleLogin('github')}>Continuar con Github <FontAwesomeIcon icon={faGithub} /></button>
                <button className='facebook-button' onClick={() => handleLogin('facebook')}>Continuar con Facebook <FontAwesomeIcon icon={faFacebookF} /></button>
            </div>
        </div>
    );
};

export default Login;
