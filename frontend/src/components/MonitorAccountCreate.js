import { useState } from 'react';
import isValidAddressPolkadotAddress from '../utils/validateAddress';

function MonitorAccountCreate({ onCreate, onError }) {
    const [address, setAddress] = useState('');
    const [threshold, setThreshold] = useState('');

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleThresholdChange = (event) => {
        setThreshold(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            address &&
            threshold &&
            !isNaN(Number(threshold)) &&
            isValidAddressPolkadotAddress(address)
        ) {

            onCreate(address, threshold);
            setAddress('');
            setThreshold('');
        }
        else {
            onError();
        }

    };

    return <div className='monitor-account-create'>
        <h3>Add Monitor Account</h3>
        <form onSubmit={handleSubmit} >
            <label>Address</label>
            <input className='input' value={address} onChange={handleAddressChange} />
            <label>Threshold</label>
            <input className='input' value={threshold} onChange={handleThresholdChange} />
            <button className='button' >Create</button>
        </form>
    </div>;
}

export default MonitorAccountCreate;