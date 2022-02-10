import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Mercury from '../images/Mercury.jpg';
import Venus from '../images/Venus.jpg';
import Earth from '../images/Earth.jpg';
import Mars from '../images/Mars.jpg';
import Jupiter from '../images/Jupiter.png';
import Saturn from '../images/Saturn.jpg';
import Uranus from '../images/Uranus.jpg';
import Neptune from '../images/Neptune.jpg';

const SinglePlanet = (props) => {

    const [planetBody, setPlanetBody] = useState();

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
        maxWidth: "75%",
        
        
    }
    
    return( 
        <div className='p-5'>
            {/* displays all planet info coming in through props from Main.jsx.
                img tag is conditionally rendering images based on the planet's 
            english name.
            */}
            <div className='jumbotron' style= {planetJumbotron} >
                <h1 className="display-3">{props.planet.englishName}</h1>
                <img src={props.planet.englishName === "Mercury" ?
                    Mercury : props.planet.englishName === "Venus" ?
                    Venus : props.planet.englishName === "Earth" ?
                    Earth : props.planet.englishName === "Mars" ?
                    Mars : props.planet.englishName === "Jupiter" ?
                    Jupiter : props.planet.englishName === "Saturn" ?
                    Saturn : props.planet.englishName === "Uranus" ?
                    Uranus : Neptune} alt="image of planet" style={imageStyle} />
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
