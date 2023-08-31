import { useState, useEffect } from 'react';
import logo from './img/polkadot-logo.png';
import MonitorAccountCreate from './components/MonitorAccountCreate';
import MonitorAccountList from './components/MonitorAccountList';
import MonitorReportedAccountList from './components/MonitorReportedAccountList';

import axios from 'axios';
function App() {
  const [accounts, setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [reportedAccounts, setReportedAccounts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/accounts`);
        if (response.data !== null) {
          setAccounts(response.data);
        }
      } catch (err) {
        console.log(err);
        showError(`ERROR: ${err.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/accounts/reported`);
        if (response.data !== null) {
          setReportedAccounts(response.data);
        }
      } catch (err) {
        console.log(err);
        showError(`ERROR: ${err.message}`);
      }
    })();
  }, [accounts]);

  const createAccount = async (address, threshold) => {
    const check_address = (account) => account._address === address;
    if (accounts.some(check_address)) {
      showError(`ADDRESS: ${address}, already inserted.`);
      return;
    }

    try {
      const response = await axios.post(`/api/v1/accounts`, {
        address,
        threshold,
      });

      if (response.status === 201) {
        const updatedAccounts = [
          ...accounts,
          { _address: address, _threshold: threshold },
        ];
        setAccounts(updatedAccounts);
      }
    } catch (err) {
      console.log(err);
      showError(`ADDRESS: ${address}, ERROR: ${err.message}.`);
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div className="app">
      <img alt="logo polkadot" src={logo} width={400} height={400} />
      {errorMessage && (
        <strong className="message-header"> {errorMessage} </strong>
      )}
      <MonitorAccountCreate onCreate={createAccount} onError={showError} />
      <MonitorAccountList accounts={accounts} />
      <MonitorReportedAccountList reportedAccounts={reportedAccounts} />
    </div>
  );
}

export default App;
