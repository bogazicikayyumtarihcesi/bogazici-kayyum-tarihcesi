import timeline from "../assets/timeline.json";

export const handleScrollEventChange = (event, setEventIndex, stopProp = false) => {
	if (stopProp) event.stopPropagation();
	const { deltaY } = event;
	setEventIndex((prevIndex) => {
		const increment = deltaY > 0 ? 1 : -1;
		const nextIndex = Math.min(timeline.length - 1, Math.max(0, prevIndex + increment));
		return nextIndex;
	});
};

export const handleTouchEventChange = (deltaY, setEventIndex) => {
	setEventIndex((prevIndex) => {
		const threshold = 200;
		const multiplicationFactor = Math.abs(Math.floor(deltaY / threshold));
		const increment = deltaY > 0 ? -1 * multiplicationFactor : 1 * multiplicationFactor;
		const nextIndex = Math.min(timeline.length - 1, Math.max(0, prevIndex + increment));

		return nextIndex;
	});
};
