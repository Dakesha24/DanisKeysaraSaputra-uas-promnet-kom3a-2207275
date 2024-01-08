import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShoppingCart, FaPlus } from 'react-icons/fa';

const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#28a745' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FaLeaf className="mr-2" style={{ fontSize: '1.5rem' }} />
          <span className="font-weight-bold">GreenFertilizer</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/items" className="nav-link">
                <FaShoppingCart className="mr-1" />{' '}
                <span className="font-weight-bold">View Items</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-item/_add" className="nav-link">
                <FaPlus className="mr-1" />{' '}
                <span className="font-weight-bold">Add Item</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
