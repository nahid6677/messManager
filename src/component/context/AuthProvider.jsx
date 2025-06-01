import React from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {


    const authInformaition = {

    }

    return <AuthContext value={authInformaition }>{children}</AuthContext>
};

export default AuthProvider;