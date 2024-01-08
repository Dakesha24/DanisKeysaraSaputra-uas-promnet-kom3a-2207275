import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import backgroundImage from '../assets/gambar-daun.jpg';

const AdminHomeComponent = () => {
  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundColor: 'rgb(0, 0, 0)',
        margin: '0',
      }}
    >
      <div className="overlay"></div>
      <div className="row w-100 text-white align-items-center">
        <div className="col-md-6 text-left">
          <h1 className="display-4 mb-3" style={{ color: 'rgb(255, 255, 0)', fontWeight: 'bold' }}>
            DanisStore Admin
          </h1>
          <Typist
            className="lead"
            cursor={{ show: true }}
            startDelay={1000}
            loop
          >
            Welcome, Admin. Lets manage your inventory!
            <Typist.Backspace count={100} delay={1000} />
          </Typist>
          <div className="d-flex flex-column align-items-start mt-3">
            <Link to="/items" className="btn btn-primary btn-lg mb-2">
              Manage Inventory
            </Link>
          </div>
          <div className="text-left mt-4">
            <p className="mb-1" style={{ color: 'rgb(255, 255, 255)' }}>
              Need assistance?
            </p>
            <a href="mailto:support@example.com" style={{ color: 'rgb(255, 255, 0)' }}>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeComponent;
