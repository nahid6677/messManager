import React, { useContext, useRef, useState } from 'react';
import AuthContext from './context/AuthContext';
import Swal from 'sweetalert2';

const AddMoney = () => {
    const { user } = useContext(AuthContext);
    const [error, serError] = useState("")
    const nahidRef = useRef(null)
    const johirRef = useRef(null)
    const azisRef = useRef(null)
    const yeaminRef = useRef(null)
    const tanjurRef = useRef(null)
    const Datee = new Date();
    const iso = Datee.toISOString();
    const formattedDate = `${String(Datee.getDate()).padStart(2, '0')}-${String(Datee.getMonth() + 1).padStart(2, '0')}-${Datee.getFullYear()}T${iso.split('T')[1]}`;

    const handleNahid = () => {
        const Nahid = nahidRef.current.value;
        const currentUserName = user.displayName;
        const currentEmail = user.email;
        const moneyAddDate = formattedDate;
        const Id = "683ebea519dc186693eeba8d"
        const blance = { [moneyAddDate]: [Nahid, currentUserName, currentEmail] }

        if (Nahid) {
            serError("")
            Swal.fire({
                title: `Hay, ${currentUserName}`,
                html: `
            <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                <p><strong>Nahid:</strong> <strong style="color: #e53935"> ${Nahid} Tk</strong> </p>
                <P>Add her account</P>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/addblance/${Id}`, {
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
                                    text: `${Nahid} Tk add her account.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            serError("Please Enter Value")
        }

    }
    const handleJohir = () => {
        const currentUser = user.displayName;
        const currentEmail = user.email;
        const Id = "683ec07819dc186693eeba8f"
        const Johir = johirRef.current.value;
        const blance = { [formattedDate]: [Johir, currentUser, currentEmail] }

        if (Johir) {
            serError("")
            Swal.fire({
                title: `Hay, ${currentUser}`,
                html: `
            <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                <p><strong>Md Johir:</strong> <strong style="color: #e53935"> ${Johir} Tk</strong> </p>
                <P>Add her account</P>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch(`http://localhost:5000/addblance/${Id}`, {
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
                                    text: `${Johir} Tk add her account.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            serError("Please Enter Value")
        }

        // console.log(blance)
    }

    const handleAzis = () => {
        const currentUser = user.displayName;
        const currentEmail = user.email;
        const Id = "683ec05119dc186693eeba8e"
        const Azis = azisRef.current.value;
        const blance = { [formattedDate]: [Azis, currentUser, currentEmail] }
        // console.log(Azis)

        if (Azis) {
            serError("")
            Swal.fire({
                title: `Hay, ${currentUser}`,
                html: `
            <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                <p><strong>Md Ajijul:</strong> <strong style="color: #e53935"> ${Azis} Tk</strong> </p>
                <P>Add her account</P>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch(`http://localhost:5000/addblance/${Id}`, {
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
                                    text: `${Azis} Tk add her account.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            serError("Please Enter Value")
        }
    }
    const handleYeamin = () => {
        serError("")
        const currentUser = user.displayName;
        const currentEmail = user.email;
        const Id = "683ec09419dc186693eeba90"
        const Yeamin = yeaminRef.current.value;
        const blance = { [formattedDate]: [Yeamin, currentUser, currentEmail] }
        // console.log(blance)

        if (Yeamin) {
            Swal.fire({
                title: `Hay, ${currentUser}`,
                html: `
            <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                <p><strong>Md Yeamin:</strong> <strong style="color: #e53935"> ${Yeamin} Tk</strong> </p>
                <P>Add her account</P>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch(`http://localhost:5000/addblance/${Id}`, {
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
                                    text: `${Yeamin} Tk add her account.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            serError("Please Enter Value")
        }


    }


    const handleTanjur = () => {
        serError("")
        const currentUser = user.displayName;
        const currentEmail = user.email;
        const Id = "683ec0a119dc186693eeba91"
        const Tanjur = tanjurRef.current.value;
        const blance = { [formattedDate]: [Tanjur, currentUser, currentEmail] }
        // console.log(blance)

        if (Tanjur) {
            Swal.fire({
                title: `Hay, ${currentUser}`,
                html: `
            <p style="margin-bottom: 16px; font-size: 24px; color: #008000;"><strong>Are you sure?</strong></p>
                <p><strong>Md Tanjur:</strong> <strong style="color: #e53935"> ${Tanjur} Tk</strong> </p>
                <P>Add her account</P>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch(`http://localhost:5000/addblance/${Id}`, {
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
                                    text: `${Tanjur} Tk add her account.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        } else {
            serError("Please Enter Value")
        }

    }


    return (
        <div className="card bg-base-100 w-full max-w-md mx-auto shrink-0 shadow-2xl">
            <form className="card-body ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Md Nahid</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='nahid' placeholder="Add Nahid account" className="input input-bordered" ref={nahidRef} required />
                        <button onClick={handleNahid} type='button' className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Johir Ahammed</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='johir' placeholder="Add Johir account" className="input input-bordered" ref={johirRef} required />
                        <button type='button' onClick={handleJohir} className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Md Azis</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='azis' placeholder="Add Azis account" className="input input-bordered" ref={azisRef} required />
                        <button type='button' onClick={handleAzis} className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Md Yeamin</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='yeamin' placeholder="Add Yeamin account" className="input input-bordered" ref={yeaminRef} required />
                        <button type='button' onClick={handleYeamin} className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Md Tanjur</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='tanjur' placeholder="Add Tanjur account" className="input input-bordered" ref={tanjurRef} required />
                        <button type='button' onClick={handleTanjur} className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
                <div className="form-control mt-6 flex justify-center">
                    <p className='text-xl text-red-400 text-center' >{error}</p>
                </div>
            </form>
        </div>
    );
};

export default AddMoney;