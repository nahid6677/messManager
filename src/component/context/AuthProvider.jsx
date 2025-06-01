import React from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {

    const signUpUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const signInUser = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const authInformaition = {
        signUpUser,
        signInUser,


    }

    return <AuthContext value={authInformaition}>{children}</AuthContext>
};

export default AuthProvider;