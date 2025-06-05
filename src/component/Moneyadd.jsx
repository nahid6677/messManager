import React from 'react';

const Moneyadd = () => {
    const handleAllSubmit = ( ) =>{

    }
    const handleNahid = () =>{
        
    }
    return (
        <div className="card bg-base-100 w-full max-w-md mx-auto shrink-0 shadow-2xl">
            <form onSubmit={handleAllSubmit} className="card-body ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Md Nahid</span>
                    </label>
                    <div className="flex gap-2">
                        <input type="number" name='nahid' placeholder="Add Nahid account" className="input input-bordered"  required />
                        <button onClick={handleNahid} type='button' className='btn btn-active btn-primary'>add</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Moneyadd;