import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Mess = () => {
    const { user } = useContext(AuthContext);
    const [messBorder, setMessBorder] = useState([]);
    const [error, setErr] = useState("")
    const [reload, setReload] = useState(false)

    const handlemess = (e) => {
        e.preventDefault();
        const date = new Date();
        const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        const messName = e.target.name.value;
        const borderName = user?.displayName;
        const creatorEmail = user?.email;
        const borderEmail = user?.email;
        const role = "creator"
        const entryDate = formatted;
        const border = { messName, borderName, entryDate, role, creatorEmail, borderEmail, account: {} }
        // console.log(border);
        axios.post(`http://localhost:5000/addmess`, border, {})
            .then(res => {
                console.log(res.data);
                setReload(true);
                if (res.data?.creator) {
                    setErr(res.data?.creator || "Only one mess can contain a person")
                } else {
                    setErr("")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/crteatormess`, {
            params: {
                email: user?.email
            }
        })
            .then(res => {
                // console.log(res.data)
                setMessBorder(res.data);
                setReload(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [reload])
    return (
        <div className=''>
            <div className="card bg-base-100 w-full max-w-sm mx-auto mt-5 shrink-0 shadow-2xl">
                <form onSubmit={handlemess} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Create a new mess</span>
                        </label>
                        <input type="text" name='name' placeholder="Mess Name" className="input input-bordered" required />
                        <p className='text-red-500 text-center'>{error}</p>
                    </div>

                    <div className="form-control flex justify-center mt-6">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
            <div className="divider"></div>
            <h2 className='text-xl text-center mb-3'>My Existing Mess</h2>

            <div className="flex flex-col w-full items-center gap-2">
                {
                    messBorder.map((border, index) => <Link className='border p-2 bg-lime-800 rounded text-center w-11/12 md:w-1/2 mx-auto' key={index} to={`/thismess/${border._id}`}><p className=''> {border.messName}</p></Link>)
                }
            </div>
        </div>
    );
};

export default Mess;