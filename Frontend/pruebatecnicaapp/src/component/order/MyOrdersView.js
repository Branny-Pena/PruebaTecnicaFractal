import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa'
import { Link } from "react-router-dom";
import axios from 'axios';

const BuyOrderView = () => {
    const [buyOrders, setBuyOrders] = useState([]);

    useEffect(() => {
        loadBuyOrders();
    }, []);

    const loadBuyOrders = async () => {
        try {
            const result = await axios.get('http://localhost:8000/buyOrders', {
                validateStatus: () => {
                    return true;
                }
            });
            setBuyOrders(result.data);
        } catch (error) {
            console.error("Error loading buy orders:", error);
        }
    };

    return (
        <section>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Number of Products</th>
                        <th>Final Price</th>
                        <th colSpan='1'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {buyOrders.map((buyOrder, index) => (
                        <tr key={buyOrder.buyOrderId}>
                            <th scope="row">{index + 1}</th>
                            <td>{new Date(buyOrder.date).toLocaleDateString()}</td>
                            <td>{buyOrder.numberOfProducts}</td>
                            <td>{buyOrder.finalPrice}</td>
                            <td className='mx-2'>
                                <Link to = {`/add-order/${buyOrder.buyOrderId}`} className='btn btn-info'>
                                    <FaEye />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default BuyOrderView;
