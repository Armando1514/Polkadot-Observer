import { useState } from 'react';
import logo from './img/polkadot-logo.png';
import MonitorAccountCreate from './components/MonitorAccountCreate';
import MonitorAccountList from './components/MonitorAccountList';

function App() {
    const [accounts, setAccounts] = useState([]);

    const createAccount = (address, threshold) => {
        const updatedAccounts = [
            ...accounts,
            { address, threshold }
        ];
        setAccounts(updatedAccounts);
    };
    const showError = () => {
        alert('You have to insert a correct address and numeric threshold!');
    };


    return <div className='app' >
        <img alt='logo polkadot' src={logo} width={400} height={400} />
        <MonitorAccountCreate
            onCreate={createAccount}
            onError={showError}
        />
        <MonitorAccountList accounts={accounts} />
    </div>;
}

export default App;;