// Blog yazıları — build.js bunları /blog ve /en/blog sayfalarına dönüştürür.
// Gövde basit HTML'dir. Hizmet linkleri için {{link:Hizmet Adı}} kullanın.
const POSTS = [
{
 date: '2026-11-05',
 img: 'https://skywalkersparagliding.com/api/images/2aedfafb833d2f25.webp',
 tr: {
  slug: 'oludenizde-yapilacak-seyler',
  title: "Ölüdeniz'de Yapılacak 12 Şey (2026 Rehberi)",
  desc: "Yamaç paraşütünden Kelebekler Vadisi'ne, Kayaköy'den Saklıkent'e: Ölüdeniz ve Fethiye'de mutlaka yapmanız gereken 12 aktivite ve pratik ipuçları.",
  body: `
<p>Ölüdeniz, turkuaz lagünü, Babadağ'ın eteklerinden süzülen paraşütleri ve Likya kıyısının saklı koylarıyla Türkiye'nin en çok fotoğraflanan tatil yerlerinden biri. İlk kez geliyorsanız ya da bu sefer farklı bir şey yapmak istiyorsanız, işte listemiz.</p>
<h2>1. Babadağ'dan yamaç paraşütü</h2>
<p>Ölüdeniz denince akla ilk gelen deneyim. Yaklaşık 1.965 metreden kalkan tandem uçuşlarda profesyonel bir pilotla 25-30 dakika boyunca lagünün üzerinde süzülür, Ölüdeniz plajına inersiniz. Tecrübe gerekmez. Detaylar: {{link:Yamaç Paraşütü}}.</p>
<h2>2. Kelebekler Vadisi tekne turu</h2>
<p>Sadece denizden ulaşılabilen Kelebekler Vadisi; Mavi Mağara, St. Nicholas (Gemiler) Adası ve Deve Plajı ile birlikte klasik Ölüdeniz tekne rotasının parçası. Gün boyu yüzme molaları verilir: {{link:Kelebekler Vadisi Tekne Turu}}.</p>
<h2>3. Mavi Lagün'de (Kumburnu) yüzmek</h2>
<p>Tabiat parkı içindeki sakin, sığ lagün özellikle çocuklu aileler için idealdir. Sabah erken saatlerde gitmek kalabalıktan kaçmanın en iyi yolu.</p>
<h2>4. Kayaköy hayalet köyü</h2>
<p>Ölüdeniz'e yaklaşık 15-20 dakika mesafedeki Kayaköy, 1923 nüfus mübadelesinden sonra terk edilmiş taş evleriyle bölgenin en atmosferik yerlerinden biri. Gün batımında yürüyüş için harika; ATV ile de keşfedebilirsiniz: {{link:ATV Turu}}.</p>
<h2>5. Likya Yolu'nda kısa bir yürüyüş</h2>
<p>Dünyanın en güzel uzun mesafe parkurlarından sayılan Likya Yolu'nun başlangıcı Ölüdeniz–Ovacık civarındadır. Faralya yönüne birkaç saatlik bir bölüm bile manzara için yeterli.</p>
<h2>6. Saklıkent Kanyonu</h2>
<p>Türkiye'nin en uzun kanyonlarından biri olan Saklıkent'te buz gibi suda yürümek, yaz sıcağında en serinletici aktivitedir. Tlos antik kentiyle birleştirebilirsiniz: {{link:Saklıkent & Tlos Turu}}.</p>
<h2>7. Tüplü dalış</h2>
<p>Ölüdeniz'in berrak suları ilk dalış deneyimi için çok uygundur. Eğitmen eşliğinde, sertifika gerekmeden yapılabilir: {{link:Tüplü Dalış}}.</p>
<h2>8. Jeep safari</h2>
<p>Su savaşları, çamur banyosu ve Saklıkent'i bir arada isteyenler için eğlenceli bir gün: {{link:Jeep Safari}}.</p>
<h2>9. Dalaman Çayı'nda rafting</h2>
<p>16 km'lik parkurda dalgalara karşı kürek çekmek için tecrübe gerekmez: {{link:Rafting Turu}}.</p>
<h2>10. Dalyan ve kaplumbağa plajı</h2>
<p>Kaunos kral mezarları, çamur banyosu ve caretta carettaların yuvası İztuzu plajı tek günde: {{link:Dalyan Turu}}.</p>
<h2>11. Fethiye Salı pazarı ve balık hali</h2>
<p>Fethiye merkezde salı günleri kurulan pazar ve balık hali, yerel lezzetleri tatmak için mutlaka görülmeli. Balığı halden seçip çevredeki restoranlara pişirtebilirsiniz.</p>
<h2>12. Türk hamamında günü bitirmek</h2>
<p>Aktif bir günün ardından kese ve köpük masajı en iyi ödül: {{link:Türk Hamamı & Spa}}.</p>
<h2>Pratik ipuçları</h2>
<ul><li>En yoğun sezon haziran–eylül; mayıs ve ekim hem daha serin hem daha sakindir.</li><li>Ulaşımı kolaylaştırmak için araç veya scooter kiralayabilirsiniz: {{link:Araba Kiralama}}.</li><li>Birden fazla aktivite planlıyorsanız <a href="/#builder">kendi paketinizi oluşturun</a>, tek mesajla teklif alın.</li></ul>`
 },
 en: {
  slug: 'things-to-do-in-oludeniz',
  title: '12 Best Things to Do in Ölüdeniz (2026 Guide)',
  desc: 'From paragliding to Butterfly Valley, Kayaköy to Saklıkent: the 12 things you should not miss in Ölüdeniz and Fethiye, plus practical tips.',
  body: `
<p>With its turquoise lagoon, paragliders drifting down from Babadağ and the hidden bays of the Lycian coast, Ölüdeniz is one of Turkey's most photographed holiday spots. Whether it's your first visit or you want something different this time, here's our list.</p>
<h2>1. Paragliding from Babadağ</h2>
<p>The signature Ölüdeniz experience. Tandem flights take off from around 1,965 metres; you glide over the lagoon for 25-30 minutes with a professional pilot and land on Ölüdeniz beach. No experience needed. Details: {{link:Yamaç Paraşütü}}.</p>
<h2>2. Butterfly Valley boat trip</h2>
<p>Reachable only by sea, Butterfly Valley is part of the classic Ölüdeniz boat route along with the Blue Cave, St. Nicholas (Gemiler) Island and Camel Beach, with swimming stops all day: {{link:Kelebekler Vadisi Tekne Turu}}.</p>
<h2>3. Swim in the Blue Lagoon (Kumburnu)</h2>
<p>The calm, shallow lagoon inside the nature park is ideal for families with children. Go early in the morning to beat the crowds.</p>
<h2>4. Kayaköy ghost village</h2>
<p>About 15-20 minutes from Ölüdeniz, Kayaköy's stone houses, abandoned after the 1923 population exchange, make it one of the most atmospheric places in the region. Great for a sunset walk — or explore it by quad: {{link:ATV Turu}}.</p>
<h2>5. A short hike on the Lycian Way</h2>
<p>One of the world's great long-distance trails starts near Ölüdeniz–Ovacık. Even a few hours towards Faralya gives you incredible views.</p>
<h2>6. Saklıkent Gorge</h2>
<p>Wading through ice-cold water in one of Turkey's longest gorges is the most refreshing thing to do in summer heat. Combine it with ancient Tlos: {{link:Saklıkent & Tlos Turu}}.</p>
<h2>7. Scuba diving</h2>
<p>Ölüdeniz's clear water is perfect for a first dive with an instructor, no certificate needed: {{link:Tüplü Dalış}}.</p>
<h2>8. Jeep safari</h2>
<p>Water fights, a mud bath and Saklıkent in one fun-filled day: {{link:Jeep Safari}}.</p>
<h2>9. Rafting on the Dalaman River</h2>
<p>Paddle through the waves on a 16 km course — no experience required: {{link:Rafting Turu}}.</p>
<h2>10. Dalyan and Turtle Beach</h2>
<p>The Kaunos rock tombs, mud baths and İztuzu beach, nesting ground of loggerhead turtles, in a single day: {{link:Dalyan Turu}}.</p>
<h2>11. Fethiye Tuesday market and fish market</h2>
<p>Fethiye's Tuesday market and fish market are must-sees for local food. Pick your fish and have one of the surrounding restaurants cook it.</p>
<h2>12. End the day in a Turkish bath</h2>
<p>After an active day, a scrub and foam massage is the best reward: {{link:Türk Hamamı & Spa}}.</p>
<h2>Practical tips</h2>
<ul><li>Peak season is June–September; May and October are cooler and calmer.</li><li>Renting a car or scooter makes getting around easy: {{link:Araba Kiralama}}.</li><li>Planning several activities? <a href="/?lang=en#builder">Build your own package</a> and get one quote in a single message.</li></ul>`
 }
},
{
 date: '2026-11-05',
 img: 'https://skywalkersparagliding.com/api/images/167f9cea0fe905cf.webp',
 tr: {
  slug: 'dalaman-havalimanindan-oludenize-ulasim',
  title: "Dalaman Havalimanı'ndan Ölüdeniz'e Nasıl Gidilir?",
  desc: "Dalaman Havalimanı'ndan Ölüdeniz, Fethiye ve Hisarönü'ne ulaşım seçenekleri: özel transfer, servis otobüsü, dolmuş, taksi ve araç kiralama — süreler ve ipuçları.",
  body: `
<p>Ölüdeniz'e en yakın havalimanı Dalaman Havalimanı'dır (DLM). Yol yaklaşık 75-80 km'dir ve trafiğe göre 1 saat ile 1 saat 15 dakika arası sürer. Fethiye merkeze ise yaklaşık 50 dakikada ulaşılır. İşte seçenekler:</p>
<h2>1. Özel VIP transfer (en rahat seçenek)</h2>
<p>Uçuşunuz takip edilir, şoför sizi terminal çıkışında isminizle karşılar ve doğrudan otelinizin kapısına bırakır. Fiyat kişi başı değil araç başıdır; bu yüzden 3-4 kişi ve üzeri gruplar için taksiden bile avantajlı olabilir. Rötarda bekleme ücreti yoktur. Detaylar ve fiyat: {{link:VIP Transfer · Fethiye / Ölüdeniz}}.</p>
<h2>2. Havalimanı servis otobüsü + dolmuş</h2>
<p>Havalimanından Fethiye otogarına servis otobüsleri çalışır. Fethiye'den Ölüdeniz ve Hisarönü'ne ise sık aralıklarla dolmuş kalkar (yaklaşık 25-30 dakika). En ekonomik yol budur ama aktarma ve bagaj taşıma gerektirir; gece geç saatlerde seçenekler azalır.</p>
<h2>3. Taksi</h2>
<p>Terminal önünde taksi bulunur, ancak uzun mesafe olduğu için ücret yüksektir ve önceden sabitlenmez. Özel transfer genellikle daha öngörülebilir bir maliyet sunar.</p>
<h2>4. Araç kiralama</h2>
<p>Tatil boyunca bölgeyi gezmeyi planlıyorsanız aracı doğrudan havalimanında teslim almak mantıklıdır: {{link:Araba Kiralama}}.</p>
<h2>Marmaris'e gidiyorsanız</h2>
<p>Dalaman'dan Marmaris yaklaşık 1,5 saattir. Özel transfer için: {{link:VIP Transfer · Marmaris}}.</p>
<h2>İpuçları</h2>
<ul><li>Transferi önceden ayarlayın; yaz aylarında akşam saatlerinde yoğunluk olur.</li><li>Uçuş numaranızı paylaşın ki rötar olursa şoför bilgilensin.</li><li>Çocuk koltuğu gerekiyorsa rezervasyonda belirtin.</li></ul>`
 },
 en: {
  slug: 'dalaman-airport-to-oludeniz',
  title: 'How to Get from Dalaman Airport to Ölüdeniz',
  desc: 'All the ways to get from Dalaman Airport to Ölüdeniz, Fethiye and Hisarönü: private transfer, airport shuttle, dolmuş, taxi and car rental — journey times and tips.',
  body: `
<p>The closest airport to Ölüdeniz is Dalaman Airport (DLM). The drive is about 75-80 km and takes 1 hour to 1 hour 15 minutes depending on traffic; Fethiye town is about 50 minutes away. Here are your options:</p>
<h2>1. Private VIP transfer (the easiest)</h2>
<p>Your flight is tracked, the driver meets you by name at the terminal exit and drops you right at your hotel door. The price is per vehicle, not per person, so for groups of 3-4 or more it can beat even a taxi. No extra charge for delays. Details and price: {{link:VIP Transfer · Fethiye / Ölüdeniz}}.</p>
<h2>2. Airport shuttle bus + dolmuş</h2>
<p>Shuttle buses run from the airport to Fethiye bus station. From Fethiye, frequent dolmuş minibuses go to Ölüdeniz and Hisarönü (about 25-30 minutes). It's the cheapest route but involves a change and carrying luggage, and options thin out late at night.</p>
<h2>3. Taxi</h2>
<p>Taxis wait outside the terminal, but the long distance makes it expensive and the fare isn't fixed in advance. A private transfer is usually more predictable.</p>
<h2>4. Car rental</h2>
<p>If you plan to explore the region, picking up a car at the airport makes sense: {{link:Araba Kiralama}}.</p>
<h2>Going to Marmaris?</h2>
<p>Dalaman to Marmaris takes about 1.5 hours. Private transfer: {{link:VIP Transfer · Marmaris}}.</p>
<h2>Tips</h2>
<ul><li>Book your transfer in advance — summer evenings get busy.</li><li>Share your flight number so the driver knows about delays.</li><li>Need a child seat? Mention it when booking.</li></ul>`
 }
},
{
 date: '2026-11-05',
 img: 'https://skywalkersparagliding.com/api/images/e54c5031df519ed5.webp',
 tr: {
  slug: 'oludeniz-yamac-parasutu-rehberi',
  title: 'Ölüdeniz Yamaç Paraşütü Rehberi: Fiyat, Süre, Güvenlik',
  desc: "Ölüdeniz'de yamaç paraşütü ne kadar sürer, fiyatı ne, kilo ve yaş sınırı var mı, ne giymeli? İlk uçuşunuz öncesi bilmeniz gereken her şey.",
  body: `
<p>Babadağ'dan Ölüdeniz'e yapılan tandem yamaç paraşütü uçuşları, dünyanın en ünlü uçuş noktalarından biri. İlk kez uçacaklar için en çok sorulan soruları yanıtladık.</p>
<h2>Nasıl bir deneyim?</h2>
<p>Otelinizden alınıp Babadağ'ın zirvesine (yaklaşık 1.965 m) çıkarılırsınız. Pilotunuz kısa bir güvenlik brifingi verir, birkaç adım koşarsınız ve kanat sizi yavaşça havaya kaldırır. Düşme hissi yoktur; süzülme hissi hakimdir. İniş Ölüdeniz plajına yapılır.</p>
<h2>Ne kadar sürüyor?</h2>
<p>Havada kalış süresi hava koşullarına bağlı olarak ortalama 25-30 dakikadır. Otelden alış, zirveye çıkış ve dönüşle birlikte toplam yaklaşık 1,5-2 saat ayırmanız yeterli.</p>
<h2>Fiyatı ne kadar?</h2>
<p>Güncel fiyat, otel transferi, sigorta ve GoPro fotoğraf/video dahil kişi başı <b>6.500 ₺</b>'dir. Rezervasyon için 1.000 ₺ ön ödeme alınır, kalanı uçuş günü ödenir. Gün batımı uçuşu ve kadın pilot tercihi gibi seçenekler ek ücretlidir. Tüm detaylar: {{link:Yamaç Paraşütü}}.</p>
<h2>Yaş ve kilo sınırı var mı?</h2>
<ul><li>Minimum yaş genellikle 4'tür; üst sınır sağlık durumuna ve pilotun onayına bağlıdır.</li><li>Standart kilo sınırı kadınlar için 80 kg, erkekler için 100 kg'dır; üzeri için ek ücret uygulanır.</li><li>Kalp rahatsızlığı veya panik atağı olanlara önerilmez.</li></ul>
<h2>Ne giymeliyim?</h2>
<p>Ayağınızdan çıkmayacak spor ayakkabı ve güneş gözlüğü yeterli. Zirve aşağıdan serin olabildiği için ince bir rüzgârlık iyi fikir. Terlikle uçulmaz.</p>
<h2>Hava kötüyse ne olur?</h2>
<p>Uçuş kararını her sabah pilot ekibi gerçek koşullara göre verir. Hava uygun değilse uçuşunuz başka bir güne ertelenir ya da ücretiniz iade edilir.</p>
<h2>En iyi saat hangisi?</h2>
<p>Sabah uçuşları genellikle daha sakin havada yapılır; gün batımı uçuşları ise en etkileyici renkleri sunar. Yaz aylarında erken rezervasyon önerilir.</p>
<p>Paraşütü bir tekne turu veya dalışla birleştirmek isterseniz paketlerimize göz atın: {{link:Uç & Dal}}.</p>`
 },
 en: {
  slug: 'oludeniz-paragliding-guide',
  title: 'Ölüdeniz Paragliding Guide: Price, Duration, Safety',
  desc: 'How long is a paragliding flight in Ölüdeniz, how much does it cost, are there weight or age limits and what should you wear? Everything to know before your first flight.',
  body: `
<p>Tandem paragliding from Babadağ down to Ölüdeniz is one of the most famous flying spots in the world. Here are answers to the questions first-timers ask most.</p>
<h2>What is it like?</h2>
<p>You're picked up from your hotel and driven to the summit of Babadağ (around 1,965 m). Your pilot gives a short safety briefing, you run a few steps and the wing gently lifts you up. There's no falling sensation — it feels like gliding. You land on Ölüdeniz beach.</p>
<h2>How long does it take?</h2>
<p>Time in the air is 25-30 minutes on average, depending on the weather. Including pickup, the drive up and return, allow about 1.5-2 hours in total.</p>
<h2>How much does it cost?</h2>
<p>The current price is <b>6,500 ₺</b> per person including hotel transfer, insurance and GoPro photos/video. A 1,000 ₺ deposit secures your booking and the rest is paid on the day. Options like a sunset flight or a female pilot cost extra. Full details: {{link:Yamaç Paraşütü}}.</p>
<h2>Are there age and weight limits?</h2>
<ul><li>The minimum age is usually 4; the upper limit depends on health and the pilot's approval.</li><li>Standard weight limits are 80 kg for women and 100 kg for men; a surcharge applies above that.</li><li>Not recommended for people with heart conditions or panic attacks.</li></ul>
<h2>What should I wear?</h2>
<p>Trainers that won't come off and sunglasses are enough. The summit can be cooler than the beach, so a light windbreaker is a good idea. Flip-flops are not allowed.</p>
<h2>What if the weather is bad?</h2>
<p>The pilots decide every morning based on real conditions. If it's not suitable, your flight is moved to another day or refunded.</p>
<h2>What's the best time to fly?</h2>
<p>Morning flights usually have calmer air; sunset flights offer the most stunning colours. Book early in summer.</p>
<p>Want to combine your flight with a boat trip or a dive? See our packages: {{link:Uç & Dal}}.</p>`
 }
}
];

export default POSTS;
