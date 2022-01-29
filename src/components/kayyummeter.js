import { mehmed1, mehmed2, melih1, melih2, naci1, naci2 } from "../assets";

import "./kayyummeter.scss";

const getDayDiff = (date1, date2) => {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	return Math.floor(Math.abs(date1 - date2) / _MS_PER_DAY) + 1;
};

export const KayyumMeter = ({ rawDate }) => {
	const kelleler = [mehmed1, mehmed2, melih1, melih2, naci1, naci2];
	const ozkanStart = new Date("2016-11-12");
	const buluStart = new Date("2021-01-02");
	const inciVekil = new Date("2021-07-15");
	const inciStart = new Date("2021-08-21");

	const noKayyumText = "Kayyum yok! 🎉";
	let selectedDate = new Date(rawDate);
	let rando = Math.trunc(Math.random() * 10) % 2;
	let kayyum;
	let streak;
	let kelle;

	if (selectedDate < ozkanStart) {
		kayyum = noKayyumText;
	} else if (selectedDate < buluStart) {
		kayyum = "Mehmed Özkan";
		streak = getDayDiff(selectedDate, ozkanStart);
		kelle = kelleler[rando];
	} else if (selectedDate < inciVekil) {
		kayyum = "Melih Bulu";
		streak = getDayDiff(selectedDate, buluStart);
		kelle = kelleler[rando + 2];
	} else if (selectedDate < inciStart) {
		kayyum = "Naci İnci (Vekil)";
		streak = getDayDiff(selectedDate, inciVekil);
		kelle = kelleler[rando + 4];
	} else {
		kayyum = "Naci İnci";
		streak = getDayDiff(selectedDate, inciStart);
		kelle = kelleler[rando + 4];
	}
	return (
		<div className="kayyummeter-container">
			<div className="kayyum-info-container">
				{kayyum !== noKayyumText ? <div className="kayyum-title">Kayyum:</div> : null}
				<div className="kayyum-name">{kayyum}</div>
				{streak ? (
					<div className="kayyum-streak-container">
						<span className="streak-count">{streak}.</span>
						<span className="streak-text"> gün</span>
					</div>
				) : null}
			</div>
			{kelle ? (
				<div className="kelle-container">
					<img src={kelle} className="kelle" />
				</div>
			) : null}
		</div>
	);
};
