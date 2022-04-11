import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";


function SignUp() {

    let history = useHistory();

    const [inputs, setInputs] = useState({});
    const [error, toggleError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function submitHandler(e) {
        e.preventDefault();
       register();
    }

    async function register() {
        try {
            toggleError(false);
            console.log(inputs.email);

            const registerUser = await axios.post('http://localhost:3000/register' , {
                email: inputs.email,
                password: inputs.password,
                username: inputs.username
            });
            console.log(registerUser);
            history.push({
                pathname: "/signin",
                state: {fromlogin: true},
            });

        }
        catch(e) {
            console.error(e);
            toggleError(true);
        }
    }
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">
            Gebruikersnaam:
            <input
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
                id="username"/>
        </label>
          <label htmlFor="email">
              Email adres:
              <input type="email"
                     name="email"
                     value={inputs.email || ""}
                     onChange={handleChange}
                     id="email"/>
          </label>

          <label htmlFor="password">
              Wachtwoord:
              <input type="password"
                     name="password"
                     value={inputs.password || ""}
                     onChange={handleChange}
                     id="password"/>
          </label>

          <button type="submit">Registreren</button>

          {error &&
              <>
              <p>Oeps! er is iets fout gegaan!</p>
              <span>Het lijkt erop dat de gebruiker al bestaat!</span>
              </>
          }
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;