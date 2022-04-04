import React, {useState} from "react";
import {createContext} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {

    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();
    const data = {
        isauth: isAuth,
        signin: signIn,
        signout: signOut,
    }

    function signIn() {
        toggleIsAuth(true);
        console.log('Gebruiker is ingelogd!');
        history.push('/profile');
    }

    function signOut() {
        toggleIsAuth(false);
        console.log('gebruiker is uitgelogd!');
        history.push('/');
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;