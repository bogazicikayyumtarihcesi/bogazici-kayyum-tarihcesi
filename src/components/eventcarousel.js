import React, { useEffect, useRef, useState } from "react";
import TimelineItemComponent from "./timelineitemcomponent";
import { handleScrollEventChange } from "../util/eventUtils";

import "./eventcarousel.scss";
import { useWindowResize } from "../hooks/useWindowResize";

const EventCarousel = ({
	timeline,
	eventIndex,
	leftFrameOpen,
	setEventIndex,
	setBackdropOpen,
	setInfoCardContent,
	getDisplayDate,
}) => {
	const [windowWidth, windowHeight] = useWindowResize();

	// Updates state to force re-render, truth value is irrelevant.
	const [forceRender, setForceRender] = useState(false);

	const [hPercentageGap, vPercentageGap] = [10, 10];
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
		const carousel = carouselRef.current;

		const slideHeight = slideRef.current.getBoundingClientRect().height;

		const {
			left: carouselLeft,
			top: carouselTop,
			width: carouselWidth,
			height: carouselHeight,
		} = offsetRef.current;

		const hPixelGap = hPercentageGap * (carouselWidth / 100);
		const hPixelOffset = hPixelGap * eventIndex;

		const vPixelGap = vPercentageGap * (carouselHeight / 100);
		const vPixelOffset = vPixelGap * eventIndex;

		const leftOffset =
			hPixelOffset -
			hPixelGap / 2 +
			slideWidth * eventIndex +
			carouselWidth / 4 +
			carouselLeft +
			carouselLeft / 5;

		const topOffset = vPixelOffset + vPixelGap / 2 - carouselTop + slideHeight * eventIndex;

		windowWidth > 960
			? carousel.scrollTo({ left: leftOffset, behavior: "smooth" })
			: carousel.scrollTo({ top: topOffset, behavior: "smooth" });
	}, [eventIndex, leftFrameOpen, offsetRef.current.width]);

	const setItemStyles = (index) => {
		const { left, top, width, height } = offsetRef.current;
		const mobileSlideHeight = height * 0.6;
		return windowWidth > 960
			? {
					left: `calc(${hPercentageGap * index}% + ${
						left + width / 2 + slideWidth * index
					}px)`,
			  }
			: {
					top: `calc(${vPercentageGap * index}% + ${
						top + mobileSlideHeight / 4 + mobileSlideHeight * index
					}px)`,
					left: "50%",
					transform: "translateX(-50%)",
			  };
	};

	return (
		<div
			className="event-carousel-container"
			ref={carouselRef}
			onWheel={(e) => handleScrollEventChange(e, setEventIndex)}
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
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default EventCarousel;
