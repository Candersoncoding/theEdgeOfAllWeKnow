import axios from "axios";
import { useEffect, useState } from "react";
import type { BodiesType, PlanetDataType } from "../utils";

export const useGetPlanets = () => {
	const [planets, setPlanets] = useState<BodiesType[]>();
	const [sortedPlanets, setSortedPlanets] = useState<BodiesType[]>();

	useEffect(() => {
		// This gets all the planets from the API.
		axios
			.get<PlanetDataType>(
				"https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=isPlanet%2Ceq%2Ctrue",
			)
			.then((res) => {
				setPlanets(res.data.bodies);
				console.log(res.data.bodies);
			})
			.catch((err) => console.log(err));
		// This gets all the planets sorted by their sideral orbit in ascending order.
		axios
			.get<PlanetDataType>(
				"https://api.le-systeme-solaire.net/rest.php/bodies?order=sideralOrbit%2Casc&filter%5B%5D=isPlanet%2Ceq%2Ctrue",
			)
			.then((res) => {
				setSortedPlanets(res.data.bodies);
				console.log(res.data.bodies);
			})
			.catch((err) => console.log(err));
	}, []);

	return { planets, sortedPlanets };
};
