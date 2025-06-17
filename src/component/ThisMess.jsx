import axios from 'axios';
import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from './context/AuthContext';
import NewBorder from './NewBorder';

const ThisMess = () => {
    const { user } = useContext(AuthContext);
    const [data] = useLoaderData()
    const navigate = useNavigate();
    console.log(data);
    const handleAddBorder = () => {

    }
    const handleDeleteMess = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/deleteborder/${id}`,)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            navigate("/mymess")
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        });
    }
    return (
        <div className=''>
            <div className="min-h-screen">
                <p className='text-xl text-center text-green-500 font-bold'>{data.messName}</p>
                <div className="divider"></div>
                <NewBorder creatorEMAIL = {data?.creatorEmail}></NewBorder>


            </div>
            <p className='border p-1 text-center rounded'><button onClick={() => handleDeleteMess(data._id)} className='btn bg-red-500'>Delete The Mess</button></p>
        </div>
    );
};

export default ThisMess;