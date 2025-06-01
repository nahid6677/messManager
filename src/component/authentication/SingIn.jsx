import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import AuthContext from '../context/AuthContext';

const SingIn = () => {
    const {signInUser,setLoading,pupupLogin} = useContext(AuthContext);
    const [error, setError] = useState('')
    const [passShow, setPassShow] = useState(false)
    const emailRef = useRef(null);
     const navigate = useNavigate()
     const location = useLocation();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.length <= 40 && emailRegex.test(email);
    }
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
        return passwordRegex.test(password);
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!isValidEmail(email)) {
            setError('Check your Email')
            return
        }
        if (!isValidPassword(password)) {
            setError('Password not valid')
            return
        }
        if (isValidEmail(email) && isValidPassword(password)) {
            // console.log({email,password})
            setError("")
            signInUser(email, password)
            .then(result =>{
                console.log(result);
                // navigate("/")
                setLoading(false)
                navigate(location?.pathname ? location.state : "/")
            })
            .catch(err =>{
                // console.log(err);
                 setLoading(false)
                setError("In valid Password");
            })
        }

    }

    const handlePupUpLogin = () => {
        pupupLogin()
        .then(result =>{
            setLoading(false)
            navigate(location?.pathname ? location.state : "/")
            console.log(result);
        })
        .catch(err =>{
            setLoading(false)
            console.log(err);
        })

    }
    const handleForgot = () => {

    }

    return (
        <div className="w-10/12 mx-auto min-h-[calc(100vh-8rem)] justify-center gap-3 grid lg:grid-cols-2">
            <div className="w-full  flex items-center">
                <div className="w-2/3 mx-auto z-10">
                    {/* <Lottie animationData={registerLottieData}></Lottie> */}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name='email' placeholder="email" className="input w-full input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={passShow ? 'text' : 'password'} name='password' placeholder="password" className="input w-full input-bordered" required />
                            <div className=" absolute right-4 top-[32px]">
                                <button className={` p-1 rounded-xl`} type='button' onClick={() => setPassShow(!passShow)}>
                                    {passShow ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
                                </button>
                            </div>
                            <label className="label">
                                <button type='button' onClick={handleForgot} className="label-text-alt link link-hover">Forgot password?</button>
                            </label>
                        </div>
                        <div className={`form-control ${error ? 'mt-1' : 'mt-6'}`}>
                            {
                                error && <p className='mb-1 text-center text-red-300'>{error}</p>
                            }
                            <button className="btn btn-primary w-full">SignIn</button>
                            <button onClick={handlePupUpLogin} type='button' className="btn w-full mt-3">Continue With Google <FcGoogle /></button>
                        </div>
                        <p className='text-center pt-2'>New user create account <Link to={"/signup"}><span className='text-green-400'>SignUp</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingIn;