import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					Fractal
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								className="nav-link active"
								aria-current="page"
								to={"/my-orders"}>
								View my Orders
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to={"/add-order"}>
								Add new order
							</Link>
						</li>
            <li className="nav-item">
							<Link
								className="nav-link"
								to={"/view-products"}>
								View all products
							</Link>
						</li>
            <li className="nav-item">
							<Link
								className="nav-link"
								to={"/add-product"}>
								Add new product
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;