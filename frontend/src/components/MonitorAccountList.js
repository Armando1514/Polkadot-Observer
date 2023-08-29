import MonitorAccountShow from './MonitorAccountShow';

function MonitorAccountList({ accounts }) {
  const renderAccounts = accounts?.map((account) => {
    return <MonitorAccountShow key={account._address} account={account} />;
  });
  return <div className="monitor-account-list">{renderAccounts}</div>;
}

export default MonitorAccountList;
