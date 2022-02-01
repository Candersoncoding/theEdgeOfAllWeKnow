import axios from 'axios';
import React, {useState, useEffect} from 'react';

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
                <p className="lead">average temp, number of moons, gravity, radius of planet</p>
                <hr className="my-2"></hr>
                <p></p>
                
            </div>
        </div>
    )
}

export default SinglePlanet;
