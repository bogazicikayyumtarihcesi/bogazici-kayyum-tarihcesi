import React, { useEffect, useRef, useState } from "react";
import TimelineItemComponent from "./timelineitemcomponent";

import "./eventcarousel.scss";
import { useWindowResize } from "../hooks/useWindowResize";

const MobileCarousel = ({
	timeline,
	eventIndex,
	mobileIndexOverride,
	leftFrameOpen,
	setEventIndex,
	setMobileIndexOverride,
	setBackdropOpen,
	setInfoCardContent,
	setLeftFrameOpen,
	getDisplayDate,
}) => {
	const [windowWidth, windowHeight] = useWindowResize();

	// Updates state to force re-render, truth value is irrelevant.
	const [forceRender, setForceRender] = useState(false);

	const vPercentageGap = 0.1;
	const slideWidth = window.innerWidth * 0.4;

	const carouselRef = useRef();
	const slideRef = useRef();
	const offsetRef = useRef(window.innerWidth);

	useEffect(() => {
		const { left, top, width, height } = carouselRef.current.getBoundingClientRect();
		offsetRef.current = { left, top, width, height };

		// force a re-render to update slide positions.
		setForceRender((prev) => !prev);
	}, [leftFrameOpen, windowWidth]);

	useEffect(() => {
		if (!slideRef.current) return;

		if (mobileIndexOverride) {
			slideRef.current.scrollIntoView({ block: "center" });
			setMobileIndexOverride(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mobileIndexOverride, eventIndex, leftFrameOpen, offsetRef.current.width]);

	const setItemStyles = (index) => {
		const { top, height } = offsetRef.current;
		const mobileSlideHeight = height * 0.6;
		return {
			top: `calc(${vPercentageGap * index}% + ${
				top + mobileSlideHeight / 4 + mobileSlideHeight * index
			}px)`,
			left: "50%",
			transform: "translateX(-50%)",
		};
	};

	const convertScrollPositionToIndex = () => {
		let scrollAreaHeight = carouselRef.current.offsetHeight;
		let totalDistance = carouselRef.current.scrollHeight;
		let scrollPosition = carouselRef.current.scrollTop;
		let itemCount = timeline.length + 2;
		let itemHeight = totalDistance / itemCount;
		let selectedEventIndex = Math.round(
			Math.max(0, scrollPosition - scrollAreaHeight / 3) / itemHeight
		);
		if (eventIndex !== selectedEventIndex) {
			const nextEventIndex = Math.min(selectedEventIndex, timeline.length - 1);
			setEventIndex(nextEventIndex);
		}
	};

	return (
		<div
			className="event-carousel-container"
			ref={carouselRef}
			onScroll={convertScrollPositionToIndex}
		>
			{timeline.map((item, index) => {
				let slideFocused = "";
				if (index === eventIndex) slideFocused = "slide-focused";
				return (
					<React.Fragment key={index}>
						<div
							className={`carousel-slide ${slideFocused}`}
							style={setItemStyles(index)}
							ref={slideFocused ? slideRef : undefined}
						>
							<TimelineItemComponent
								item={item}
								index={index}
								key={index}
								setBackdropOpen={setBackdropOpen}
								setInfoCardContent={setInfoCardContent}
								setEventIndex={setEventIndex}
								getDisplayDate={getDisplayDate}
								windowWidth={windowWidth}
							/>
						</div>
						{index === timeline.length - 1 ? (
							<div
								className="carousel-slide"
								style={{
									...setItemStyles(index + 1),
									width: `${slideWidth}px`,
								}}
							></div>
						) : null}
						{leftFrameOpen ? (
							<div
								className="backdrop-mobile"
								onClick={() => {
									setLeftFrameOpen(false);
								}}
							></div>
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default MobileCarousel;
