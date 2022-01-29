import { InfoBox } from "../../components/infobox";
import { Link } from "react-router-dom";

import "./About.scss";

export const About = () => {
	return (
		<div id="about">
			<div className="home-button">
				<Link to="/">🡄</Link>
			</div>
			<InfoBox />
		</div>
	);
};
