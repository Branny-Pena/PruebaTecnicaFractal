import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditOrderView = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({ product: null, quantity: 1 });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrder();
        loadProducts();
    }, [id]);

    const loadOrder = async () => {
        try {
            const result = await axios.get(`http://3.81.170.205:8080/buyOrders/${id}`, {
                validateStatus: () => {
                    return true;
                }
            });
            if (result.status === 404) {
                navigate("/add-order");
            }
            setOrder(result.data);
        } catch (error) {
            console.error("Error loading order:", error);
            setError("Error loading order. Please try again later.");
        }
    };

    const loadProducts = async () => {
        try {
            const result = await axios.get('http://3.81.170.205:8080/products', {
                validateStatus: () => {
                    return true;
                }
            });
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
            setError("Error loading products. Please try again later.")
        }
    };

    const handleProductSelect = (e) => {
        const productId = e.target.value;
        const product = products.find(p => p.product_id === parseInt(productId));
        setSelectedProduct({ ...selectedProduct, product });
    };

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        setSelectedProduct({ ...selectedProduct, quantity: parseInt(quantity) });
    };

    const addProductToOrder = () => {
        if (selectedProduct.product && selectedProduct.quantity > 0) {
            setOrder({
                ...order,
                buyOrdersProduct: [...order.buyOrdersProduct, {
                    product: selectedProduct.product,
                    quantity: selectedProduct.quantity,
                    price: selectedProduct.product.price * selectedProduct.quantity
                }]
            });
        }
    };

    const removeProductFromOrder = (index) => {
        const updatedOrder = { ...order };
        updatedOrder.buyOrdersProduct.splice(index, 1);
        setOrder(updatedOrder);
    };

    const saveOrder = async () => {
        console.log(order);
        try {
            const updatedOrder = {
                ...order,
                numberOfProducts: order.buyOrdersProduct.reduce((acc, item) => acc + item.quantity, 0),
                finalPrice: order.buyOrdersProduct.reduce((acc, item) => acc + item.price, 0)
            };
            await axios.put(`http://3.81.170.205:8080/buyOrders/${id}`, order);
            navigate(`/add-order/${id}`);
        } catch (error) {
            console.error("Error saving order:", error);
            setError("Error saving order. Please try again later.");
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
            <h2 className="mt-5">Edit Order</h2>
            <div className="mb-3">
                <h4>Order ID: {order.buyOrderId}</h4>
                <h4>Total Amount: ${order.finalPrice}</h4>
                <h4>Number of Products: {order.numberOfProducts}</h4>
                <h4>Date: {order.date}</h4>
            </div>
            <div className="mb-3">
                <h4>Add Product</h4>
                <select onChange={handleProductSelect} className="form-control">
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.product_id} value={product.product_id}>{product.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    min="1"
                    value={selectedProduct.quantity}
                    onChange={handleQuantityChange}
                    className="form-control mt-2"
                    placeholder="Quantity"
                />
                <input
                    type="text"
                    value={selectedProduct.product ? selectedProduct.product.price : ""}
                    disabled
                    className="form-control mt-2"
                    placeholder="Price"
                />
                <button onClick={addProductToOrder} className="btn btn-success mt-2">Add Product</button>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.buyOrdersProduct.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product.product_id}</td>
                                <td>{item.product.name}</td>
                                <td>{item.product.description}</td>
                                <td>${item.product.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button onClick={() => removeProductFromOrder(index)} className="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No products found for this order.</div>
            )}
            <button onClick={saveOrder} className="btn btn-primary mt-3">Save Order</button>
        </div>
    );
};

export default EditOrderView;
