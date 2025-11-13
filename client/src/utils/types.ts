export type BodiesType = {
	id: string;
	name: string;
	englishName: string;
	isPlanet: true;
	moons: MoonType[];
	semimajorAxis: number;
	perihelion: number;
	aphelion: number;
	eccentricity: number;
	inclination: number;
	mass: {
		massValue: number;
		massExponent: number;
	};
	vol: {
		volValue: number;
		volExponent: number;
	};
	density: number;
	gravity: number;
	escape: number;
	meanRadius: number;
	equaRadius: number;
	polarRadius: number;
	flattening: number;
	dimension: string;
	sideralOrbit: number;
	sideralRotation: number;
	aroundPlanet: {
		planet: string;
		rel: string;
	};
	discoveredBy: string;
	discoveryDate: string;
	alternativeName: string;
	axialTilt: number;
	avgTemp: number;
	mainAnomaly: number;
	argPeriapsis: number;
	longAscNode: number;
	bodyType: string;
	rel: string;
};
export type PlanetDataType = {
	bodies?: BodiesType[];
};

export type MoonType = {
	moon: string;
	rel: string;
};

export type PlanetImageType = {
	data: ImageDataType[];
	href: string;
	links: PlanetLinksType[];
};

export type ImageDataType = {
	center: string;
	date_creatged: string;
	description: string;
	description_508: string;
	keywords: string[];
	media_type: string;
	title: string;
};

export type PlanetLinksType = {
	height: number;
	href: string;
	rel: string;
	render: string;
	size: number;
	width: number;
};
