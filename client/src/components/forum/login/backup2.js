import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './style.css'
import { browserHistory, Redirect, Switch } from 'react-router';
import axios from 'axios'
class loginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  login(){
    axios({
      method: 'post',
      url: '/api/users/login',
      data: this.state,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response){
      alert(response.data)
      // localStorage.setItem("userID", response.data.user_id);
      // localStorage.setItem("name",response.data.name);
      // localStorage.setItem("token",response.data.token);
      // localStorage.setItem("admin",responseJSON.admin)
    }).catch((error)=>{alert(error)})
  
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render(){
    return (
      <div className="container Login">
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="username" bsSize="large">
        <ControlLabel>Username</ControlLabel>
        <FormControl

          autoFocus
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
        />
      </FormGroup>
      <form className="form-inline justify-content-between">
          <Button className="button btn-primary"
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          onClick={this.login.bind(this)}
          >
          Login
          </Button>
          <Button className=" button btn-primary"
          block
          bsSize="large"
          >
          <Link className="link" to='/register'>Register</Link>
          </Button>
      </form>
    </form>
  </div>)
  }
}

export default class Login extends Component {
    constructor(props){
      super(props);
      const status = localStorage.getItem("userID")!=null?true:false;
      this.state={
        status: status
      }
      // console.log(this.state.status);
    }

    render() {
      if(this.state.status) return <Redirect to='/forum'/>          
     
        return(
          <div>
            <Route path='/login' component={loginForm}></Route>
          </div>
        )
      }
    }
  