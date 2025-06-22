import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from './context/AuthContext';

const NewBorder = ({ creatorEMAIL }) => {
    const { user } = useContext(AuthContext);
    const [borders, setBorders] = useState([]);
    const [reload, setRedload] = useState(false);
    // const [err , setErr] = useState("")
    const creatorEmail = creatorEMAIL;
    // const [creatorEmail, setCreatorElail] = useState(creatorEMAIL);
    console.log(creatorEmail, user?.email)

    const handleAddBorder = (e) => {
        e.preventDefault();
        const date = new Date();
        const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        const borderName = e.target.name.value;
        const borderEmail = e.target.email.value;
        const entryDate = formatted;
        const newBorder = { borderName, entryDate, borderEmail, creatorEmail, role: "member", account: {} }
        // console.log(newBorder);
        if (borderName && borderEmail) {
            // console.log(newBorder)
            Swal.fire({
                title: "Are you sure?",
                html: `
                    <p><strong style="color: #008550">${borderName}</strong> is a new border of this mess </p>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Add One"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:5000/addborder`, newBorder, {
                        withCredentials: true,
                        secure: false
                    })
                        .then(result => {
                            console.log(result.data)
                            if (result.data?.insertedId) {
                                setRedload(true)
                                Swal.fire({
                                    title: "Ok!",
                                    text: `${borderName} is Added successfully`,
                                    icon: "success"
                                });
                            }
                            if(result.data?.thisBorder){

                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            });
        }
    }
    const handleDeleteBorder = (id) => {
        // console.log(id);
        if (creatorEmail === user?.email) {
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
                    // axios.delete(`http://localhost:5000/deleteborder/${id}`,{})
                    // .then(res => {
                    //     console.log(res.data);
                    // })
                    // .catch(err =>{
                    //     console.log(err);
                    // })

                    fetch(`http://localhost:5000/deleteborder/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            if (data.deletedCount > 0) {
                                setBorders(previous => previous.filter(pre => pre._id !== id))
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            console.log("You are not elegible for delete the border")
        }


    }

    useEffect(() => {
        // console.log({creatorEMAIL})
        axios.get(`http://localhost:5000/allborders`, {
            params: {
                creatoremail: creatorEMAIL
            }
        })
            .then(res => {
                // console.log(res.data);
                setBorders(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        setRedload(false)
    }, [reload === true])
    return (
        <div className=" flex-col items-center flex">
            <div className="card bg-base-100 w-full max-w-sm mx-auto mt-5 shrink-0 shadow-2xl">
                <form onSubmit={handleAddBorder} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Add New Border</span>
                        </label>
                        <input type="text" name='name' placeholder="New Border Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">

                        <input type="email" name='email' placeholder="New Border Email" className="input input-bordered" required />
                    </div>

                    <div className="form-control flex justify-center mt-6">
                        <button className="btn btn-primary">Add Border</button>
                    </div>
                </form>
            </div>
            <div className="divider"></div>
            <div className="overflow-x-auto w-11/12 md:w-3/5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Entry Date</th>
                            <th>Delete Border</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            borders.map((border, idx) => <tr key={idx}>
                                <td>
                                    <div className="font-bold ">{border?.borderName}</div>
                                </td>
                                <td>
                                    <div className="font-bold "> {border?.entryDate}</div>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteBorder(border._id)} className='btn' >Remove</button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewBorder;