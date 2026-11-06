// Hizmet verisi, SSS, etiketler ve çeviriler (eski data.js + i18n.js)
const IMG = 'https://skywalkersparagliding.com/api/images/';
const WA = 'https://wa.me/905364616674?text=';

const A = [
{img:'e54c5031df519ed5.webp',p:'6.500 ₺',dep:'1.000 ₺',tag:{tr:'Popüler',en:'Popular'},
 tr:{n:'Yamaç Paraşütü',loc:'Fethiye/Ölüdeniz · 25-30 dk uçuş · toplam 1,5 saat',f:['Deneyimli Pilotlar','Güvenli Uçuş','GoPro Çekim'],
  desc:'Hayallerinizi ertelemeyin, gökyüzüne dokunun! 🪂 20+ yıllık profesyonel tecrübemiz ve en üst segment güvenlik standartlarımızla, dünyanın en eşsiz manzarasında süzülmeye hazır mısınız?',
  inc:['Fotoğraf & Video: GoPro ile 150-200 HD fotoğraf, video ve 360° çekim — uçuş sonrası telefonunuza aktarılır','Otel transferi (gidiş-dönüş)','Tam kapsamlı uçuş sigortası (Babadağ çıkışından inişe kadar)'],
  info:['Buluşma: Ölüdeniz Sahil — aktivite saatinden 30 dk önce','Minimum yaş: 4','İniş alanı: Ölüdeniz Plajı','Uçuş yüksekliği: 1965 metre','Kilo limiti: Kadın 80 kg, Erkek 100 kg','Diller: TR / EN'],
  prog:[['Konforlu Ulaşım','Uçuştan 30-40 dk önce otelinizden alınıyorsunuz.'],['Hazırlık ve Emanet','Eşyalarınızı güvenli emanet alanına bırakıyorsunuz.'],['Zirveye Yolculuk',"Babadağ'ın zirvesine 25-30 dk manzaralı tırmanış."],['Güvenlik ve Brifing','Pilotunuz ekipman ve uçuş hakkında kısa bilgi verir.'],['Havalanma Zamanı',"Ölüdeniz'in turkuaz suları üzerinde 25-30 dk özgürlük."],['Anı Ölümsüzleştirin','GoPro ile tüm anlarınız kaydedilir.'],['İniş ve Aktarım','Sahile yumuşak iniş, çekimler anında telefonunuza.'],['Dönüş','Otelinize güvenli servisle bırakılırsınız.']],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Spor ayakkabı','Güneş gözlüğü'],ban:['Terlik','Özel kameranız ile çekim'],
  extra:['Kadın Pilot: +2.000 ₺','Gün Batımı uçuşu: fiyat farkı uygulanır','Ekstra Akrobasi: havada adrenalin dolu manevralar','Kilo aşımı (Kadın 80+ / Erkek 100+ kg): +2.000 ₺']},
 en:{n:'Paragliding',loc:'Fethiye/Ölüdeniz · 25-30 min flight · 1.5h total',f:['Experienced Pilots','Safe Flight','GoPro Footage'],
  desc:"Don't postpone your dreams — touch the sky! 🪂 With 20+ years of professional experience and top-tier safety standards, get ready to glide over the world's most unique view.",
  inc:['Photos & Video: 150-200 HD photos, videos and 360° shots with GoPro — transferred to your phone after the flight','Hotel transfer (round trip)','Full flight insurance (from Babadağ ascent to landing)'],
  info:['Meeting point: Ölüdeniz Beach — 30 min before activity time','Minimum age: 4','Landing area: Ölüdeniz Beach','Flight altitude: 1965 m','Weight limit: Women 80 kg, Men 100 kg','Languages: TR / EN'],
  prog:[['Comfortable Pickup','Picked up from your hotel 30-40 min before the flight.'],['Preparation','Leave your belongings in our secure storage.'],['Ride to the Summit','Scenic 25-30 min drive to the top of Babadağ.'],['Safety Briefing','Your pilot explains the takeoff and flight.'],['Takeoff','25-30 min of freedom over the turquoise Blue Lagoon.'],['Capture the Moment','Every moment recorded with GoPro.'],['Landing & Transfer','Soft landing on the beach, footage sent to your phone.'],['Return','Safe shuttle back to your hotel.']],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Sport shoes','Sunglasses'],ban:['Flip-flops','Filming with your own camera'],
  extra:['Female Pilot: +2,000 TL','Sunset flight: price difference applies','Extra Acrobatics: adrenaline-filled maneuvers','Overweight (Women 80+ / Men 100+ kg): +2,000 TL']}},

{img:'d18349b455543e88.webp',p:'3.000 ₺',dep:'500 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'Tüplü Dalış',loc:'Fethiye/Ölüdeniz · toplam 1 saat',f:['25 Dk Su Altı','Tecrübeli Dalgıçlar','Ekipman Dahil'],
  desc:"Derinlerdeki sessizliğe yolculuk 🌊 Gökyüzünden sonra Ölüdeniz'in bir de kalbine inmeye ne dersiniz? Profesyonel eğitmenlerimiz ve sertifikalı donanımımızla, mavinin en berrak tonunda keşfe çıkıyoruz.",
  inc:['Dalış ekipmanları','Sigorta','Profesyonel eğitmen'],exc:['Yemek ve içecekler','Fotoğraf ve video','Otel transferi'],
  info:['Buluşma: Ölüdeniz Sahil','Minimum yaş: 12','Toplam süre: 1 saat — 25 dk su altında','Yüzme bilmek gerekmez','Fotoğraflarınız için telefonunuzda 2-3 GB boş alan bulundurun','Diller: TR / EN'],
  prog:[['Maviye Yelken Açın','Gizli koylara 10 dk speedboat yolculuğu, ekipman hazırlığı.'],['Keşif Dalışı','Rehber eşliğinde 25 dk büyüleyici su altı keşfi.'],['Anılarınız','Su altı kameralarıyla HD çekim — dilerseniz satın alabilirsiniz.'],['Kıyıya Dönüş','Dinlenme, yüzme ve sahile dönüş.']],
  bring:['Güneş kremi','Şort, mayo, havlu'],ban:['Kendi kameranız ile çekim'],extra:['+1 Misafir: +1.250 ₺']},
 en:{n:'Scuba Diving',loc:'Fethiye/Ölüdeniz · 1 hour total',f:['25 Min Underwater','Experienced Divers','Equipment Included'],
  desc:"A journey into the silence of the deep 🌊 After the sky, how about discovering the heart of Ölüdeniz? With professional instructors and certified equipment, we explore the clearest shade of blue.",
  inc:['Diving equipment','Insurance','Professional instructor'],exc:['Food and drinks','Photos and video','Hotel transfer'],
  info:['Meeting point: Ölüdeniz Beach','Minimum age: 12','Total duration: 1 hour — 25 min underwater','No swimming skills required','Keep 2-3 GB free on your phone for photos','Languages: TR / EN'],
  prog:[['Set Sail','10 min speedboat ride to hidden bays, equipment prep.'],['Discovery Dive','25 min guided underwater exploration.'],['Your Memories','HD underwater footage — available for purchase.'],['Return','Relax, swim and head back to shore.']],
  bring:['Sunscreen','Shorts, swimsuit, towel'],ban:['Filming with your own camera'],extra:['+1 Guest: +1,250 TL']}},

{img:'df1e254f8c8ef107.webp',p:'2.000 ₺',dep:'500 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'Tekne Turu',loc:'Fethiye Koyları · 10:30-17:00 (6+ saat)',f:['6 Koy','Öğle Yemeği','Aile Dostu'],
  desc:'⚓ Rotalar: Kelebekler Vadisi, Soğuk Su, St. Nicholas, Darboğaz, Akvaryum, Deve Plajı. Gürültülü aktivitelerden uzak, rahatlatıcı müzik ve aile dostu ortamda 6 koyda yüzme molaları.',
  inc:['Otel transferi','Sigorta','Öğle yemeği'],exc:['Bar','İçecekler'],
  info:['Buluşma: Ölüdeniz Sahil','Her yaşa uygun (0-1 yaş dahil)','Süre: 10:30 - 17:00','Diller: TR / EN'],
  reg:['Fethiye Merkez','Hisarönü','Çalış','Ölüdeniz'],bring:['Mayo','Havlu','Güneş kremi','Şapka'],ban:['Dışarıdan yiyecek ve içecek'],
  extra:['0-2 yaş bebekler: ücretsiz','2-5 yaş çocuklar: yarı ücret']},
 en:{n:'Boat Tour',loc:'Fethiye Bays · 10:30-17:00 (6+ hours)',f:['6 Bays','Lunch Included','Family Friendly'],
  desc:'⚓ Route: Butterfly Valley, Cold Water Bay, St. Nicholas Island, Darboğaz, Aquarium Bay, Camel Beach. Swimming breaks in 6 bays with relaxing music and a family-friendly atmosphere.',
  inc:['Hotel transfer','Insurance','Lunch'],exc:['Bar','Drinks'],
  info:['Meeting point: Ölüdeniz Beach','Suitable for all ages (incl. babies)','Duration: 10:30 - 17:00','Languages: TR / EN'],
  reg:['Fethiye Center','Hisarönü','Çalış','Ölüdeniz'],bring:['Swimsuit','Towel','Sunscreen','Hat'],ban:['Outside food and drinks'],
  extra:['Babies 0-2: free','Children 2-5: half price']}},

{img:'fb489335d7c59aad.webp',p:'3.000 ₺',dep:'1.000 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'Rafting Turu',loc:'Dalaman Çayı · 7 saat',f:['16 Km Parkur','Yemekler Dahil','Rehberli'],
  desc:"🌊 Dalaman Çayı'nın serin sularında 16 kilometrelik bir heyecan fırtınasına davetlisiniz. Hiçbir deneyim gerekmeden, uzman rehberlerimiz eşliğinde dev dalgalara karşı kürek çekmeye hazır olun!",
  inc:['Otel transferi','Sigorta','Kahvaltı','Öğle yemeği','Rehber'],exc:['Kantin','Kişisel harcamalar','Fotoğraf & video'],
  info:['Buluşma: Konumunuzdan alınış','Minimum yaş: 13','Yüzme bilmek önerilir','Güvenlik ekipmanları tur öncesi verilir, rehberler bilgilendirme yapar','Diller: TR / EN'],
  reg:['Fethiye Merkez','Ölüdeniz','Ovacık','Çalış'],bring:['Güneş kremi','Spor / su ayakkabısı','Yedek kıyafet','Şort, mayo, havlu','Şapka'],ban:['Hamile misafirler','Kalp rahatsızlığı olanlar','Alkol']},
 en:{n:'Rafting Tour',loc:'Dalaman River · 7 hours',f:['16 Km Course','Meals Included','Guided'],
  desc:'🌊 A 16-kilometer storm of excitement in the cool waters of the Dalaman River. No experience needed — get ready to paddle against giant waves with our expert guides!',
  inc:['Hotel transfer','Insurance','Breakfast','Lunch','Guide'],exc:['Canteen','Personal expenses','Photos & video'],
  info:['Meeting: pickup from your location','Minimum age: 13','Swimming skills recommended','Safety equipment provided with full briefing','Languages: TR / EN'],
  reg:['Fethiye Center','Ölüdeniz','Ovacık','Çalış'],bring:['Sunscreen','Sport / water shoes','Spare clothes','Shorts, swimsuit, towel','Hat'],ban:['Pregnant guests','Guests with heart conditions','Alcohol']}},

{img:'b353e87d436fdd73.webp',p:'1.750 ₺',dep:'500 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'At Safari Turu',loc:'Fethiye Yanıklar · 3 saat',f:['Tecrübe Gerekmez','Doğa','Rehberli'],
  desc:'Doğanın kalbinde bir yolculuk 🏇 Çam kokulu Yanıklar ormanlarında, son derece uysal ve eğitimli atlarımızla orman patikalarında ilerliyoruz. Tur öncesi kısa temel eğitim verilir — daha önce ata binmiş olmanıza gerek yok.',
  inc:['Tur rehberi','Otel transferi','Sigorta'],exc:['Yemek','İçecekler','Fotoğraf ve video'],
  info:['Buluşma: Konumunuzdan alınış','Minimum yaş: 7','Yeni başlayanlara uygun','Diller: TR / EN'],
  reg:['Fethiye','Hisarönü','Çalış','Ölüdeniz'],bring:['Uzun pantolon veya tayt (eyer tahrişine karşı)','Kapalı, rahat spor ayakkabı','Güneş kremi ve gözlük'],ban:['Alkol']},
 en:{n:'Horse Safari Tour',loc:'Fethiye Yanıklar · 3 hours',f:['No Experience Needed','Nature','Guided'],
  desc:'A journey into the heart of nature 🏇 Ride our gentle, well-trained horses along forest trails in the pine-scented Yanıklar woods. A short basic training is given before the tour — no riding experience needed.',
  inc:['Tour guide','Hotel transfer','Insurance'],exc:['Food','Drinks','Photos and video'],
  info:['Meeting: pickup from your location','Minimum age: 7','Beginner friendly','Languages: TR / EN'],
  reg:['Fethiye','Hisarönü','Çalış','Ölüdeniz'],bring:['Long pants or leggings (against saddle chafing)','Closed comfortable shoes','Sunscreen and sunglasses'],ban:['Alcohol']}},

{img:'03a371224d202384.webp',p:'1.500 ₺',dep:'1.000 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'Jeep Safari',loc:'Fethiye/Saklıkent · 7 saat',f:['Saklıkent Kanyonu','Su Savaşları','Öğle Yemeği'],
  desc:'Sadece bir gezi değil; adrenalin, takım ruhu ve doğayla iç içe geçen tam günlük bir eğlence! Su savaşları, çamur banyosu, Saklıkent Kanyonu ve Yakapark tek günde.',
  inc:['Tur rehberi','Sigorta','Otel transferi','Öğle yemeği'],exc:['Kişisel harcamalar','Fotoğraf ve video çekimleri'],
  info:['Buluşma: Konumunuzdan alınış','Minimum yaş: 6','Su savaşları yapılır — elektronik eşyalarınızı koruyun','Rahat kıyafet önerilir','Diller: TR / EN'],
  prog:[['07:00-08:00 Alınış','Servis araçlarımız sizi otelinizden alır.'],['Brifing','Aktivite bölgesinde kısa mola ve bilgilendirme.'],['Su Savaşı','Jeepler yan yana gelince su tabancaları ateşlenir!'],['Çamur Banyosu','Doğal peeling — cildiniz ipek gibi olacak.'],['Öğle Yemeği','Izgara alabalık veya tavuk şiş + açık büfe mezeler.'],['Saklıkent Kanyonu','Dağlardan gelen buz gibi kar suları ile zindelik.'],['Yakapark','Buz gibi su kanalları ve meşhur soğuk havuz meydan okuması.'],['Dönüş','Gün boyu çekilen komik fotoğraflarla keyifli dönüş yolculuğu.']],
  reg:['Fethiye','Ölüdeniz','Ovacık','Çalış'],bring:['Güneş kremi','Şapka','Havlu','Yedek kıyafet','Rahat ayakkabı'],ban:['Hamile misafirler']},
 en:{n:'Jeep Safari',loc:'Fethiye/Saklıkent · 7 hours',f:['Saklıkent Canyon','Water Fights','Lunch Included'],
  desc:'Not just a trip — a full day of adrenaline, team spirit and fun in nature! Water fights, mud bath, Saklıkent Canyon and Yakapark all in one day.',
  inc:['Tour guide','Insurance','Hotel transfer','Lunch'],exc:['Personal expenses','Photos and video'],
  info:['Meeting: pickup from your location','Minimum age: 6','Water fights happen — protect your electronics','Comfortable clothes recommended','Languages: TR / EN'],
  prog:[['07:00-08:00 Pickup','Our shuttle picks you up from your hotel.'],['Briefing','Short break and orientation at the activity area.'],['Water Fight','When the jeeps line up, the water guns fire!'],['Mud Bath','Natural peeling — your skin will feel silky.'],['Lunch','Grilled trout or chicken skewers + open buffet.'],['Saklıkent Canyon','Refreshing ice-cold snowmelt waters from the mountains.'],['Yakapark','Icy water channels and the famous cold-pool challenge.'],['Return','A fun ride back with the day\'s funny photos.']],
  reg:['Fethiye','Ölüdeniz','Ovacık','Çalış'],bring:['Sunscreen','Hat','Towel','Spare clothes','Comfortable shoes'],ban:['Pregnant guests']}},

{img:'2ac46d33b5eb8d45.webp',p:'2.000 ₺',dep:'1.000 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'ATV Turu',loc:'Fethiye Kayaköy · 60 dk sürüş',f:['60 Dk Sürüş','Transfer','Sigorta'],
  desc:'Toz, çamur ve adrenalin! Altınızdaki güçlü makineyle dar patikaları aşmak, engebeli arazide dengede kalmak ve gaza bastığınızda motorun kükreyişini duymak gerçek bir özgürlük hissidir.',
  inc:['Otel transferi','Sigorta'],exc:['Fotoğraf ve video'],
  info:['Buluşma: Konumunuzdan alınış','Sürücü için minimum yaş: 16 (küçükler artçı olarak katılabilir)','Ehliyet gerekmez','Diller: TR / EN'],
  prog:[['Eğitim','15 dk: gaz-fren mekanizması, dönüşler ve konvoy disiplini.'],['Hazırlık','Kask ve gözlük kontrolü — macera başlıyor!'],['Isınma Sürüşü','İlk kilometreler düz yolda, araçla bütünleşin.'],['Toz Maskeleri','Bandananızı takın, toz bulutu geliyor!'],['Vahşi Doğa','Orman yolları ve kayalık patikalarda özgürlük.']],
  reg:['Ölüdeniz','Fethiye Merkez','Hisarönü','Çalış'],bring:['Spor kıyafet','Güneş gözlüğü'],ban:['Alkollü katılım'],extra:['2 kişi tek araç: +500 ₺']},
 en:{n:'ATV Tour',loc:'Fethiye Kayaköy · 60 min ride',f:['60 Min Ride','Transfer','Insurance'],
  desc:'Dust, mud and adrenaline! Conquering narrow trails on a powerful machine, keeping balance on rough terrain and hearing the engine roar when you hit the gas — that is real freedom.',
  inc:['Hotel transfer','Insurance'],exc:['Photos and video'],
  info:['Meeting: pickup from your location','Minimum driver age: 16 (younger guests can ride as passengers)','No driving license required','Languages: TR / EN'],
  prog:[['Training','15 min: throttle, brakes, turns and convoy discipline.'],['Preparation','Helmet and goggles check — the adventure begins!'],['Warm-up Ride','First kilometers on flat roads to get comfortable.'],['Dust Masks','Put on your bandana, the dust cloud is coming!'],['Wild Nature','Freedom on forest roads and rocky trails.']],
  reg:['Ölüdeniz','Fethiye Center','Hisarönü','Çalış'],bring:['Sport clothes','Sunglasses'],ban:['Participation under the influence of alcohol'],extra:['2 people on one vehicle: +500 TL']}},

