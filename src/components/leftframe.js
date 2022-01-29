import { useRef, useEffect } from "react";
import "./leftframe.scss";

export const LeftFrame = ({
	timeline,
	eventIndex,
	setEventIndex,
	mobileIndexOverride,
	setMobileIndexOverride,
	leftFrameOpen,
	windowWidth,
}) => {
	const parseYear = (dateStr) => Number(dateStr.slice(0, 4));
	const scrollRef = useRef();
	const selectedRef = useRef();

	let eventList = timeline.map((item, index) => {
		let year = parseYear(item.date);

		return { year, title: item.title };
	});

	const handleClick = (event, index) => {
		setEventIndex(index);
		if (windowWidth <= 960) setMobileIndexOverride(true);
	};

	const renderList = () => {
		return eventList.map((item, index) => {
			let yearSeparator =
				index === 0 || item.year > eventList[index - 1].year ? (
					<div className="year-separator">{item.year}</div>
				) : null;

			let isSelected = Number(index) === Number(eventIndex);
			let ref = isSelected ? selectedRef : null;

			return (
				<div key={index} className="year-separator-container">
					{yearSeparator}
					<div
						className={`left-frame-list-item ${isSelected ? "list-item-selected" : ""}`}
						onClick={(event) => handleClick(event, index)}
						ref={ref}
					>
						{item.title}
					</div>
				</div>
			);
		});
	};

	useEffect(() => {
		selectedRef.current.scrollIntoView({
			block: "nearest",
			inline: "nearest",
		});
	}, [eventIndex]);

	const setLeftFrameStyles = () => {
		return windowWidth > 960 ? {} : { left: `${leftFrameOpen ? 0 : "-100%"}` };
	};

	return (
		<div className={`left-frame${leftFrameOpen ? " left-frame-open" : ""}`} style={setLeftFrameStyles()}>
			<div className="left-frame-header-field"></div>
			<div className="left-frame-content-field" ref={scrollRef}>
				{renderList()}
			</div>
		</div>
	);
};
