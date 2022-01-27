import { useRef, useEffect } from "react";
import "./leftframe.scss";

export const LeftFrame = ({ timeline, eventIndex, setEventIndex, leftFrameOpen, windowWidth }) => {
	const parseYear = (dateStr) => Number(dateStr.slice(0, 4));

	const deltaYRef = useRef();

	const scrollRef = useRef();
	const selectedRef = useRef();

	let eventList = timeline.map((item, index) => {
		let year = parseYear(item.date);

		return { year, title: item.title };
	});

	const handleTouchStart = (event) => {
		const initialY = event.touches[0].clientY;
		deltaYRef.current = initialY;
	};

	const handleTouchMove = (event) => {
		const currentY = event.changedTouches[0].clientY;
		const deltaY = deltaYRef.current - currentY;
		scrollRef.current.scrollBy(0, deltaY / 10);
	};

	const handleTouchEnd = (event) => {
		const endY = event.changedTouches[0].clientY;
		deltaYRef.current = endY;
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
						onClick={() => setEventIndex(index)}
						onWheel={(e) => scrollRef.current.scrollBy(0, e.deltaY)}
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
		<div className="left-frame" style={setLeftFrameStyles()}>
			<div className="left-frame-header-field"></div>
			<div
				className="left-frame-content-field"
				onWheel={(e) => e.target.scrollBy(0, e.deltaY)}
				onTouchStart={(event) => handleTouchStart(event)}
				onTouchMove={(event) => handleTouchMove(event)}
				onTouchEnd={(event) => handleTouchEnd(event)}
				ref={scrollRef}
			>
				{renderList()}
			</div>
		</div>
	);
};
