import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SinglePlanet from '../components/SinglePlanet';


const Main = (props) => {

    const [planets, setPlanets] = useState([])
    // now that all the planet data is in state as an array,
    // sort the data in ascending order by aphelion or sideralOrbit
    // this requires iterating over state using an array friendly method
    // 
    const [sorted, setSorted] = useState([]);
    const [clickedPlanet, setClickedPlanet] = useState(null)
    // set default for clickedPlanet to be APOD which has a button to change the date and
    // make an api call that will setClickedPlanet to be the APOD from the date selected

    const [picOfDay, setPicOfDay] = useState("");
    // picOfDay state takes in a string that used in an img tag in the ternary operator
    // the ternary operator conditionally renders the APOD currently by default.
    // next I must find a way to dynamically make the api call for the APOD to give the 
    // user the ability to choose from all previous APOD by date

    useEffect(() => {
        // get all the planet data from the api and set is to be the state planets.
        axios.get('https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=isPlanet%2Ceq%2Ctrue')
            .then(res => {setPlanets(res.data.bodies);
                            console.log(res.data.bodies)})
            .catch(err => console.log(err))
    }, [clickedPlanet])
    useEffect(() => {
        axios.get('https://api.nasa.gov/planetary/apod?api_key=AdbNb63ypeKhhCuPZFlKtHg4V9DIiqw3A8Gh6vwp')
            .then(res => setPicOfDay(res.data.hdurl))
            .catch(err => console.log(err))
    }, [])
    {/* this the practice section of the Main page where I am working on achieving different solutions
        for allowing the user easy access to all the previous APOD one at a time.
        
    const [practicePic, setPracticePic] = useState("2022-1-30");
    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=AdbNb63ypeKhhCuPZFlKtHg4V9DIiqw3A8Gh6vwp&date=${practicePic}`)
            .then(res => setPracticePic(res.data.hdurl))
            .catch(err => console.log(err))
    }, [practicePic])

    const handleDateChange = (event) => {
        setPicOfDay({
            ...picOfDay,
            [event.target.name]: event.target.value
        })
    }

    const handleDateSubmit = (event) => {
        event.preventDefault();
        setPracticePic(`${picOfDay}`);
    } */}

    const sortPlanets = (event) => {
        event.preventDefault();
        let orbits = []; // puts all the sideral orbit values in the orbits array
        for(let i = 0; i < planets.length; i++){
            orbits.push(planets[i].sideralOrbit);
        }
        orbits.sort((a,b)=> a-b); // sorts orbits array in ascending order 
        console.log(orbits);
        // checks if the value in the orbits array matches the sideral orbit value of each planets object instance
        // if the values match, the value in the orbits array is set to the object of the planet instance
        for(let k = 0; k < orbits.length; k++){            
            orbits[k] === planets[0].sideralOrbit ? orbits[k] = planets[0] :
            orbits[k] === planets[1].sideralOrbit ? orbits[k] = planets[1] :
            orbits[k] === planets[2].sideralOrbit ? orbits[k] = planets[2] :
            orbits[k] === planets[3].sideralOrbit ? orbits[k] = planets[3] :
            orbits[k] === planets[4].sideralOrbit ? orbits[k] = planets[4] :
            orbits[k] === planets[5].sideralOrbit ? orbits[k] = planets[5] :
            orbits[k] === planets[6].sideralOrbit ? orbits[k] = planets[6] :
            orbits[k] = planets[7]
        }
        // after the second for loop terminates, the planets state is set to be the array of objects in orbits
        // since the values were sorted before they were replaced, the planets state is sorted
        setPlanets(orbits);
    }
        
    


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
                    <h3>Can you order the Planets?</h3>
                    <p>What's the order, closest to furthest from the Sun?</p>
                    <p>(test your theory, click below)</p>
                    <button onClick={sortPlanets} className='btn btn-outline-info btn-lg m-3 w-75'>Sort Planets</button>
                </nav>
                <div style={props.bodyStyling}>{/**/}
                     {clickedPlanet === null ?  <div><img src={picOfDay} alt="APOD might be a video: https://apod.nasa.gov/apod/astropix.html" className='w-75 m-5 mx-auto center'/></div> : <SinglePlanet planet={clickedPlanet} />} 
                    {/* <img src={practicePic} alt="practice for date choice" className='w-75 m-5 mx-auto center'/>
                    <form className='w-75 mx-auto center bg-dark rounded'> 
                    {/* the type='date' in the form formats the date incorrectly for input to the api call.
                                need (YYYY-MM-DD) default is (mm/dd/yyyy)
                                the date type input is also not a string.
                                    1 the form could take in year, month, day as string seperately.
                                    2 could set a state to increment or decrement the day onClick, then conditionally
                                    increment/decrement month based on how many days in that month(take into account leap years),
                                    then increment/decrement the year based on the month and day that are being incremented/decremented
                                    3 could find a way to reformat the date coming in from the type=date input using a method
                                            Ex:
                                            const moonLanding = new Date('July 20, 69 00:20:18');
                                            const whenLanding =  `${moonLanding.getFullYear()}, ${moonLanding.getMonth()}, ${moonLanding.getDate()}`
                                            console.log(whenLanding); */}
                        {/* <h5 className='text-light p-3'>Pick a Date</h5>
                        <div className='d-flex'>
                            <div className='form-floating mx-auto center' onSubmit={handleDateSubmit}>
                                <input type="text" name="year" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
                                <label htmlFor="floatingPicOfTheDay">Year(YYYY)</label>
                            </div>
                            <div className='form-floating mx-auto center'>
                                <input type="text" name="month" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
                                <label htmlFor="floatingMonth">Month(MM)</label>
                            </div>
                            <div className='form-floating mx-auto center'>
                                <input type="text" name="day" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
                                <label htmlFor="floatingDay">Day(DD)</label>
                            </div>
                        </div>
                        
                        <input type="submit" value="Checkout Picture from this Day" className='btn btn-outline-light m-3'/>
                    </form> */}
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