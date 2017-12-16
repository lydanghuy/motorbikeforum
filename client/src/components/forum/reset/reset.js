import React, { Component } from 'react'
import './style.css'
import axios from 'axios'
export default class Reset extends Component{
    constructor(props){
        super(props);
        this.state={
            password: ""
        }
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    
    reset(){
        axios({
            method: 'post',
            url: '/api/users/reset/'+this.props.match.params.resettoken,
            data: this.state
        }).then(()=>{
            alert("Your password has been changed")
            window.location.assign("https://motorbikeforum.herokuapp.com/login")
        }).catch((error)=>{
            alert("Time out")
        })
    }

    render(){
        
        return(
            <div className="resetrow">
                <div>Enter your new Password</div>
                <div className="row ">
                    <input className="ml-3 " type="password" id="password" onChange={this.handleChange} value={this.state.newPass} placeholder="Your new password..."></input>
                    <div className="btn btn-primary ml-2" onClick={this.reset.bind(this)}>Verify</div>
                </div>
            </div>
        )
    }
}