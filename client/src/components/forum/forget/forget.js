import React, { Component } from 'react'
import './style.css'
import axios from 'axios'
export default class Forget extends Component {
    constructor(props){
        super(props);
        this.state={
            emailForget: ""
        }
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    
    forget(){
        axios({
            method: 'post',
            data:{
                email: this.state.emailForget
            },
            url: '/api/users/forgot'
        }).then(()=>{
            alert("Request has been sent to" + this.state.emailForget);
            window.location.assign("https://motorbikeforum.herokuapp.com/forum")
        }).catch((error)=>{
            alert("please check your email again")
        })
    }

    render(){
        return(
            <div className="emailrow">
                <div>Please enter your email</div>
                <div className="row">
                    <input type="email" className="email-forget" id="emailForget" placeholder="Please enter your email" value={this.state.email} onChange={this.handleChange}></input>
                    <div className="btn btn-primary ml-2" onClick={this.forget.bind(this)}>Verify</div>
                </div>
            </div>
        )
    }
}