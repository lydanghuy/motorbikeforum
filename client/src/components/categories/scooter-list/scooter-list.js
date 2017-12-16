import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class ScooterList extends Component{
    render(){
        return(
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/1.jpg')}/>
                                <Link to="/categories/1"><h4>Honda Airblade 125cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/2.png')}/>
                                <Link to="/categories/2"><h4>Honda Lead 125cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/3.png')}/>
                                <Link to="/categories/3"><h4>Honda PCX 125cc</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/4.png')}/>
                                <Link to="/categories/4"><h4>Honda SH 125cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/5.jpg')}/>
                                <Link to="/categories/5"><h4>Honda SH Mode 125cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/6.png')}/>
                                <Link to="/categories/6"><h4>Honda Vision 125cc</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/7.jpg')}/>
                                <Link to="/categories/7"><h4>Suzuki Impulse FI</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/8.png')}/>
                                <Link to="/categories/8"><h4>SYM Attila FI</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/9.png')}/>
                                <Link to="/categories/9"><h4>SYM Elite 50</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/10.png')}/>
                                <Link to="/categories/10"><h4>SYM Elizabeth 110</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/11.png')}/>
                                <Link to="/categories/11"><h4>SYM Shark Mini 125EFI </h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/12.png')}/>
                                <Link to="/categories/12"><h4>SYM Venus 125 EFI</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/13.png')}/>
                                <Link to="/categories/13"><h4>Yamaha Arcuzo</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/14.png')}/>
                                <Link to="/categories/14"><h4>Yamaha Grande Deluxe</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/15.png')}/>
                                <Link to="/categories/15"><h4>Yamaha Janus</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/16.png')}/>
                                <Link to="/categories/16"><h4>Yamaha NM-X</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Scooter/17.png')}/>
                                <Link to="/categories/17"><h4>Yamaha NVX 155</h4></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ScooterList