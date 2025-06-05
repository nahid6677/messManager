import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CostUpdate = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            cost
        </div>
    );
};

export default CostUpdate;