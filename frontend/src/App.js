import { useState, useEffect } from 'react';
import logo from './img/polkadot-logo.png';
import MonitorAccountCreate from './components/MonitorAccountCreate';
import MonitorAccountList from './components/MonitorAccountList';
import axios from 'axios';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        const response = await axios.get('http://localhost:3001/accounts');

        setAccounts(response.data);
    };

    const createAccount = async (address, threshold) => {
        try {
            const response = await axios.post('http://localhost:3001/accounts', {
                address,
                threshold
            });

            if (response.status === 201) {
                const updatedAccounts = [
                    ...accounts,
                    { address, threshold }
                ];
                setAccounts(updatedAccounts);
            }
        }
        catch (err) {
            showError(`ADDRESS: ${address}, ERROR: ${err.message} - One reason can be that you are trying to insert addresses that are already in the db.`);
        }

    };

    const showError = (message) => {
        setErrorMessage(message);
        setTimeout(() => { setErrorMessage(''); }, 5000);
    };


    return <div className='app' >
        <img alt='logo polkadot' src={logo} width={400} height={400} />
        {errorMessage && (
            <strong className='message-header'> {errorMessage} </strong>
        )}
        <MonitorAccountCreate
            onCreate={createAccount}
            onError={showError}
        />
        <MonitorAccountList accounts={accounts} />
    </div>;
}

export default App;;