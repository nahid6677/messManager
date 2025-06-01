import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, logOut, setLoading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "Logout this site",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        navigate("/")
                        setUser(null)
                        setLoading(false)
                        Swal.fire({
                            title: "Logout",
                            text: "Successfull",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err);
                    })
            }
        });
    }
    return (
        <div className='w-full min-h-screen flex justify-center'>
            <div className='px-2 py-4 flex flex-col items-center gap-3 mt-2'>
                {
                    user?.photoURL ? <img className='w-10 h-10 rounded-full ' src={user?.photoURL} alt='' /> : <FaRegUser className='w-10 h-10 rounded-full ' />
                }
                <p className=''>{user?.email}</p>
                <p className=''>{user?.displayName}</p>
                <button onClick={handleLogOut} className='btn '>Log Out</button>
            </div>
        </div>
    );
};

export default Profile;