import React from "react";
import { Link } from "react-router-dom";

import EventCarousel from "../../components/eventcarousel";
import MobileCarousel from "../../components/mobilecarousel";
import { Calendar } from "../../components/calendar.js";
import { LeftFrame } from "../../components/leftframe";

import LargeInfoCard from "../../components/largeinfocard";
import { LeftFrameToggleButton } from "../../components/leftframetogglebutton";
import { useChronology } from "./useChronology";
import { KayyumMeter } from "../../components/kayyummeter";

import "./Chronology.scss";

export const Chronology = () => {
	const { primitives, props, methods } = useChronology();

	const { infoCardContent, backdropOpen, rawDate, windowWidth } = primitives;

	const {
		handleArrowPress,
		setBackdropOpen,
		setMainFrameStyles,
		renderNavArrows,
		getDisplayDate,
	} = methods;

	const {
		carouselProps,
		mobileCarouselProps,
		leftFrameProps,
		leftFrameButtonProps,
		paginationProps,
	} = props;

	const leftFrameStyle = leftFrameProps.leftFrameOpen ? "left-frame-open" : ""

	return (
		<div id="chronology">
			<LeftFrameToggleButton {...leftFrameButtonProps} />
			<KayyumMeter rawDate={rawDate} />
			<div className="main-frame" style={setMainFrameStyles()}>
				<LeftFrame {...leftFrameProps} />

				<div className="main-frame-right" tabIndex="-1" onKeyUp={handleArrowPress}>
					<div className="about-button">
						<Link to="/about">?</Link>
					</div>
					{window.innerWidth > 960 ? renderNavArrows() : null}

					<LargeInfoCard
						{...infoCardContent}
						getDisplayDate={getDisplayDate}
						visibilityModifier={backdropOpen ? " show" : ""}
					/>
					{backdropOpen ? (
						<div className="backdrop" onClick={() => setBackdropOpen(false)}></div>
					) : null}

					<div className="main-header-container">
						<div className={`main-header  ${leftFrameStyle}`}>Boğaziçi Kayyum Tarihçesi</div>
					</div>

					{windowWidth > 960 ? (
						<EventCarousel {...carouselProps} getDisplayDate={getDisplayDate} />
					) : (
						<MobileCarousel {...mobileCarouselProps} getDisplayDate={getDisplayDate} />
					)}
					<Calendar {...paginationProps} />
				</div>
			</div>
		</div>
	);
};
