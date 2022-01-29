import { Link } from "react-router-dom";
import "./infobox.scss";

export const InfoBox = () => {
	return (
		<div className="info-box">
			<div className="readme-header">BOĞAZİÇİ KAYYUM TARİHÇESİ</div>
			<div className="readme-text">
				<p>
					Boğaziçi Üniversitesi'nin son seçilmiş rektörü Gülay Barbarosoğlu'nun yerine ilk
					kayyum Mehmed Özkan atanalı 5 yılı aşkın süre geçti. Kayyum dönemi öncesini
					tecrübe etmiş olan öğrencilerin neredeyse hiçbiri artık okulda değil.
					Kampüslerin birer hapishaneye dönüşmeden önceki halini; her köşeyi saran
					kameraların, demir parmaklıkların, turnikelerin, kimlik sorgularının olmadığı,
					giriş çıkışların serbest olduğu, kampüste polis görmenin bir ihtimal dahi
					olmadığı zamanları hatırlayan pek kalmadı. Tabii bütün bunların nasıl
					değiştiğini de.
				</p>

				<p>
					Öğretim üyeleri arasında hatırlayanlar varsa bile bunu dile getirmiyorlar; hatta
					tam aksine, her şeyin 2 Ocak 2021 tarihinde Melih Bulu’nun atanmasıyla
					başladığını, ve kayyum Mehmed Özkan'ın{` "`}
					<a
						className="readme-text-link"
						href="https://bianet.org/bianet/egitim/255625-bogazici-universitesi-nde-son-bir-yilin-bilancosu"
					>
						2016-2020 arasındaki görev süresi boyunca tüm eleştirilere, zorluklara ve
						baskılara rağmen üniversitemizi korumaya ve kurum için başarılı çalışmaları
						sürdürebilmemize fırsat yaratmaya çalışan
					</a>
					{`" `}
					biri olduğunu iddia eden bir anlatıyı sahipleniyorlar.
				</p>

				<p>
					Özerklik ve demokrasi mücadelesi sırasında toplumsal hafızanın kesintiye
					uğratılması, veya daha da kötüsü çeşitli resmi tarih anlatılarıyla ikame
					edilmesi tehdidine karşı, bu süreci yaşamış bir grup insan olarak bu kronolojiyi
					derleme ihtiyacı hissettik.
				</p>
				<p>
					Bu kronoloji, ilk kayyum Mehmed Özkan'ın atanmasına giden sürecin en başından
					günümüze kadar geliyor. Asıl odak kayyumlar başta olmak üzere Boğaziçi'ndeki
					bütün aktörlerin bu süreçteki icraatlerini belgelemek olmakla birlikte, Boğaziçi
					Üniversitesi'ni doğrudan ilgilendiren siyasi olaylar da kronolojide yer alıyor.
					Boğaziçi ile doğrudan ilgisi olmayan, ülke veya dünya gündemine ilişkin genel
					olaylar kronolojide yer almıyor. Sitede daha hızlı gezinmek için mouse
					tekerleğini ve sağ-sol yön tuşlarını kullanabilirsiniz.
				</p>

				<p>
					Hiçbir maddi destek almadan, tamamen gönüllü ve amatör emek ile hazırlandığı
					için eksikler ve hatalar olabilir. Ekleme, düzeltme önerilerinizi, internette
					bulunmayan orijinal medyalarınızı (fotoğraf, video, ekran görüntüsü) ve
					tanıklıklarınızı aşağıdaki kanallardan iletirseniz müteşekkir oluruz.
				</p>
				<span>E-mail: info@bogazicikayyumtarihcesi.com</span>
				<br />
				<span>
					Twitter:{" "}
					<a className="readme-contact-link" href="">
						@bogazicikayyumtarihcesi
					</a>
				</span>
				<br />
				<span>
					Github:{" "}
					<a
						className="readme-contact-link"
						href="https://github.com/bogazicikayyumtarihcesi/bogazici-kayyum-tarihcesi"
					>
						https://github.com/bogazicikayyumtarihcesi/bogazici-kayyum-tarihcesi
					</a>
				</span>
				<br />
				<span>
					<Link className="readme-contact-link" to="/PGP">
						PGP
					</Link>
				</span>
			</div>
		</div>
	);
};
