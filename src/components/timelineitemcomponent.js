import { useState } from "react";
import imagesDictionary from "../assets/imagesDictionary.json";
import {
	handleTouchEventChange,
	handleScrollEventChange,
} from "../util/eventUtils";
import { ShareCopy } from "./sharecopy.js";
import { placeholder } from "../assets";

import "./timelineitemcomponent.scss";

const TimelineItemComponent = ({ item, index, setBackdropOpen, setEventIndex, getDisplayDate }) => {
	const [touchDistance, setTouchDistance] = useState({
		start: 0,
		end: 0,
		deltaY: 0,
	});

	const { date, title, summary, identifier } = item;
    const displayDate = getDisplayDate(date);


	const cardImage = imagesDictionary[identifier]
		? imagesDictionary[identifier][0].url
		: "";

	const handleItemOpen = () => {
		setBackdropOpen(true);
	};

	const handleTouchStart = (event) => {
		const initialY = event.changedTouches[0].clientY;
		setTouchDistance({ ...touchDistance, start: initialY });
	};

	const handleTouchEnd = (event) => {
		const finalY = event.changedTouches[0].clientY;
		const deltaY = finalY - touchDistance.start;
		setTouchDistance({ ...touchDistance, end: finalY, deltaY });
		handleTouchEventChange(deltaY, setEventIndex);
	};

	return (
		<div
			className="event-card-container"
			onWheel={(e) => handleScrollEventChange(e, setEventIndex, true)}
			
			onTouchStart={(e) => handleTouchStart(e)}
			onTouchEnd={(e) => handleTouchEnd(e)}
		>
			<div
				className="event-card"
				key={index}
				index={index}
				onClick={() => setEventIndex(index)}
			>
				<div className="event-card-content">
					<div className="event-card-header">
						<ShareCopy className={"event-card-date"} content={displayDate} />
						<div className="event-card-title">{title}</div>
					</div>
					<div className="event-image-container">
						{cardImage ? (
							<img
								loading="lazy"
								src={cardImage}
								alt={`${title} - ${cardImage}`}
								className="event-card-image"
							/>
						) : (
							<img
								loading="lazy"
								src={placeholder}
								alt="placeholder"
								className="event-card-image placeholder"
							/>
						)}
					</div>
					<div className="item-body">
						<p>{summary}</p>
					</div>
				</div>
				<button onClick={handleItemOpen} className="more-button">
					— Detaylar —
				</button>
			</div>
		</div>
	);
};

export default TimelineItemComponent;
