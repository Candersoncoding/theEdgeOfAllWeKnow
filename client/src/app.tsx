import React from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { Main, PlanetDetails } from "./views";

export const App = () => {
	return (
		<>
			<Routes>
				<Route path={"/"} element={<Main />} />
				<Route path={`/:id/details`} element={<PlanetDetails />} />

				{/* Catch-all routes with unmatched paths */}
				<Route path={`*`} element={<Main />} />
			</Routes>
		</>
	);
};
