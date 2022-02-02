import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SinglePlanet from '../components/SinglePlanet';


const Main = (props) => {

    const [planets, setPlanets] = useState([])
    // now that all the planet data is in state as an array,
    // sort the data in ascending order by aphelion or sideralOrbit
    // this requires iterating over state using an array friendly method
    // 

    const [clickedPlanet, setClickedPlanet] = useState(null)
    // set default for clickedPlanet to be APOD with a button to change the date and
    // make an api call that will setClickedPlanet to be the APOD from the date selected
    useEffect(() => {
        // get all the planet data from the api and set is to be the state planets.
        axios.get('https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=isPlanet%2Ceq%2Ctrue')
            .then(res => {setPlanets(res.data.bodies);
                            console.log(res.data.bodies)})
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get('https://api.nasa.gov/planetary/apod')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])



    return ( 
        <div>
            <h1 className='display-1' style={props.styleHeader}>The Edge of All We Know</h1>
            <div className='d-flex'>
                <nav style={props.navBar}>
                    {/* map over the planets array and display a list of buttons with the englishName for each planet */}
                    {
                        planets.map((item, i) => {
                            return  <div key={i}>
                                        <button className='btn btn-outline-light btn-lg m-3 w-75' onClick={()=> setClickedPlanet(planets[i])}>{planets[i].englishName}</button>
                                    </div>
                        })
                    }
                </nav>
                <div style={props.bodyStyling}>
                    {clickedPlanet === null ? <div></div> : <SinglePlanet planet={clickedPlanet} />}
                    {/*     onClick button, display a jumbotron with major details about the "clicked planet" with a picture
                        this will need to be a rendered component. 
                            Information about what planet was clicked will need 
                        to be passed through props. 
                            Jumbotron will have a more details button that redirects to another
                        page which displays all data and pictures about that planet.
                            Think about putting a Next planet button and prev planet button at the bottom of the details page
                        for increased fluidity*/}
                </div>
            </div> 
        </div>
    )
}

export default Main;