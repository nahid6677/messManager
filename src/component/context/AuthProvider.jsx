import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borderC, setBorderC]  = useState(1);
    const provider = new GoogleAuthProvider();

    // console.log(loading)
    const signUpUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const signInUser = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const prfileUpdate = (x) => {
        setLoading(true)
        return updateProfile(auth.currentUser, x);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const pupupLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const authInformaition = {
        signUpUser,
        signInUser,
        prfileUpdate,
        user,
        setLoading,
        loading,
        logOut,
        pupupLogin,
        setUser,
        setBorderC,
        borderC

    }
    // console.log(user)
    useEffect(() => {
        const onSubscrive = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            }
            setLoading(false)
        })
        return () => {
            onSubscrive();
        }
    }, [])
    return <AuthContext value={authInformaition}>{children}</AuthContext>
};

export default AuthProvider;