{img:'9d690a429b03b7db.webp',p:'8.000 ₺',dep:'500 ₺',tag:{tr:'Yeni',en:'New'},
 tr:{n:'Sürat Teknesi',loc:'Fethiye/Ölüdeniz · 2 saat',f:['Özel Tekne','Özel Kaptan','2 Rota'],
  desc:'Kalabalıktan uzak, sadece size özel bir macera. Sürat teknesi turları ile Fethiye/Ölüdeniz koylarında adrenalin dolu, prestijli bir yolculuğa hazır olun. Mavi bayraklı koylara kısa sürede ulaşın.',
  inc:['Özel kaptan','Sigorta'],exc:['Yiyecek','İçecekler'],
  info:['Buluşma: Ölüdeniz Sahil','Her yaşa uygun','2 rota seçeneği: Darboğaz veya Kelebekler Vadisi','Diller: TR / EN'],
  bring:['Güneş kremi','Şort, mayo','Havlu'],extra:['Kadın Kaptan: +2.000 ₺']},
 en:{n:'Speed Boat',loc:'Fethiye/Ölüdeniz · 2 hours',f:['Private Boat','Private Captain','2 Routes'],
  desc:'A private adventure away from the crowds. Get ready for an adrenaline-filled, prestigious journey through the bays of Fethiye/Ölüdeniz. Reach blue-flag bays in no time.',
  inc:['Private captain','Insurance'],exc:['Food','Drinks'],
  info:['Meeting point: Ölüdeniz Beach','Suitable for all ages','2 route options: Darboğaz or Butterfly Valley','Languages: TR / EN'],
  bring:['Sunscreen','Shorts, swimsuit','Towel'],extra:['Female Captain: +2,000 TL']}}
];
const T = [
{img:'167f9cea0fe905cf.webp',p:'4.000 ₺',dep:'1.000 ₺',pv:1,tag:{tr:'VIP',en:'VIP'},
 tr:{n:'VIP Transfer · Fethiye / Ölüdeniz',loc:'Dalaman Havalimanı ↔ Fethiye/Ölüdeniz',f:['Mercedes Vito','Paylaşımsız','7/24'],
  desc:"Dalaman Havalimanı'ndan kapınıza kadar kusursuz ulaşım. Size özel tahsis edilen paylaşımsız VIP araçlarla, uçuşunuzu anlık takip ediyor, sizi havalimanı çıkışında isminizle karşılıyoruz.",
  inc:['Özel araç ve profesyonel şoför','Uçuş takibi — rötarda ek ücret yok','İsimle karşılama ve bagaj yardımı','Ücretsiz çocuk koltuğu (talep üzerine)'],exc:['Yemek','İçecek'],
  info:['Güzergah: Dalaman Havalimanı (DLM) ↔ Fethiye, Ölüdeniz, Hisarönü','7 gün 24 saat hizmet','Paylaşımsız — araç sadece size özel','Diller: TR / EN']},
 en:{n:'VIP Transfer · Fethiye / Ölüdeniz',loc:'Dalaman Airport ↔ Fethiye/Ölüdeniz',f:['Mercedes Vito','Private','24/7'],
  desc:'Flawless transportation from Dalaman Airport to your door. In your own private VIP vehicle, we track your flight in real time and greet you by name at the airport exit.',
  inc:['Private vehicle and professional driver','Flight tracking — no extra charge for delays','Name greeting and luggage assistance','Free child seat (on request)'],exc:['Food','Drinks'],
  info:['Route: Dalaman Airport (DLM) ↔ Fethiye, Ölüdeniz, Hisarönü','24/7 service','Private — the vehicle is yours only','Languages: TR / EN']}},

{img:'167f9cea0fe905cf.webp',p:'5.000 ₺',dep:'1.000 ₺',pv:1,tag:{tr:'VIP',en:'VIP'},
 tr:{n:'VIP Transfer · Marmaris',loc:'Dalaman Havalimanı ↔ Marmaris · ~1,5 saat',f:['Mercedes Vito','Paylaşımsız','7/24'],
  desc:"Dalaman Havalimanı'ndan Marmaris'teki otelinize kadar konforlu ve paylaşımsız VIP transfer. Uçuşunuzu anlık takip ediyor, sizi terminal çıkışında isminizle karşılıyor ve kapınıza kadar bırakıyoruz.",
  inc:['Özel araç ve profesyonel şoför','Uçuş takibi — rötarda ek ücret yok','İsimle karşılama ve bagaj yardımı','Ücretsiz çocuk koltuğu (talep üzerine)'],exc:['Yemek','İçecek'],
  info:['Güzergah: Dalaman Havalimanı (DLM) ↔ Marmaris','Yolculuk süresi: yaklaşık 1,5 saat','7 gün 24 saat hizmet','Paylaşımsız — araç sadece size özel','Diller: TR / EN'],
  reg:['Marmaris Merkez','İçmeler','Armutalan','Siteler']},
 en:{n:'VIP Transfer · Marmaris',loc:'Dalaman Airport ↔ Marmaris · ~1.5 hours',f:['Mercedes Vito','Private','24/7'],
  desc:'Comfortable, private VIP transfer from Dalaman Airport to your hotel in Marmaris. We track your flight in real time, greet you by name at the terminal exit and drop you at your door.',
  inc:['Private vehicle and professional driver','Flight tracking — no extra charge for delays','Name greeting and luggage assistance','Free child seat (on request)'],exc:['Food','Drinks'],
  info:['Route: Dalaman Airport (DLM) ↔ Marmaris','Travel time: about 1.5 hours','24/7 service','Private — the vehicle is yours only','Languages: TR / EN'],
  reg:['Marmaris Center','İçmeler','Armutalan','Siteler']}}
];
const R = [
{img:'https://images.unsplash.com/photo-1587580945215-5d4aabb2c8ef?auto=format&fit=crop&w=900&q=70',p:null,u:'d',tag:{tr:'Kiralık',en:'Rental'},
 tr:{n:'Araba Kiralama',loc:'Ölüdeniz · Fethiye · Dalaman Havalimanı teslim',f:['Ekonomik → SUV','Otele teslim','Sigortalı'],
  desc:"Bölgeyi kendi temponuzda keşfedin. Ekonomik sınıftan SUV ve 7-9 kişilik araçlara kadar geniş seçenek; aracı otelinize ya da Dalaman Havalimanı'na teslim ediyoruz. Kayaköy, Saklıkent, Kelebekler Vadisi ve Likya koyları elinizin altında.",
  inc:['Kasko ve trafik sigortası','Sınırsız kilometre (günlük kiralamalarda)','Otele teslim ve otelden alım (Ölüdeniz, Hisarönü, Ovacık, Fethiye)','7/24 yol yardımı'],exc:['Yakıt','Köprü/otoyol geçişleri','Trafik cezaları'],
  info:['Sürücü yaşı en az 21, ehliyet en az 2 yıllık','Pasaport / kimlik ve geçerli ehliyet gerekli','Otomatik ve manuel vites seçenekleri','Havalimanı teslimi ek ücrete tabi olabilir',"Fiyat sezon ve araç sınıfına göre değişir — WhatsApp'tan teklif alın"],
  bring:['Ehliyet','Pasaport / kimlik','Kredi kartı (depozito için)']},
 en:{n:'Car Rental',loc:'Ölüdeniz · Fethiye · Dalaman Airport delivery',f:['Economy → SUV','Hotel delivery','Insured'],
  desc:'Explore the region at your own pace. From economy cars to SUVs and 7-9 seat vans; we deliver to your hotel or Dalaman Airport. Kayaköy, Saklıkent, Butterfly Valley and the Lycian bays are all within reach.',
  inc:['Comprehensive & third-party insurance','Unlimited mileage (daily rentals)','Hotel delivery & pickup (Ölüdeniz, Hisarönü, Ovacık, Fethiye)','24/7 roadside assistance'],exc:['Fuel','Toll fees','Traffic fines'],
  info:['Driver at least 21, licence held 2+ years','Passport / ID and valid driving licence required','Automatic and manual options','Airport delivery may cost extra','Price depends on season and car class — get a quote on WhatsApp'],
  bring:['Driving licence','Passport / ID','Credit card (for deposit)']}},

{img:'https://images.unsplash.com/photo-1565300480288-deb407e6ae15?auto=format&fit=crop&w=900&q=70',p:null,u:'d',tag:{tr:'Kiralık',en:'Rental'},
 tr:{n:'Motosiklet & Scooter Kiralama',loc:'Ölüdeniz · Hisarönü · Fethiye',f:['50cc – 125cc+','Kask dahil','Otele teslim'],
  desc:'Dar koy yollarında ve sahil boyunca en pratik ulaşım. Scooter ve motosikletlerimizi kask ile birlikte otelinize teslim ediyoruz; Ölüdeniz – Hisarönü – Fethiye arasında park derdi olmadan özgürce dolaşın.',
  inc:['Kask (sürücü ve yolcu)','Trafik sigortası','Otele teslim ve alım','Yol yardımı'],exc:['Yakıt','Trafik cezaları','Hasar muafiyeti dışı hasarlar'],
  info:['50cc için B veya A1 ehliyet; 125cc ve üzeri için A1/A2/A sınıfı ehliyet gerekir','Sürücü yaşı en az 18','Günlük ve haftalık kiralama',"Fiyat model ve süreye göre değişir — WhatsApp'tan teklif alın"],
  bring:['Ehliyet','Pasaport / kimlik','Depozito']},
 en:{n:'Motorbike & Scooter Rental',loc:'Ölüdeniz · Hisarönü · Fethiye',f:['50cc – 125cc+','Helmet incl.','Hotel delivery'],
  desc:'The easiest way around narrow bay roads and along the coast. We deliver scooters and motorbikes with helmets to your hotel — ride freely between Ölüdeniz, Hisarönü and Fethiye with no parking hassle.',
  inc:['Helmets (rider & passenger)','Third-party insurance','Hotel delivery & pickup','Roadside assistance'],exc:['Fuel','Traffic fines','Damage beyond the excess'],
  info:['50cc requires a B or A1 licence; 125cc+ requires an A1/A2/A licence','Rider at least 18','Daily and weekly rental','Price depends on model and duration — get a quote on WhatsApp'],
  bring:['Driving licence','Passport / ID','Deposit']}},

{img:'https://images.unsplash.com/photo-1549221279-aca391fb56d0?auto=format&fit=crop&w=900&q=70',p:null,u:'d',tag:{tr:'Kiralık',en:'Rental'},
 tr:{n:'ATV Kiralama',loc:'Ölüdeniz · Hisarönü · Kayaköy',f:['Saatlik / Günlük','Kask dahil','Sigortalı'],
  desc:"Rehberli tur yerine kendi rotanızı mı çizmek istiyorsunuz? Yola uygun, plakalı ATV'lerimizi saatlik veya günlük kiralayın; Kayaköy, Gemiler Koyu ve Babadağ eteklerinde özgürce sürün.",
  inc:['Kask','Trafik sigortası','Kısa kullanım eğitimi','Otele teslim (bölge içi)'],exc:['Yakıt','Trafik cezaları','Fotoğraf ve video'],
  info:['Plakalı, trafiğe çıkabilen ATV','Sürücü için B sınıfı ehliyet gerekir','Sürücü yaşı en az 18','Rehberli ATV turu için Aktiviteler bölümüne bakın',"Fiyat süreye göre değişir — WhatsApp'tan teklif alın"],
  bring:['Ehliyet','Kapalı ayakkabı','Güneş gözlüğü']},
 en:{n:'ATV Rental',loc:'Ölüdeniz · Hisarönü · Kayaköy',f:['Hourly / Daily','Helmet incl.','Insured'],
  desc:'Rather plan your own route than join a guided tour? Rent our road-legal, registered ATVs by the hour or the day and ride freely around Kayaköy, Gemiler Bay and the foothills of Babadağ.',
  inc:['Helmet','Third-party insurance','Short handling briefing','Hotel delivery (local area)'],exc:['Fuel','Traffic fines','Photos and video'],
  info:['Registered, road-legal ATV','Driver needs a category B licence','Driver at least 18','For a guided ATV tour see the Activities section','Price depends on duration — get a quote on WhatsApp'],
  bring:['Driving licence','Closed shoes','Sunglasses']}}
];
const H = [
{img:'https://images.unsplash.com/photo-1569660072562-48a035e65c30?auto=format&fit=crop&w=900&q=70',p:null,u:'n',tag:{tr:'Havuzlu',en:'Private Pool'},
 tr:{n:'Havuzlu Villa Kiralama',loc:'Ölüdeniz · Hisarönü · Ovacık · Kayaköy',f:['Özel havuz','2–6 yatak odası','Muhafazakâr seçenek'],
  desc:"Ailenize ya da arkadaş grubunuza özel, havuzlu villalar. Deniz veya Babadağ manzaralı, tam donanımlı mutfaklı villalar Ölüdeniz plajına ve Hisarönü merkezine kısa mesafede. Bütçenize ve kişi sayınıza uygun villayı WhatsApp'tan önerelim.",
  inc:['Özel havuz','Tam donanımlı mutfak','Klima ve Wi-Fi','Havlu ve nevresim','Giriş temizliği'],exc:['Havalimanı transferi (ayrıca eklenebilir)','Ekstra temizlik','Yemek'],
  info:['Minimum konaklama sezona göre 3–7 gece','Giriş 16:00 · Çıkış 10:00','Hasar depozitosu alınabilir','Muhafazakâr (korunaklı havuzlu) villa seçenekleri mevcuttur',"Fiyat villa, tarih ve kişi sayısına göre değişir — WhatsApp'tan teklif alın"],
  extra:['VIP havalimanı transferi','Araç kiralama','Aktivite ve tur paketleri']},
 en:{n:'Private Pool Villa Rental',loc:'Ölüdeniz · Hisarönü · Ovacık · Kayaköy',f:['Private pool','2–6 bedrooms','Secluded options'],
  desc:"Private-pool villas for your family or group of friends. Sea or Babadağ views, fully equipped kitchens, a short ride from Ölüdeniz beach and Hisarönü centre. Tell us your budget and group size on WhatsApp and we'll suggest the right villa.",
  inc:['Private pool','Fully equipped kitchen','Air conditioning & Wi-Fi','Towels & bed linen','Check-in cleaning'],exc:['Airport transfer (can be added)','Extra cleaning','Meals'],
  info:['Minimum stay 3–7 nights depending on season','Check-in 16:00 · Check-out 10:00','A damage deposit may apply','Secluded (privacy-screened pool) villas available','Price depends on villa, dates and group size — get a quote on WhatsApp'],
  extra:['VIP airport transfer','Car rental','Activity & tour packages']}},

{img:'https://images.unsplash.com/photo-1613914153139-79eafdf15d23?auto=format&fit=crop&w=900&q=70',p:null,u:'n',tag:{tr:'Günlük',en:'Daily'},
 tr:{n:'Günlük Kiralık Ev & Daire',loc:'Ölüdeniz · Hisarönü · Fethiye merkez',f:['Günlük / haftalık','1+1 → 3+1','Mutfaklı'],
  desc:"Otel yerine kendi evinizde gibi konaklayın. Kısa süreli kalışlar için 1+1'den 3+1'e mutfaklı, klimalı günlük kiralık ev ve daireler; plaja, çarşıya ve aktivite noktalarına yakın konumlarda.",
  inc:['Mutfak ve temel mutfak eşyaları','Klima ve Wi-Fi','Havlu ve nevresim','Giriş temizliği'],exc:['Havalimanı transferi (ayrıca eklenebilir)','Ekstra temizlik'],
  info:['Kısa süreli (günlük) kiralama — minimum gece sayısı daireye göre değişir','Giriş 14:00 · Çıkış 11:00','Kimlik / pasaport bildirimi zorunludur',"Fiyat daire, tarih ve kişi sayısına göre değişir — WhatsApp'tan teklif alın"],
  extra:['VIP havalimanı transferi','Araç / scooter kiralama','Aktivite ve tur paketleri']},
 en:{n:'Holiday Homes & Apartments',loc:'Ölüdeniz · Hisarönü · Fethiye centre',f:['Daily / weekly','1 → 3 bedrooms','Kitchen'],
  desc:'Stay like at home instead of a hotel. Air-conditioned homes and apartments with kitchens, from 1 to 3 bedrooms, for short stays — close to the beach, the bazaar and activity points.',
  inc:['Kitchen and basic kitchenware','Air conditioning & Wi-Fi','Towels & bed linen','Check-in cleaning'],exc:['Airport transfer (can be added)','Extra cleaning'],
  info:['Short-term (daily) rental — minimum nights vary by property','Check-in 14:00 · Check-out 11:00','ID / passport registration is mandatory','Price depends on property, dates and group size — get a quote on WhatsApp'],
  extra:['VIP airport transfer','Car / scooter rental','Activity & tour packages']}}
];
const P = [
{img:'a4e8e54a20ec34b2.webp',p:'9.025 ₺',dep:'1.000 ₺',
 tr:{n:'Uç & Dal',loc:'Ölüdeniz · Yarım gün · 2 aktivite',f:['Yamaç Paraşütü','Tüplü Dalış','Ücretsiz Transfer','Sigorta'],
  desc:"Güne gökyüzünde başlayın: sabah transferle Babadağ'a çıkıp Ölüdeniz'in eşsiz manzarasına karşı yamaç paraşütü heyecanını yaşayın (yaklaşık 30 dk uçuş). Öğleden sonra ise tecrübeli dalgıçlar rehberliğinde tüplü dalış — toplam 45 dk, bunun 25 dakikası su altında.",
  inc:['Fotoğraf & Video (GoPro ile, telefonunuza aktarılır)','Otel transferi (Fethiye, Ölüdeniz, Hisarönü, Ovacık)','Tam kapsamlı sigorta','Aynı gün 2 aktivite'],
  exc:['Kadın Pilot (özel talep)','Gün Batımı uçuşu (fiyat farkı)','Ekstra Akrobasi'],
  info:['08:30 — Yamaç Paraşütü','13:00 — Tüplü Dalış','Kilo limiti: Kadın 80 kg, Erkek 100 kg','Uçuş yüksekliği: 1965 m','Lütfen aktivitelere alkolsüz katılın'],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Spor ayakkabı','Güneş gözlüğü','Mayo, havlu'],ban:['Terlik','Özel kameranız ile çekim']},
 en:{n:'Fly & Dive',loc:'Ölüdeniz · Half day · 2 activities',f:['Paragliding','Scuba Diving','Free Transfer','Insurance'],
  desc:'Start the day in the sky: morning transfer to Babadağ for a paragliding flight over the stunning Blue Lagoon (approx. 30 min). In the afternoon, scuba diving with experienced divers — 45 min total, 25 of them underwater.',
  inc:['Photos & Video (GoPro, transferred to your phone)','Hotel transfer (Fethiye, Ölüdeniz, Hisarönü, Ovacık)','Full insurance','2 activities in one day'],
  exc:['Female Pilot (special request)','Sunset flight (price difference)','Extra Acrobatics'],
  info:['08:30 — Paragliding','13:00 — Scuba Diving','Weight limit: Women 80 kg, Men 100 kg','Flight altitude: 1965 m','Please join activities sober'],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Sport shoes','Sunglasses','Swimsuit, towel'],ban:['Flip-flops','Filming with your own camera']}},

{img:'c4406e275e90a016.webp',p:'7.838 ₺',old:'8.250 ₺',dep:'1.000 ₺',
 tr:{n:'Sür & Uç',loc:'Aynı gün · 2 aktivite',f:['At Safari','Yamaç Paraşütü','Transfer','Rehber','Sigorta'],
  desc:"Göklerin ve toprağın efsanesi: bir yanda Babadağ'ın zirvesinden süzülen bir kanat, diğer yanda doğanın kalbinde sadık bir dost... Bu paket, adrenalini huzurla, modern macerayı kadim bir gelenekle harmanlıyor.",
  inc:['Tur rehberi','Otel transferi','Sigorta','Paraşüt eğitmeni'],exc:['Yemek','İçecekler','Fotoğraf ve video (at safari)'],
  info:['08:30 — At Safari Turu (Yanıklar)','15:00 — Yamaç Paraşütü','Ata binme tecrübesi gerekmez','Lütfen aktivitelere alkolsüz katılın'],
  reg:['Fethiye','Hisarönü','Çalış','Ölüdeniz'],bring:['Uzun pantolon veya tayt','Kapalı spor ayakkabı','Güneş kremi ve gözlük'],ban:['Alkol']},
 en:{n:'Ride & Fly',loc:'Same day · 2 activities',f:['Horse Safari','Paragliding','Transfer','Guide','Insurance'],
  desc:'The legend of sky and earth: a wing gliding from the summit of Babadağ on one side, a loyal friend in the heart of nature on the other... This package blends adrenaline with serenity, modern adventure with ancient tradition.',
  inc:['Tour guide','Hotel transfer','Insurance','Paragliding instructor'],exc:['Food','Drinks','Photos and video (horse safari)'],
  info:['08:30 — Horse Safari Tour (Yanıklar)','15:00 — Paragliding','No riding experience needed','Please join activities sober'],
  reg:['Fethiye','Hisarönü','Çalış','Ölüdeniz'],bring:['Long pants or leggings','Closed sport shoes','Sunscreen and sunglasses'],ban:['Alcohol']}},

{img:'f63b53edb1785554.webp',p:'9.975 ₺',old:'10.250 ₺',dep:'2.000 ₺',
 tr:{n:'Uç, Sür & Yüz',loc:'2 gün · 3 aktivite',f:['Yamaç Paraşütü','ATV Turu','Tekne Turu','Transfer','Sigorta'],
  desc:'Adrenalin dozunu artırıyoruz! Sıkıcı tatil planlarını bir kenara bırakın; uçuşa geçeceğiniz, tozu dumana katacağınız ve suların tadını çıkaracağınız o büyük macera başlıyor. En çok tercih edilen rotalarla donatılmış Macera Paketi sizi bekliyor!',
  inc:['Fotoğraf & Video (paraşüt, GoPro ile)','Otel transferi','Tam kapsamlı sigorta','3 aktivite, 2 gün'],
  exc:['Kadın Pilot (özel talep)','Gün Batımı uçuşu (fiyat farkı)','Ekstra Akrobasi'],
  info:['1. Gün 08:30 — Yamaç Paraşütü','1. Gün 13:00 — ATV Turu','2. Gün 10:30 — Tekne Turu','Kilo limiti: Kadın 80 kg, Erkek 100 kg','Lütfen aktivitelere alkolsüz katılın'],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Spor ayakkabı','Güneş gözlüğü','Mayo, havlu, güneş kremi'],ban:['Terlik','Özel kameranız ile çekim']},
 en:{n:'Fly, Ride & Swim',loc:'2 days · 3 activities',f:['Paragliding','ATV Tour','Boat Tour','Transfer','Insurance'],
  desc:"We're raising the adrenaline dose! Put boring holiday plans aside; the big adventure begins — you'll take flight, kick up the dust and enjoy the waters. The Adventure Package with the most preferred routes awaits!",
  inc:['Photos & Video (paragliding, with GoPro)','Hotel transfer','Full insurance','3 activities over 2 days'],
  exc:['Female Pilot (special request)','Sunset flight (price difference)','Extra Acrobatics'],
  info:['Day 1, 08:30 — Paragliding','Day 1, 13:00 — ATV Tour','Day 2, 10:30 — Boat Tour','Weight limit: Women 80 kg, Men 100 kg','Please join activities sober'],
  reg:['Fethiye','Ovacık','Ölüdeniz'],bring:['Sport shoes','Sunglasses','Swimsuit, towel, sunscreen'],ban:['Flip-flops','Filming with your own camera']}}
];

const FAQ = {
"Yamaç Paraşütü":{
 tr:[
  ["İnerken sert bir iniş mi yapıyoruz?","Hayır, inişler Ölüdeniz sahilindeki çim alana veya kumsala yapılır. Pilotun talimatıyla sadece birkaç adım atarak yumuşak bir şekilde yere basarsınız."],
  ["Pilotla uçarken konuşabilir miyim?","Tabii ki! Pilotun hemen önünde oturduğunuz için rahatça sohbet edebilir, manzara hakkında bilgi alabilir veya heyecanınızı paylaşabilirsiniz."],
  ["Yanıma ne almalıyım?","En önemlisi ayağınızdan çıkmayacak bir spor ayakkabı ve güneş gözlüğü. Gökyüzü aşağıdan daha serin olabileceği için ince bir rüzgarlık alabilirsiniz."],
  ["Korkmalı mıyım? Uçaktan atlar gibi mi hissedeceğim?","Kesinlikle hayır! Boşluğa atlamıyorsunuz; sadece yamaçtan aşağı hafifçe koşuyorsunuz ve kanat sizi yavaşça yukarı kaldırıyor. Düşme hissi yerine kuş gibi süzülme hissi hakimdir."],
  ["Yaş sınırı var mı?","Alt sınır genellikle 4-5 yaştır. Üst sınır kişinin sağlık durumuna ve pilotun onayına bağlıdır. Kalp rahatsızlığı veya panik atağı olanlar için önerilmez."],
  ["Uçuş ne kadar sürüyor?","Hava koşullarına bağlı olarak havada kalış süresi ortalama 25-30 dakikadır. Hazırlık ve transferlerle birlikte toplam yaklaşık 2 saat ayırmanız gerekir."],
  ["Kilo sınırı var mı?","Evet, güvenlik ekipmanları nedeniyle genellikle erkeklerde 100-105 kg, kadınlarda 85-90 kg üst sınır vardır. Boy sınırı genelde 2 metredir."],
  ["Herhangi bir tecrübe gerekiyor mu?","Hayır. Yanınızda uçan profesyonel pilot her şeyi yönetir. Siz sadece başlangıçta birkaç adım koşarsınız, sonra gökyüzündesiniz!"]],
 en:[
  ["Is the landing rough?","No — we land softly on the grass or sand at Ölüdeniz beach. Following your pilot's instructions, you just take a few steps."],
  ["Can I talk to the pilot during the flight?","Of course! You sit right in front of the pilot, so you can chat, ask about the scenery and share the excitement."],
  ["What should I bring?","Most importantly, secure sport shoes and sunglasses. The sky can be cooler than the ground, so a light windbreaker is a good idea."],
  ["Should I be scared? Does it feel like jumping out of a plane?","Absolutely not! You don't jump into a void — you gently jog down a slope and the wing lifts you slowly. It feels like gliding like a bird, not falling."],
  ["Is there an age limit?","The lower limit is usually 4-5 years. The upper limit depends on health and pilot approval. Not recommended for guests with heart conditions or panic disorder."],
  ["How long is the flight?","Depending on the weather, 25-30 minutes in the air on average. With preparation and transfers, plan about 2 hours in total."],
  ["Is there a weight limit?","Yes — due to safety equipment, usually 100-105 kg for men and 85-90 kg for women. Height limit is around 2 m."],
  ["Do I need any experience?","No. The professional pilot flying with you manages everything. You just run a few steps at takeoff — then you're in the sky!"]]},
"Tüplü Dalış":{
 tr:[
  ["Yamaç paraşütü ve tüplü dalışı aynı gün yapabilir miyim?","Evet. Yarım günlük aktiviteler (yamaç paraşütü, tüplü dalış, ATV, at turu) aynı gün yapılabilir. Öğleden önce bir, öğleden sonra ikinci aktivite olarak planlamanız önerilir. Rafting, jeep safari ve tekne turu tam günlüktür."],
  ["Çocuklar dalış yapabilir mi?","Fiziksel gelişimi uygun olan ve ekipmanı taşıyabilecek 12 yaş ve üzeri çocuklar, ebeveyn onayı ile katılabilir."],
  ["Su altında ne kadar kalıyoruz?","Uluslararası keşif dalışı standartlarına göre yaklaşık 20-30 dakika. Bu süre, vücudunuzun su basıncına uyumu ve keyifli bir keşif için en ideal süredir."],
  ["Dalış ekipmanları hijyenik mi?","Kesinlikle. Tüm ekipmanlar her dalış sonrası uluslararası standartlara uygun dezenfektanlarla temizlenir."],
  ["Yüzme bilmek gerekiyor mu?","Hayır, deneme dalışları için yüzme bilme zorunluluğu yoktur. Eğitmenlerimiz su altında sizi yönlendirir ve tüm hareketlerinizi kontrol eder."]],
 en:[
  ["Can I do paragliding and scuba diving on the same day?","Yes. Half-day activities (paragliding, scuba, ATV, horse tour) can be combined in one day — one in the morning, one in the afternoon. Rafting, jeep safari and the boat tour are full-day."],
  ["Can children dive?","Children aged 12+ with suitable physical development can join with parental consent."],
  ["How long do we stay underwater?","About 20-30 minutes, per international discovery-dive standards — ideal for adjusting to water pressure and enjoying the exploration."],
  ["Is the diving equipment hygienic?","Absolutely. All equipment is disinfected after every dive to international standards."],
  ["Do I need to know how to swim?","No — discovery dives don't require swimming skills. Our instructors guide and control all your movements underwater."]]},
"Tekne Turu":{
 tr:[
  ["Yüzme bilmeyenler katılabilir mi?","Evet. Yüzme zorunlu değildir; dileyen misafirler teknede güneşlenip manzaranın tadını çıkarabilir. Yüzme molalarında can yelekleri mevcuttur."],
  ["Öğle yemeğinde ne var?","Öğle yemeği fiyata dahildir ve teknede servis edilir. İçecekler ve bar dahil değildir, tekneden ayrıca alınabilir."],
  ["Bebek ve çocuklarla gelinir mi?","Kesinlikle — teknemiz aile dostudur. 0-2 yaş bebekler ücretsiz, 2-5 yaş çocuklar yarı ücretlidir."],
  ["Hangi koylara gidiyoruz?","Kelebekler Vadisi, Soğuk Su Koyu, St. Nicholas Adası, Darboğaz, Akvaryum Koyu ve Deve Plajı — toplam 6 durakta yüzme ve fotoğraf molaları veriyoruz."],
  ["Tur ne kadar sürüyor?","10:30'da kalkıp yaklaşık 17:00'de dönüyoruz — 6 saatten fazla deniz keyfi."],
  ["Yanıma ne almalıyım?","Mayo, havlu, güneş kremi ve şapka yeterli. Dışarıdan yiyecek-içecek getirilmesine izin verilmez."]],
 en:[
  ["Can non-swimmers join?","Yes. Swimming is optional — you can simply sunbathe on deck and enjoy the views. Life jackets are available during swimming breaks."],
  ["What's for lunch?","Lunch is included and served on board. Drinks and the bar are not included and can be purchased separately."],
  ["Can we come with babies and kids?","Absolutely — the boat is family friendly. Babies 0-2 travel free, children 2-5 at half price."],
  ["Which bays do we visit?","Butterfly Valley, Cold Water Bay, St. Nicholas Island, Darboğaz, Aquarium Bay and Camel Beach — swimming and photo breaks at 6 stops."],
  ["How long is the tour?","We depart at 10:30 and return around 17:00 — more than 6 hours at sea."],
  ["What should I bring?","Swimsuit, towel, sunscreen and a hat are enough. Outside food and drinks are not allowed."]]},
"Rafting Turu":{
 tr:[
  ["Yanımda ne getirmeliyim?","Islanacak bir mayo/şort, ayağınızdan çıkmayacak bir deniz ayakkabısı (yoksa kiralayabilirsiniz) ve en önemlisi aktivite sonrası giyeceğiniz kuru yedek kıyafetler."],
  ["Transfer ve yemek için ekstra ödeme yapacak mıyım?","Hayır, her şey dahil! Otel transferi, sabah nehir kenarında köy kahvaltısı ve tur sonundaki öğle yemeği pakete dahildir."],
  ["Yaş sınırı ve katılım koşulları neler?","Heyecan dolu dalgalar nedeniyle alt yaş sınırı 13'tür. Ciddi sağlık sorunu olmayan herkes katılabilir."],
  ["Yüzme bilmem şart mı?","Profesyonel can yelekleri sayesinde suyun üzerinde kalmak için ekstra çaba gerekmez. Rehberlerin talimatlarını izlemeniz yeterli."],
  ["Güvende miyim?","Kesinlikle. Her botta dünya standartlarında eğitim almış bir nehir rehberi bulunur; kask ve can yelekleriyle güvenliğiniz en üst seviyededir."],
  ["Tur nerede gerçekleşiyor?","Fethiye'ye yaklaşık 1,5 saat mesafede, Türkiye'nin en ünlü parkurlarından Dalaman Çayı üzerinde."]],
 en:[
  ["What should I bring?","A swimsuit/shorts that can get wet, water shoes that stay on your feet (rentable if needed) and — most importantly — dry spare clothes for after."],
  ["Do I pay extra for transfer and meals?","No, it's all inclusive! Hotel transfer, a village breakfast by the river and lunch at the end of the tour are included."],
  ["Age limit and participation conditions?","Due to the exciting rapids, the minimum age is 13. Anyone without serious health issues can join."],
  ["Do I have to know how to swim?","Professional life jackets keep you afloat with no extra effort. Just follow your guide's instructions."],
  ["Am I safe?","Absolutely. Every raft has an internationally trained river guide; helmets and life jackets keep safety at the highest level."],
  ["Where does the tour take place?","On the Dalaman River, one of Türkiye's most famous courses, about 1.5 hours from Fethiye."]]},
"At Safari Turu":{
 tr:[
  ["Yanımda ne getirmeliyim?","Rahat hareket edebileceğiniz uzun pantolon veya tayt (eyer tahrişine karşı), kapalı rahat spor ayakkabı, güneş kremi ve gözlük."],
  ["Fotoğraf ve video çekiliyor mu?","Tur boyunca en güzel manzaralarda duraklayarak profesyonel çekimlerinizi yapıyoruz."],
  ["Yaş ve kilo sınırı var mı?","Güvenliğiniz ve atlarımızın sağlığı için katılım yaşı 7+, maksimum kilo sınırı 95-100 kg'dır."],
  ["Transfer var mı?","Fethiye, Ölüdeniz, Hisarönü ve Ovacık bölgelerinden ücretsiz transfer mevcuttur. Sizi otelinizden alıp tur sonunda geri bırakıyoruz."]],
 en:[
  ["What should I bring?","Long pants or leggings for comfortable riding (against saddle chafing), closed comfortable shoes, sunscreen and sunglasses."],
  ["Are photos and videos taken?","Yes — we stop at the most scenic spots along the route for professional shots."],
  ["Is there an age or weight limit?","For your safety and our horses' health: minimum age 7, maximum weight 95-100 kg."],
  ["Is transfer included?","Free transfer from Fethiye, Ölüdeniz, Hisarönü and Ovacık. We pick you up from your hotel and drop you back after the tour."]]},
"Jeep Safari":{
 tr:[
  ["Tur ne kadar sürüyor?","Sabah 08:30-09:00 gibi başlar, akşam 18:00-18:30 civarında sona erer — tam günlük bir serüven."],
  ["Hangi bölgeler ziyaret ediliyor?","Fethiye rotasında klasik olarak Tlos Antik Kenti, Yakapark, Saklıkent Kanyonu, Gizlikent Şelalesi ve çamur banyosu durakları bulunur."],
  ["Jeep Safari güvenli mi?","Evet, araçlar periyodik bakımdan geçer ve şoförler bu parkurlarda deneyimlidir. Araç içinde ayağa kalkmamak ve tutunmak önemlidir."],
  ["Çocuklar için uygun mu?","Evet, çocuklar için çok eğlencelidir. Çok küçük bebekler için sarsıntı yorucu olabilir; 6 yaş ve üzeri idealdir."],
  ["Ne giymeliyim?","Çabuk kuruyan şort ve tişört en iyisidir. Ayağınızdan çıkmayacak sandalet veya deniz ayakkabısı seçin; mayonuzu içinize giyin."],
  ["Öğle yemeği dahil mi?","Evet, öğle yemeği fiyata dahildir. Genellikle alabalık, tavuk veya vejetaryen seçenekler sunulur; içecekler ekstradır."],
  ["Fotoğraf ve video çekimi yapılıyor mu?","Evet, profesyonel çekim ekibi bulunur. Gün sonunda görüntüleri ek ücretle satın alabilirsiniz."],
  ["Aynı gün başka aktivite yapılabilir mi?","Önerilmez — tur yaklaşık 10 saat sürer ve yorucudur. Akşamına sakin bir plan yapabilirsiniz."]],
 en:[
  ["How long is the tour?","Starts around 08:30-09:00 and ends around 18:00-18:30 — a full-day adventure."],
  ["Which places are visited?","The classic Fethiye route includes Tlos Ancient City, Yakapark, Saklıkent Canyon, Gizlikent Waterfall and the mud bath."],
  ["Is it safe?","Yes — vehicles get periodic maintenance and drivers are experienced on these routes. Stay seated and hold on for safety."],
  ["Is it suitable for children?","Yes, kids love it. The bumps can be tiring for very small babies; ideal for ages 6+."],
  ["What should I wear?","Quick-dry shorts and t-shirts are best. Pick sandals or water shoes that stay on; wear your swimsuit underneath."],
  ["Is lunch included?","Yes — usually grilled trout, chicken or vegetarian options; drinks are extra."],
  ["Are photos and videos taken?","Yes, a professional team shoots during the tour. You can buy the footage at the end for an extra fee."],
  ["Can I do another activity the same day?","Not recommended — the tour takes about 10 hours and is physically tiring. Plan something calm for the evening."]]},
"ATV Turu":{
 tr:[
  ["Sağlık durumu önemli mi?","Özel bir sağlık durumunuz (bel fıtığı, hamilelik vb.) varsa mutlaka tur öncesi belirtin."],
  ["Turda hız sınırı var mı?","Evet, bu bir yarış değil konvoy turudur. Rehberin belirlediği hıza ve takip mesafesine uyulması gerekir."],
  ["Gözlük takmak zorunda mıyım?","Kesinlikle! Tozdan ve küçük taşlardan korunmak için güneş gözlüğü veya verilen koruyucu gözlük takılmalıdır."],
  ["Çocuklar binebilir mi?","12-14 yaş üstü çocuklar ebeveynlerinin arkasında yolcu olarak binebilir. Kendi başına sürmek için 16 yaş sınırı vardır."],
  ["Yağmurlu havada tur iptal olur mu?","Aksine, yağmur macerayı ikiye katlar! Çamur artar, adrenalin tavan yapar. Güvenliği tehdit etmediği sürece tur devam eder."],
  ["Yanıma çanta alabilir miyim?","Büyük sırt çantaları dengeyi bozabilir; küçük bel çantası idealdir. Değerli eşyalarınızı ofisteki kilitli dolaplara bırakabilirsiniz."],
  ["Çok kirlenir miyim?","\"Çok\" kelimesi az kalır! Toz, toprak ve su birikintileriyle iç içe olacaksınız. En eski kıyafetlerinizi giyin."],
  ["Ehliyetim yok, sürebilir miyim?","Evet! Turlar trafiğe kapalı orman ve arazi yollarında yapıldığı için ehliyet gerekmez. Kısa bir eğitim yeterli."]],
 en:[
  ["Does health condition matter?","If you have a condition (herniated disc, pregnancy, etc.), let us know before the tour."],
  ["Is there a speed limit?","Yes — this is a convoy tour, not a race. Follow the guide's set speed and spacing."],
  ["Do I have to wear goggles?","Definitely! Wear sunglasses or the protective goggles provided against dust and small stones."],
  ["Can children ride?","Kids over 12-14 can ride as passengers behind a parent. Driving solo requires age 16+."],
  ["Is the tour cancelled in rain?","On the contrary — rain doubles the fun! More mud, more adrenaline. The tour continues unless safety is at risk."],
  ["Can I bring a bag?","Big backpacks affect balance; a small waist bag is ideal. Valuables can be left in lockers at the office."],
  ["Will I get dirty?","\"Very\" is an understatement! Dust, dirt and puddles everywhere — wear your oldest clothes."],
  ["No driving license — can I drive?","Yes! Tours run on closed forest and off-road tracks, so no license is needed. A short training is enough."]]},
"Sürat Teknesi":{
 tr:[
  ["Tekne sadece bize mi özel?","Evet, tekne ve kaptan tamamen size özeldir — başka misafir alınmaz. Rota ve molalar grubunuza göre planlanır."],
  ["Hangi rotalardan birini seçebilirim?","İki seçenek var: Darboğaz rotası veya Kelebekler Vadisi rotası. Rezervasyon sırasında WhatsApp'tan tercihinizi belirtmeniz yeterli."],
  ["Kaç kişi binebiliriz?","Tekne kapasitesi sınırlıdır; grup sayınızı WhatsApp'tan yazın, size en uygun planlamayı yapalım."],
  ["Yüzme molası veriliyor mu?","Evet, mavi bayraklı koylarda yüzme ve fotoğraf molaları veriyoruz. Mayo, havlu ve güneş kremi getirmeyi unutmayın."],
  ["Çocuklarla binebilir miyiz?","Evet, her yaşa uygundur. Çocuklar için can yeleği bulunur; bebekli aileler için sakin rota önerilir."],
  ["Yiyecek-içecek dahil mi?","Hayır, yiyecek ve içecekler fiyata dahil değildir. Yanınızda getirebilir veya hareket öncesi sahilden temin edebilirsiniz."]],
 en:[
  ["Is the boat private to us?","Yes — the boat and captain are exclusively yours, no other guests. Route and breaks are planned around your group."],
  ["Which routes can I choose from?","Two options: the Darboğaz route or the Butterfly Valley route. Just tell us your preference on WhatsApp when booking."],
  ["How many people can join?","Boat capacity is limited; message us your group size on WhatsApp and we'll plan the best option."],
  ["Are there swimming breaks?","Yes — swimming and photo breaks at blue-flag bays. Don't forget swimsuit, towel and sunscreen."],
  ["Can we bring children?","Yes, suitable for all ages. Life jackets are available for kids; a calm route is recommended for families with babies."],
  ["Are food and drinks included?","No — food and drinks are not included. You may bring your own or buy at the beach before departure."]]},
"Araba Kiralama":{
 tr:[
  ["Aracı havalimanında teslim alabilir miyim?","Evet, Dalaman Havalimanı'nda teslim ve iade mümkündür. Uçuş bilginizi WhatsApp'tan iletmeniz yeterli."],
  ["Depozito alıyor musunuz?","Araç sınıfına göre kredi kartından provizyon veya nakit depozito alınır; araç sorunsuz iade edildiğinde iade edilir."],
  ["Ek sürücü ekleyebilir miyim?","Evet, ek sürücünün ehliyet ve kimlik bilgilerini teslimde vermeniz yeterli."]],
 en:[
  ["Can I pick the car up at the airport?","Yes, pickup and return at Dalaman Airport is possible. Just send us your flight details on WhatsApp."],
  ["Do you take a deposit?","Depending on the car class, a credit-card hold or cash deposit is taken and returned when the car comes back without issues."],
  ["Can I add an extra driver?","Yes, just provide the extra driver's licence and ID at handover."]]},
"Motosiklet & Scooter Kiralama":{
 tr:[
  ["Hangi ehliyet gerekiyor?","50cc scooter için B veya A1 ehliyet yeterlidir. 125cc ve üzeri motosikletler için A1, A2 veya A sınıfı ehliyet gerekir."],
  ["Kask veriyor musunuz?","Evet, sürücü ve yolcu için kask ücretsiz verilir; kask takmak yasal zorunluluktur."]],
 en:[
  ["Which licence do I need?","A B or A1 licence is enough for a 50cc scooter. Motorbikes of 125cc and above require an A1, A2 or A licence."],
  ["Do you provide helmets?","Yes, helmets for rider and passenger are free — wearing one is required by law."]]},
"Havuzlu Villa Kiralama":{
 tr:[
  ["Villaları önceden görebilir miyim?","Evet, WhatsApp'tan tarih ve kişi sayınızı yazın; uygun villaların fotoğraf, video ve konumlarını gönderelim."],
  ["Ödeme nasıl yapılıyor?","Rezervasyonu kesinleştirmek için ön ödeme alınır, kalan tutar girişte ödenir. Detaylar villaya göre değişir."],
  ["Transfer ve araç ayarlayabilir misiniz?","Evet, havalimanı transferini, araç kiralamayı ve aktiviteleri villanızla birlikte tek seferde planlayabiliriz."]],
 en:[
  ["Can I see the villas beforehand?","Yes — send us your dates and group size on WhatsApp and we'll share photos, videos and locations of available villas."],
  ["How does payment work?","A deposit confirms the booking and the balance is paid at check-in. Details vary by villa."],
  ["Can you arrange transfer and a car?","Yes, we can plan your airport transfer, car rental and activities together with your villa."]]},
"VIP Transfer · Marmaris":{
 tr:[
  ["Uçağım rötar yaparsa ne olur?","Uçuşunuzu anlık takip ediyoruz; rötar olsa bile şoförünüz sizi bekler ve ek ücret ödemezsiniz."],
  ["Sizi havalimanında nasıl bulacağım?","Şoförünüz terminal çıkışında isminizin yazılı olduğu tabela ile sizi karşılar ve bagajlarınıza yardımcı olur."],
  ["Yolculuk ne kadar sürüyor?","Dalaman Havalimanı'ndan Marmaris merkeze yaklaşık 1,5 saat sürer; İçmeler biraz daha uzundur. Trafiğe göre değişebilir."],
  ["Fiyat kişi başı mı?","Hayır, fiyat araç başıdır. Mercedes Vito araç tamamen size özeldir; grubunuzdaki herkes aynı fiyata yolculuk eder."],
  ["Dönüş transferi de yapıyor musunuz?","Evet, Marmaris'teki otelinizden Dalaman Havalimanı'na dönüş transferi de aynı fiyatla yapılır. Gidiş-dönüş için WhatsApp'tan yazmanız yeterli."],
  ["Gece geç saatte inersem hizmet var mı?","Evet, 7 gün 24 saat hizmet veriyoruz. Uçağınız gece yarısı da inse şoförünüz kapıda olur."]],
 en:[
  ["What if my flight is delayed?","We track your flight in real time; even if it's delayed, your driver waits and there is no extra charge."],
  ["How do I find you at the airport?","Your driver greets you at the terminal exit with a name sign and helps with your luggage."],
  ["How long is the ride?","About 1.5 hours from Dalaman Airport to Marmaris center; İçmeler is slightly longer. Depends on traffic."],
  ["Is the price per person?","No — the price is per vehicle. The whole Mercedes Vito is yours; your entire group rides for the same price."],
  ["Do you do return transfers too?","Yes — return from your Marmaris hotel to Dalaman Airport is the same price. Just message us on WhatsApp for a round trip."],
  ["Do you operate late at night?","Yes, we operate 24/7. Even if your flight lands at midnight, your driver will be at the door."]]},
"VIP Transfer · Fethiye / Ölüdeniz":{
 tr:[
  ["Uçağım rötar yaparsa ne olur?","Uçuşunuzu anlık takip ediyoruz; rötar olsa bile şoförünüz sizi bekler ve ek ücret ödemezsiniz."],
  ["Sizi havalimanında nasıl bulacağım?","Şoförünüz terminal çıkışında isminizin yazılı olduğu tabela ile sizi karşılar ve bagajlarınıza yardımcı olur."],
  ["Araçta başka yolcu olacak mı?","Hayır, transfer paylaşımsızdır. Mercedes Vito aracın tamamı sadece size ve sevdiklerinize tahsis edilir."],
  ["Çocuk koltuğu var mı?","Evet, talep etmeniz halinde ücretsiz çocuk koltuğu araçta hazır bulunur. Rezervasyonda belirtmeniz yeterli."],
  ["Gece geç saatte inersem hizmet var mı?","Evet, 7 gün 24 saat hizmet veriyoruz. Uçağınız gece yarısı da inse şoförünüz kapıda olur."],
  ["Yolculuk ne kadar sürüyor?","Dalaman Havalimanı'ndan Fethiye yaklaşık 50 dk, Ölüdeniz ve Hisarönü yaklaşık 1 saat 10 dk sürer; trafiğe göre değişebilir."]],
 en:[
  ["What if my flight is delayed?","We track your flight in real time; even if it's delayed, your driver waits and there is no extra charge."],
  ["How do I find you at the airport?","Your driver greets you at the terminal exit with a name sign and helps with your luggage."],
  ["Will there be other passengers?","No — the transfer is private. The whole Mercedes Vito is reserved for you and your companions only."],
  ["Is a child seat available?","Yes — a free child seat is ready in the vehicle on request. Just mention it when booking."],
  ["Do you operate late at night?","Yes, we operate 24/7. Even if your flight lands at midnight, your driver will be at the door."],
  ["How long is the ride?","From Dalaman Airport: about 50 min to Fethiye, around 1h 10min to Ölüdeniz and Hisarönü, depending on traffic."]]},
"Sür & Uç":{
 tr:[
  ["Tura geç kalırsam ne yapmalıyım?","Transfer araçları ve çıkış saatleri organize gruplar halinde dakik işler. Gecikme durumunda hemen WhatsApp hattımızdan tur sorumlusuyla iletişime geçin."],
  ["Kendi telefonum/kameramla çekim yapabilir miyim?","Tur boyunca profesyonel ekibimiz çekimlerinizi yapar; bu çekimleri tur sonunda ek ücretle dijital olarak satın alabilirsiniz."],
  ["Tur günü ne giymeliyim?","Spor pantolon veya tayt ile kapalı spor ayakkabı zorunludur. Terlik, sandalet, şort veya etekle katılım güvenlik gerekçesiyle yasaktır. Güneş gözlüğü ve krem önerilir."],
  ["Daha önce hiç ata binmedim, katılabilir miyim?","Evet. Binicilik eğitimi gerekmez; tur öncesi eğitmenlerimiz at yönetimi ve güvenlik kuralları hakkında bilgilendirme yapar. Atlarımız uysal ve özel eğitimlidir."],
  ["Eşyalarım kaybolursa sorumluluk kimde?","Tur süresince unutulan veya kaybedilen kişisel eşyaların sorumluluğu katılımcıya aittir. Kayıp durumunda hemen rehberinize bilgi verin."],
  ["Kilo, yaş veya sağlık sınırı var mı?","At turu için üst kilo sınırı 100-110 kg, alt yaş sınırı 6'dır. Hamileler ile ciddi bel/boyun fıtığı veya ileri eklem rahatsızlığı olanlar güvenlik nedeniyle katılamaz."],
  ["Sigorta güvencesi var mı?","Evet. Transfer yolculuğundan aktivitelere kadar tüm süreç koltuk ve üçüncü şahıs mali mesuliyet sigortası ile koruma altındadır."],
  ["Fiyata neler dahil? Ekstra öder miyim?","Gidiş-dönüş transfer, profesyonel rehberlik, kask ve koruyucu ekipman, giriş ücretleri ve zorunlu seyahat sigortası dahildir. Fotoğraf/video hariçtir. Sürpriz ücret yoktur."],
  ["Paket turu iptal edersem haklarım neler?","Tur kalkışından en az 48 saat önce iletilen iptallerde ücretin tamamı iade edilir. Son 48 saat içindeki iptallerde iade yapılmaz."],
  ["Hava şartları tura engel olursa ne olur?","Güvenlik gerekçesiyle iptal edilen turlarda ücretiniz eksiksiz iade edilir veya talebinize göre uygun bir tarihe ertelenir."]],
 en:[
  ["What if I'm late for the tour?","Transfers and departure times run punctually for organized groups. If delayed, contact us immediately on WhatsApp."],
  ["Can I film with my own phone/camera?","Our professional team shoots throughout the tour; you can buy the footage digitally at the end for an extra fee."],
  ["What should I wear on tour day?","Sport pants or leggings and closed sport shoes are mandatory. Flip-flops, sandals, shorts or skirts are not allowed for safety. Sunglasses and sunscreen recommended."],
  ["I've never ridden a horse — can I join?","Yes. No riding experience needed; our instructors brief you on horse handling and safety before the tour. Our horses are gentle and specially trained."],
  ["Who is responsible if I lose my belongings?","Personal items forgotten or lost during the tour are the participant's responsibility. Inform your guide immediately if something is lost."],
  ["Weight, age or health limits?","For the horse tour: max weight 100-110 kg, minimum age 6. Pregnant guests and those with serious disc or joint conditions cannot join for safety."],
  ["Is there insurance coverage?","Yes. The whole process — from transfer to activities — is covered by seat and third-party liability insurance."],
  ["What's included? Any extras?","Round-trip transfer, professional guiding, helmet and protective equipment, entrance fees and mandatory travel insurance are included. Photos/video are extra. No surprise fees."],
  ["What are my rights if I cancel?","Cancellations made at least 48 hours before departure get a full refund. No refund within the last 48 hours."],
  ["What if weather prevents the tour?","If we cancel for safety reasons, you get a full refund or we reschedule to a date of your choice."]]}
};

const L = {
 tr:{about:'Bu Deneyim Hakkında',inc:'Dahil Olanlar',exc:'Dahil Olmayanlar',info:'Önemli Bilgiler',bring:'Getirmeniz Gerekenler',ban:'İzin Verilmeyenler',prog:'Tur Programı',reg:'Ücretsiz Otel Transferi Bölgeleri',extra:'Ekstralar (ücretli)',faq:'Sık Sorulan Sorular',dep:'Ön ödeme',depNote:'kalan tutar aktivite günü ödenir',book:"WhatsApp'tan Rezervasyon",pp:'kişi başı',det:'Detaylar',pkg:'Paket Tur',sched:'Dahil Aktiviteler',pv:'araç başı',reg2:'Hizmet Bölgeleri',d:'günlük',n:'gecelik',ask:'Fiyat için yazın',askB:'Teklif Al',quote:"WhatsApp'tan Fiyat Al"},
 en:{about:'About This Experience',inc:'Included',exc:'Not Included',info:'Important Information',bring:'What to Bring',ban:'Not Allowed',prog:'Tour Program',reg:'Free Hotel Transfer Areas',extra:'Extras (paid)',faq:'Frequently Asked Questions',dep:'Deposit',depNote:'remaining balance paid on activity day',book:'Book on WhatsApp',pp:'per person',det:'Details',pkg:'Package Tour',sched:'Included Activities',pv:'per vehicle',reg2:'Service Areas',d:'per day',n:'per night',ask:'Ask for price',askB:'Get Quote',quote:'Get a Price on WhatsApp'}
};


const U = 'https://images.unsplash.com/photo-', UQ = '?auto=format&fit=crop&w=900&q=70';

// Günlük turlar & geziler
const X = [
{img:U+'1626009740542-691a70fd230f'+UQ,p:null,tag:{tr:'Tekne',en:'Boat'},
 tr:{n:'Kelebekler Vadisi Tekne Turu',loc:'Ölüdeniz · Tam gün · 10:00-17:30',f:['Kelebekler Vadisi','Mavi Mağara','Öğle Yemeği'],
  desc:"Ölüdeniz'den kalkan klasik tekne turu: Kelebekler Vadisi, Mavi Mağara, St. Nicholas (Gemiler) Adası, Deve Plajı ve Soğuksu Koyu. Gün boyu yüzme molaları, teknede öğle yemeği ve Likya kıyılarının en güzel manzaraları.",
  inc:['Öğle yemeği','Otel transferi (Ölüdeniz, Hisarönü, Ovacık)','Sigorta','Yüzme molaları'],exc:['İçecekler','Ada / vadi giriş ücretleri','Fotoğraf ve video'],
  info:['Kalkış: Ölüdeniz plajı iskelesi','Rota hava ve deniz durumuna göre kaptan tarafından değiştirilebilir','Aileler ve çocuklar için uygundur',"Fiyat ve günlük müsaitlik için WhatsApp'tan yazın"],
  bring:['Mayo ve havlu','Güneş kremi','Şapka','Nakit (giriş ücretleri için)']},
 en:{n:'Butterfly Valley Boat Trip',loc:'Ölüdeniz · Full day · 10:00-17:30',f:['Butterfly Valley','Blue Cave','Lunch'],
  desc:'The classic boat trip from Ölüdeniz: Butterfly Valley, the Blue Cave, St. Nicholas (Gemiler) Island, Camel Beach and Cold Water Bay. Swimming stops all day, lunch on board and the best views of the Lycian coast.',
  inc:['Lunch','Hotel transfer (Ölüdeniz, Hisarönü, Ovacık)','Insurance','Swimming stops'],exc:['Drinks','Island / valley entrance fees','Photos and video'],
  info:['Departure: Ölüdeniz beach pier','The captain may change the route depending on weather and sea','Suitable for families and children','Message us on WhatsApp for price and daily availability'],
  bring:['Swimsuit and towel','Sunscreen','Hat','Cash (for entrance fees)']}},

{img:U+'1707397062732-11fc712f8edb'+UQ,p:null,tag:{tr:'Doğa',en:'Nature'},
 tr:{n:'Saklıkent & Tlos Turu',loc:'Fethiye · Tam gün',f:['Saklıkent Kanyonu','Tlos Antik Kenti','Yakapark'],
  desc:"Türkiye'nin en uzun kanyonlarından Saklıkent'te buz gibi suda yürüyüş, Likya'nın en eski kentlerinden Tlos'ta kaya mezarları ve akropol, ardından Yakapark'ta alabalık molası. Doğa ve tarihi tek günde birleştiren bir tur.",
  inc:['Otel transferi','Rehber','Sigorta','Öğle yemeği'],exc:['Kanyon ve ören yeri giriş ücretleri','İçecekler','Kanyon ayakkabısı kiralama'],
  info:['Kanyonda su dizden yukarı çıkabilir — ıslanmayı göze alın','Orta düzey yürüyüş içerir','Çocuklar için uygundur (gözetim altında)',"Fiyat için WhatsApp'tan yazın"],
  bring:['Islanabilecek kıyafet','Su ayakkabısı','Yedek kıyafet','Nakit']},
 en:{n:'Saklıkent & Tlos Tour',loc:'Fethiye · Full day',f:['Saklıkent Gorge','Tlos Ancient City','Yakapark'],
  desc:"Wade through ice-cold water in Saklıkent, one of Turkey's longest gorges, explore the rock tombs and acropolis of Tlos, one of Lycia's oldest cities, then stop for trout at Yakapark. Nature and history in one day.",
  inc:['Hotel transfer','Guide','Insurance','Lunch'],exc:['Gorge and site entrance fees','Drinks','Water-shoe rental'],
  info:['Water in the gorge can rise above the knee — expect to get wet','Includes moderate walking','Suitable for children (with supervision)','Message us on WhatsApp for the price'],
  bring:['Clothes that can get wet','Water shoes','Spare clothes','Cash']}},

{img:U+'1664268406775-5d4083bc3d2e'+UQ,p:null,tag:{tr:'Kültür',en:'Culture'},
 tr:{n:'Dalyan Turu',loc:'Dalyan · Köyceğiz · Tam gün',f:['Kral Mezarları','Çamur Banyosu','Kaplumbağa Plajı'],
  desc:"Dalyan kanallarında tekneyle Kaunos kaya mezarlarının önünden geçin, Köyceğiz'de çamur banyosu ve kaplıcanın keyfini çıkarın, caretta carettaların yuvası İztuzu Plajı'nda yüzün. Mavi yengeç ve doğal yaşamla dolu bir gün.",
  inc:['Otel transferi','Dalyan tekne turu','Rehber','Öğle yemeği','Sigorta'],exc:['Çamur banyosu ve ören yeri giriş ücretleri','İçecekler'],
  info:['Ölüdeniz/Fethiye\'den yolculuk yaklaşık 1,5-2 saat','İztuzu Plajı kaplumbağa koruma alanıdır — kurallara uyulmalıdır',"Fiyat için WhatsApp'tan yazın"],
  bring:['Mayo ve havlu','Eski bir mayo (çamur için)','Güneş kremi','Nakit']},
 en:{n:'Dalyan Tour',loc:'Dalyan · Köyceğiz · Full day',f:['King\'s Tombs','Mud Bath','Turtle Beach'],
  desc:'Cruise the Dalyan channels past the Kaunos rock tombs, enjoy the mud bath and hot springs at Köyceğiz, and swim at İztuzu Beach, nesting ground of the loggerhead turtles. A day full of nature and wildlife.',
  inc:['Hotel transfer','Dalyan boat trip','Guide','Lunch','Insurance'],exc:['Mud bath and site entrance fees','Drinks'],
  info:['About 1.5-2 hours drive from Ölüdeniz/Fethiye','İztuzu Beach is a turtle protection area — rules must be followed','Message us on WhatsApp for the price'],
  bring:['Swimsuit and towel','An old swimsuit (for the mud)','Sunscreen','Cash']}},

{img:U+'1726757990565-e2954b2ef8de'+UQ,p:null,tag:{tr:'Yurt Dışı',en:'Abroad'},
 tr:{n:'Rodos & Meis Günübirlik',loc:'Fethiye → Rodos · Kaş → Meis',f:['Feribot Bileti','Pasaport Gerekli','Sezonluk'],
  desc:"Günübirlik Yunan adası kaçamağı: Fethiye'den feribotla Rodos'un ortaçağ eski kentini gezin ya da Kaş'tan kısa bir feribot yolculuğuyla sakin Meis adasına geçin. Bilet, transfer ve saat planlamasını sizin için ayarlıyoruz.",
  inc:['Feribot bileti (gidiş-dönüş)','Bilet ve pasaport işlemlerinde yardım','İsteğe bağlı otel–liman transferi'],exc:['Liman vergileri (varsa)','Yemek ve içecekler','Vize ücretleri'],
  info:['Geçerli pasaport zorunludur','Türk vatandaşları için vize koşulları dönemsel değişir — rezervasyondan önce mutlaka teyit edin','Seferler sezonluktur ve hava koşullarına bağlıdır','Meis için kalkış Kaş limanıdır (Ölüdeniz\'den yaklaşık 2 saat)',"Fiyat ve sefer saatleri için WhatsApp'tan yazın"],
  bring:['Pasaport','Vize (gerekiyorsa)','Euro nakit']},
 en:{n:'Rhodes & Kastellorizo Day Trip',loc:'Fethiye → Rhodes · Kaş → Kastellorizo',f:['Ferry Ticket','Passport Required','Seasonal'],
  desc:'A Greek island day escape: take the ferry from Fethiye to the medieval Old Town of Rhodes, or hop over from Kaş to quiet Kastellorizo (Meis). We arrange tickets, transfers and timing for you.',
  inc:['Ferry ticket (round trip)','Help with tickets and passport formalities','Optional hotel–port transfer'],exc:['Port taxes (if any)','Food and drinks','Visa fees'],
  info:['A valid passport is required','Visa rules depend on your nationality — check before booking','Ferries are seasonal and weather-dependent','Kastellorizo ferries leave from Kaş (about 2 hours from Ölüdeniz)','Message us on WhatsApp for prices and timetables'],
  bring:['Passport','Visa (if required)','Euros in cash']}}
];

// Özel deneyimler
const S = [
{img:U+'1764787102596-5e0dde4090bc'+UQ,p:null,u:'b',tag:{tr:'Özel',en:'Private'},
 tr:{n:'Özel Yat & Gulet Kiralama',loc:'Ölüdeniz · Fethiye · Göcek',f:['Kaptanlı','Saatlik / Günlük','Size Özel Rota'],
  desc:"Tekneyi sadece kendinize ve sevdiklerinize ayırın. Ölüdeniz, Fethiye ve Göcek koylarında kaptanlı özel yat ve gulet kiralama; rotayı, saatleri ve menüyü siz belirleyin. Doğum günü, kutlama ve aile grupları için ideal.",
  inc:['Kaptan ve mürettebat','Yakıt (standart rota)','Şnorkel ekipmanı','Sigorta'],exc:['Yemek ve içecekler (menü ayrıca eklenebilir)','Liman / marina ücretleri (varsa)'],
  info:['Tekne kapasitesi 6–25 kişi arası seçeneklerle','Saatlik, yarım gün ve tam gün kiralama','Göcek 12 Adalar rotası için kalkış Göcek marinadan',"Fiyat tekne ve süreye göre değişir — WhatsApp'tan teklif alın"],
  extra:['Teknede yemek menüsü','Fotoğrafçı / drone','Pasta ve süsleme']},
 en:{n:'Private Yacht & Gulet Charter',loc:'Ölüdeniz · Fethiye · Göcek',f:['With Captain','Hourly / Daily','Your Own Route'],
  desc:'Keep the boat just for you and your people. Private yacht and gulet charters with captain around the bays of Ölüdeniz, Fethiye and Göcek — you choose the route, the timing and the menu. Ideal for birthdays, celebrations and family groups.',
  inc:['Captain and crew','Fuel (standard route)','Snorkel gear','Insurance'],exc:['Food and drinks (menu can be added)','Harbour / marina fees (if any)'],
  info:['Boats for 6–25 guests','Hourly, half-day and full-day charters','Göcek 12 Islands route departs from Göcek marina','Price depends on boat and duration — get a quote on WhatsApp'],
  extra:['On-board menu','Photographer / drone','Cake and decoration']}},

{img:U+'1504814532849-cff240bbc503'+UQ,p:null,u:'k',tag:{tr:'Çekim',en:'Shoot'},
 tr:{n:'Fotoğrafçı & Drone Çekimi',loc:'Ölüdeniz · Kumburnu · Kayaköy · Babadağ',f:['Profesyonel Fotoğrafçı','Drone','Dijital Teslim'],
  desc:"Tatilinizi profesyonel karelerle ölümsüzleştirin. Ölüdeniz lagünü, Kayaköy ve Babadağ gibi ikonik noktalarda çift, aile ve bireysel fotoğraf çekimi; isteğe bağlı drone ile havadan video. Düzenlenmiş fotoğraflar dijital olarak teslim edilir.",
  inc:['Profesyonel fotoğrafçı','Düzenlenmiş dijital fotoğraflar','Lokasyon planlaması'],exc:['Ulaşım (ayrıca eklenebilir)','Drone (paket içeriğine göre)','Baskı'],
  info:['Çekim süresi pakete göre 30 dk – 2 saat','Drone uçuşları izinli bölgelerde ve hava koşuluna bağlı yapılır','En iyi ışık: gün doğumu ve gün batımı',"Paket fiyatları için WhatsApp'tan yazın"]},
 en:{n:'Photographer & Drone Shoot',loc:'Ölüdeniz · Kumburnu · Kayaköy · Babadağ',f:['Pro Photographer','Drone','Digital Delivery'],
  desc:'Capture your holiday in professional shots. Couple, family and solo photo sessions at iconic spots like the Ölüdeniz lagoon, Kayaköy and Babadağ, with optional aerial drone video. Edited photos are delivered digitally.',
  inc:['Professional photographer','Edited digital photos','Location planning'],exc:['Transport (can be added)','Drone (depending on package)','Prints'],
  info:['Shoot length 30 min – 2 hours depending on package','Drone flights only in permitted areas and good weather','Best light: sunrise and sunset','Message us on WhatsApp for package prices']}},

{img:U+'1763129636465-f4016848a06f'+UQ,p:null,u:'k',tag:{tr:'Romantik',en:'Romantic'},
 tr:{n:'Evlilik Teklifi Paketi',loc:'Tekne · Plaj · Yamaç paraşütü',f:['Organizasyon','Süsleme','Fotoğrafçı'],
  desc:"Hayatınızın en önemli sorusunu unutulmaz bir sahnede sorun: gün batımında özel teknede, çiçeklerle süslenmiş bir koyda ya da yamaç paraşütüyle havada \"Benimle evlenir misin?\" pankartıyla. Tüm organizasyonu gizlilik içinde biz hazırlıyoruz.",
  inc:['Organizasyon ve planlama','Süsleme (çiçek, mum, harf)','Gizli fotoğraf / video çekimi'],exc:['Yüzük','Yemek menüsü (ayrıca eklenebilir)'],
  info:['Seçenekler: özel tekne, plaj kurulumu, yamaç paraşütünde pankart','En az 2-3 gün önceden planlama önerilir','Tüm süreç partnerinizden gizli yürütülür',"Fiyat seçilen konsepte göre — WhatsApp'tan yazın"],
  extra:['Müzisyen / keman','Pasta ve şampanya','Drone çekimi']},
 en:{n:'Marriage Proposal Package',loc:'Boat · Beach · Paragliding',f:['Planning','Decoration','Photographer'],
  desc:'Ask the big question in an unforgettable setting: on a private boat at sunset, in a flower-decorated bay, or in the sky with a "Will you marry me?" banner on a paragliding flight. We prepare the whole thing discreetly.',
  inc:['Planning and coordination','Decoration (flowers, candles, letters)','Hidden photo / video shoot'],exc:['Ring','Dinner menu (can be added)'],
  info:['Options: private boat, beach setup, banner on a paragliding flight','Plan at least 2-3 days ahead','Everything is kept secret from your partner','Price depends on the concept — message us on WhatsApp'],
  extra:['Musician / violin','Cake and champagne','Drone filming']}},

{img:U+'1659614536075-2cf8f82cf9db'+UQ,p:null,url:'https://www.oludenizspa.com',tag:{tr:'Spa',en:'Spa'},
 tr:{n:'Türk Hamamı & Spa',loc:'Ölüdeniz · Ölüdeniz Hamam & Spa',f:['Kese & Köpük','Masaj','Sauna & Buhar'],
  desc:"Günün yorgunluğunu geleneksel Türk hamamında atın. Sıcak mermer üzerinde kese ve köpük masajı, ardından aromaterapi veya klasik masaj seçenekleri. Ölüdeniz Hamam & Spa'da, tatilin en rahatlatıcı saatleri.",
  inc:['Hamam, kese ve köpük','Sauna ve buhar odası','Çay / içecek ikramı'],exc:['Ek masaj seçenekleri','Kişisel harcamalar'],
  info:['Süre: pakete göre 1–2 saat','Kadın, erkek ve çiftler için uygundur','Detaylı bilgi: oludenizspa.com',"Fiyat ve randevu için WhatsApp'tan yazın"],
  bring:['Mayo','Bonus: hamam sonrası dinlenme için zaman ayırın']},
 en:{n:'Turkish Bath & Spa',loc:'Ölüdeniz · Ölüdeniz Hamam & Spa',f:['Scrub & Foam','Massage','Sauna & Steam'],
  desc:"Wash the day away in a traditional Turkish bath. Scrub and foam massage on the warm marble, followed by aromatherapy or classic massage options. The most relaxing hours of your holiday at Ölüdeniz Hamam & Spa.",
  inc:['Hamam, scrub and foam','Sauna and steam room','Tea / drink'],exc:['Extra massage options','Personal expenses'],
  info:['Duration: 1–2 hours depending on package','Suitable for women, men and couples','More info: oludenizspa.com','Message us on WhatsApp for price and booking'],
  bring:['Swimsuit','Tip: leave time to relax after the bath']}}
];

const FAQ2 = {
"Kelebekler Vadisi Tekne Turu":{
 tr:[["Kelebekler Vadisi'nde ne kadar kalıyoruz?","Tekne vadide yaklaşık 1 saat mola verir; isteyenler şelaleye kadar kısa bir yürüyüş yapabilir."],["Deniz tutarsa ne olur?","Ölüdeniz koyları genelde sakindir. Hassassanız tur öncesi deniz tutması ilacı almanızı öneririz."]],
 en:[["How long do we stay at Butterfly Valley?","The boat stops at the valley for about an hour; you can take a short walk to the waterfall."],["What if I get seasick?","The Ölüdeniz bays are usually calm. If you are sensitive, take seasickness medicine before the trip."]]},
"Rodos & Meis Günübirlik":{
 tr:[["Rodos için vize gerekiyor mu?","Yunanistan Schengen bölgesindedir. Türk vatandaşları için uygulamalar dönemsel olarak değişebildiğinden, rezervasyondan önce güncel durumu sizinle birlikte teyit ediyoruz."],["Feribot ne kadar sürüyor?","Fethiye–Rodos yaklaşık 1,5 saat, Kaş–Meis yaklaşık 20-30 dakikadır. Sefer saatleri sezona göre değişir."]],
 en:[["Do I need a visa for Rhodes?","Greece is in the Schengen area. Requirements depend on your nationality, so we confirm the current rules with you before booking."],["How long is the ferry?","Fethiye–Rhodes takes about 1.5 hours, Kaş–Kastellorizo about 20-30 minutes. Timetables vary by season."]]},
"Özel Yat & Gulet Kiralama":{
 tr:[["Kaç kişi binebilir?","Teknelerimiz 6 ile 25 kişi arasında kapasiteye sahiptir. Grup büyüklüğünüzü yazın, uygun tekneyi önerelim."],["Kendi yemeğimizi getirebilir miyiz?","Evet, kendi yiyecek ve içeceklerinizi getirebilir ya da teknede menü siparişi verebilirsiniz."]],
 en:[["How many people can come?","Our boats take 6 to 25 guests. Tell us your group size and we'll suggest the right boat."],["Can we bring our own food?","Yes, you can bring your own food and drinks or order an on-board menu."]]},
"Evlilik Teklifi Paketi":{
 tr:[["Partnerim fark eder mi?","Hayır. Tüm planlamayı sizinle WhatsApp üzerinden gizlice yapıyoruz; partnerinize sıradan bir tur gibi görünür."],["Hava bozarsa ne olur?","Açık hava kurulumlarında yedek tarih veya kapalı alternatif planlıyoruz."]],
 en:[["Will my partner find out?","No. We plan everything secretly with you on WhatsApp; to your partner it looks like a normal tour."],["What if the weather is bad?","For outdoor setups we plan a backup date or an indoor alternative."]]}
};
Object.assign(FAQ, FAQ2);

// Ek etiketler
Object.assign(L.tr, {b:'tekne başı',k:'paket başı',web:'Web sitesi',add:'Pakete Ekle',added:'Pakete eklendi ✓',page:'Tam sayfayı aç'});
Object.assign(L.en, {b:'per boat',k:'per package',web:'Website',add:'Add to Package',added:'Added ✓',page:'Open full page'});

// SEO sayfa adresleri (tr / en)
const SLUG = {
'Yamaç Paraşütü':['oludeniz-yamac-parasutu','oludeniz-paragliding'],
'Tüplü Dalış':['oludeniz-tuplu-dalis','oludeniz-scuba-diving'],
'Tekne Turu':['fethiye-tekne-turu','fethiye-boat-trip'],
'Rafting Turu':['dalaman-rafting','dalaman-rafting-tour'],
'At Safari Turu':['fethiye-at-safari','fethiye-horse-safari'],
'Jeep Safari':['fethiye-jeep-safari','fethiye-jeep-safari-tour'],
'ATV Turu':['fethiye-atv-turu','fethiye-atv-quad-safari'],
'Sürat Teknesi':['oludeniz-surat-teknesi','oludeniz-speed-boat'],
'VIP Transfer · Fethiye / Ölüdeniz':['dalaman-havalimani-oludeniz-transfer','dalaman-airport-oludeniz-transfer'],
'VIP Transfer · Marmaris':['dalaman-havalimani-marmaris-transfer','dalaman-airport-marmaris-transfer'],
'Araba Kiralama':['fethiye-oludeniz-araba-kiralama','fethiye-oludeniz-car-rental'],
'Motosiklet & Scooter Kiralama':['oludeniz-motosiklet-scooter-kiralama','oludeniz-scooter-motorbike-rental'],
'ATV Kiralama':['oludeniz-atv-kiralama','oludeniz-atv-rental'],
'Havuzlu Villa Kiralama':['oludeniz-havuzlu-villa-kiralama','oludeniz-private-pool-villa-rental'],
'Günlük Kiralık Ev & Daire':['oludeniz-gunluk-kiralik-ev','oludeniz-holiday-home-rental'],
'Kelebekler Vadisi Tekne Turu':['oludeniz-kelebekler-vadisi-tekne-turu','oludeniz-butterfly-valley-boat-trip'],
'Saklıkent & Tlos Turu':['saklikent-tlos-turu','saklikent-tlos-tour'],
'Dalyan Turu':['fethiye-dalyan-turu','fethiye-dalyan-tour'],
'Rodos & Meis Günübirlik':['fethiye-rodos-meis-gunubirlik','fethiye-rhodes-kastellorizo-day-trip'],
'Özel Yat & Gulet Kiralama':['oludeniz-ozel-yat-gulet-kiralama','oludeniz-private-yacht-gulet-charter'],
'Fotoğrafçı & Drone Çekimi':['oludeniz-fotografci-drone-cekimi','oludeniz-photographer-drone'],
'Evlilik Teklifi Paketi':['oludeniz-evlilik-teklifi','oludeniz-marriage-proposal'],
'Türk Hamamı & Spa':['oludeniz-turk-hamami','oludeniz-turkish-bath'],
'Uç & Dal':['paket-uc-dal','package-fly-dive'],
'Sür & Uç':['paket-sur-uc','package-ride-fly'],
'Uç, Sür & Yüz':['paket-uc-sur-yuz','package-fly-ride-swim']
};

// Ayarlar — boşsa ilgili bölüm gizlenir
const CFG = {
  site: 'https://oludeniztours.vercel.app',
  instagram: '',      // örn. 'oludeniztours'
  googleReviews: '',  // Google işletme profili yorum linki
};
// Gerçek Google yorumları: {name:'', text:'', stars:5, date:'2026-08'} — sadece gerçek yorumları ekleyin
const REVIEWS = [];


// RU / DE / PL çevirileri. Anahtar = İngilizce metin. Eksik olan her şey İngilizceye düşer.
const UI = {
"24/7 Support":{ru:"Поддержка 24/7",de:"24/7 Support",pl:"Wsparcie 24/7"},
"24/7 WhatsApp support":{ru:"Поддержка в WhatsApp 24/7",de:"24/7 WhatsApp-Support",pl:"Wsparcie WhatsApp 24/7"},
"4-day wind and rain forecast for Ölüdeniz (09:00–18:00)":{ru:"Прогноз ветра и осадков в Олюденизе на 4 дня (09:00–18:00)",de:"4-Tage-Wind- und Regenvorhersage für Ölüdeniz (09:00–18:00)",pl:"4-dniowa prognoza wiatru i opadów dla Ölüdeniz (09:00–18:00)"},
"500+ Google reviews":{ru:"500+ отзывов в Google",de:"500+ Google-Bewertungen",pl:"500+ opinii w Google"},
"ATV Tour":{ru:"Квадроциклы",de:"Quad-Tour",pl:"Quady"},
"Abroad":{ru:"За границу",de:"Ausland",pl:"Za granicę"},
"Activities":{ru:"Активности",de:"Aktivitäten",pl:"Atrakcje"},
"Airport Transfer":{ru:"Трансфер из аэропорта",de:"Flughafentransfer",pl:"Transfer z lotniska"},
"All activities":{ru:"Все активности",de:"Alle Aktivitäten",pl:"Wszystkie atrakcje"},
"All categories ▾":{ru:"Все категории ▾",de:"Alle Kategorien ▾",pl:"Wszystkie kategorie ▾"},
"Ask us about a discount for multiple bookings.":{ru:"Спросите о скидке при бронировании нескольких услуг.",de:"Fragen Sie nach einem Rabatt für Mehrfachbuchungen.",pl:"Zapytaj o rabat przy kilku rezerwacjach."},
"Based on 500+ Google reviews — Our guests recommend us":{ru:"На основе 500+ отзывов в Google — гости рекомендуют нас",de:"Basierend auf 500+ Google-Bewertungen — unsere Gäste empfehlen uns",pl:"Na podstawie 500+ opinii w Google — goście nas polecają"},
"Best Price":{ru:"Лучшая цена",de:"Bester Preis",pl:"Najlepsza cena"},
"Blog":{ru:"Блог",de:"Blog",pl:"Blog"},
"Book on WhatsApp":{ru:"Бронь в WhatsApp",de:"Per WhatsApp buchen",pl:"Rezerwuj na WhatsApp"},
"Boat":{ru:"Лодка",de:"Boot",pl:"Łódź"},
"Boat Tour":{ru:"Морская прогулка",de:"Bootstour",pl:"Rejs łodzią"},
"Book Now":{ru:"Забронировать",de:"Jetzt buchen",pl:"Zarezerwuj"},
"Build Your Own Package":{ru:"Соберите свой пакет",de:"Eigenes Paket zusammenstellen",pl:"Stwórz własny pakiet"},
"Build a Package":{ru:"Свой пакет",de:"Paket erstellen",pl:"Własny pakiet"},
"Butterfly Valley, Saklıkent, Dalyan and the Greek islands — hotel pickup included":{ru:"Долина бабочек, Сакликент, Дальян и греческие острова — трансфер из отеля включён",de:"Schmetterlingstal, Saklıkent, Dalyan und die griechischen Inseln — Abholung vom Hotel inklusive",pl:"Dolina Motyli, Saklıkent, Dalyan i greckie wyspy — odbiór z hotelu w cenie"},
"Call":{ru:"Позвонить",de:"Anrufen",pl:"Zadzwoń"},
"Cancellation & Refund":{ru:"Отмена и возврат",de:"Stornierung & Erstattung",pl:"Anulowanie i zwrot"},
"Car Rental":{ru:"Аренда авто",de:"Mietwagen",pl:"Wynajem auta"},
"Car, motorbike / scooter and ATV rental — delivered to your hotel, daily and weekly options":{ru:"Аренда авто, мотоциклов / скутеров и квадроциклов — доставка в отель, посуточно и понедельно",de:"Auto-, Motorrad-/Roller- und Quadvermietung — Lieferung ans Hotel, tage- und wochenweise",pl:"Wynajem aut, motocykli / skuterów i quadów — dostawa do hotelu, na dni i tygodnie"},
"Check Availability":{ru:"Проверить наличие",de:"Verfügbarkeit prüfen",pl:"Sprawdź dostępność"},
"Clear":{ru:"Очистить",de:"Leeren",pl:"Wyczyść"},
"Contact":{ru:"Контакты",de:"Kontakt",pl:"Kontakt"},
"Culture":{ru:"Культура",de:"Kultur",pl:"Kultura"},
"Daily":{ru:"Посуточно",de:"Tageweise",pl:"Na doby"},
"Date":{ru:"Дата",de:"Datum",pl:"Data"},
"Day Trips":{ru:"Экскурсии",de:"Tagesausflüge",pl:"Wycieczki"},
"Day Trips & Excursions":{ru:"Однодневные экскурсии",de:"Tagesausflüge & Exkursionen",pl:"Wycieczki jednodniowe"},
"Discover":{ru:"Откройте",de:"Entdecke",pl:"Odkryj"},
"Ölüdeniz":{ru:"Олюдениз",de:"Ölüdeniz",pl:"Ölüdeniz"},
"Diving":{ru:"Дайвинг",de:"Tauchen",pl:"Nurkowanie"},
"Estimated total":{ru:"Примерная сумма",de:"Geschätzte Summe",pl:"Szacowana suma"},
"Experience":{ru:"Опыт",de:"Erfahrung",pl:"Doświadczenie"},
"Flying Weather":{ru:"Погода для полётов",de:"Flugwetter",pl:"Pogoda do lotów"},
"Follow Us on Instagram":{ru:"Подписывайтесь в Instagram",de:"Folgen Sie uns auf Instagram",pl:"Obserwuj nas na Instagramie"},
"Google Rating":{ru:"Рейтинг Google",de:"Google-Bewertung",pl:"Ocena Google"},
"Guest":{ru:"гость",de:"Gast",pl:"osoba"},
"Guests":{ru:"гостей",de:"Gäste",pl:"osób"},
"Guest Reviews":{ru:"Отзывы гостей",de:"Gästebewertungen",pl:"Opinie gości"},
"Gusts":{ru:"Порывы",de:"Böen",pl:"Porywy"},
"Hamam & Spa":{ru:"Хаммам и спа",de:"Hamam & Spa",pl:"Hammam i spa"},
"Happy Guests":{ru:"Довольных гостей",de:"Zufriedene Gäste",pl:"Zadowolonych gości"},
"Helpful reads while planning your holiday":{ru:"Полезные статьи для планирования отдыха",de:"Hilfreiche Artikel für Ihre Urlaubsplanung",pl:"Przydatne artykuły do planowania urlopu"},
"Horse Safari":{ru:"Конные прогулки",de:"Reitsafari",pl:"Jazda konna"},
"Jeep Safari":{ru:"Джип-сафари",de:"Jeep-Safari",pl:"Jeep safari"},
"Loading…":{ru:"Загрузка…",de:"Wird geladen…",pl:"Ładowanie…"},
"Local expertise":{ru:"Местные эксперты",de:"Lokale Expertise",pl:"Lokalni eksperci"},
"Looks good for flying":{ru:"Подходит для полёта",de:"Gut zum Fliegen",pl:"Dobre warunki do lotu"},
"Most preferred — multiple adventures in one package":{ru:"Самые популярные — несколько приключений в одном пакете",de:"Am beliebtesten — mehrere Abenteuer in einem Paket",pl:"Najczęściej wybierane — kilka przygód w jednym pakiecie"},
"Nature":{ru:"Природа",de:"Natur",pl:"Natura"},
"Need Help?":{ru:"Нужна помощь?",de:"Brauchen Sie Hilfe?",pl:"Potrzebujesz pomocy?"},
"New":{ru:"Новинка",de:"Neu",pl:"Nowość"},
"Nothing selected yet — pick activities above.":{ru:"Пока ничего не выбрано — выберите активности выше.",de:"Noch nichts ausgewählt — wählen Sie oben Aktivitäten.",pl:"Nic nie wybrano — wybierz atrakcje powyżej."},
"Open Instagram":{ru:"Открыть Instagram",de:"Instagram öffnen",pl:"Otwórz Instagram"},
"Our team is here to help with your booking. You can reach us anytime!":{ru:"Наша команда поможет с бронированием. Пишите в любое время!",de:"Unser Team hilft Ihnen gern bei der Buchung. Sie erreichen uns jederzeit!",pl:"Nasz zespół pomoże w rezerwacji. Pisz do nas o każdej porze!"},
"Packages":{ru:"Пакеты",de:"Pakete",pl:"Pakiety"},
"Paragliding":{ru:"Параглайдинг",de:"Paragliding",pl:"Paralotniarstwo"},
"Paragliding, boat tours, day trips, car and villa rentals, airport transfers — all in one place.":{ru:"Параглайдинг, морские прогулки, экскурсии, аренда авто и вилл, трансферы — всё в одном месте.",de:"Paragliding, Bootstouren, Tagesausflüge, Auto- und Villenvermietung, Flughafentransfers — alles an einem Ort.",pl:"Paralotnie, rejsy, wycieczki, wynajem aut i willi, transfery z lotniska — wszystko w jednym miejscu."},
"Pick the activities you want, see the estimated total and send it all in one WhatsApp message":{ru:"Выберите активности, посмотрите примерную сумму и отправьте всё одним сообщением в WhatsApp",de:"Wählen Sie Ihre Aktivitäten, sehen Sie die geschätzte Summe und senden Sie alles in einer WhatsApp-Nachricht",pl:"Wybierz atrakcje, zobacz szacowaną sumę i wyślij wszystko jedną wiadomością na WhatsApp"},
"Popular":{ru:"Популярно",de:"Beliebt",pl:"Popularne"},
"Popular Package Tours":{ru:"Популярные пакетные туры",de:"Beliebte Pakettouren",pl:"Popularne pakiety"},
"Privacy":{ru:"Конфиденциальность",de:"Datenschutz",pl:"Prywatność"},
"Private":{ru:"Индивидуально",de:"Privat",pl:"Prywatnie"},
"Private Pool":{ru:"Свой бассейн",de:"Privatpool",pl:"Prywatny basen"},
"Private VIP transfer from Dalaman Airport to Fethiye, Ölüdeniz and Marmaris — prices are per vehicle":{ru:"Индивидуальный VIP-трансфер из аэропорта Даламан в Фетхие, Олюдениз и Мармарис — цена за автомобиль",de:"Privater VIP-Transfer vom Flughafen Dalaman nach Fethiye, Ölüdeniz und Marmaris — Preise pro Fahrzeug",pl:"Prywatny transfer VIP z lotniska Dalaman do Fethiye, Ölüdeniz i Marmaris — ceny za pojazd"},
"Private yacht, professional shoots, marriage proposals and Turkish bath":{ru:"Частная яхта, профессиональная съёмка, предложение руки и сердца и турецкая баня",de:"Private Yacht, professionelle Fotoshootings, Heiratsanträge und Türkisches Bad",pl:"Prywatny jacht, profesjonalne sesje, oświadczyny i łaźnia turecka"},
"Private-pool villas and holiday homes in Ölüdeniz, Hisarönü, Ovacık and Fethiye":{ru:"Виллы с бассейном и апартаменты в Олюденизе, Хисарёню, Оваджике и Фетхие",de:"Villen mit Privatpool und Ferienwohnungen in Ölüdeniz, Hisarönü, Ovacık und Fethiye",pl:"Wille z basenem i domy wakacyjne w Ölüdeniz, Hisarönü, Ovacık i Fethiye"},
"Professional service with years of experience":{ru:"Профессиональный сервис с многолетним опытом",de:"Professioneller Service mit jahrelanger Erfahrung",pl:"Profesjonalna obsługa z wieloletnim doświadczeniem"},
"Proposal":{ru:"Предложение",de:"Heiratsantrag",pl:"Oświadczyny"},
"Quality service, fair price":{ru:"Качество по честной цене",de:"Qualität zum fairen Preis",pl:"Jakość w uczciwej cenie"},
"Rafting":{ru:"Рафтинг",de:"Rafting",pl:"Rafting"},
"Read all reviews on Google →":{ru:"Читать все отзывы в Google →",de:"Alle Bewertungen auf Google lesen →",pl:"Przeczytaj wszystkie opinie w Google →"},
"Rental":{ru:"Аренда",de:"Miete",pl:"Wynajem"},
"Rentals":{ru:"Аренда",de:"Vermietung",pl:"Wynajem"},
"Risky — check with us":{ru:"Рискованно — уточните у нас",de:"Riskant — bitte bei uns nachfragen",pl:"Ryzykownie — skonsultuj z nami"},
"Romantic":{ru:"Романтика",de:"Romantisch",pl:"Romantycznie"},
"Safety":{ru:"Безопасность",de:"Sicherheit",pl:"Bezpieczeństwo"},
"Scooter Rental":{ru:"Аренда скутеров",de:"Rollerverleih",pl:"Wynajem skuterów"},
"Secure booking":{ru:"Надёжное бронирование",de:"Sichere Buchung",pl:"Bezpieczna rezerwacja"},
"Send":{ru:"Отправить",de:"Senden",pl:"Wyślij"},
"Send Package on WhatsApp":{ru:"Отправить пакет в WhatsApp",de:"Paket per WhatsApp senden",pl:"Wyślij pakiet na WhatsApp"},
"Services":{ru:"Услуг",de:"Angebote",pl:"Usług"},
"Shoot":{ru:"Съёмка",de:"Shooting",pl:"Sesja"},
"Spa":{ru:"Спа",de:"Spa",pl:"Spa"},
"Special Experiences":{ru:"Особые впечатления",de:"Besondere Erlebnisse",pl:"Wyjątkowe przeżycia"},
"Support":{ru:"Поддержка",de:"Support",pl:"Wsparcie"},
"Tap a card to see full details":{ru:"Нажмите на карточку, чтобы увидеть подробности",de:"Tippen Sie auf eine Karte für alle Details",pl:"Dotknij karty, aby zobaczyć szczegóły"},
"Terms of Use":{ru:"Условия использования",de:"Nutzungsbedingungen",pl:"Regulamin"},
"This is a forecast only; our pilots make the final call every morning based on real conditions on Babadağ. If the weather isn't suitable, your flight is rescheduled free of charge or fully refunded.":{ru:"Это только прогноз; окончательное решение пилоты принимают каждое утро по реальным условиям на Бабадаге. Если погода не подходит, полёт бесплатно переносится или стоимость полностью возвращается.",de:"Dies ist nur eine Vorhersage; unsere Piloten entscheiden jeden Morgen anhand der echten Bedingungen auf dem Babadağ. Bei ungeeignetem Wetter wird Ihr Flug kostenlos verschoben oder voll erstattet.",pl:"To tylko prognoza; ostateczną decyzję piloci podejmują każdego ranka na podstawie warunków na Babadağ. Jeśli pogoda nie pozwala, lot zostaje bezpłatnie przełożony lub w pełni zwrócony."},
"Today":{ru:"Сегодня",de:"Heute",pl:"Dziś"},
"Transfer":{ru:"Трансфер",de:"Transfer",pl:"Transfer"},
"VIP":{ru:"VIP",de:"VIP",pl:"VIP"},
"Variable — mornings recommended":{ru:"Переменчиво — лучше утром",de:"Wechselhaft — morgens empfohlen",pl:"Zmiennie — polecamy rano"},
"Vehicle Rental":{ru:"Аренда транспорта",de:"Fahrzeugvermietung",pl:"Wynajem pojazdów"},
"Villa & Holiday Home Rental":{ru:"Аренда вилл и апартаментов",de:"Villen & Ferienwohnungen",pl:"Wynajem willi i domów wakacyjnych"},
"Villas & Holiday Homes":{ru:"Виллы и апартаменты",de:"Villen & Ferienwohnungen",pl:"Wille i domy wakacyjne"},
"Villas & Homes":{ru:"Виллы и жильё",de:"Villen & Wohnungen",pl:"Wille i domy"},
"We are always with you":{ru:"Мы всегда на связи",de:"Wir sind immer für Sie da",pl:"Zawsze jesteśmy z Tobą"},
"Weather could not be loaded right now.":{ru:"Не удалось загрузить погоду.",de:"Wetter konnte gerade nicht geladen werden.",pl:"Nie udało się wczytać pogody."},
"What are you looking for?":{ru:"Что вы ищете?",de:"Was suchen Sie?",pl:"Czego szukasz?"},
"WhatsApp Support":{ru:"Поддержка в WhatsApp",de:"WhatsApp-Support",pl:"Wsparcie WhatsApp"},
"Why Choose Us?":{ru:"Почему мы?",de:"Warum wir?",pl:"Dlaczego my?"},
"Yacht Charter":{ru:"Аренда яхты",de:"Yachtcharter",pl:"Czarter jachtu"},
"Your digital gateway to Ölüdeniz":{ru:"Ваш цифровой гид по Олюденизу",de:"Ihr digitales Tor nach Ölüdeniz",pl:"Twoja cyfrowa brama do Ölüdeniz"},
"Your safety is our priority":{ru:"Ваша безопасность — наш приоритет",de:"Ihre Sicherheit hat Priorität",pl:"Twoje bezpieczeństwo to nasz priorytet"},
"new flight videos, boat trips and Ölüdeniz views every day":{ru:"каждый день новые видео полётов, морских прогулок и виды Олюдениза",de:"täglich neue Flugvideos, Bootstouren und Ölüdeniz-Aussichten",pl:"codziennie nowe filmy z lotów, rejsów i widoki Ölüdeniz"},
"selected":{ru:"выбрано",de:"ausgewählt",pl:"wybrano"},
"service(s) priced on WhatsApp":{ru:"услуг(и) — цена в WhatsApp",de:"Leistung(en) — Preis per WhatsApp",pl:"usług(i) — cena na WhatsApp"},
"Ölüdeniz Guide":{ru:"Гид по Олюденизу",de:"Ölüdeniz-Reiseführer",pl:"Przewodnik po Ölüdeniz"},
"Ölüdeniz · Fethiye · Marmaris":{ru:"Олюдениз · Фетхие · Мармарис",de:"Ölüdeniz · Fethiye · Marmaris",pl:"Ölüdeniz · Fethiye · Marmaris"},
"📞 Call Us":{ru:"📞 Позвоните нам",de:"📞 Rufen Sie uns an",pl:"📞 Zadzwoń do nas"}
};

// Modal / kart etiketleri
const LX = {
ru:{about:'Об этом впечатлении',inc:'Включено',exc:'Не включено',info:'Важная информация',bring:'Что взять с собой',ban:'Запрещено',prog:'Программа',reg:'Бесплатный трансфер из отелей',extra:'Дополнительно (платно)',faq:'Частые вопросы',dep:'Предоплата',depNote:'остаток оплачивается в день активности',book:'Забронировать в WhatsApp',pp:'за человека',det:'Подробнее',pkg:'Пакетный тур',sched:'Включённые активности',pv:'за автомобиль',reg2:'Зоны обслуживания',d:'в сутки',n:'за ночь',b:'за лодку',k:'за пакет',ask:'Цена по запросу',askB:'Узнать цену',quote:'Узнать цену в WhatsApp',web:'Сайт',add:'В пакет',added:'Добавлено ✓',page:'Открыть страницу'},
de:{about:'Über dieses Erlebnis',inc:'Inklusive',exc:'Nicht inklusive',info:'Wichtige Infos',bring:'Mitbringen',ban:'Nicht erlaubt',prog:'Programm',reg:'Kostenlose Hotelabholung',extra:'Extras (gegen Aufpreis)',faq:'Häufige Fragen',dep:'Anzahlung',depNote:'Restbetrag am Tag der Aktivität',book:'Per WhatsApp buchen',pp:'pro Person',det:'Details',pkg:'Pakettour',sched:'Enthaltene Aktivitäten',pv:'pro Fahrzeug',reg2:'Servicegebiete',d:'pro Tag',n:'pro Nacht',b:'pro Boot',k:'pro Paket',ask:'Preis auf Anfrage',askB:'Angebot',quote:'Preis per WhatsApp anfragen',web:'Website',add:'Zum Paket',added:'Hinzugefügt ✓',page:'Ganze Seite öffnen'},
pl:{about:'O tej atrakcji',inc:'W cenie',exc:'Poza ceną',info:'Ważne informacje',bring:'Co zabrać',ban:'Niedozwolone',prog:'Program',reg:'Bezpłatny odbiór z hoteli',extra:'Dodatki (płatne)',faq:'Częste pytania',dep:'Zaliczka',depNote:'reszta płatna w dniu atrakcji',book:'Rezerwuj na WhatsApp',pp:'za osobę',det:'Szczegóły',pkg:'Pakiet',sched:'Atrakcje w pakiecie',pv:'za pojazd',reg2:'Obszar usług',d:'za dobę',n:'za noc',b:'za łódź',k:'za pakiet',ask:'Cena na zapytanie',askB:'Zapytaj',quote:'Zapytaj o cenę na WhatsApp',web:'Strona',add:'Do pakietu',added:'Dodano ✓',page:'Otwórz pełną stronę'}
};
for (const l in LX) L[l] = Object.assign({}, L.en, LX[l]);

// Ürün metinleri (ad, konum, özellikler, açıklama). Diğer detaylar İngilizce gösterilir.
const TX = {
"Paragliding":{
 ru:{n:'Параглайдинг',loc:'Фетхие/Олюдениз · полёт 25-30 мин · всего 1,5 ч',f:['Опытные пилоты','Безопасный полёт','Съёмка GoPro'],desc:'Не откладывайте мечту — прикоснитесь к небу! 🪂 Более 20 лет профессионального опыта и высочайшие стандарты безопасности: приготовьтесь парить над одним из самых красивых видов в мире.'},
 de:{n:'Paragliding',loc:'Fethiye/Ölüdeniz · 25-30 Min. Flug · 1,5 Std. gesamt',f:['Erfahrene Piloten','Sicherer Flug','GoPro-Aufnahmen'],desc:'Verschieben Sie Ihre Träume nicht — berühren Sie den Himmel! 🪂 Mit über 20 Jahren Erfahrung und höchsten Sicherheitsstandards gleiten Sie über eine der einzigartigsten Aussichten der Welt.'},
 pl:{n:'Lot paralotnią',loc:'Fethiye/Ölüdeniz · lot 25-30 min · łącznie 1,5 h',f:['Doświadczeni piloci','Bezpieczny lot','Nagranie GoPro'],desc:'Nie odkładaj marzeń — dotknij nieba! 🪂 Ponad 20 lat doświadczenia i najwyższe standardy bezpieczeństwa: przygotuj się na lot nad jednym z najpiękniejszych widoków świata.'}},
"Scuba Diving":{
 ru:{n:'Дайвинг',loc:'Фетхие/Олюдениз · всего 1 час',f:['25 мин под водой','Опытные инструкторы','Снаряжение включено'],desc:'Путешествие в тишину глубин 🌊 После неба откройте сердце Олюдениза: с профессиональными инструкторами и сертифицированным снаряжением мы исследуем самую чистую синеву.'},
 de:{n:'Tauchen',loc:'Fethiye/Ölüdeniz · 1 Std. gesamt',f:['25 Min. unter Wasser','Erfahrene Taucher','Ausrüstung inklusive'],desc:'Eine Reise in die Stille der Tiefe 🌊 Nach dem Himmel das Herz von Ölüdeniz entdecken: mit professionellen Tauchlehrern und zertifizierter Ausrüstung in das klarste Blau.'},
 pl:{n:'Nurkowanie',loc:'Fethiye/Ölüdeniz · łącznie 1 godzina',f:['25 min pod wodą','Doświadczeni nurkowie','Sprzęt w cenie'],desc:'Podróż w ciszę głębin 🌊 Po niebie odkryj serce Ölüdeniz: z profesjonalnymi instruktorami i certyfikowanym sprzętem poznasz najczystszy błękit.'}},
"Boat Tour":{
 ru:{n:'Морская прогулка',loc:'Бухты Фетхие · 10:30-17:00 (6+ ч)',f:['6 бухт','Обед включён','Для семей'],desc:'⚓ Маршрут: Долина бабочек, бухта Холодной воды, остров Св. Николая, Дарбогаз, Аквариумная бухта, пляж Верблюдов. Купание в 6 бухтах под приятную музыку в семейной атмосфере.'},
 de:{n:'Bootstour',loc:'Buchten von Fethiye · 10:30-17:00 (6+ Std.)',f:['6 Buchten','Mittagessen inklusive','Familienfreundlich'],desc:'⚓ Route: Schmetterlingstal, Kaltwasserbucht, St.-Nikolaus-Insel, Darboğaz, Aquariumbucht, Kamelstrand. Badestopps in 6 Buchten mit entspannter Musik und familiärer Atmosphäre.'},
 pl:{n:'Rejs łodzią',loc:'Zatoki Fethiye · 10:30-17:00 (6+ h)',f:['6 zatok','Obiad w cenie','Dla rodzin'],desc:'⚓ Trasa: Dolina Motyli, Zatoka Zimnej Wody, Wyspa św. Mikołaja, Darboğaz, Zatoka Akwarium, Plaża Wielbłądów. Kąpiele w 6 zatokach przy muzyce, w rodzinnej atmosferze.'}},
"Rafting Tour":{
 ru:{n:'Рафтинг',loc:'Река Даламан · 7 часов',f:['Маршрут 16 км','Питание включено','С гидом'],desc:'🌊 16 километров адреналина в прохладных водах реки Даламан. Опыт не нужен — гребите сквозь волны вместе с нашими опытными гидами!'},
 de:{n:'Rafting-Tour',loc:'Dalaman-Fluss · 7 Std.',f:['16 km Strecke','Mahlzeiten inklusive','Mit Guide'],desc:'🌊 16 Kilometer Nervenkitzel im kühlen Wasser des Dalaman-Flusses. Keine Erfahrung nötig — paddeln Sie mit unseren erfahrenen Guides durch die Wellen!'},
 pl:{n:'Rafting',loc:'Rzeka Dalaman · 7 godzin',f:['Trasa 16 km','Posiłki w cenie','Z przewodnikiem'],desc:'🌊 16 kilometrów emocji w chłodnych wodach rzeki Dalaman. Doświadczenie niepotrzebne — wiosłuj przez fale z naszymi przewodnikami!'}},
"Horse Safari Tour":{
 ru:{n:'Конное сафари',loc:'Фетхие Яныклар · 3 часа',f:['Опыт не нужен','Природа','С гидом'],desc:'Путешествие в сердце природы 🏇 Прогулка на спокойных, обученных лошадях по сосновым тропам леса Яныклар. Перед туром — короткий инструктаж, опыт верховой езды не нужен.'},
 de:{n:'Reitsafari',loc:'Fethiye Yanıklar · 3 Std.',f:['Keine Erfahrung nötig','Natur','Mit Guide'],desc:'Eine Reise ins Herz der Natur 🏇 Reiten Sie auf sanften, gut trainierten Pferden durch die nach Kiefern duftenden Wälder von Yanıklar. Kurze Einweisung vorab — keine Reiterfahrung nötig.'},
 pl:{n:'Safari konne',loc:'Fethiye Yanıklar · 3 godziny',f:['Bez doświadczenia','Natura','Z przewodnikiem'],desc:'Podróż w serce natury 🏇 Jazda na spokojnych, wyszkolonych koniach leśnymi ścieżkami sosnowego lasu Yanıklar. Przed wycieczką krótkie szkolenie — doświadczenie niepotrzebne.'}},
"Jeep Safari":{
 ru:{n:'Джип-сафари',loc:'Фетхие/Сакликент · 7 часов',f:['Каньон Сакликент','Водные битвы','Обед'],desc:'Не просто поездка — целый день адреналина, командного духа и веселья на природе! Водные битвы, грязевая ванна, каньон Сакликент и Якапарк за один день.'},
 de:{n:'Jeep-Safari',loc:'Fethiye/Saklıkent · 7 Std.',f:['Saklıkent-Schlucht','Wasserschlachten','Mittagessen'],desc:'Nicht nur ein Ausflug — ein ganzer Tag voller Adrenalin, Teamgeist und Spaß in der Natur! Wasserschlachten, Schlammbad, Saklıkent-Schlucht und Yakapark an einem Tag.'},
 pl:{n:'Jeep safari',loc:'Fethiye/Saklıkent · 7 godzin',f:['Kanion Saklıkent','Bitwy wodne','Obiad'],desc:'Nie tylko wycieczka — cały dzień adrenaliny, zabawy i przyrody! Bitwy wodne, kąpiel błotna, kanion Saklıkent i Yakapark w jeden dzień.'}},
"ATV Tour":{
 ru:{n:'Квадро-сафари',loc:'Фетхие Каякёй · 60 мин езды',f:['60 мин езды','Трансфер','Страховка'],desc:'Пыль, грязь и адреналин! Узкие тропы на мощной машине, баланс на бездорожье и рёв мотора — вот настоящая свобода.'},
 de:{n:'Quad-Tour',loc:'Fethiye Kayaköy · 60 Min. Fahrt',f:['60 Min. Fahrt','Transfer','Versicherung'],desc:'Staub, Schlamm und Adrenalin! Schmale Pfade auf einer kraftvollen Maschine, Balance im Gelände und das Röhren des Motors — das ist echte Freiheit.'},
 pl:{n:'Wycieczka quadem',loc:'Fethiye Kayaköy · 60 min jazdy',f:['60 min jazdy','Transfer','Ubezpieczenie'],desc:'Kurz, błoto i adrenalina! Wąskie ścieżki na mocnej maszynie, równowaga w terenie i ryk silnika — to prawdziwa wolność.'}},
"Speed Boat":{
 ru:{n:'Скоростной катер',loc:'Фетхие/Олюдениз · 2 часа',f:['Частный катер','Личный капитан','2 маршрута'],desc:'Частное приключение вдали от толпы. Стремительная и престижная прогулка по бухтам Фетхие и Олюдениза — до бухт с голубым флагом за считанные минуты.'},
 de:{n:'Speedboot',loc:'Fethiye/Ölüdeniz · 2 Std.',f:['Privatboot','Eigener Kapitän','2 Routen'],desc:'Ein privates Abenteuer abseits der Massen. Eine rasante, exklusive Fahrt durch die Buchten von Fethiye/Ölüdeniz — Blaue-Flagge-Buchten in kürzester Zeit.'},
 pl:{n:'Motorówka',loc:'Fethiye/Ölüdeniz · 2 godziny',f:['Prywatna łódź','Własny kapitan','2 trasy'],desc:'Prywatna przygoda z dala od tłumów. Szybki, prestiżowy rejs po zatokach Fethiye i Ölüdeniz — do zatok z Błękitną Flagą w mgnieniu oka.'}},
"VIP Transfer · Fethiye / Ölüdeniz":{
 ru:{loc:'Аэропорт Даламан ↔ Фетхие/Олюдениз',f:['Mercedes Vito','Индивидуально','24/7'],desc:'Безупречная доставка от аэропорта Даламан до вашей двери. Индивидуальный VIP-автомобиль, отслеживание рейса в реальном времени и встреча с табличкой на выходе.'},
 de:{loc:'Flughafen Dalaman ↔ Fethiye/Ölüdeniz',f:['Mercedes Vito','Privat','24/7'],desc:'Reibungsloser Transfer vom Flughafen Dalaman bis vor die Tür. Im eigenen VIP-Fahrzeug — wir verfolgen Ihren Flug live und empfangen Sie mit Namensschild am Ausgang.'},
 pl:{loc:'Lotnisko Dalaman ↔ Fethiye/Ölüdeniz',f:['Mercedes Vito','Prywatnie','24/7'],desc:'Bezproblemowy transfer z lotniska Dalaman pod same drzwi. Prywatny pojazd VIP, śledzenie lotu na żywo i powitanie z tabliczką przy wyjściu.'}},
"VIP Transfer · Marmaris":{
 ru:{loc:'Аэропорт Даламан ↔ Мармарис · ~1,5 ч',f:['Mercedes Vito','Индивидуально','24/7'],desc:'Комфортный индивидуальный VIP-трансфер из аэропорта Даламан до отеля в Мармарисе. Отслеживаем рейс, встречаем с табличкой и довозим до двери.'},
 de:{loc:'Flughafen Dalaman ↔ Marmaris · ~1,5 Std.',f:['Mercedes Vito','Privat','24/7'],desc:'Komfortabler privater VIP-Transfer vom Flughafen Dalaman zu Ihrem Hotel in Marmaris. Flugverfolgung, Empfang mit Namensschild und Fahrt bis vor die Tür.'},
 pl:{loc:'Lotnisko Dalaman ↔ Marmaris · ~1,5 h',f:['Mercedes Vito','Prywatnie','24/7'],desc:'Wygodny prywatny transfer VIP z lotniska Dalaman do hotelu w Marmaris. Śledzimy lot, witamy z tabliczką i dowozimy pod drzwi.'}},
"Car Rental":{
 ru:{n:'Аренда автомобиля',loc:'Олюдениз · Фетхие · доставка в аэропорт Даламан',f:['Эконом → SUV','Доставка в отель','Страховка'],desc:'Исследуйте регион в своём ритме. От эконом-класса до SUV и минивэнов на 7-9 мест; доставим авто в отель или в аэропорт Даламан. Каякёй, Сакликент, Долина бабочек и ликийские бухты — рядом.'},
 de:{n:'Mietwagen',loc:'Ölüdeniz · Fethiye · Lieferung Flughafen Dalaman',f:['Kleinwagen → SUV','Hotelzustellung','Versichert'],desc:'Erkunden Sie die Region in Ihrem Tempo. Vom Kleinwagen bis zum SUV und 7-9-Sitzer; Zustellung ans Hotel oder zum Flughafen Dalaman. Kayaköy, Saklıkent, Schmetterlingstal und die lykischen Buchten sind in Reichweite.'},
 pl:{n:'Wynajem samochodu',loc:'Ölüdeniz · Fethiye · dostawa na lotnisko Dalaman',f:['Ekonomiczne → SUV','Dostawa do hotelu','Ubezpieczenie'],desc:'Zwiedzaj region we własnym tempie. Od aut ekonomicznych po SUV i busy 7-9-osobowe; dostarczamy do hotelu lub na lotnisko Dalaman. Kayaköy, Saklıkent, Dolina Motyli i zatoki Licji w zasięgu ręki.'}},
"Motorbike & Scooter Rental":{
 ru:{n:'Аренда мотоциклов и скутеров',loc:'Олюдениз · Хисарёню · Фетхие',f:['50cc – 125cc+','Шлем включён','Доставка в отель'],desc:'Самый удобный транспорт для узких дорог и побережья. Привезём скутер или мотоцикл со шлемами в отель — катайтесь между Олюденизом, Хисарёню и Фетхие без проблем с парковкой.'},
 de:{n:'Motorrad- & Rollerverleih',loc:'Ölüdeniz · Hisarönü · Fethiye',f:['50cc – 125cc+','Helm inklusive','Hotelzustellung'],desc:'Am einfachsten über schmale Buchtstraßen und entlang der Küste. Wir liefern Roller und Motorräder mit Helmen ans Hotel — fahren Sie frei zwischen Ölüdeniz, Hisarönü und Fethiye, ohne Parkplatzsuche.'},
 pl:{n:'Wynajem motocykli i skuterów',loc:'Ölüdeniz · Hisarönü · Fethiye',f:['50cc – 125cc+','Kask w cenie','Dostawa do hotelu'],desc:'Najwygodniejszy sposób na wąskie drogi i wybrzeże. Dowozimy skutery i motocykle z kaskami do hotelu — jeździsz swobodnie między Ölüdeniz, Hisarönü i Fethiye bez problemu z parkowaniem.'}},
"ATV Rental":{
 ru:{n:'Аренда квадроцикла',loc:'Олюдениз · Хисарёню · Каякёй',f:['Почасово / посуточно','Шлем включён','Страховка'],desc:'Хотите свой маршрут вместо тура с гидом? Арендуйте зарегистрированный квадроцикл, допущенный на дороги, на час или день и катайтесь вокруг Каякёя, бухты Гемилер и подножия Бабадага.'},
 de:{n:'Quad-Verleih',loc:'Ölüdeniz · Hisarönü · Kayaköy',f:['Stunden- / tageweise','Helm inklusive','Versichert'],desc:'Lieber die eigene Route statt geführter Tour? Mieten Sie unsere straßenzugelassenen Quads stunden- oder tageweise und fahren Sie frei rund um Kayaköy, die Gemiler-Bucht und die Ausläufer des Babadağ.'},
 pl:{n:'Wynajem quada',loc:'Ölüdeniz · Hisarönü · Kayaköy',f:['Na godziny / doby','Kask w cenie','Ubezpieczenie'],desc:'Wolisz własną trasę zamiast wycieczki z przewodnikiem? Wynajmij zarejestrowany quad dopuszczony do ruchu na godzinę lub dzień i jeździj po okolicach Kayaköy, zatoki Gemiler i podnóża Babadağ.'}},
"Private Pool Villa Rental":{
 ru:{n:'Виллы с частным бассейном',loc:'Олюдениз · Хисарёню · Оваджик · Каякёй',f:['Свой бассейн','2–6 спален','Уединённые варианты'],desc:'Виллы с бассейном для семьи или компании друзей. Вид на море или Бабадаг, полностью оборудованная кухня, недалеко от пляжа Олюдениза и центра Хисарёню. Напишите бюджет и число гостей в WhatsApp — подберём виллу.'},
 de:{n:'Villa mit Privatpool',loc:'Ölüdeniz · Hisarönü · Ovacık · Kayaköy',f:['Privatpool','2–6 Schlafzimmer','Uneinsehbare Optionen'],desc:'Villen mit Privatpool für Familie oder Freunde. Meer- oder Babadağ-Blick, voll ausgestattete Küche, nur kurz zum Strand von Ölüdeniz und ins Zentrum von Hisarönü. Nennen Sie uns per WhatsApp Budget und Personenzahl — wir schlagen die passende Villa vor.'},
 pl:{n:'Willa z prywatnym basenem',loc:'Ölüdeniz · Hisarönü · Ovacık · Kayaköy',f:['Prywatny basen','2–6 sypialni','Ustronne opcje'],desc:'Wille z basenem dla rodziny lub przyjaciół. Widok na morze lub Babadağ, w pełni wyposażona kuchnia, blisko plaży Ölüdeniz i centrum Hisarönü. Napisz na WhatsApp budżet i liczbę osób — dobierzemy willę.'}},
"Holiday Homes & Apartments":{
 ru:{n:'Апартаменты посуточно',loc:'Олюдениз · Хисарёню · центр Фетхие',f:['Посуточно / понедельно','1–3 спальни','Кухня'],desc:'Живите как дома, а не в отеле. Апартаменты и дома с кухней и кондиционером, от 1 до 3 спален, для короткого отдыха — рядом с пляжем, базаром и местами активностей.'},
 de:{n:'Ferienhäuser & Apartments',loc:'Ölüdeniz · Hisarönü · Zentrum Fethiye',f:['Tage- / wochenweise','1–3 Schlafzimmer','Küche'],desc:'Wohnen wie zu Hause statt im Hotel. Klimatisierte Häuser und Apartments mit Küche, 1 bis 3 Schlafzimmer, für Kurzaufenthalte — nah an Strand, Basar und Aktivitäten.'},
 pl:{n:'Domy i apartamenty na doby',loc:'Ölüdeniz · Hisarönü · centrum Fethiye',f:['Na doby / tygodnie','1–3 sypialnie','Kuchnia'],desc:'Mieszkaj jak w domu zamiast w hotelu. Klimatyzowane domy i apartamenty z kuchnią, od 1 do 3 sypialni, na krótkie pobyty — blisko plaży, bazaru i atrakcji.'}},
"Fly & Dive":{
 ru:{n:'Полёт и дайвинг',loc:'Олюдениз · полдня · 2 активности',f:['Параглайдинг','Дайвинг','Бесплатный трансфер','Страховка'],desc:'Начните день в небе: утром — трансфер на Бабадаг и полёт над Голубой лагуной (около 30 мин). Днём — дайвинг с опытными инструкторами: всего 45 мин, из них 25 под водой.'},
 de:{n:'Fliegen & Tauchen',loc:'Ölüdeniz · Halbtags · 2 Aktivitäten',f:['Paragliding','Tauchen','Gratis-Transfer','Versicherung'],desc:'Starten Sie den Tag am Himmel: morgens Transfer auf den Babadağ und Flug über die Blaue Lagune (ca. 30 Min.). Nachmittags Tauchen mit erfahrenen Tauchern — 45 Min. gesamt, davon 25 unter Wasser.'},
 pl:{n:'Lot i nurkowanie',loc:'Ölüdeniz · pół dnia · 2 atrakcje',f:['Paralotnia','Nurkowanie','Darmowy transfer','Ubezpieczenie'],desc:'Zacznij dzień w niebie: rano transfer na Babadağ i lot nad Błękitną Laguną (ok. 30 min). Po południu nurkowanie z doświadczonymi instruktorami — łącznie 45 min, w tym 25 pod wodą.'}},
"Ride & Fly":{
 ru:{n:'Верхом и в небо',loc:'В один день · 2 активности',f:['Конное сафари','Параглайдинг','Трансфер','Гид','Страховка'],desc:'Легенда неба и земли: с одной стороны — крыло над вершиной Бабадага, с другой — верный друг в сердце природы. Этот пакет соединяет адреналин и спокойствие.'},
 de:{n:'Reiten & Fliegen',loc:'Am selben Tag · 2 Aktivitäten',f:['Reitsafari','Paragliding','Transfer','Guide','Versicherung'],desc:'Die Legende von Himmel und Erde: auf der einen Seite ein Schirm vom Gipfel des Babadağ, auf der anderen ein treuer Freund mitten in der Natur. Dieses Paket verbindet Adrenalin mit Ruhe.'},
 pl:{n:'Konno i w powietrze',loc:'Tego samego dnia · 2 atrakcje',f:['Safari konne','Paralotnia','Transfer','Przewodnik','Ubezpieczenie'],desc:'Legenda nieba i ziemi: z jednej strony skrzydło nad szczytem Babadağ, z drugiej wierny przyjaciel w sercu natury. Ten pakiet łączy adrenalinę ze spokojem.'}},
"Fly, Ride & Swim":{
 ru:{n:'Полёт, квадро и море',loc:'2 дня · 3 активности',f:['Параглайдинг','Квадроциклы','Морская прогулка','Трансфер','Страховка'],desc:'Повышаем дозу адреналина! Забудьте о скучном отдыхе: вы взлетите, поднимете пыль на квадроцикле и насладитесь морем. Самый популярный приключенческий пакет ждёт вас!'},
 de:{n:'Fliegen, Fahren & Schwimmen',loc:'2 Tage · 3 Aktivitäten',f:['Paragliding','Quad-Tour','Bootstour','Transfer','Versicherung'],desc:'Wir erhöhen die Adrenalindosis! Vergessen Sie langweilige Urlaubspläne: Sie heben ab, wirbeln Staub auf und genießen das Meer. Das beliebteste Abenteuerpaket wartet!'},
 pl:{n:'Lot, quad i rejs',loc:'2 dni · 3 atrakcje',f:['Paralotnia','Quady','Rejs','Transfer','Ubezpieczenie'],desc:'Zwiększamy dawkę adrenaliny! Zapomnij o nudnych planach: wzniesiesz się w powietrze, wzbijesz kurz quadem i odpoczniesz na morzu. Najpopularniejszy pakiet przygód czeka!'}},
"Butterfly Valley Boat Trip":{
 ru:{n:'Морская прогулка в Долину бабочек',loc:'Олюдениз · весь день · 10:00-17:30',f:['Долина бабочек','Голубая пещера','Обед'],desc:'Классическая прогулка из Олюдениза: Долина бабочек, Голубая пещера, остров Св. Николая (Гемилер), пляж Верблюдов и бухта Холодной воды. Купание весь день, обед на борту и лучшие виды ликийского побережья.'},
 de:{n:'Bootsausflug Schmetterlingstal',loc:'Ölüdeniz · Ganztags · 10:00-17:30',f:['Schmetterlingstal','Blaue Grotte','Mittagessen'],desc:'Der Klassiker ab Ölüdeniz: Schmetterlingstal, Blaue Grotte, St.-Nikolaus-Insel (Gemiler), Kamelstrand und Kaltwasserbucht. Badestopps den ganzen Tag, Mittagessen an Bord und die schönsten Ausblicke der lykischen Küste.'},
 pl:{n:'Rejs do Doliny Motyli',loc:'Ölüdeniz · cały dzień · 10:00-17:30',f:['Dolina Motyli','Błękitna Grota','Obiad'],desc:'Klasyczny rejs z Ölüdeniz: Dolina Motyli, Błękitna Grota, Wyspa św. Mikołaja (Gemiler), Plaża Wielbłądów i Zatoka Zimnej Wody. Kąpiele przez cały dzień, obiad na pokładzie i najpiękniejsze widoki wybrzeża Licji.'}},
"Saklıkent & Tlos Tour":{
 ru:{n:'Сакликент и Тлос',loc:'Фетхие · весь день',f:['Каньон Сакликент','Древний Тлос','Якапарк'],desc:'Прогулка по ледяной воде одного из самых длинных каньонов Турции, скальные гробницы и акрополь древнего ликийского Тлоса, а затем форель в Якапарке. Природа и история за один день.'},
 de:{n:'Saklıkent & Tlos',loc:'Fethiye · Ganztags',f:['Saklıkent-Schlucht','Antikes Tlos','Yakapark'],desc:'Durch eiskaltes Wasser in einer der längsten Schluchten der Türkei waten, die Felsgräber und die Akropolis des antiken lykischen Tlos erkunden und zum Abschluss Forelle im Yakapark. Natur und Geschichte an einem Tag.'},
 pl:{n:'Saklıkent i Tlos',loc:'Fethiye · cały dzień',f:['Kanion Saklıkent','Starożytne Tlos','Yakapark'],desc:'Brodzenie w lodowatej wodzie jednego z najdłuższych kanionów Turcji, skalne grobowce i akropol starożytnego Tlos, a na koniec pstrąg w Yakapark. Natura i historia w jeden dzień.'}},
"Dalyan Tour":{
 ru:{n:'Тур в Дальян',loc:'Дальян · Кёйджегиз · весь день',f:['Гробницы царей','Грязевые ванны','Черепаший пляж'],desc:'На лодке по каналам Дальяна мимо скальных гробниц Кауноса, грязевые ванны и термальные источники Кёйджегиза и купание на пляже Изтузу — месте гнездования черепах каретта. День, полный природы.'},
 de:{n:'Dalyan-Tour',loc:'Dalyan · Köyceğiz · Ganztags',f:['Königsgräber','Schlammbad','Schildkrötenstrand'],desc:'Bootsfahrt durch die Kanäle von Dalyan vorbei an den Felsgräbern von Kaunos, Schlammbad und Thermalquellen in Köyceğiz und Baden am İztuzu-Strand, dem Nistplatz der Unechten Karettschildkröten.'},
 pl:{n:'Wycieczka do Dalyan',loc:'Dalyan · Köyceğiz · cały dzień',f:['Grobowce królów','Kąpiel błotna','Plaża żółwi'],desc:'Rejs kanałami Dalyan obok skalnych grobowców Kaunos, kąpiel błotna i gorące źródła w Köyceğiz oraz kąpiel na plaży İztuzu — miejscu lęgowym żółwi karetta. Dzień pełen przyrody.'}},
"Rhodes & Kastellorizo Day Trip":{
 ru:{n:'Родос и Кастелоризо за день',loc:'Фетхие → Родос · Каш → Кастелоризо',f:['Билет на паром','Нужен паспорт','Сезонно'],desc:'Однодневный побег на греческий остров: паром из Фетхие в средневековый Старый город Родоса или короткий переход из Каша на тихий Кастелоризо (Мейс). Билеты, трансфер и расписание организуем мы.'},
 de:{n:'Tagesausflug Rhodos & Kastellorizo',loc:'Fethiye → Rhodos · Kaş → Kastellorizo',f:['Fährticket','Reisepass nötig','Saisonal'],desc:'Ein Tag auf einer griechischen Insel: mit der Fähre von Fethiye in die mittelalterliche Altstadt von Rhodos oder von Kaş hinüber ins ruhige Kastellorizo (Meis). Tickets, Transfers und Zeitplan organisieren wir.'},
 pl:{n:'Rodos i Kastelorizo w jeden dzień',loc:'Fethiye → Rodos · Kaş → Kastelorizo',f:['Bilet na prom','Wymagany paszport','Sezonowo'],desc:'Jednodniowa ucieczka na grecką wyspę: promem z Fethiye na średniowieczne Stare Miasto Rodos lub z Kaş na spokojne Kastelorizo (Meis). Bilety, transfery i godziny załatwiamy za Ciebie.'}},
"Private Yacht & Gulet Charter":{
 ru:{n:'Аренда яхты и гулета',loc:'Олюдениз · Фетхие · Гёджек',f:['С капитаном','Почасово / на день','Свой маршрут'],desc:'Лодка только для вас и ваших близких. Частная яхта или гулет с капитаном по бухтам Олюдениза, Фетхие и Гёджека — маршрут, время и меню выбираете вы. Идеально для дней рождения, праздников и семей.'},
 de:{n:'Private Yacht- & Gulet-Charter',loc:'Ölüdeniz · Fethiye · Göcek',f:['Mit Kapitän','Stunden- / tageweise','Eigene Route'],desc:'Das Boot nur für Sie und Ihre Liebsten. Private Yacht- und Gulet-Charter mit Kapitän in den Buchten von Ölüdeniz, Fethiye und Göcek — Route, Zeiten und Menü bestimmen Sie. Ideal für Geburtstage, Feiern und Familien.'},
 pl:{n:'Czarter jachtu i guleta',loc:'Ölüdeniz · Fethiye · Göcek',f:['Z kapitanem','Na godziny / dni','Własna trasa'],desc:'Łódź tylko dla Ciebie i Twoich bliskich. Prywatny jacht lub gulet z kapitanem po zatokach Ölüdeniz, Fethiye i Göcek — trasę, godziny i menu wybierasz Ty. Idealne na urodziny, święta i dla rodzin.'}},
"Photographer & Drone Shoot":{
 ru:{n:'Фотограф и съёмка с дрона',loc:'Олюдениз · Кумбурну · Каякёй · Бабадаг',f:['Профи-фотограф','Дрон','Цифровая выдача'],desc:'Сохраните отпуск в профессиональных кадрах. Фотосессии для пар, семей и соло в знаковых местах — лагуна Олюдениза, Каякёй, Бабадаг — и, по желанию, видео с дрона. Обработанные фото выдаются в цифровом виде.'},
 de:{n:'Fotograf & Drohnenshooting',loc:'Ölüdeniz · Kumburnu · Kayaköy · Babadağ',f:['Profi-Fotograf','Drohne','Digitale Lieferung'],desc:'Halten Sie Ihren Urlaub in professionellen Bildern fest. Paar-, Familien- und Einzelshootings an ikonischen Orten wie der Lagune von Ölüdeniz, Kayaköy und dem Babadağ, optional mit Drohnenvideo. Bearbeitete Fotos digital.'},
 pl:{n:'Fotograf i nagrania z drona',loc:'Ölüdeniz · Kumburnu · Kayaköy · Babadağ',f:['Profesjonalny fotograf','Dron','Dostawa cyfrowa'],desc:'Uwiecznij urlop na profesjonalnych zdjęciach. Sesje dla par, rodzin i solo w kultowych miejscach — laguna Ölüdeniz, Kayaköy, Babadağ — opcjonalnie z filmem z drona. Obrobione zdjęcia w wersji cyfrowej.'}},
"Marriage Proposal Package":{
 ru:{n:'Предложение руки и сердца',loc:'Лодка · пляж · параглайдинг',f:['Организация','Декор','Фотограф'],desc:'Задайте главный вопрос в незабываемой обстановке: на частной лодке на закате, в украшенной цветами бухте или в небе с баннером «Will you marry me?» во время полёта. Всё подготовим тайно.'},
 de:{n:'Heiratsantrag-Paket',loc:'Boot · Strand · Paragliding',f:['Planung','Dekoration','Fotograf'],desc:'Stellen Sie die große Frage an einem unvergesslichen Ort: auf einem Privatboot bei Sonnenuntergang, in einer mit Blumen geschmückten Bucht oder in der Luft mit einem „Willst du mich heiraten?“-Banner beim Paragliding. Wir bereiten alles diskret vor.'},
 pl:{n:'Pakiet oświadczyn',loc:'Łódź · plaża · paralotnia',f:['Organizacja','Dekoracje','Fotograf'],desc:'Zadaj najważniejsze pytanie w niezapomnianej scenerii: na prywatnej łodzi o zachodzie słońca, w udekorowanej kwiatami zatoce lub w powietrzu z banerem „Wyjdziesz za mnie?” podczas lotu. Wszystko przygotujemy dyskretnie.'}},
"Turkish Bath & Spa":{
 ru:{n:'Турецкий хаммам и спа',loc:'Олюдениз · Ölüdeniz Hamam & Spa',f:['Пилинг и пена','Массаж','Сауна и пар'],desc:'Смойте усталость в традиционном турецком хаммаме. Пилинг и пенный массаж на тёплом мраморе, затем ароматерапия или классический массаж. Самые расслабляющие часы отпуска в Ölüdeniz Hamam & Spa.'},
 de:{n:'Türkisches Bad & Spa',loc:'Ölüdeniz · Ölüdeniz Hamam & Spa',f:['Peeling & Schaum','Massage','Sauna & Dampf'],desc:'Lassen Sie den Tag im traditionellen türkischen Hamam ausklingen. Peeling und Schaummassage auf warmem Marmor, danach Aromatherapie oder klassische Massage. Die entspannendsten Stunden Ihres Urlaubs im Ölüdeniz Hamam & Spa.'},
 pl:{n:'Łaźnia turecka i spa',loc:'Ölüdeniz · Ölüdeniz Hamam & Spa',f:['Peeling i piana','Masaż','Sauna i para'],desc:'Zmyj zmęczenie w tradycyjnej łaźni tureckiej. Peeling i masaż pianą na ciepłym marmurze, potem aromaterapia lub masaż klasyczny. Najbardziej relaksujące godziny urlopu w Ölüdeniz Hamam & Spa.'}}
};


export { IMG, WA, A, T, R, H, P, X, S, FAQ, L, SLUG, CFG, REVIEWS, UI, TX };
