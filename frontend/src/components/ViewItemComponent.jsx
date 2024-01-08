import React, { Component } from "react";
import ItemService from "../services/ItemService";
import { FaLeaf, FaArrowLeft } from "react-icons/fa";

class ViewItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      item: {},
    };
  }

  componentDidMount() {
    ItemService.getItemById(this.state.id).then((res) => {
      this.setState({ item: res.data });
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card p-4">
          <div className="d-flex align-items-center mb-4">
            <FaLeaf className="mr-2" style={{ fontSize: "2rem" }} />
            <h3 className="text-center mb-0">View Item Details</h3>
          </div>
          <div className="row">
            <label className="col-3">Nama Barang:</label>
            <div className="col-9"> {this.state.item.nama_barang}</div>
          </div>
          <div className="row">
            <label className="col-3">Jumlah:</label>
            <div className="col-9"> {this.state.item.jumlah}</div>
          </div>
          <div className="row">
            <label className="col-3">Harga Satuan:</label>
            <div className="col-9"> {this.state.item.harga_satuan}</div>
          </div>
          <div className="row">
            <label className="col-3">Lokasi:</label>
            <div className="col-9"> {this.state.item.lokasi}</div>
          </div>
          <div className="row">
            <label className="col-3">Deskripsi:</label>
            <div className="col-9"> {this.state.item.deskripsi}</div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/items")}
              >
                <FaArrowLeft className="mr-2" />
                Back to Items
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewItemComponent;
