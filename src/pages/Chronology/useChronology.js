import { useState, useEffect, useRef } from "react";
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
	const [mobileIndexOverride, setMobileIndexOverride] = useState(false);

	const [leftFrameOpen, setLeftFrameOpen] = useState(false);
	const [infoCardContent, setInfoCardContent] = useState({
		title: "",
		date: "",
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
			fitty(".event-card-title", { maxSize: 24, minSize: 14 });
		});
	}, [windowWidth]);

	// useEffect(() => {
	// 	console.log("FITTY");
	// 	document.fonts.ready.then(() => {
	// 		fitty(".readme-header", { maxSize: 42, minSize: 30 });
	// 	});
	// }, [windowWidth]);

	useEffect(() => {
		document.fonts.ready.then(() => {
			fitty(".main-header", { maxSize: 52, minSize: 20 });
		});
	}, [windowWidth, leftFrameOpen]);

	const initialRenderRef = useRef(true);

	useEffect(() => {
		let eventID = timeline[eventIndex].identifier;
		if (backdropOpen) navigate(`/${eventID}/detay`);
		else navigate(`/${eventID}`);
		if (initialRenderRef.current === true) {
			setMobileIndexOverride(true);
			initialRenderRef.current = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventIndex, backdropOpen]);

	useEffect(() => {
		const { title, description, summary, links, identifier, date } = timeline[eventIndex];
		const { body } = description;
		setInfoCardContent({
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

	const mobileCarouselProps = {
		...carouselProps,
		mobileIndexOverride,
		setMobileIndexOverride,
		setLeftFrameOpen,
	};

	const leftFrameProps = {
		timeline,
		eventIndex,
		leftFrameOpen,
		setEventIndex,
		setLeftFrameOpen,
		setInfoCardContent,
		mobileIndexOverride,
		setMobileIndexOverride,
		windowWidth,
	};

	const leftFrameButtonProps = {
		windowWidth,
		leftFrameOpen,
		backdropOpen,
		setBackdropOpen,
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

			const leftFrameOffset = leftFrameOpen ? 150 : 0;
			let offset = backdropOpen
				? Math.min(400, windowWidth * (45 / 100))
				: slideWidth / 2 + Math.min(48, windowWidth / 50);
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
						position: "fixed",
						top: "28%",
						left: 0,
						right: 0,
						margin: "auto",
						transform: `translateX(${offset + leftFrameOffset}px)` + orientation,
						zIndex: backdropOpen ? 1100 : 100,
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
		mobileCarouselProps,
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
