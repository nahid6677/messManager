import axios from 'axios';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from './context/AuthContext';

const CostUpdate = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData()
    const Datee = new Date();
    const iso = Datee.toISOString();
    const entryDate = `${String(Datee.getDate()).padStart(2, '0')}-${String(Datee.getMonth() + 1).padStart(2, '0')}-${Datee.getFullYear()}T${iso.split('T')[1]}`;
    console.log(data, user)
    const handleSubmit = (e) => {
        e.preventDefault()
        const product = e.target.product.value;
        const costAmount = e.target.taka.value;
        const modifyPerson = user?.displayName;
        const modifyTime = entryDate;

        const cost = { product, costAmount, modifyPerson, modifyTime, isModify: true };
        // console.log(cost);

        Swal.fire({
            title: "Are you sure?",
            text: "Update This Field",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/costupdate/${data._id}`, cost, {})
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.modifiedCount) {
                            Swal.fire({
                                title: "Yes!",
                                text: "Updated",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        });
    }
    return (
        <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sector of expenditure</span>
                    </label>
                    <input name='product' type="text" defaultValue={data.product} className="input w-full input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cost Amount</span>
                    </label>
                    <input name='taka' type="number" defaultValue={data.costAmount} className="input w-full input-bordered" required />

                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CostUpdate;