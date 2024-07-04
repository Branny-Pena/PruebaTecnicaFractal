import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProductView = () => {
	let navigate = useNavigate();
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		active: true,
	});

	const { name, description, price, active } = product;

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setProduct({
			...product,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const saveProduct = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:8000/products", product);
		navigate("/view-products");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5">Add Product</h2>
			<form onSubmit={saveProduct}>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="name">
						Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="name"
						id="name"
						required
						value={name}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="description">
						Description
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="description"
						id="description"
						required
						value={description}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="price">
						Price
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						step="0.01"
						name="price"
						id="price"
						required
						value={price}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="active">
						Active
					</label>
					<input
						className="form-check-input"
						type="checkbox"
						name="active"
						id="active"
						checked={active}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button type="submit" className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link to="/view-products" className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddProductView;
