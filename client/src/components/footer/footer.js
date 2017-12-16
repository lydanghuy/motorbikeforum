import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
export default class Footer extends Component{
    render(){
        return(
            <div>
                <footer className="w3-center w3-blue " id="myFooter">
                    <div className="w3-xxlarge">Motorbike Forum</div>

                    <div className="container container1">
                        <div className="row">

                            <div className="col-sm-3">
                                <h5>Get started</h5>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/register">Sign up</Link></li>
                                </ul>
                            </div>
                            <div className="col-sm-3 ">
                                <h5>About us</h5>
                                <ul>
                                    <li><Link to="/contact">Contact us</Link></li>
                                </ul>
                            </div>
                            <div className="col-sm-3 ">
                                <h5>Forum</h5>
                                <ul>
                                    <li><Link to="/forum">Forum</Link></li>
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <Link to ="/legal">
                                <h5>Legal</h5>
                                <ul>
                                    <li><a href="#">Terms of Use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                                </Link>
                            </div>
                        </div>
                </div>
                        <p>© 2017 VGU Project Course Team 2 </p>

                </footer>
            </div>
        )
    }
}