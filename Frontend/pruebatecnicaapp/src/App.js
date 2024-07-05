import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import ProductView from './component/product/ProductView';
import AddProductView from './component/product/AddProductView.js';
import NavBar from './component/common/NavBar.js'
import Home from './Home.js'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyOrderView from './component/order/MyOrdersView.js';
import OrderDetailView from './component/order/OrderDetailView.js'
import AddEditBuyOrderView from './component/order/AddBuyOrderView.js';
import EditOrderView from './component/order/EditOrderView.js';


function App() {
  return (
    <main className="container mt-5">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path = '/' element = {<Home />}></Route>
          <Route exact path = '/view-products' element = {<ProductView />}></Route>
          <Route exact path = '/add-product' element = {<AddProductView />}></Route>
          <Route exact path = '/my-orders' element = {<BuyOrderView />}></Route>
          <Route exact path = '/add-order/:id' element = {<AddEditBuyOrderView />}></Route>
          <Route exact path = '/add-order' element = {<AddEditBuyOrderView />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
