import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CustomerList from './components/CustomerDetails';
import CustomerForm from './components/CustomerForm';
import Home from './components/Home';
import NotFound from './components/NotFound';
import OrderList from './components/OrderDetails';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';


function App() {

  return (
    <div className="app-container">
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/customers' element={<CustomerList />} />
      <Route path='/add-customer' element={<CustomerForm />} />
      <Route path='/edit-customer/:id' element={<CustomerForm />} />
      <Route path='/orders' element={<OrderList />} /> {/* Add route for orders */}
      <Route path='/products' element={<ProductList />} /> {/* Add route for products */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
);
}

export default App;