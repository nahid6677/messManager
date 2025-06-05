import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import axios from 'axios';

const CostInfo = () => {
    const { user } = useContext(AuthContext);
    const [borders, setBorders] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/allborders`, {})
            .then(res => {
                // console.log(res.data);
                setBorders(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleDeleteBorder = (id) => {
        console.log(id);
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
                }
            })
    }

    return (
        <div className='flex flex-col items-center'>
            <div className="overflow-x-auto w-11/12 mx-auto md:w-3/5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            borders.map((border, idx) => <tr key={idx}>
                                <td>
                                    <div className="text-sm sm:text-xl ">{border.borderName}</div>
                                </td>
                                <td>
                                    <div className="text-sm sm:text-xl "> {Object.entries(border?.account).map(([key, value],idx) => (
                                        <p key={idx}>{key.slice(0, 5)} : <span className='text-blue-300'>{value[0]}</span> <span className='text-xs text-blue-900'>{value[1].slice(0,5)}</span></p>
                                    ))}</div>
                                </td>
                                <td>
                                    <div className="text-sm sm:text-xl text-blue-500"> {
                                        Object.entries(border?.account || {}).reduce((acc, [key, value]) => {
                                           return acc + parseInt(value[0], 10);
                                        },0)
                                    } </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
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
                                    <button onClick={() => handleDeleteBorder(border._id)} className='btn'>Remove</button>
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

export default CostInfo;