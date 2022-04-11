import React, {useContext, useEffect, useState} from 'react';
import { Link, useLocation} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {signin} = useContext(AuthContext);
    const [inputs, setInputs] = useState({});

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        signUserIn();
    }

    async function signUserIn(){
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email:inputs.email,
                password: inputs.password,
            });
            signin(response.data);
        }

        catch(e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
       <label htmlFor="email"> Email adres
           <input
               name="email"
               id="email"
               type="text"
               value={inputs.email || ""}
               onChange={handleChange}
           />
       </label>

      <label htmlFor="password"> Wachtwoord
          <input
              name="password"
              id="password"
              type="password"
              value={inputs.password || ""}
              onChange={handleChange}
          />
      </label>
        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;