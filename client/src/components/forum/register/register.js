import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './style.css'
export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        firstname:"",
        lastname:"",
        email:""
      };
    }

    validateForm() {
      return this.state.email.length>0 && this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.username.length > 0 && this.state.password.length > 5 ;
    }
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    async register(){
      let response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      let responseJSON = await response.json();
    
      if (responseJSON.success) {
        alert("success");
        window.location.assign("https://motorbikeforum.herokuapp.com/login")
        // console.log(userid);
        // console.log(localStorage.getItem("userID"));
      }
      else alert("Your username has been already registered.")
    }

    handleSubmit = event => {
      event.preventDefault();
      this.register();
    }
  
    render() {
      return (
        <div className="container Login">
          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstname" bsSize="large">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                autoFocus
                type="textt"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="lastname" bsSize="large">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
               
                type="text"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="at least 6 characters"
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                value={this.state.email}
                onChange={this.handleChange}
                componentClass='input'
                type="email"
                placeholder="jane.doe@example.com"
              />
            </FormGroup>
            <Button className="su-btn mx-auto button btn-primary"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
            Sign up
            </Button>
                
          </form>
        </div>
      );
    }
  }