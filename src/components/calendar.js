import React, { useRef, useEffect, useState } from "react";
import { monthsDictionary } from "../util/dictionaries/monthsDictionary";
import "./calendar.scss";

const parseYear = (dateStr) => Number(dateStr.slice(0, 4));
const parseMonth = (dateStr) => Number(dateStr.slice(5, 7));

// const palette = {
// 	line: "#1e5fce",
// 	bullet: "#133b80",
// 	bulletOutline: "#1e5fce",
// 	bulletFocusedOutline: "#ff6543",
// 	eventful: "#ff6543",
// 	eventfulOutline: "black",
// };
const palette = {
	line: "#606b90",
	bullet: "#424f7b",
	bulletOutline: "#606b90",
	bulletFocusedOutline: "#C26921",
	eventful: "#C26921",
	// bulletFocusedOutline: "#ff6543",
	// eventful: "#ff6543",
	eventfulOutline: "#424f7b",
};

const bulletTypes = {
	month: {
		width: 20,
		height: 20,
		color1: palette.bullet,
		color2: palette.bulletOutline,
	},
	monthFocused: {
		width: 40,
		height: 40,
		color1: palette.bullet,
		color2: palette.bulletFocusedOutline,
		strWidth: 2,
	},
	monthEventful: {
		width: 10,
		height: 10,
		color1: palette.eventful,
		color2: palette.eventfulOutline,
	},
	bullet: {
		width: 14,
		height: 14,
		color1: palette.bullet,
		color2: palette.eventfulOutline,
	},
	bulletSelected: {
		width: 14,
		height: 14,
		color1: palette.eventful,
		color2: palette.eventfulOutline,
	},
	year: {
		width: 26,
		height: 26,
		color1: palette.bulletOutline,
		color2: palette.bullet,
	},
};

const genBullet = ({
	width = 14,
	height = 14,
	color1 = "yellow",
	color2 = "red",
	strWidth = 1,
}) => (
	<svg height={height} width={width}>
		<polygon
			points={`0,${height / 2} ${width / 2},0 ${width},${height / 2} ${width / 2},${height}`}
			style={{ fill: color1, stroke: color2, strokeWidth: strWidth }}
		/>
	</svg>
);

