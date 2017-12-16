import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class Header extends Component{
    render(){
        return (
            <div className="">
                <nav className="navstyle navbar navbar-toggleable-md navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse row" id="mainMenu">
                        <div className="col-lg-3 mystyle"><Link className="mystyle" to="/">Home</Link></div>
                        <div className="col-lg-3 mystyle">
                            <Link className="mystyle" to="/categories">Categories</Link>
                        </div>
                        <div className="col-lg-3 mystyle">
                        <div class="dropdown">
                            <div class="dropbtn"><Link to="/forum">Forum</Link></div>
                            <div class="dropdown-content">
                                <a href="/forum/subforum/scooter">Scooter</a>
                                <a href="/forum/subforum/underbone">Underbone</a>
                                <a href="/forum/subforum/sportbike">Motorbike</a>
                                <a href="/forum/subforum/general">General</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3 mystyle"><Link className="mystyle" to="/contact">Contact</Link></div>
                    </div>
                </nav>
                
            </div>
        )
    }
}

export default Header