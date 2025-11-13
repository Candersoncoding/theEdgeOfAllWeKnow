import axios from "axios";
import { useEffect, useState } from "react";

export const useGetAstralPic = () => {
	const [picOfDay, setPicOfDay] = useState<string | undefined>(undefined);
	const [astralPicInfo, setAstralPicInfo] = useState<{
		title: string;
		type?: string;
		explanation: string;
	}>({
		title: "",
		type: "",
		explanation: "",
	});

	// This gets the Astronomy Picture of the Day from the NASA API.
	// It sets the picture URL and the title and explanation of the picture.
	useEffect(() => {
		axios
			.get(
				"https://api.nasa.gov/planetary/apod?api_key=AdbNb63ypeKhhCuPZFlKtHg4V9DIiqw3A8Gh6vwp",
			)
			.then((res) => {
				setPicOfDay(res.data.hdurl);
				setAstralPicInfo({
					title: res.data.title,
					type: res.data.media_type,
					explanation: res.data.explanation,
				});

				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return { picOfDay, astralPicInfo };
};
