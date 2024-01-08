import React, { Component } from 'react';
import ItemService from '../services/ItemService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaEdit, FaSearch, FaEye, FaTrashAlt, FaPlus, FaLeaf } from 'react-icons/fa';

class ListItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      search: '',
    };

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    ItemService.getItems().then((res) => {
      if (res.data == null) {
        this.props.history.push('/add-item/_add');
      }
      this.setState({ items: res.data });
    });
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        ItemService.deleteItem(id).then((res) => {
          this.fetchItems();
          Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
        });
      }
    });
  }

  addItem() {
    this.props.history.push('/add-item/_add');
  }

  editItem(id) {
    this.props.history.push(`/add-item/${id}`);
  }

  viewItem(id) {
    this.props.history.push(`/view-item/${id}`);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const maxDescriptionLength = 50;

    const filteredItems = this.state.items.filter((item) =>
      item.nama_barang.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <FaLeaf className="mr-2" />
          Plant & Fertilizer List
        </h2>
        <div className="row mb-3">
          <div className="col-md-8 mb-2">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by Item Name"
                value={this.state.search}
                onChange={this.handleSearchChange}
                className="form-control custom-search"
                style={{ borderWidth: '2px' }}
              />
              <div className="input-group-append">
                <span className="input-group-text custom-search-icon">
                  <FaSearch />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success" onClick={this.addItem}>
              <FaPlus className="mr-1" /> Add Item
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered custom-table">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td>{item.id}</td>
                    <td>{item.nama_barang}</td>
                    <td>{item.jumlah}</td>
                    <td>Rp {item.harga_satuan.toLocaleString()}</td>
                    <td>{item.lokasi}</td>
                    <td>
                      {item.deskripsi.length > maxDescriptionLength
                        ? `${item.deskripsi.substring(0, maxDescriptionLength)}...`
                        : item.deskripsi}
                    </td>
                    <td className="action-buttons d-flex justify-content-center">
                      <button
                        onClick={() => this.editItem(item.id)}
                        className="btn btn-primary btn-sm edit-btn"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => this.deleteItem(item.id)}
                        className="btn btn-danger btn-sm delete-btn mx-2"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                      <button
                        onClick={() => this.viewItem(item.id)}
                        className="btn btn-warning btn-sm view-btn"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItemComponent;