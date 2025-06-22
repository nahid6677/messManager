import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import Swal from 'sweetalert2';

const AddMoneyAnother = () => {
    const { user } = useContext(AuthContext);
    const [borders, setBorders] = useState([]);
    const [error, serError] = useState("")
    const userMail = user?.email;
    const Datee = new Date();
    const iso = Datee.toISOString();
    const formattedDate = `${String(Datee.getDate()).padStart(2, '0')}-${String(Datee.getMonth() + 1).padStart(2, '0')}-${Datee.getFullYear()}T${iso.split('T')[1]}`;

    useEffect(() => {
        axios.get(`http://localhost:5000/addmoneyspecific`, {
            params: {
                useremail: userMail
            }
        })
            .then(res => {
                // console.log(res.data);
                setBorders(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const handleSubmit = (e, id) => {
        e.preventDefault()
        const [thisBorder] = borders.filter(bor => bor._id === id)
        const form = e.target;
        const formData = new FormData(form);
        const amountTK = formData.get(id);
        const currentUserName = user.displayName;
        const currentEmail = user.email;
        const moneyAddDate = formattedDate;
        const blance = { [moneyAddDate]: [amountTK, currentUserName, currentEmail] }
        if (parseInt(amountTK) > 0) {
            serError("")
            // console.log(id, amountTK, thisBorder);
            Swal.fire({
                title: `Hay, ${currentUserName}`,
                html: `
                        <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                            <p><strong></strong> <strong style="color: #e53935"> ${amountTK} Tk</strong> will add ${thisBorder?.borderName} </p>
                            <P> account</P>
                        `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/addblance/${id}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(blance)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data?.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Ok!",
                                    text: `${amountTK} Tk is added ${thisBorder?.borderName} account.`,
                                    icon: "success"
                                });
                            }
                        })
                        .catch(err =>{
                            serError(err)
                        })
                }
            });
        }
        else {
            serError("Please enter the positive value")
        }
    }
    return (
        <div className='flex flex-col gap-2 items-center'>
            {
                borders.map((border, idx) => <div key={idx} className="card w-full max-w-sm">
                    <form onSubmit={(e) => handleSubmit(e, border._id)} className="flex gap-2 justify-start">
                        <div className="form-control">
                            <input type="number" name={border._id} placeholder={border?.borderName} className="input input-bordered" required />
                        </div>
                        <div className="">
                            <button className="btn btn-primary "> Add {border?.borderName}</button>
                        </div>
                        {error && error}
                    </form>
                </div>)
            }
        </div>
    );
};

export default AddMoneyAnother;