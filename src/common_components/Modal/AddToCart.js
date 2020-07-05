import React, { Component } from "react";
import {
  Button,
  Row,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup
} from "reactstrap";
import { get } from "lodash";

import CommonInput from "../Input/Input";
import { toastSuccess, toastError } from "../ToastContainer/ToastContainer";
import { addToCart } from "../../api/api";

class AddToCartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCart: {
        qty: 0,
        totalPrice: ""
      }
    };
  }
  onChange(e) {
    const { addCart } = this.state;
    const { product_detail } = this.props;
    const price = get(product_detail, "0.p_price");
    const totalPrice = e.target.value * price;
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState({ addCart: { ...addCart, ...obj, totalPrice } });
  }
  addToCart() {
    const { addCart } = this.state;
    const { product_detail, close } = this.props;
    const detail = get(product_detail, "0");
    addToCart({
      product_id: get(detail, "_id"),
      product_name: get(detail, "p_name"),
     // product_price: get(addCart, "totalPrice"),
     product_price: get(detail, "p_price"),
      qty: get(addCart, "qty"),
      user_id: localStorage.getItem("user_id")
    })
      .then(() => {
        toastSuccess("Added to cart!");
        close(false);
      })
      .catch(err => {
        toastError(get(err, "message") || "Oops! Something went wrong");
      });
  }

  render() {
    const { toggle, close, product_detail } = this.props;
    const { addCart } = this.state;
    const detail = get(product_detail, "0");
    console.log("product_detail", product_detail);
    return (
      <Modal isOpen={toggle}>
        <ModalHeader>
          <h3>Add to cart</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            {" "}
            <Label>{detail.p_name}</Label>
            <Label>Price: {detail.p_price}</Label>
          </div>

          <CommonInput
            type="number"
            label="Quantity"
            value={addCart.qty}
            id="qty"
            min="1"
            max="10"
            onChange={e => this.onChange(e)}
          />
          <Label>
            Price to pay : {addCart.totalPrice ? addCart.totalPrice : 0}
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => close(false)}>Close</Button>
          <Button onClick={() => this.addToCart()} color="success">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddToCartModal;
