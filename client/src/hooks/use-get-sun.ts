import axios from "axios";
import { useEffect, useState } from "react";
import type { BodiesType } from "../utils";

export const useGetSun = () => {
	const [sunData, setSunData] = useState<BodiesType | undefined>();

	useEffect(() => {
		axios
			.get("https://api.le-systeme-solaire.net/rest/bodies/soleil")
			.then((res) => setSunData(res.data))
			.catch((err) => console.log(err));
	}, []);

	return { sunData };
};
