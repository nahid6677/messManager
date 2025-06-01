import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUpUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const signInUser = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const prfileUpdate = (x) => {
        return updateProfile(auth.currentUser, x);
    }

    const authInformaition = {
        signUpUser,
        signInUser,
        prfileUpdate,
        user,

    }
// console.log(user)
    useEffect(() => {
        const onSubscrive = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            }
        })
        return () => {
            onSubscrive();
        }
    }, [])
    return <AuthContext value={authInformaition}>{children}</AuthContext>
};

export default AuthProvider;