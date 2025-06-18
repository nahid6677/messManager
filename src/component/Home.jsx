import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
    const { user, setBorderC, borderC } = useContext(AuthContext);
    const [costData, setCostData] = useState([])
    const [reload, setReload] = useState(false);
    // const [borderC, setBorderC]  = useState(1);
    // console.log(borderC)
    let totalAmount = 0;
    const navigate = useNavigate();
    const Datee = new Date();
    const iso = Datee.toISOString();
    const entryDate = `${String(Datee.getDate()).padStart(2, '0')}-${String(Datee.getMonth() + 1).padStart(2, '0')}-${Datee.getFullYear()}T${iso.split('T')[1]}`;
    costData?.forEach(data => totalAmount += parseFloat(data.costAmount))

    const handleSubmitCost = (e) => {
        e.preventDefault();
        const form = e.target;
        const product = form.product.value;
        const costAmount = form.taka.value;
        const modify = { isModify: false, modifyPerson: null, modifyTime: null }

        if (user) {
            const userName = user?.displayName;
            const borderEmail = user?.email;
            const data = { product, costAmount, entryDate, userName, borderEmail, modify }
            console.log(data);
            axios.post(`http://localhost:5000/addcost`, data, {
                params: {
                    borderUserEmail: user?.email
                }
            })
                .then(responce => {
                    if (responce.data) {
                        console.log(responce.data);
                        form.reset()
                        setReload(true);
                        Swal.fire({
                            title: "Ok!",
                            text: `Expenditure added`,
                            icon: "success"
                        });
                    }
                })
        } else {
            navigate("/signup")
        }
    }
    //     const handleEdit = (id) =>{
    // console.log(id)
    //         axios.put(`http://localhost:5000/costedit/${id}`, {})
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //     }

    useEffect(() => {
        // fetch("http://localhost:5000/allcost")
        //     .then(res => res.json())
        //     .then(data => {
        //         setCostData(data);
        //         console.log(data.userName)
        //     })
        axios.get("http://localhost:5000/allcost", {
            params: {
                borderMail: user?.email
            }
        })
            .then(res => {
                setCostData(res.data)
                // setReload(false);
            })
            .catch(err => {
                console.log(err)
            })
        setReload(false);
    }, [reload])
    useEffect(() => {
        axios.get("http://localhost:5000/bordercount", {
            params: {
                borderMail: user?.email
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data?.count) {
                    setBorderC(response.data?.count)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className='w-full'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center'> Prodect </th>
                            <th className='text-center'>Cost</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            costData.map((cost, idx) => {
                                return <tr key={idx}>
                                    <th className='text-center'>
                                        <p>{
                                            cost?.product
                                        }</p>
                                        <p className='text-xs font-extralight text-orange-200'>
                                            {
                                                cost?.modify?.isModify === true && "modifyed"
                                            }
                                        </p>
                                    </th>
                                    <td className='text-center'>
                                        <p>{cost?.costAmount}</p>
                                        <p className='text-xs font-extralight text-orange-200'>
                                            {
                                                cost?.modify?.isModify === true && cost?.modify?.modifyPerson
                                            }
                                        </p>
                                    </td>
                                    <td className='text-center'>
                                        <p>
                                            {
                                                cost?.entryDate.slice(0, 5)
                                            }
                                            <span className='text-xs text-blue-800'>{cost?.userName.slice(0, 5)}</span>
                                        </p>
                                        <p className='text-xs font-extralight text-orange-200'>
                                            {
                                                cost?.modify?.isModify === true && cost?.modify?.modifyTime.slice(0, 5)
                                            }
                                        </p>
                                    </td>
                                    {/* <td>Purple</td> */}
                                    <th className='text-center'>
                                        <Link to={`/costUpdate/${cost?._id}`}><button className="btn border border-blue-200 btn-ghost btn-xs">Edit</button></Link>
                                    </th>
                                </tr>
                            })
                        }
                        <tr className=''>
                            <td className='text-xl text-center text-red-500 font-bold'>
                                Total
                            </td>
                            <td className='text-xl text-center text-red-500 font-bold'>
                                {
                                    totalAmount
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='text-xl text-center text-red-500 font-bold'>
                                Per Head
                            </td>
                            <td className='text-xl text-center text-red-500 font-bold'>
                                {(totalAmount / borderC).toFixed(2)}
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmitCost} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Sector of expenditure</span>
                        </label>
                        <input name='product' type="text" placeholder="Expenditure name" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Cost Amount</span>
                        </label>
                        <input name='taka' type="number" placeholder="Taka" className="input w-full input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;