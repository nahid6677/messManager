import React, { useContext, useState } from 'react';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SingUp = () => {
    const { signUpUser, prfileUpdate, setLoading, pupupLogin } = useContext(AuthContext);
    const [passShow, setPassShow] = useState(false)
    const [passShowc, setPassShowc] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.length <= 40 && emailRegex.test(email);
    }
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
        return passwordRegex.test(password);
    }
    const handleSignup = (e) => {
        e.preventDefault();
        setError('')
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const cpassword = form.cpassword.value;
        const FirstName = form.Fname.value;
        const LastName = form.Lname.value;
        const fullName = `${FirstName} ${LastName}`;
        if (!isValidEmail(email)) {
            setError('Check your Email')
            return
        }
        if (!isValidPassword(password)) {
            setError('Create a strong password')
            return
        }
        if (password !== cpassword) {
            setError('Password are not same')
            return
        }
        if (isValidPassword(password) && isValidPassword(cpassword) && isValidEmail(email)) {
            console.log({ email, password, cpassword, fullName })
            setError("")
            signUpUser(email, cpassword)
                .then(result => {
                    console.log(result)
                    if (result.user.email) {
                        setLoading(false);
                        prfileUpdate({
                            displayName: fullName
                        })
                            .catch((err) => {
                                console.log(err.message)
                            })
                        navigate("/")
                    }
                })
                .catch(err => {
                    setError(err);
                    setLoading(false)
                    console.log(err);
                })

        }

    }
    const handlePupUpLogin = () => {
        pupupLogin()
            .then(result => {
                setLoading(false)
                navigate("/")
                console.log(result);
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSignup} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <div className="flex gap-2">
                            <input type="text" name='Fname' placeholder="First Name" className="input w-full input-bordered" required />
                            <input type="text" name='Lname' placeholder="Last Name" className="input w-full input-bordered" required />
                        </div>
                    </div>
                    {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Last Name" className="input w-full input-bordered" required />
                        </div> */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input w-full input-bordered" required />
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
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type={passShowc ? 'text' : 'password'} name='cpassword' placeholder="Confirm password" className="input w-full input-bordered" required />
                        <div className=" absolute right-4 top-[32px]">
                            <button className={` p-1 rounded-xl`} type='button' onClick={() => setPassShowc(!passShowc)}>
                                {passShowc ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
                            </button>
                        </div>
                    </div>
                    <div className={`form-control ${error ? `mt-1` : `mt-6`}`}>
                        {
                            error && <p className='mx-auto text-center mb-1 text-red-300'>{error}</p>
                        }
                        <button className="btn w-full ">Sign Up</button>
                        <button onClick={handlePupUpLogin} type='button' className="btn w-full mt-3">Continue With Google <FcGoogle /></button>
                    </div>
                    <p className='text-center pt-2'>Already have an acount <Link to={"/singin"}><span className='text-green-400'>SignIn</span></Link></p>
                </form>
            </div>
        </div>

    );
};

export default SingUp;