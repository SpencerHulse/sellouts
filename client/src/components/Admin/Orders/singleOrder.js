// To be used, or not!

import { useParams, Link } from "react-router-dom";
import { useGetOrders } from "../../../hooks/orderHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function SingleOrder() {

    const { orderId } = useParams();
    const params = { orderId };
    const data = useGetOrders(params);

    var order = {}

    if (data) {
        order = data.orders[0];
        console.log(order)
        return (
            <>
            <Link to="/admin/orders/update-orders" className="admin-submenu-button">← Back to Orders</Link>
                <div className="dialog">
                    <p>Order placed on {order.purchaseDate}</p>
                    <h2 className="fw-light">Order #{order._id}</h2>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 dialog">
                            <h3 className="fw-light">Order details</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product name</th>
                                        <th scope="col">Unit price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item) => {

                                        const itemData = item.split("-*-");
                                        const name = itemData[0];
                                        const subtotal = (itemData[1] / 100).toFixed(2);
                                        const quantity = itemData[2];
                                        const unitPrice = (subtotal / quantity).toFixed(2);

                                        return (
                                            <tr>
                                                <td>{name}</td>
                                                <td>${unitPrice}</td>
                                                <td>{quantity}</td>
                                                <td>${subtotal}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <p>Total: ${(order.total / 100).toFixed(2)}</p>
                        </div>
                        <div className="col-sm-12 col-md-4 dialog">
                            <h3 className="fw-light">Shipping</h3>
                            <p>Shipping type: {order.shippingType}</p>
                            <p>Delivery address: <br /> {order.deliveryAddress}</p>
                        </div>
                    </div>
                    <p>Status: {capitalizeFirstLetter(order.status)}</p>
                </div>
            </>
        )
    }

}

export default SingleOrder;