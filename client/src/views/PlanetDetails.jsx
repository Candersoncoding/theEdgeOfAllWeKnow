import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PlanetDetails = (props) => {

  const [singlePlanetDetails, setSinglePlanetDetails] = useState([]);

  useEffect(()=> {
    axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=id%2Ceq%2Cjupiter`)
      .then(res => 
		setSinglePlanetDetails(res.data.bodies[0])
	  				
				)
      .catch(err => console.log(err))
  }, [])

  console.log(singlePlanetDetails);

	//   ideas for the detail data in the table:	
	//   	have buttons in the navbar that change the data the table is filled with
	// 		based on the state that is being mapped over. onClick of a different category or item
	//		updates the state and updates the table data
  return(
		<div>
			<header style={props.styleHeader} className='display-1'>
				{singlePlanetDetails.englishName}'s Details
			</header>
			<div className='d-flex'>
				<div style={props.bodyStyling}>
					<div className="jumbotron text-light m-5 bg-dark p-3">
					<h1 className="display-5">Let's Find Out More!</h1>
					<p className="lead"></p>
					<hr className="my-2"></hr>
					<p className="lead"></p>
					<table className="table table-hover text-light">
						<thead className='thead-light'>
							<tr>
								<th>#</th>
								<th></th>
								<th>Last Name</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>
				<nav style={props.navBar}>
					<button className='btn btn-outline-light'>other stuff</button>
				</nav>
			</div>
			
		</div>
  )
}

export default PlanetDetails;