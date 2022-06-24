const Dashboard = () => {
    return (
        <div className="admin-body-content">
            <div className="row">
                <div className="col h-100">
                    <div className="dialog">
                        Hello
                    </div>
                </div>
                <div className="col h-100">
                    <div className="dialog">
                        <h2 className="fw-light">Pending orders</h2>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Full name</th>
                                        <td>2</td>
                                        <td>$67.22</td>
                                        <td>
                                            <select>
                                                <option>Pending</option>
                                                <option>Processing</option>
                                                <option>Fulfilled</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Full name</th>
                                        <td>3</td>
                                        <td>$81.32</td>
                                        <td>
                                            <select>
                                                <option>Pending</option>
                                                <option>Processing</option>
                                                <option>Fulfilled</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Full name</th>
                                        <td>1</td>
                                        <td>$9.99</td>
                                        <td>
                                            <select>
                                                <option>Pending</option>
                                                <option>Processing</option>
                                                <option>Fulfilled</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="dialog">
                        <h2 className="fw-light">Sales this week</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;