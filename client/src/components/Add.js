import React, { Component } from "react";
import GoodsDataService from "../services/goods.service";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      name: "",
      crm_id: null,
      published: false,
      submitted: false,
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveProduct() {
    var data = {
      name: this.state.name,
      crm_id: this.state.crm_id,
    };

    GoodsDataService.create(data)
      .then((response) => {
        this.setState({
          name: response.data.name,
          crm_id: response.data.crm_id,
          published: response.data.published,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    this.retrieveGoods();
    this.setRedirect();
  }

  newProduct() {
    this.setState({
      name: "",
      crm_id: null,
      published: false,
      submitted: false,
    });
  }

  retrieveGoods() {
    GoodsDataService.getAll()
      .then((response) => {
        this.setState({
          goods: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item mr-2">
                  <Link to={"/"} class="btn btn-dark">
                    <i class="fas fa-list-ul"></i> List of goods
                  </Link>
                </li>
                <li class="nav-item active">
                  <Link to={"/add"} class="btn btn-success">
                    <i class="fas fa-plus"></i> Add
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container mt-5">
          <div class="row">
            <div class="col-6 mx-auto">
              <form>
                {this.state.submitted ? (
                  <div>
                    <h4>You submitted successfully!</h4>
                    <button
                      className="btn btn-success"
                      onClick={this.newProduct}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.state.name}
                        onChange={this.onChange}
                        name="name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="crm_id">CRM ID</label>
                      <input
                        type="number"
                        className="form-control"
                        id="crm_id"
                        required
                        value={this.state.crm_id}
                        onChange={this.onChange}
                        name="crm_id"
                      />
                    </div>
                    {this.renderRedirect()}
                    <button
                      type="submit"
                      onClick={this.saveProduct}
                      class="btn btn-primary btn-block"
                    >
                      Add
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
