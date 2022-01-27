import { useRef, useState, useEffect } from "react";

export default function useScrollPercentage(variant = "vertical") {
	const scrollRef = useRef(null);
	const [scrollPercentage, setScrollPercentage] = useState(NaN);

	const reportScroll = (e) => {
		setScrollPercentage(getScrollPercentage(e.target, variant));
	};

	const convertToPosition = (percentage) => {
		setScrollPercentage(percentage);

		if (variant === "horizontal") {
			scrollRef.current.scrollLeft =
				(scrollRef.current.scrollWidth -
					scrollRef.current.clientWidth) *
				(percentage / 100);
		} else {
			scrollRef.current.scrollTop =
				(scrollRef.current.scrollHeight -
					scrollRef.current.clientHeight) *
				(percentage / 100);
		}
	};

	useEffect(() => {
		const node = scrollRef.current;
		if (node !== null) {
			node.addEventListener("scroll", reportScroll, { passive: true });
			if (Number.isNaN(scrollPercentage)) {
				setScrollPercentage(getScrollPercentage(node, variant));
			}
		}
		return () => {
			if (node !== null) {
				node.removeEventListener("scroll", reportScroll);
			}
		};
	}, [scrollPercentage]);

	return [
		scrollRef,
		Number.isNaN(scrollPercentage) ? 0 : scrollPercentage,
		convertToPosition,
	];
}

const getScrollPercentage = (element, variant) => {
	if (element === null) {
		return NaN;
	}
	let scrollStart = element.scrollTop;
	let scrollDistance = element.scrollHeight - element.clientHeight;
	if (variant === "horizontal") {
		scrollStart = element.scrollLeft;
		scrollDistance = element.scrollWidth - element.clientWidth;
	}
	return ((scrollStart / scrollDistance) * 100).toFixed(2);
}
