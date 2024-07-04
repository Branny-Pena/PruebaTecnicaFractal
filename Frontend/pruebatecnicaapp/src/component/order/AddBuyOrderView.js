import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBuyOrderView = () => {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const result = await axios.get('http://localhost:8000/products', {
                validateStatus: () => {
                    return true;
                }
            });
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
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
        setSelectedProducts([
            ...selectedProducts,
            { product: product, quantity: 1 },
        ]);
    };

    const removeProduct = (index) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    };

    const saveBuyOrder = async (e) => {
        e.preventDefault();
        const buyOrder = { buyOrdersProduct: selectedProducts };
        try {
            await axios.post("http://localhost:8000/buyOrders", buyOrder);
            navigate("/my-orders");
        } catch (error) {
            console.error("There was an error saving the buy order!", error);
        }
    };

    return (
        <div className="col-sm-10 py-2 px-5 offset-1 shadow">
            <h2 className="mt-5">Add Buy Order</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={saveBuyOrder}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="productTable">
                        Available Products
                    </label>
                    <table className="table table-bordered" id="productTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.product_id}>
                                    <td>{product.product_id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                handleProductSelect(product)
                                            }
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedProducts.length > 0 && (
                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="selectedProducts">
                            Selected Products
                        </label>
                        <table className="table table-bordered" id="selectedProducts">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((selectedProduct, index) => (
                                    <tr key={selectedProduct.product.product_id}>
                                        <td>{selectedProduct.product.product_id}</td>
                                        <td>{selectedProduct.product.name}</td>
                                        <td>{selectedProduct.product.description}</td>
                                        <td>{selectedProduct.product.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name="quantity"
                                                min="1"
                                                value={selectedProduct.quantity}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => removeProduct(index)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">
                            Save
                        </button>
                    </div>

                    <div className="col-sm-2">
                        <Link to="/my-orders" className="btn btn-outline-warning btn-lg">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBuyOrderView;
