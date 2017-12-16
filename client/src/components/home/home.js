import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Home extends Component {
    render(){
        return(
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <Link to="/categories/1"><img className="d-block img-fluid mx-auto" src={ require('./img/1.jpg')} alt="First slide"/></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to="/categories/2"><img className="d-block img-fluid mx-auto" src={ require('./img/2.jpg')} alt="First slide"/></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to="/categories/4"><img className="d-block img-fluid mx-auto" src={ require('./img/3.jpg')} alt="First slide"/></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to="/categories/5"><img className="d-block img-fluid mx-auto" src={ require('./img/4.png')} alt="First slide"/></Link>
                        </div>
                        <div className="carousel-item">
                            <Link to="/categories/6"><img className="d-block img-fluid mx-auto" src={ require('./img/5.jpg')} alt="First slide"/></Link>
                        </div>

                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Home