export const Calendar = ({
	eventIndex,
	setEventIndex,
	timeline,
	leftFrameOpen,
	displayDate,
	aspectRatio,
	windowHeight,
}) => {
	const selectedMonthRef = useRef();
	const selectedSingleEventRef = useRef();
	const calendarFrameRef = useRef();

	const [nodeHoverState, setNodeHoverState] = useState(false);

	const buffer = 500;
	const gap = 50;

	const handleWheel = (e) => calendarFrameRef.current.scrollBy(e.deltaY, 0);

	let firstEvent = {
		year: parseYear(timeline[0].date),
		month: parseMonth(timeline[0].date),
	};

	let lastEvent = {
		year: parseYear(timeline[timeline.length - 1].date),
		month: parseMonth(timeline[timeline.length - 1].date),
	};

	let calendarNodes = [];

	// CALENDAR WITH EXTRA MONTHS FOR PADDING
	for (let year = firstEvent.year - 1; year <= lastEvent.year + 1; year++) {
		for (
			let month = year === firstEvent.year - 1 ? 11 : 1;
			month <= (year === lastEvent.year + 1 ? 8 : 12);
			month++
		) {
			calendarNodes.push({ year, month, events: [] });
		}
	}

	// CALENDAR FIT CONTENT
	// for (let year = firstEvent.year; year <= lastEvent.year; year++) {
	// 	for (
	// 		let month = year === firstEvent.year ? firstEvent.month : 1;
	// 		month <= (year === lastEvent.year ? lastEvent.month : 12);
	// 		month++
	// 	) {
	// 		calendarNodes.push({ year, month, events: [] });
	// 	}
	// }

	let searchIndex = 0;
	timeline.forEach((item) => {
		let itemDate = { year: parseYear(item.date), month: parseMonth(item.date) };
		let targetNode = calendarNodes.find(
			(node, index) =>
				index >= searchIndex && node.year === itemDate.year && node.month === itemDate.month
		);
		if (targetNode) targetNode.events.push(item);
	});

	const renderLine = (length) => {
		let lineBuffer = 50;
		let svgLineStyle = {
			strokeWidth: 4,
			stroke: palette.line,
		};
		return (
			<svg className="calendar-line" onWheel={handleWheel}>
				<line
					style={svgLineStyle}
					x1={0 + lineBuffer}
					x2={length - lineBuffer}
					y1={0}
					y2={0}
				/>
			</svg>
		);
	};

	const renderCalendar = () => {
		return calendarNodes.map((item, index) => {
			const monthStyle = {
				left: `${buffer + gap * index}px`,
			};
			const bufferStyle = {
				position: "absolute",
				left: `${buffer * 2 + index * gap}px`,
				width: "1px",
				height: "1px",
			};

			let selectMRef;
			let monthFocused = item.events.find((ev) => ev.index === eventIndex);
			let isYear = Number(item.month) === 1;
			let eventListScrollLimit = 4;

			if (aspectRatio >= 2 || windowHeight <= 920) {
				eventListScrollLimit = 3;
			} else if (aspectRatio >= 2.010 || windowHeight <= 787) {
				eventListScrollLimit = 2;
			} else if (aspectRatio >= 2.47 || windowHeight <= 666) {
				eventListScrollLimit = 1;
			}

			if (monthFocused) selectMRef = selectedMonthRef;

			return (
				<React.Fragment key={index}>
					<span
						className={`calendar-month mon${item.month} ${
							monthFocused ? "focused" : ""
						}`}
						key={index}
						style={monthStyle}
						onWheel={handleWheel}
						onMouseEnter={() => {
							if (!monthFocused && item.events.length !== 0) setNodeHoverState(true);
						}}
						onMouseLeave={() => setNodeHoverState(false)}
						ref={selectMRef}
					>
						{isYear ? <span className="calendar-year-name">{item.year}</span> : null}
						<span className="calendar-month-name">
							{monthsDictionary[Number(item.month) - 1]}
						</span>
						{monthFocused
							? genBullet(bulletTypes.monthFocused)
							: isYear
							? genBullet(bulletTypes.year)
							: genBullet(bulletTypes.month)}
						{item.events.length !== 0 ? (
							<span
								className="calendar-month-eventful"
								onWheel={handleWheel}
								onClick={() => {
									setEventIndex(item.events[0].index)
									setNodeHoverState(false);

								}}
							>
								{genBullet(bulletTypes.monthEventful)}

								<div
									className={`calendar-events-container`}
									style={
										nodeHoverState && monthFocused ? { opacity: 0.15 } : null
									}
									onWheel={(e) => {
										if (item.events.length > 4) {
											e.stopPropagation();
											e.target.scrollBy(0, e.deltaY);
										}
									}}
								>
									<div className="calendar-events-scrollarea">
										{item.events.map((singleEvent, keyIndex) => {
											let selectSERef;
											let eventFocused = singleEvent.index === eventIndex;
											if (eventFocused) selectSERef = selectedSingleEventRef;

											return (
												<div
													key={keyIndex}
													className={`calendar-single-event ${
														eventFocused ? "focused" : ""
													}`}
													index={singleEvent.index}
													onWheel={(e) => {
														if (
															item.events.length >
															eventListScrollLimit
														) {
															e.stopPropagation();
															e.target.parentNode.scrollBy(
																0,
																Math.sign(e.deltaY) * 22.5
															);
														} else handleWheel(e);
													}}
													ref={selectSERef}
												>
													<span
														className="calendar-event-bullet"
														onWheel={(e) => {
															if (
																item.events.length >
																eventListScrollLimit
															) {
																e.stopPropagation();
																// TODO: this does not work.
																e.target.parentNode.parentNode.scrollBy(
																	0,
																	Math.sign(e.deltaY) * 22.5
																);
															} else handleWheel(e);
														}}
														onClick={(e) => {
															e.stopPropagation();
															setEventIndex(singleEvent.index);
															setNodeHoverState(false);
														}}
													>
														{singleEvent.index === eventIndex
															? genBullet(bulletTypes.bulletSelected)
															: genBullet(bulletTypes.bullet)}
													</span>
													<div
														className="calendar-event-title"
														onClick={(e) => {
															e.stopPropagation();
															setEventIndex(singleEvent.index);
															setNodeHoverState(false);
														}}
														onWheel={(e) => {
															if (
																item.events.length >
																eventListScrollLimit
															) {
																e.stopPropagation();
																e.target.parentNode.parentNode.scrollBy(
																	0,
																	Math.sign(e.deltaY) * 22.5
																);
															} else handleWheel(e);
														}}
													>
														{singleEvent.title}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</span>
						) : null}
					</span>
					{index === calendarNodes.length - 1 ? (
						<span className="endbuffer" style={bufferStyle}></span>
					) : null}
					{index === calendarNodes.length - 1
						? renderLine(buffer * 2 + index * gap)
						: null}
				</React.Fragment>
			);
		});
	};

	useEffect(() => {
		if (selectedMonthRef.current) {
			selectedMonthRef.current.scrollIntoView({
				// behavior: "smooth",
				// block: "center",
				inline: "center",
			});
		}
		if (selectedSingleEventRef.current)
			selectedSingleEventRef.current.scrollIntoView({
				// watch this for shit
				behavior: "smooth",
				block: "center",
			});
	}, [eventIndex, leftFrameOpen]);

	return (
		<div className="calendar-outer-container">
			<div className="main-date-display">{displayDate}</div>
			<div
				className="calendar-container"
				ref={calendarFrameRef}
				onWheel={(e) => e.target.scrollBy(e.deltaY, 0)}
			>
				{renderCalendar()}
			</div>
		</div>
	);
};
