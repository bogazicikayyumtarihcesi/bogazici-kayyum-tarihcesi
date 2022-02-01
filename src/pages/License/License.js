import { license } from "../../assets";

import "./License.scss";

export const License = () => {
	return (
		<div className="license-container">
			<textarea className="license" readOnly>
				{license}
			</textarea>
		</div>
	);
};
