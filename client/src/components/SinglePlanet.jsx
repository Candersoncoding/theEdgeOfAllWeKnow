import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Mercury from '../images/mercuryColor.jpg';

const SinglePlanet = (props) => {

    const [planetBody, setPlanetBody] = useState([]);

    // useEffect(() => {
    //     axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies/${props.planet.id}`) // planet is being passed down through props from Main.jsx body
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    const planetJumbotron = {
        backgroundColor: "#000000",
        opacity: ".80",
        borderRadius: "10px",
        padding: "25px",
        color: "#c2c2c2"
    }

    const imageStyle = {
        minWidth: "50%",
        maxWidth: "75%"
    }

    return( 
        <div className='p-5'>
            <div className='jumbotron' style= {planetJumbotron} >
                <h1 className="display-3">{props.planet.englishName}</h1>
                <img src={Mercury} alt="image of planet" style={imageStyle} />
                <hr className="my-2"></hr>
                <div className='d-flex justify-content-around'>
                    <div>
                        <p className="lead"><strong>Average Temperature:</strong> {props.planet.avgTemp} Kelvin</p>
                        <p className="lead"><strong>Number of orbiting Moons:</strong> {props.planet.moons == null ? '0' : props.planet.moons.length}</p>
                    </div>
                    <div>
                        <p className="lead"><strong>Radius of Planet:</strong> {props.planet.meanRadius} km.</p>
                        <p className="lead"><strong>Radius of Planet:</strong> {props.planet.gravity} m/s<sup>2</sup></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePlanet;
