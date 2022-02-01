import { useState } from "react";
import imagesDictionary from "../assets/imagesDictionary.json";
import { handleScrollEventChange } from "../util/eventUtils";
import { ShareCopy } from "./sharecopy.js";
import { placeholder } from "../assets";

import "./timelineitemcomponent.scss";

const TimelineItemComponent = ({
	item,
	index,
	setBackdropOpen,
	setEventIndex,
	getDisplayDate,
	windowWidth,
}) => {
	const { date, title, summary, identifier } = item;
	const displayDate = getDisplayDate(date);

	const cardImage = imagesDictionary[identifier] ? imagesDictionary[identifier][0].url : "";

	const handleItemOpen = () => {
		setBackdropOpen(true);
	};

	const handleWheel = (event) => {
		if (windowWidth > 960) handleScrollEventChange(event, setEventIndex, true);
	};

	return (
		<div className="event-card-container" onWheel={handleWheel}>
			<div
				className="event-card"
				key={index}
				index={index}
				onClick={() => setEventIndex(index)}
			>
				<div className="event-card-content">
					<div className="event-card-header">
						<ShareCopy className={"event-card-date"} content={displayDate} />
						<div className="event-card-title" onClick={handleItemOpen}>
							{title}
						</div>
					</div>
					<div className="event-image-container" onClick={handleItemOpen}>
						{cardImage ? (
							<img
								loading="lazy"
								src={cardImage}
								alt={title}
								className="event-card-image"
								draggable={false}
							/>
						) : (
							<img
								loading="lazy"
								src={placeholder}
								alt="placeholder"
								className="event-card-image placeholder"
								draggable={false}
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
