import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import React, {Component} from 'react'

export default class ModalFormEvent extends Component {

  state={ 
      title: "",
      start: "",
      end: "" 
    }

  handleChange = (e) => this.setState({
      title: e.target.value,
      start: e.target.value,
      end: e.target.value,
    })

  render(){
    return(
        <>
      <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
      >
      </div>
      <Modal 
      //double check this
        show={this.props.isOpen} 
        onHide={this.props.closeModal}
      >
      <Modal.Header closeButton>
        <Modal.Title>Modal Form Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group >
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.title} placeholder="title input"/>  
              <Form.Label>Start: </Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.start} placeholder="Start date and time input"/> 
              <Form.Label>End: </Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.end} placeholder="End date and time input"/>          
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={() => this.props.handleSubmit}>
              Submit
          </Button>
      </Modal.Footer>
    </Modal>
    </>
    )
  }
}