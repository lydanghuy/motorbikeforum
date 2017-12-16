import React, { Component } from 'react'
import './style.css'
export default class Info extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        var count=()=>{
            var price ="";
            switch(this.props.match.params.infoid) {
                case "1":
                    price = "37.990.000 VND";
                    break;
                case "2":
                    price = "37.490.000 VND";
                    break;
                    
                case "3":
                    price = "51.990.000 VND";
                    break;    
                case "4":
                    price = "67.990.000 VND";
                    break;
                case "5":
                    price = "51.490.000 VND";
                    break;
                case "6":
                    price = "29.990.000 VND";
                    break;
                case "7":
                    price = "31.390.000 VND";
                    break;
                case "8":
                    price = "33.690.000 VND";
                    break;
                case "9":
                    price = "21.990.000 VND";
                    break;
                case "10":
                    price = "30.890.000 VND";
                    break;
                case "11":
                    price = "29.590.000 VND";
                    break;
                case "12":
                    price = "35.490.000 VND";
                    break;
                case "13":
                    price = "34.990.000 VND";
                    break;
                case "14":
                    price = "41.990.000 VND";
                    break;
                case "15":
                    price = "27.990.000 VND";
                    break;
                case "16":
                    price = "82.000.000 VND";
                    break;
                case "17":
                    price = "52.740.000 VND";
                    break;
                case "18":
                    price = "761.900.000 VND";
                    break;
                case "19":
                    price = "418.900.000 VND";
                    break;
                case "20":
                    price = "1.273.000.000 VND";
                    break;
                case "21":
                    price = "100.000.000 VND";
                    break;
                case "22":
                    price = "949.000.000 VND";
                    break;
                case "23":
                    price = "549.000.000 VND";
                    break;
                case "24":
                    price = "399.000.000 VND";
                    break;
                case "25":
                    price = "74.900.000 VND";
                    break;
                case "26":
                    price = "68.900.000 VND";
                    break;
                case "27":
                    price = "82.900.000 VND";
                    break;
                case "28":
                    price = "92.900.000 VND";
                    break;
                case "29":
                    price = "29.900.000 VND";
                    break;
                case "30":
                    price = "17.790.000 VND";
                    break;
                case "31":
                    price = "21.490.000 VND";
                    break;
                case "32":
                    price = "28.790.000 VND";
                    break;
                case "33":
                    price = "49.190.000 VND";
                    break;
                case "34":
                    price = "21.000.000 VND";
                    break;
                case "35":
                    price = "46.990.000 VND";
                    break;
                case "36":
                    price = "30.000.000 VND";
                    break;
                case "37":
                    price = "20.340.000 VND";
                    break;
            }
            return (<div><h3>{price}</h3></div>)
        }
        return (
            <div className="text-center">
                <img className="img-fluid mx-auto my-auto" src={require("./description_pic/" +this.props.match.params.infoid+".jpg")}/>
                <img className="img-fluid mx-auto" src={require("./pic/" +this.props.match.params.infoid+".png")}/>
                {count()}
            </div>
        )
    }
}