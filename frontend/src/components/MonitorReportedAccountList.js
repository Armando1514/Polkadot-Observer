import MonitorReportedAccountShow from './MonitorReportedAccountShow';

function MonitorReportedAccountList({ reportedAccounts }) {
  const renderReportedAccounts = reportedAccounts?.map((reportedAccount) => {
    return (
      <MonitorReportedAccountShow
        key={reportedAccounts._address}
        reportedAccount={reportedAccount}
      />
    );
  });

  return (
    <div className="monitor-accounts-reported">
      <h3>FIRING - LIST ACCOUNTS BELOW THRESHOLD</h3>
      <div className="monitor-account-list">{renderReportedAccounts}</div>
    </div>
  );
}

export default MonitorReportedAccountList;
