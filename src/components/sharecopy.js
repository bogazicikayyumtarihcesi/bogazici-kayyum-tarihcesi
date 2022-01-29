import { useState } from "react";
import "./sharecopy.scss";

export const ShareCopy = ({ className, content }) => {
	const [displayMessage, setDisplayMessage] = useState(false);
	const copyLink = () => {
		const link = document.location.href;
		navigator.clipboard.writeText(link);
		setDisplayMessage(true);
		setTimeout(() => {
			setDisplayMessage(false);
		}, 640);
	};

	return (
		<div className={`${className} share-copy`} onClick={copyLink}>
			{displayMessage ? <span className="copy-message">Link Kopyalandı</span> : null}
			{content}
		</div>
	);
};
