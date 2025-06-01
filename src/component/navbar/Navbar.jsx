import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center ">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Add money</a></li>

                    <li><a>Cost info</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;