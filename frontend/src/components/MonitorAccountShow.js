function MonitorAccountShow({ account }) {
    return <div className='monitor-account-show'>
        <div>
            <h3>Address</h3>
            <strong>{account.address}</strong>
        </div>
        <div>
            <h3>Threshold</h3>
            <strong>{account.threshold}</strong>
        </div>
    </div>;

}

export default MonitorAccountShow;