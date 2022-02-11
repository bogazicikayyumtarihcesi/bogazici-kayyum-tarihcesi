import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, EffectFade, Autoplay, Pagination } from "swiper";
import { ShareCopy } from "./sharecopy";

import { placeholder } from "../assets";

import "./largeinfocard.scss";
import "swiper/swiper-bundle.css";

const LargeInfoCard = ({
	visibilityModifier,
	body,
	links,
	images,
	title,
	date,
	identifier,
	getDisplayDate,
	windowWidth,
	setBackdropOpen,
	showFullSizeImage,
	setShowFullSizeImage,
}) => {
	const [imageIndex, setImageIndex] = useState(0);
	const displayDate = getDisplayDate(date);
	const handleImageOpen = (index) => {
		setImageIndex(index);
		setShowFullSizeImage(true);
	};
	const handleImageClose = () => {
		setShowFullSizeImage(false);
	};

	const displayCardItems = () => {
		if (images.length === 0)
			return (
				<SwiperSlide>
					<div className="gallery-image-container">
						<img
							loading="lazy"
							src={placeholder}
							alt="placeholder"
							className="event-card-image placeholder"
						/>
					</div>
				</SwiperSlide>
			);
		return images.map((imageLink, index) => (
			<SwiperSlide key={imageLink + Math.random()}>
				<div
					className="gallery-image-container"
					index={index}
					key={index}
					onClick={() => handleImageOpen(index)}
				>
					<img className="gallery-image" src={imageLink} alt={`${title}-${index + 1}`} />
				</div>
			</SwiperSlide>
		));
	};

	const displayLinks = () => {
		return links.map((link) => (
			<li key={link}>
				<a href={link}>{link}</a>{" "}
			</li>
		));
	};

	const swiperOptions = {
		observer: true,
		observeParents: true,
		// speed: 3000,
		spaceBetween: 0,
		initialSlide: imageIndex,
		autoplay: showFullSizeImage ? false : true,
		grabCursor: false,
		slidesPerView: 1,
		centeredSlides: true,
		loop: false,
		nested: true,
		fadeEffect: { crossFade: true },
		pagination: {
			type: "bullets",
			clickable: true,
		},
	};

	SwiperCore.use([Mousewheel, EffectFade, Autoplay, Pagination]);

	return (
		<>
			{showFullSizeImage ? (
				<div className="full-size-image-container" onClick={handleImageClose}>
					<Swiper {...swiperOptions}>{displayCardItems()}</Swiper>
				</div>
			) : null}
			<div className={`large-card-container${visibilityModifier}`}>
				<div className="large-card-body">
					<div className="large-card-header">
						{windowWidth < 600 ? (
							<span className="close-button" onClick={() => setBackdropOpen(false)}>
								✖
							</span>
						) : null}
						<ShareCopy
							className={"large-card-date"}
							content={displayDate}
							identifier={identifier}
						/>
						<div className="large-card-title">{title}</div>
					</div>
					<div className="info-gallery">
						<Swiper {...swiperOptions}>{displayCardItems()}</Swiper>
					</div>
					<div className="large-card-text-container">
						<div>
							{body.split("¶").map((item, index) => (
								<p key={index}>{item}</p>
							))}
						</div>
					</div>
					<div className="links-box-container">
						<h4>Linkler: </h4>
						<div className="links-box">
							<ol className="links-list">{displayLinks()}</ol>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LargeInfoCard;
