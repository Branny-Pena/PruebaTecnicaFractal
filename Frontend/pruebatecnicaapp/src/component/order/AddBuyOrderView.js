import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from "axios";

const AddEditBuyOrderView = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [editProductIndex, setEditProductIndex] = useState(null);
    const [deleteProductIndex, setDeleteProductIndex] = useState(null);
    const [newProduct, setNewProduct] = useState({ product: null, quantity: 1 });
    const [orderDetails, setOrderDetails] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadProducts();
        if (id) {
            validateOrderId(id);
        }
    }, [id]);

    const loadProducts = async () => {
        try {
            const result = await axios.get('http://3.219.110.232:8080/products', {
                validateStatus: () => true
            });
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const validateOrderId = async (orderId) => {
        try {
            const result = await axios.get(`http://3.219.110.232:8080/buyOrders/${orderId}`, {
                validateStatus: () => true
            });
            if (result.data) {
                setOrderDetails(result.data);
                setSelectedProducts(result.data.buyOrdersProduct.map(orderProduct => ({
                    product: orderProduct.product,
                    quantity: orderProduct.quantity
                })));
                setIsEditMode(true);
            } else {
                setIsEditMode(false);
            }
        } catch (error) {
            console.error("Error validating order ID:", error);
            setIsEditMode(false);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value,
        };
        setSelectedProducts(updatedProducts);
    };

    const handleProductSelect = (product) => {
        setNewProduct({ product: product, quantity: 1 });
        setShowModal(true);
    };

    const addOrUpdateProductToOrder = () => {
        if (editProductIndex !== null) {
            const updatedProducts = [...selectedProducts];
            updatedProducts[editProductIndex] = newProduct;
            setSelectedProducts(updatedProducts);
        } else {
            setSelectedProducts([...selectedProducts, newProduct]);
        }
        setShowModal(false);
        setEditProductIndex(null);
    };

    const confirmRemoveProduct = (index) => {
        setDeleteProductIndex(index);
        setShowConfirmDeleteModal(true);
    };

    const removeProduct = () => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(deleteProductIndex, 1);
        setSelectedProducts(updatedProducts);
        setShowConfirmDeleteModal(false);
        setDeleteProductIndex(null);
    };

    const saveBuyOrder = async (e) => {
        e.preventDefault();
        const buyOrder = { buyOrdersProduct: selectedProducts };
        try {
            if (isEditMode) {
                await axios.put(`http://3.219.110.232:8080/buyOrders/${id}`, buyOrder);
            } else {
                await axios.post("http://3.219.110.232:8080/buyOrders", buyOrder);
            }
            navigate("/my-orders");
        } catch (error) {
            console.error("There was an error saving the buy order!", error);
        }
    };

    const totalProducts = selectedProducts.length;
    const totalPrice = selectedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="col-sm-10 py-2 px-5 offset-1 shadow">
            <h2 className="mt-5">{isEditMode ? "Edit Order" : "Add Order"}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={saveBuyOrder}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="orderNumber">Order #</label>
                    <input type="text" className="form-control" id="orderNumber" value={isEditMode ? id : "Auto-generated"} disabled />
                </div>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="orderDate">Date</label>
                    <input type="text" className="form-control" id="orderDate" value={orderDetails ? orderDetails.date : currentDate} disabled />
                </div>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="productCount"># Products</label>
                    <input type="text" className="form-control" id="productCount" value={totalProducts} disabled />
                </div>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="finalPrice">Final Price</label>
                    <input type="text" className="form-control" id="finalPrice" value={totalPrice.toFixed(2)} disabled />
                </div>
                <div className="mb-5">
                    <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>Add Product</button>
                </div>
                {selectedProducts.length > 0 && (
                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="selectedProducts">Selected Products</label>
                        <table className="table table-bordered" id="selectedProducts">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((selectedProduct, index) => (
                                    <tr key={selectedProduct.product.product_id}>
                                        <td>{selectedProduct.product.product_id}</td>
                                        <td>{selectedProduct.product.name}</td>
                                        <td>{selectedProduct.product.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={selectedProduct.quantity}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="form-control"
                                                min="1"
                                            />
                                        </td>
                                        <td>{(selectedProduct.product.price * selectedProduct.quantity).toFixed(2)}</td>
                                        <td>
                                            <button type="button" className="btn btn-info" onClick={() => {
                                                setEditProductIndex(index);
                                                setNewProduct(selectedProduct);
                                                setShowModal(true);
                                            }}><FaEdit /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => confirmRemoveProduct(index)}><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">Save</button>
                    </div>
                    <div className="col-sm-2">
                        <Link to="/my-orders" className="btn btn-outline-warning btn-lg">Cancel</Link>
                    </div>
                </div>
            </form>

            {showModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editProductIndex !== null ? "Edit" : "Add"} Product to Order</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="productSelect">Select Product</label>
                                    <select
                                        className="form-control"
                                        id="productSelect"
                                        value={newProduct.product ? newProduct.product.product_id : ""}
                                        onChange={(e) => setNewProduct({ ...newProduct, product: products.find(p => p.product_id === parseInt(e.target.value)) })}
                                        disabled={editProductIndex !== null}
                                    >
                                        <option value="">Select a product</option>
                                        {products.map(product => (
                                            <option key={product.product_id} value={product.product_id}>
                                                {product.name} - ${product.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productQuantity">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="productQuantity"
                                        value={newProduct.quantity}
                                        min="1"
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={addOrUpdateProductToOrder}>{editProductIndex !== null ? "Update" : "Add"} Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmDeleteModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="close" onClick={() => setShowConfirmDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to remove this product from the order?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={removeProduct}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddEditBuyOrderView;
