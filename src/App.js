import { Routes, Route } from "react-router-dom";
import { About, Chronology, PGP, License } from "./pages";

import "./App.scss";

const App = () => {
	return (
		<div id="app">
			<Routes>
				<Route path="about" element={<About />} />
				<Route path="PGP" element={<PGP />} />
				<Route path="license" element={<License />} />
				<Route path=":eventID/:eventOpen" element={<Chronology />} />
				<Route path=":eventID" element={<Chronology />} />
				<Route path="/" element={<Chronology />} />
			</Routes>
		</div>
	);
};

export default App;
