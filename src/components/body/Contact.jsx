import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Control, Errors, Form, actions } from 'react-redux-form';
import { FormGroup, Button, Label, Col, Alert } from 'reactstrap'
import { baseUrl } from '../../redux/baseUrl';

const mapDispatchToProps = (dispatch) => {
  return {
    resetFeedbackForm: () => {
      dispatch(actions.reset('feedback'))
    }
  }
}

const required = (value) => {
  return (
    value && value.length
  )
}
const isNum = (value) => {
  return (
    !isNaN(Number(value))
  )
}
const validEmail = (value) => {
  return (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  )
}

export class Contact extends Component {
  state = {
    alertShow: false,
    alertText: null,
    alertType: null
  }
  handleSubmit = (values)=>{
    axios.post(baseUrl + 'feedback', values)
    .then((response)=> response.status)
    .then((status)=> {
      if(status === 201){
        this.setState({
          alertShow: true,
          alertText: "Submitted Successfully",
          alertType: "success"
        })
        setTimeout(() => {
          this.setState({
            alertShow: false
          })
        }, 2000);
      }
    })
    .catch((err) => {
      this.setState({
        alertShow: true,
        alertText: err.message,
        alertType: "danger"
      })
      setTimeout(() => {
        this.setState({
          alertShow: false
        })
      }, 2000);
    })
    this.props.resetFeedbackForm();
  }
  render() {
    document.title = `MemorySnaps || Contact`;
    return (
      <div className='container flex justify-around-center text-white'>
        <div className="row row-content" style={{paddingLeft: '20px', textAlign: 'center', justifyContent: 'center' }}>
          <div className="col-12">
          <Alert isOpen={this.state.alertShow} color={this.state.alertType}>{this.state.alertText}</Alert>
            
          </div>
          <div className="col-12 col-md-7 border border-light pt-3 pb-2 ps-3 pe-4" >
            <h3 className='pb-2'>Contact With Us</h3>
            <Form model="feedback"  onSubmit={values => this.handleSubmit(values)}>
              <FormGroup row>
                <Label htmlFor='firstname' md={2}>First Name</Label>
                <Col md={10}>
                  <Control.text model=".firstname" name='firstname' validators={{required}} className="form-control" placeholder='First Name' />
                  <Errors className='text-danger' model=".firstname" show="touched" messages={{required: "Required"}} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='lastname' md={2}>Last Name</Label>
                <Col md={10}>
                  <Control.text model=".lastname" name='lastname' validators={{required}} className="form-control" placeholder='Last Name' />
                  <Errors className='text-danger' model=".lastname" show="touched" messages={{required: "Required"}} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='telnum' md={2}>Phone No</Label>
                <Col md={10}>
                  <Control.text model=".telnum" name='telnum' validators={{required, isNum}} className="form-control" placeholder='Phone No' />
                  <Errors className='text-danger' model=".telnum" show="touched" messages={{required: "Required, ", isNum: "Invalid Number!"}} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='email' md={2}>Email Id</Label>
                <Col md={10}>
                  <Control.text model=".email" name='email' validators={{required, validEmail}} className="form-control" placeholder='Email Address' />
                  <Errors className='text-danger' model=".email" show="touched" messages={{required: "Required, ", validEmail: "Invalid Email!"}} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 6, offset: 1}}>
                  <FormGroup check>
                    <Label check>
                      <Control.checkbox model=".agree" name='agree' className="form-check-input"/> <strong>May we contact you?</strong>
                    </Label>
                  </FormGroup>
                </Col>
        
                <Col md={{size: 3, offset:2}}>
                  <Control.select model=".contactType" name='contactType' className="form-control text-center" >
                    <option>Telephone</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor='message' md={2}>Your feedback</Label>
                <Col md={10}>
                  <Control.textarea model=".message" name='message' validators={{required}} className="form-control" rows='4' />
                  <Errors className='text-danger' model=".message" show="touched" messages={{required: "Required"}} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col md={{size: 10, offset:2}}>
                  <Button type='submit' color='primary'>Send Now</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Contact)