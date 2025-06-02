import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaRegUser } from 'react-icons/fa';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start sm:block hidden">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center ">
                <ul className="menu menu-horizontal px-1">
                    <li> <NavLink to={"/"}>Home</NavLink></li>
                    <li> <NavLink to={"/addmoney"}>Add money</NavLink></li>
                    <li> <NavLink to={"/costinfo"}>Cost info</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end ">
                {
                    user ? <Link to={"/profile"}><button className='border overflow-hidden hover:bg-slate-600 flex justify-center items-center rounded-full w-10 h-10'>{user?.photoURL ? <img className='rounded-full' src={user?.photoURL} alt='' /> : <FaRegUser className='' />}</button> </Link> : <div className="gap-2 flex">
                        <Link to={"/singin"}><button className='btn btn-outline'>SignIn</button></Link>
                        <Link to={"/signup"}><button className='btn btn-outline'>SignUp </button></Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;