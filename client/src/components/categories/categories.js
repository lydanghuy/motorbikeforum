import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class Categories extends Component{
    render(){
        return(
            <div className="row category">
                <div className="col-lg-4 col-md-12">
                    <Link to='/categories/scooter'>
                        <img className="img-fluid" src={require('./scooter.jpg')}/>
                        <div className="info">
                            SCOOTERS
                        </div>
                    </Link>
                </div>
                <div className="col-lg-4 col-md-12">
                    <Link to='/categories/underbone'>
                        <img className="img-fluid" src={require('./underbone.jpg')}/>
                        <div className="info">
                            UNDERBONE
                        </div>
                    </Link>
                </div>
                <div className="col-lg-4 col-md-12">
                    <Link to='/categories/sportbike'>
                        <img className="img-fluid" src={require('./motorbike.jpg')}/>
                        <div className="info">
                            MOTORBIKE
                        </div>
                    </Link>
                </div>
            </div>
            
        )
    }
}

export default Categories