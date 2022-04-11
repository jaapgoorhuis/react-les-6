import React, {useState, useEffect, createContext} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const history = useHistory();

    const [Auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const data = {
        isauth: Auth.isAuth,
        user: Auth.user,
        signin: signIn,
        signout: signOut,
    }

    function signIn(data) {
        localStorage.setItem('token', data.accessToken);
        const token = localStorage.getItem('token');
        console.log('Gebruiker is ingelogd!');
        const decodedToken = jwt_decode(token);

        async function fetchUserData() {
            try {
                const userdata = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                const user = userdata.data;
                toggleAuth(() => ({
                    isAuth: true,
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                }));

            } catch (e) {
                console.error(e);
            }
        }
        fetchUserData();
        history.push('/profile');
    }

    function signOut() {
        toggleAuth(() => ({
            isAuth:false,
        }));
        localStorage.clear();
        console.log('gebruiker is uitgelogd!');
        history.push('/');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const decodedToken = jwt_decode(token);
            toggleAuth(() => ({
                isAuth:true,
                user: {
                    username: decodedToken.username,
                    email: decodedToken.email,
                    id: decodedToken.id,
                },
                status: 'done',
            }));
        }
        else {
            toggleAuth(() => ({
                isAuth:false,
                user:null,
                status: 'done',
            }));
        }
    },[]);

    return (
        <AuthContext.Provider value={data}>
            {Auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }

        </AuthContext.Provider>
    )
}

export default AuthContextProvider;