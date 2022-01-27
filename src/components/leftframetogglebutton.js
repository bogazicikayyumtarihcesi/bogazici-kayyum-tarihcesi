import "./leftframe.scss";

export const LeftFrameToggleButton = ({
	leftFrameOpen,
	setLeftFrameOpen,
	windowWidth,
}) => {
	const setToggleButtonStyles = () => {
		const defaultStyles = {
			width: "40px",
			height: "40px",
			position: "absolute",
			top: `${leftFrameOpen ? 7 : 7}px`,
			left: `${leftFrameOpen ? 255 : 10}px`,
			zIndex: "5001",
		};
		if (windowWidth <= 960) defaultStyles.left = "16px";
		return defaultStyles;
	};

	return (
		<span
			className="left-frame-toggle-button"
			onClick={() => setLeftFrameOpen((prevState) => !prevState)}
			style={setToggleButtonStyles()}
		>
			<svg width="40" height="40">
				<line
					x1={5}
					y1={8}
					x2={35}
					y2={8}
					style={{
						fill: "black",
						stroke: `${leftFrameOpen ? "#0e2b5c" : "#C26921"}`,
						strokeWidth: 6,
					}}
				/>
				<line
					x1={5}
					y1={18}
					x2={35}
					y2={18}
					style={{
						fill: "black",
						stroke: `${leftFrameOpen ? "#0e2b5c" : "#C26921"}`,
						strokeWidth: 6,
					}}
				/>
				<line
					x1={5}
					y1={28}
					x2={35}
					y2={28}
					style={{
						fill: "black",
						stroke: `${leftFrameOpen ? "#0e2b5c" : "#C26921"}`,
						strokeWidth: 6,
					}}
				/>
			</svg>
		</span>
	);
};
