import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Mercury from '../images/Mercury.jpg';

const SinglePlanet = (props) => {

    const [planetBody, setPlanetBody] = useState([]);

    // useEffect(() => {
    //     axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies/${props.planet.id}`) // planet is being passed down through props from Main.jsx body
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    // }, [])
    return( 
        <div>
            <div className="jumbotron">
                <h1 className="display-3">{props.planet.englishName}</h1>
                <p className="lead">Average Temperature: {props.planet.avgTemp} Kelvin</p>
                <p className="lead">Number of orbiting Moons: {props.planet.moons == null ? '0' : props.planet.moons.length}</p>
                <p className="lead">Radius of Planet: {props.planet.meanRadius} km.</p>
                <p className="lead">Radius of Planet: {props.planet.gravity} m/s^2</p>
                <hr className="my-2"></hr>
                <img src={Mercury} alt="image of planet" className='w-50'/>
                
            </div>
        </div>
    )
}

export default SinglePlanet;
