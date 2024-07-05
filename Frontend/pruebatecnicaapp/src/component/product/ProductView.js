import {React, useEffect, useState } from 'react';
import axios from 'axios';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const result = await axios.get('http://3.219.110.232:8080/products', {
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

    return (
        <section>
            <table className = 'table table-bordered table-hover'>
                <thead>
                    <tr className = 'text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit price</th>
                    </tr>
                </thead>
                <tbody className = 'text-center'>
                    {products.map((product, index) => (
                        <tr key={product.productId}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ProductView;
