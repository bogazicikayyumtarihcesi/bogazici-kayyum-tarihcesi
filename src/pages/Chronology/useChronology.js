import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindowResize } from "../../hooks/useWindowResize";

import timeline from "../../assets/timeline.json";
import imagesDictionary from "../../assets/imagesDictionary.json";
import { monthsDictionary } from "../../util/dictionaries/monthsDictionary";
import fitty from "fitty";

export const useChronology = () => {
	const navigate = useNavigate();
	const params = useParams();

	const initIndex = timeline.findIndex((item) => item.identifier === params.eventID);

	// eslint-disable-next-line no-unused-vars
	const [windowWidth, windowHeight] = useWindowResize();
	const aspectRatio = windowWidth / windowHeight;

	const [backdropOpen, setBackdropOpen] = useState(!!params.eventOpen);
	const [eventIndex, setEventIndex] = useState(initIndex === -1 ? 0 : initIndex);

	const [leftFrameOpen, setLeftFrameOpen] = useState(false);
	const [infoCardContent, setInfoCardContent] = useState({
		title: "",
		date: "",
		subtitle: "",
		body: "",
		links: [],
		images: [],
		summary: "",
		identifier: "",
	});

	const parseYear = (dateStr) => Number(dateStr.slice(0, 4));
	const parseMonth = (dateStr) => Number(dateStr.slice(5, 7));
	const parseDay = (dateStr) => Number(dateStr.slice(8, 10));

	const getDisplayDate = (dateStr) =>
		`${parseDay(dateStr)} ${monthsDictionary[parseMonth(dateStr) - 1]} ${parseYear(dateStr)}`;
	let rawDate = timeline[eventIndex].date;
	let displayDate = getDisplayDate(rawDate);

	useEffect(() => {
		document.fonts.ready.then(() => {
			fitty(".event-card-title", { maxSize: 24, minSize: 0 })
		});
	}, [windowWidth]);

	useEffect(() => {
		let eventID = timeline[eventIndex].identifier;
		if (backdropOpen) navigate(`/${eventID}/detay`);
		else navigate(`/${eventID}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventIndex, backdropOpen]);

	useEffect(() => {
		const { title, description, summary, links, identifier, date } = timeline[eventIndex];
		const { subtitle, body } = description;
		setInfoCardContent({
			subtitle,
			body,
			links,
			summary,
			title,
			identifier,
			date,
			images: imagesDictionary[identifier]
				? imagesDictionary[identifier].map(({ url }) => url)
				: [],
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventIndex]);

	const carouselProps = {
		timeline,
		eventIndex,
		leftFrameOpen,
		windowWidth,
		setEventIndex,
		setBackdropOpen,
		setInfoCardContent,
		displayDate,
	};

	const leftFrameProps = {
		timeline,
		eventIndex,
		leftFrameOpen,
		setEventIndex,
		setLeftFrameOpen,
		setInfoCardContent,
	};

	const leftFrameButtonProps = {
		windowWidth,
		leftFrameOpen,
		setLeftFrameOpen,
	};

	const paginationProps = {
		timeline,
		eventIndex,
		leftFrameOpen,
		displayDate,
		aspectRatio,
		windowHeight,
		setEventIndex,
	};

	const handleArrowPress = (e) => {
		const { keyCode } = e;
		if (keyCode === 37) setEventIndex((prevIndex) => Math.max(0, prevIndex - 1));
		else if (keyCode === 39)
			setEventIndex((prevIndex) => Math.min(timeline.length - 1, prevIndex + 1));
	};

	const setMainFrameStyles = () => {
		return windowWidth > 960
			? {
					gridTemplateColumns: `${
						leftFrameOpen ? `300px ${windowWidth - 300}px` : "0 100%"
					}`,
			  }
			: {
					gridTemplateColumns: "unset",
			  };
	};

	const handleArrowClick = (direction) => {
		switch (direction) {
			case "next":
				setEventIndex((prev) => prev + 1);
				break;
			case "previous":
				setEventIndex((prev) => prev - 1);
				break;
		}
	};

	const renderNavArrows = () => {
		const slideWidth = window.innerWidth * 0.4;
		const [height, width] = [slideWidth / 4, slideWidth / 8];
		const thickness = 6;

		return ["previous", "next"].map((item) => {
			let orientation = "";
			let offset = slideWidth / 2 + 48;
			if (item === "previous") {
				if (eventIndex === 0) return null;
				orientation = `scaleX(-1)`;
				offset *= -1;
			}
			if (item === "next") {
				if (eventIndex === timeline.length - 1) return null;
			}
			return (
				<svg
					key={item}
					className="nav-button"
					height={height}
					width={width}
					style={{
						position: "absolute",
						top: "28%",
						left: 0,
						right: 0,
						margin: "auto",
						transform: `translateX(${offset}px)` + orientation,
					}}
					onClick={() => handleArrowClick(item)}
				>
					<polygon
						points={`${width},${height / 2} ${width / 2 + thickness},0 ${
							width / 2 - thickness
						},0 ${width - thickness * 2},${height / 2} ${
							width / 2 - thickness
						},${height} ${width / 2 + thickness},${height} ${width},${height / 2}`}
						style={{
							fill: "aliceblue",
							stroke: "white",
							strokeWidth: 1,
						}}
					/>
				</svg>
			);
		});
	};

	const primitives = {
		backdropOpen,
		displayDate,
		rawDate,
		infoCardContent,
		windowWidth,
		windowHeight,
		aspectRatio,
	};

	const props = {
		carouselProps,
		leftFrameProps,
		leftFrameButtonProps,
		paginationProps,
	};
	const methods = {
		handleArrowPress,
		setBackdropOpen,
		setMainFrameStyles,
		renderNavArrows,
		getDisplayDate,
	};

	return { primitives, methods, props };
};
