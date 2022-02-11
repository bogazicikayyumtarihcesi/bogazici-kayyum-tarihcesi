import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWindowResize } from "../hooks/useWindowResize";
import fitty from "fitty";

import "./infobox.scss";

export const InfoBox = ({ customClass, closeButton, setLandingModal }) => {
	const [windowWidth, windowHeight] = useWindowResize();

	useEffect(() => {
		document.fonts.ready.then(() => {
			fitty(".readme-header", { maxSize: 46, minSize: 18 });
		});
	}, [windowWidth]);

	return (
		<div className={"info-box " + customClass ?? ""} onClick={(event => event.stopPropagation())}>
			{closeButton && windowWidth < 600 ? (
				<span className="close-button" 
				onClick={() => setLandingModal(false)}
				>
					✖
				</span>
			) : null}
			<div className="readme-header-container">
				<div className="readme-header">BOĞAZİÇİ KAYYUM TARİHÇESİ</div>
			</div>
			<div className="readme-text">
				<p>
					Boğaziçi Üniversitesi'nin <em>son seçilmiş rektörü</em> Gülay Barbarosoğlu'nun
					yerine ilk kayyum Mehmed Özkan atanalı 5 yıldan fazla oldu. Boğaziçi ve
					Türkiye'deki diğer üniversiteler YÖK rejimi altında tabii ki hiçbir zaman gerçek
					anlamda özerk ve özgür değildi. Fakat kayyum süreci, varla yok arasındaki
					özgürlük alanını kesin olarak ortadan kaldırdı.
				</p>
				<p>
					Bugün, kayyum dönemi öncesini tecrübe etmiş olan öğrencilerin neredeyse hiçbiri
					okulda değil. Boğaziçi kampüslerinin birer hapishaneye dönüşmeden önceki halini;
					her köşeyi saran kameraların, demir parmaklıkların, turnikelerin, kimlik
					sorgularının olmadığı, giriş çıkışların serbest olduğu, etkinliklerin
					sansürlenmediği, kampüste polis görmenin bir ihtimal dahi olmadığı zamanları
					hatırlayan pek kalmadı.
				</p>
				<p>
					Üstüne üstlük, her şeyin 2 Ocak 2021 tarihinde Melih Bulu’nun atanmasıyla
					başladığını, ve ilk kayyum Mehmed Özkan'ın{` "`}
					<a
						className="readme-text-link"
						href="https://bianet.org/bianet/egitim/255625-bogazici-universitesi-nde-son-bir-yilin-bilancosu"
					>
						2016-2020 arasındaki görev süresi boyunca tüm eleştirilere, zorluklara ve
						baskılara rağmen üniversitemizi korumaya ve kurum için başarılı çalışmaları
						sürdürebilmemize fırsat yaratmaya çalışan
					</a>
					{`," `}{" "}
					<a
						className="readme-text-link"
						href="https://t24.com.tr/haber/eski-bogazici-universitesi-rektoru-ustun-erguder-ankara-universiteden-gelen-talepleri-duymaya-ve-anlamaya-calismali,967828"
					>
						geleneğe uygun hareket eden, herkesin benimsediği
					</a>{" "}
					biri olduğunu iddia eden bir anlatı Boğaziçi kamuoyunda dolaşmaya, ve zamanında
					kayyum Özkan'ı desteklemiş öğretim üyeleri tarafından dile getirilmeye başladı.
				</p>
				<p>
					Özerklik ve demokrasi mücadelesi sırasında toplumsal hafızanın kesintiye
					uğratılması, daha da kötüsü{" "}
					<em>çeşitli resmi tarih anlatılarıyla ikame edilmesi</em> tehdidine karşı, bu
					süreci yaşamış bir grup insan olarak bu kronolojiyi derleme ihtiyacı hissettik.
				</p>
				<p>
					Kronoloji, ilk kayyum Mehmed Özkan'ın atanmasına giden sürecin en başından
					günümüze kadar geliyor. Nitelik itibariyle, derinlemesine bir bilgi kaynağı
					olmaktan ziyade{" "}
					<em>olabildiğince fazla olayı kaynaklarıyla içeren bir arşiv</em> olarak
					tasarlandı. Asıl odak, kayyumlar başta olmak üzere Boğaziçi'ndeki bütün
					aktörlerin bu süreçteki icraatlerini belgelemek olmakla birlikte, Boğaziçi
					Üniversitesi'ni doğrudan ilgilendiren siyasi olaylar da kronolojide yer alıyor.
					Ülke veya dünya gündemi üzerinden Boğaziçi ile dolaylı ilişkisi olan olaylar ise
					kronolojide yer almıyor.
				</p>
				<p>
					Sitede daha hızlı gezinmek için mouse tekerleğini ve sağ-sol yön tuşlarını
					kullanabilirsiniz. Başlıklara, görsellere veya "Detaylar" tuşuna basarak olayın
					detay ve kaynaklarını görebilir, sağ üstteki tarihe tıklayarak ilgili olayın
					linkini hızlıca kopyalayabilir ve paylaşabilirsiniz.
				</p>
				<p>
					Kaynak kodu açık olarak yayımladığımız bu projeyi hiçbir maddi destek almadan,
					tamamen gönüllü ve amatör emek ile hazırladığımız için eksikler ve hatalar
					olacaktır. Ekleme, düzeltme önerilerinizi (web sitesi hakkında teknik öneriler
					dahil), internette bulunmayan orijinal medyalarınızı (fotoğraf, video, ekran
					görüntüsü) ve döneme ilişkin tanıklıklarınızı aşağıdaki kanallardan iletirseniz
					müteşekkir oluruz. Proje hiçbir kar amacı gütmediği için telif hakkı konulu
					mailler ciddiye alınmayacaktır.
				</p>
				<span>E-mail: info@bogazicikayyumtarihcesi.com</span>
				<br />
				<span>
					Twitter:{" "}
					<a className="readme-contact-link" href="https://twitter.com/kayyumtarihcesi">
						@kayyumtarihcesi
					</a>
				</span>
				<br />
				<span>
					<a
						className="readme-contact-link"
						href="https://github.com/bogazicikayyumtarihcesi/bogazici-kayyum-tarihcesi"
					>
						Github
					</a>
				</span>
				<span> | </span>
				<span>
					<Link className="readme-contact-link" to="/PGP">
						PGP
					</Link>
				</span>
				<span> | </span>
				<span>
					<Link className="readme-contact-link" to="/license">
						License
					</Link>
				</span>
			</div>
		</div>
	);
};
