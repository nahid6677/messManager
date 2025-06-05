import axios from 'axios';
import React from 'react';

const NewBorder = () => {

    const handleAddBorder = (e) => {
        e.preventDefault();
        // const date = new Date().toISOString();
        const date = new Date();
        const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        const borderName = e.target.name.value;
        const entryDate = formatted;
        const newBorder = { borderName, entryDate, account: {} }
        if (borderName) {
            console.log(newBorder)
            axios.post(`http://localhost:5000/addborder`, newBorder, {
                withCredentials: true,
                secure: false
            })
                .then(result => {
                    console.log(result.data)
                })
                .catch(err => {
                    console.log(err);
                })
            // fetch(`http://localhost:5000/addborder`, {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify(newBorder)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //     })
        }
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto mt-5 shrink-0 shadow-2xl">
            <form onSubmit={handleAddBorder} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">New Border Name</span>
                    </label>
                    <input type="text" name='name' placeholder="New Border Name" className="input input-bordered" required />
                </div>

                <div className="form-control flex justify-center mt-6">
                    <button className="btn btn-primary">Add Border</button>
                </div>
            </form>
        </div>
    );
};

export default NewBorder;