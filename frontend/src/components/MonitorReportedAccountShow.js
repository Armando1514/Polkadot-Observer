function MonitorReportedAccountShow({ reportedAccount }) {
  return (
    <div className="monitor-account-show">
      <div>
        <h3>Address</h3>
        <strong className="reported-text">{reportedAccount._address}</strong>
      </div>
      <div>
        <h3>Block Number</h3>
        <strong className="reported-text">
          {reportedAccount._blockNumber}
        </strong>
      </div>
    </div>
  );
}

export default MonitorReportedAccountShow;
