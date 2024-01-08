import React, { Component } from "react";
import ItemService from "../services/ItemService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FaLeaf, FaSave, FaTimes } from "react-icons/fa";

class CreateItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: "",
      harga_satuan: "",
      lokasi: "",
      deskripsi: "",
    };

    this.changeNama_Barang = this.changeNama_Barang.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeHarga_Satuan = this.changeHarga_Satuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateItem = this.saveOrUpdateItem.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      ItemService.getItemById(this.state.id).then((res) => {
        let item = res.data;
        this.setState({
          nama_barang: item.nama_barang,
          jumlah: item.jumlah,
          harga_satuan: item.harga_satuan,
          lokasi: item.lokasi,
          deskripsi: item.deskripsi,
        });
      });
    }
  }

  saveOrUpdateItem(e) {
    e.preventDefault();
    let item = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      ItemService.createItem(item).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Data berhasil ditambahkan ke database!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.props.history.push("/items");
        });
      });
    } else {
      ItemService.updateItem(item, this.state.id).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Data berhasil diperbarui!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.props.history.push("/items");
        });
      });
    }
  }

  changeNama_Barang(event) {
    this.setState({ nama_barang: event.target.value });
  }

  changeJumlah(event) {
    this.setState({ jumlah: event.target.value });
  }

  changeHarga_Satuan(event) {
    this.setState({ harga_satuan: event.target.value });
  }

  changeLokasi(event) {
    this.setState({ lokasi: event.target.value });
  }

  changeDeskripsi(event) {
    this.setState({ deskripsi: event.target.value });
  }

  cancel() {
    this.props.history.push("/items");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center text-white bg-primary p-3 mb-3 rounded">
        <FaLeaf className="mr-2" /> Add New Item
      </h3>
    ) : (
      <h3 className="text-center text-white bg-warning p-3 mb-3 rounded">
        <FaLeaf className="mr-2" /> Update Item
      </h3>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                {this.getTitle()}
                <form>
                  <div className="form-group">
                    <label htmlFor="nama_barang">Item Name:</label>
                    <input
                      type="text"
                      id="nama_barang"
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNama_Barang}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="jumlah">Quantity:</label>
                    <input
                      type="number"
                      id="jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changeJumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="harga_satuan">Unit Price:</label>
                    <input
                      type="number"
                      id="harga_satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHarga_Satuan}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lokasi">Location:</label>
                    <input
                      type="text"
                      id="lokasi"
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deskripsi">Description:</label>
                    <textarea
                      id="deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-block"
                    onClick={this.saveOrUpdateItem}
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    className="btn btn-danger btn-block mt-2"
                    onClick={this.cancel}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateItemComponent;
