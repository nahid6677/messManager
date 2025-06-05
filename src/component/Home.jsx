import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [costData, setCostData] = useState([])
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const Datee = new Date();
    const iso = Datee.toISOString();
    const entryDate = `${String(Datee.getDate()).padStart(2, '0')}-${String(Datee.getMonth() + 1).padStart(2, '0')}-${Datee.getFullYear()}T${iso.split('T')[1]}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const product = form.product.value;
        const costAmount = form.taka.value;
        if (user) {
            const userName = user?.displayName;
            const data = { product, costAmount, entryDate, userName }
            // console.log(data);
            axios.post(`http://localhost:5000/addcost`, data, {})
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
        axios.get("http://localhost:5000/allcost", {})
            .then(res => {
                // console.log(res.data)
                setCostData(res.data)
                setReload(false);
            })
    }, [reload])
    return (
        <div className='w-full'>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Prodect
                            </th>
                            <th>Cost</th>
                            <th>Date</th>
                            {/* <th>Favorite Color</th> */}
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            costData.map((cost,idx) => {
                               return <tr key={idx}>
                                    <th>
                                        {
                                            cost?.product
                                        }
                                    </th>
                                    <td>
                                        {cost?.costAmount}
                                    </td>
                                    <td>
                                       {
                                        cost?.entryDate.slice(0,5)
                                       } <span className='text-xs text-blue-800'>{cost?.userName.slice(0,5)}</span>
                                    </td>
                                    {/* <td>Purple</td> */}
                                    <th>
                                        <Link to={`/costUpdate/${cost?._id}`}><button className="btn border border-blue-200 btn-ghost btn-xs">Edit</button></Link>
                                    </th>
                                </tr>
                            })
                        }

                    </tbody>

                </table>
            </div>





            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
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
                        <input name='taka'  type="number"  placeholder="Taka" className="input w-full input-bordered" required />

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