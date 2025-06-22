import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import axios from 'axios';

const CostInfo = () => {
    const { user, borderC } = useContext(AuthContext);
    const [borders, setBorders] = useState([]);
    const [tcost, setTCost] = useState(null);
    // let totalCost; 
    useEffect(() => {
        axios.get(`http://localhost:5000/addmoneyspecific`, {
            params: {
                useremail: user?.email
            }
        })
            .then(res => {
                // console.log(res.data);
                setBorders(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:5000/totalcost", {
            params: {
                userMail: user?.email
            }
        })
            .then(res => {
                // console.log(res.data);
                setTCost(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className='flex flex-col items-center'>
            <div className="overflow-x-auto w-11/12 mx-auto md:w-4/5">
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
                                    <div >
                                        <p className="text-sm sm:text-xl ">{border.borderName}</p>
                                        <p className='text-xs'>{border?.borderEmail}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm sm:text-xl "> {Object.entries(border?.account).map(([key, value], idx) => (
                                        <p className='text-lg font-bold' key={idx}>{key.slice(0, 5)} : <span className='text-blue-800 text-lg'>{value[0]}</span> <br></br> <span className='text-xs text-blue-900'>{value[1].split(" ").slice(0, 2).join(" ")}</span></p>
                                    ))}</div>
                                </td>
                                <td className='text-center'>
                                    <div className="text-lg font-bold sm:text-xl text-blue-500"> {
                                        Object.entries(border?.account || {}).reduce((acc, [key, value]) => {
                                            return acc + parseInt(value[0], 10); // 10 is decemel number;
                                        }, 0)
                                    } <br></br> <span className='text-red-300 text-sm'> -{(tcost / borderC).toFixed(0)}</span>
                                    </div>

                                    {

                                        (Object.entries(border?.account || {}).reduce((acc, [key, value]) => {
                                            return acc + parseInt(value[0], 10); // 10 is decemel number;
                                        }, 0) - (tcost / borderC)).toFixed(1)

                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default CostInfo;