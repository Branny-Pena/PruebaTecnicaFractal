import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetailView = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/buyOrders/${id}`, {
                validateStatus: () => {
                    return true;
                }
            });
            if(result.status === 404) {
                navigate("/add-order");
            }
            setOrder(result.data);
        } catch (error) {
            console.error("Error loading order:", error);
            setError("Error loading order. Please try again later.");
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="col-sm-10 py-2 px-5 offset-1 shadow">
            <h2 className="mt-5">Order Details</h2>
            <div className="mb-3">
                <h4>Order ID: {order.buyOrderId}</h4>
                <h4>Total Amount: ${order.finalPrice}</h4>
                <h4>Number of Products: {order.numberOfProducts}</h4>
                <h4>Date: {order.date}</h4>
            </div>
            <div className="mb-3">
                <Link to={`/edit-order/${order.buyOrderId}`} className="btn btn-primary">
                    Edit Order
                </Link>
            </div>
            {order.buyOrdersProduct && order.buyOrdersProduct.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.buyOrdersProduct.map((item) => (
                            <tr key={item.buyOrderProduct_id}>
                                <td>{item.product.product_id}</td>
                                <td>{item.product.name}</td>
                                <td>{item.product.description}</td>
                                <td>${item.product.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No products found for this order.</div>
            )}
        </div>
    );
};

export default OrderDetailView;
