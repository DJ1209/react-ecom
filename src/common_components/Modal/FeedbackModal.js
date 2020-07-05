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
import { submitFeedback } from "../../api/api";

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: {
        feedback_name: "",
        feedback_msg: "",
        feedback_date: new Date(),
        user_rating: ""
      }
    };
  }
  onChange(e) {
    const { feedback } = this.state;
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState({ feedback: { ...feedback, ...obj } });
  }
  submitFeedback() {
    const { feedback } = this.state;
    const { product_id, close } = this.props;
    submitFeedback({
      ...feedback,
      product_id,
      user_id: localStorage.getItem("user_id")
    })
      .then(() => {
        toastSuccess("Feedback sent!");
        close(false);
      })
      .catch(err => {
        toastError(get(err, "message") || "Oops! Something went wrong");
      });
  }

  render() {
    const { toggle, close } = this.props;
    const { feedback } = this.state;

    return (
      <Modal isOpen={toggle}>
        <ModalHeader>
          <h3>Feedback Form</h3>
        </ModalHeader>
        <ModalBody>
          <CommonInput
            type="text"
            label="Feedback name"
            value={feedback.feedback_name}
            id="feedback_name"
            onChange={e => this.onChange(e)}
          />
          <CommonInput
            type="text"
            label="Feedback"
            value={feedback.feedback_msg}
            id="feedback_msg"
            onChange={e => this.onChange(e)}
          />
          <CommonInput
            type="number"
            label="Rating"
            placeholder="Out of 5"
            value={feedback.user_rating}
            id="user_rating"
            onChange={e => this.onChange(e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => close(false)}>Close</Button>
          <Button onClick={() => this.submitFeedback()} color="success">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default FeedbackModal;
