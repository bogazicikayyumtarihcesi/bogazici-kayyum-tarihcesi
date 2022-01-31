import { InfoBox } from "../../components/infobox";
import { Link } from "react-router-dom";

import "./About.scss";

export const About = () => {
	return (
		<div id="about">
			<Link to="/">
				<div className="home-button"><span>🡄</span></div>
			</Link>
			<InfoBox />
		</div>
	);
};
