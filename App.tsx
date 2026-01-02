
import React, { useState, useEffect, useMemo } from 'react';
import { translations, Language, NewsItem } from './types';
import { 
  Droplets, 
  Trash2, 
  Leaf, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe, 
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Bot,
  Smartphone,
  BarChart3,
  ShoppingBag,
  Building2,
  GraduationCap,
  Waves,
  Search,
  Calendar,
  ChevronLeft
} from 'lucide-react';

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'ITSWARA Luncurkan IWABOT untuk Monitoring Sampah Berbasis IoT',
    excerpt: 'ITSWARA memperkenalkan IWABOT sebagai solusi pemantauan volume sampah secara real-time untuk mendukung pengelolaan lingkungan yang lebih efisien.',
    content: 'IWABOT adalah inovasi terbaru kami yang menggabungkan sensor IoT dengan kecerdasan buatan untuk mendeteksi kapasitas tempat sampah secara akurat. Dengan teknologi ini, petugas kebersihan dapat mengoptimalkan rute pengangkutan sampah, mengurangi konsumsi bahan bakar, dan mencegah sampah meluap. Implementasi awal di kawasan perkotaan menunjukkan peningkatan efisiensi pengumpulan hingga 40%.',
    date: '2024-03-15',
    tags: ['Product Update', 'Innovation'],
    image: 'assets/images/news/news-iwabot.jpg'
  },
  {
    id: '2',
    title: 'IWAAPP Digunakan oleh Komunitas Lingkungan di 5 Kota Besar',
    excerpt: 'Melalui IWAAPP, masyarakat dapat berpartisipasi aktif dalam pelaporan dan edukasi pengelolaan sampah berbasis digital.',
    content: 'Aplikasi mobile IWAAPP kini telah mencapai 50.000 pengguna aktif di Jakarta, Bandung, Surabaya, Medan, dan Makassar. Aplikasi ini memfasilitasi pelaporan tumpukan sampah ilegal dan menyediakan modul edukasi interaktif tentang pemilahan sampah di rumah. Keberhasilan ini membuktikan bahwa partisipasi digital adalah kunci perubahan perilaku masyarakat terhadap lingkungan.',
    date: '2024-02-28',
    tags: ['Community', 'Product Update'],
    image: 'assets/images/news/news-iwaapp.jpg'
  },
  {
    id: '3',
    title: 'IWAANALYTICS Dukung Pengambilan Keputusan Berbasis Data Lingkungan',
    excerpt: 'Platform analitik ITSWARA membantu mitra memahami pola sampah dan kualitas air secara menyeluruh melalui dashboard interaktif.',
    content: 'IWAANALYTICS menyediakan visualisasi data yang mendalam bagi pemerintah daerah and mitra industri. Dengan memantau tren kualitas air sungai dan akumulasi sampah harian, pemangku kepentingan dapat merancang kebijakan yang lebih tepat sasaran. Dashboard kami kini mencakup lebih dari 500 titik sensor di seluruh Indonesia.',
    date: '2024-02-10',
    tags: ['Research', 'Environmental Insight'],
    image: 'assets/images/news/news-iwaanalytics.jpg'
  },
  {
    id: '4',
    title: 'Kolaborasi ITSWARA dan KLHK dalam Program Lestari Sungai',
    excerpt: 'Kemitraan strategis ini bertujuan untuk mengembalikan kejernihan air sungai melalui teknologi penyaringan modular.',
    content: 'Kami bangga bermitra dengan Kementerian Lingkungan Hidup dan Kehutanan (KLHK) untuk mengimplementasikan filter air modular di daerah aliran sungai kritis. Proyek percontohan di Sungai Citarum menunjukkan penurunan tingkat polutan makro hingga 25% dalam tiga bulan pertama penggunaan.',
    date: '2024-01-20',
    tags: ['Partnership', 'Environmental Insight'],
    image: 'assets/images/news/news-partnership.jpg'
  }
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('id');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'news'>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'id' ? 'en' : 'id');
  };

  const logos = [
    { name: "DLH", icon: <Building2 />, type: "Government" },
    { name: "ITB", icon: <GraduationCap />, type: "University" },
    { name: "WWF", icon: <Leaf />, type: "Environment" },
    { name: "KLHK", icon: <ShieldCheck />, type: "Institutional" },
    { name: "UGM", icon: <GraduationCap />, type: "University" },
    { name: "WALHI", icon: <Waves />, type: "Environment" },
  ];

  const filteredNews = useMemo(() => {
    let result = newsData.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? news.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchQuery, selectedTag, sortBy]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    newsData.forEach(news => news.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const selectedNews = useMemo(() => 
    newsData.find(n => n.id === selectedNewsId), 
  [selectedNewsId]);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 custom-gradient overflow-hidden">
        <div className="absolute top-20 left-10 text-its-main-blue opacity-20 animate-bounce delay-75"><Droplets size={60} /></div>
        <div className="absolute bottom-20 right-10 text-its-green opacity-20 animate-pulse"><Trash2 size={80} /></div>
        <div className="absolute top-40 right-20 text-its-main-blue opacity-10"><Leaf size={40} /></div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-its-main-blue font-bold text-sm">
              <Sparkles size={16} />
              <span>Environmental Startup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-its-dark-green leading-tight">
              {t.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-its-dark-green/70 max-w-lg mx-auto md:mx-0 font-medium">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="#about" className="bg-its-main-blue text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-its-dark-green transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-center">
                {t.hero.cta1}
              </a>
              <a href="#contact" className="bg-white/80 backdrop-blur-md text-its-main-blue border-2 border-its-main-blue px-8 py-4 rounded-2xl font-black text-lg hover:bg-its-aqua/20 transition-all transform hover:-translate-y-1 text-center">
                {t.hero.cta2}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
             <div className="w-64 h-64 md:w-96 md:h-96 bg-white/30 blob-shape absolute -z-10 animate-[pulse_6s_ease-in-out_infinite]"></div>
             <div className="relative">
                <img 
                  src="assets/images/hero-environmental.jpg" 
                  alt="Environmental Tech" 
                  className="rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-700 object-cover aspect-square"
                />
                <div className="absolute -bottom-6 -right-6 bg-its-green p-4 rounded-2xl shadow-xl animate-bounce">
                  <Leaf className="text-white" size={32} />
                </div>
                <div className="absolute -top-6 -left-6 bg-its-main-blue p-4 rounded-2xl shadow-xl animate-pulse">
                  <Droplets className="text-white" size={32} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — DIPERCAYA & DIDUKUNG OLEH */}
      <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
        <div className="container mx-auto px-6 mb-8 text-center">
           <h3 className="text-xl md:text-2xl font-black text-gray-400 uppercase tracking-[0.2em]">{t.trusted.title}</h3>
        </div>
        <div className="flex relative">
          <div className="flex animate-infinite-scroll whitespace-nowrap group hover:[animation-play-state:paused]">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex items-center gap-4 mx-8 md:mx-16 transition-all duration-300 filter grayscale hover:grayscale-0 transform hover:scale-110">
                <div className="p-3 bg-gray-50 rounded-2xl text-its-main-blue">
                  {React.cloneElement(logo.icon as React.ReactElement<any>, { size: 40 })}
                </div>
                <div className="flex flex-col">
                  <span className="font-fredoka text-2xl font-bold text-gray-600 group-hover:text-its-dark-green transition-colors">{logo.name}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{logo.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
           <div className="h-1 w-32 bg-its-aqua rounded-full animate-wave"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h4 className="text-its-main-blue font-bold uppercase tracking-widest mb-2">{t.about.subtitle}</h4>
              <h2 className="text-4xl md:text-5xl font-black text-its-dark-green">{t.about.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  {t.about.content}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-red-50 p-4 rounded-2xl border border-red-100">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500">
                      <Trash2 />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-400 uppercase tracking-tighter">{t.about.beforeLabel}</p>
                      <p className="font-bold text-gray-700">{lang === 'id' ? 'Sampah tidak terkelola & Air kotor' : 'Unmanaged Waste & Dirty Water'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-its-aqua/30 p-4 rounded-2xl border border-its-aqua/50">
                    <div className="w-12 h-12 bg-its-main-blue rounded-xl flex items-center justify-center text-white shadow-md">
                      <Droplets />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-its-main-blue uppercase tracking-tighter">{t.about.afterLabel}</p>
                      <p className="font-bold text-gray-700">{lang === 'id' ? 'Digital Waste Hub & Ekosistem Air Lestari' : 'Digital Waste Hub & Sustainable Water Ecosystem'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-its-soft-blue/30 rounded-[3rem] blur-xl transition-all group-hover:bg-its-aqua/40"></div>
                <img 
                  src="assets/images/about-waste-management.jpg" 
                  alt="Waste Management" 
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 bg-its-aqua/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-its-dark-green">{t.visionMission.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border-t-8 border-its-main-blue hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-its-aqua/50 rounded-2xl flex items-center justify-center text-its-main-blue mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black text-its-dark-green mb-4">{t.visionMission.visionTitle}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{t.visionMission.visionContent}</p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border-t-8 border-its-green hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-its-green/20 rounded-2xl flex items-center justify-center text-its-green mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black text-its-dark-green mb-4">{t.visionMission.missionTitle}</h3>
              <ul className="space-y-4">
                {[t.visionMission.m1, t.visionMission.m2, t.visionMission.m3].map((m, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 font-medium">
                    <CheckCircle2 className="text-its-green flex-shrink-0" size={24} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 text-its-main-blue font-black uppercase tracking-[0.3em] mb-4">
               <div className="w-8 h-0.5 bg-its-main-blue"></div>
               {lang === 'id' ? 'Inovasi Kami' : 'Our Innovation'}
               <div className="w-8 h-0.5 bg-its-main-blue"></div>
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-its-dark-green">{t.products.title}</h2>
          </div>

          <div className="relative">
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  { icon: <Bot />, name: t.products.p1Name, desc: t.products.p1Desc, tag: t.products.p1Tag, color: 'aqua' },
                  { icon: <Smartphone />, name: t.products.p2Name, desc: t.products.p2Desc, tag: t.products.p2Tag, color: 'green' },
                  { icon: <BarChart3 />, name: t.products.p3Name, desc: t.products.p3Desc, tag: t.products.p3Tag, color: 'blue' },
                  { icon: <ShoppingBag />, name: t.products.p4Name, desc: t.products.p4Desc, tag: t.products.p4Tag, color: 'green-dark' }
                ].map((p, i) => (
                  <div key={i} className="group bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 hover:border-its-main-blue transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
                    <div className="w-20 h-20 bg-its-aqua/30 rounded-3xl flex items-center justify-center text-its-main-blue mb-8 relative">
                       <div className="absolute inset-0 bg-its-aqua rounded-3xl animate-ripple opacity-0 group-hover:opacity-100"></div>
                       {React.cloneElement(p.icon as React.ReactElement<any>, { size: 44, className: 'group-hover:animate-pulse' })}
                    </div>
                    <span className="bg-its-aqua/20 text-its-main-blue px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">{p.tag}</span>
                    <h3 className="text-3xl font-black text-its-dark-green mb-4">{p.name}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-6">{p.desc}</p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-bold text-its-main-blue">Learn More</span>
                      <ArrowRight className="text-its-main-blue group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Why Us (Stats) */}
      <section className="py-24 bg-its-dark-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/2 -translate-y-1/2">
           <Droplets size={400} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-10">{t.whyUs.title}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[t.whyUs.reason1, t.whyUs.reason2, t.whyUs.reason3, t.whyUs.reason4].map((r, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl">
                    <CheckCircle2 className="text-its-green" />
                    <span className="font-bold text-lg">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { val: t.whyUs.stat1, label: t.whyUs.stat1Label },
                { val: t.whyUs.stat2, label: t.whyUs.stat2Label },
                { val: t.whyUs.stat3, label: t.whyUs.stat3Label }
              ].map((s, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <p className="text-4xl md:text-5xl font-black text-its-aqua mb-2">{s.val}</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-its-dark-green">{t.testimonials.title}</h2>
          </div>
          <div className="flex overflow-x-auto pb-10 gap-8 scroll-smooth no-scrollbar snap-x">
             {[
               { text: t.testimonials.t1, author: t.testimonials.t1Author, path: 'assets/images/avatars/avatar-1.jpg' },
               { text: t.testimonials.t2, author: t.testimonials.t2Author, path: 'assets/images/avatars/avatar-2.jpg' }
             ].map((tm, i) => (
               <div key={i} className="min-w-[300px] md:min-w-[450px] snap-center bg-its-aqua/10 p-10 rounded-[2.5rem] border border-its-aqua/20 relative">
                  <div className="absolute -top-6 -left-2 text-its-main-blue/20">
                    <Sparkles size={100} />
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 italic mb-8 font-medium leading-relaxed relative z-10">"{tm.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={tm.path} alt="Avatar" className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover" />
                    <div>
                      <p className="font-black text-its-dark-green">{tm.author}</p>
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                      </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-its-soft-blue/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-its-dark-green">{t.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 }
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl shadow-sm border border-its-main-blue/10 overflow-hidden">
                <summary className="list-none p-6 cursor-pointer flex justify-between items-center hover:bg-its-aqua/5 transition-colors">
                  <span className="text-lg font-black text-its-dark-green">{item.q}</span>
                  <div className="text-its-main-blue group-open:rotate-180 transition-transform">
                    <ChevronDown size={24} />
                  </div>
                </summary>
                <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed border-t border-its-aqua/10">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderNews = () => {
    if (selectedNewsId && selectedNews) {
      return (
        <section className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
          <div className="container mx-auto px-6 max-w-4xl">
            <button 
              onClick={() => setSelectedNewsId(null)}
              className="flex items-center gap-2 text-its-main-blue font-bold mb-8 hover:translate-x-[-4px] transition-transform"
            >
              <ChevronLeft size={20} />
              {t.news.back}
            </button>
            <img 
              src={selectedNews.image} 
              alt={selectedNews.title} 
              className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-12"
            />
            <div className="flex gap-2 mb-6">
              {selectedNews.tags.map(tag => (
                <span key={tag} className="bg-its-aqua/20 text-its-main-blue px-4 py-1 rounded-full text-xs font-black uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-its-dark-green mb-6 leading-tight">
              {selectedNews.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 font-bold mb-10">
              <Calendar size={18} />
              <span>{selectedNews.date}</span>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="pt-32 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-6 text-center mb-16 animate-[fadeIn_0.5s_ease-in]">
          <div className="inline-flex items-center gap-2 text-its-main-blue font-black uppercase tracking-[0.3em] mb-4">
            <div className="w-8 h-0.5 bg-its-main-blue"></div>
            {lang === 'id' ? 'Wawasan' : 'Insights'}
            <div className="w-8 h-0.5 bg-its-main-blue"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-its-dark-green mb-6">
            {t.news.headerTitle}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            {t.news.headerDesc}
          </p>
          <div className="mt-12 flex justify-center">
             <svg width="200" height="20" viewBox="0 0 200 20" className="text-its-aqua fill-current animate-pulse">
                <path d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" strokeWidth="3" />
             </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 mb-12">
          <div className="bg-its-aqua/10 backdrop-blur-md p-4 rounded-[2rem] border border-its-aqua/20 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-its-main-blue" size={20} />
              <input 
                type="text" 
                placeholder={t.news.searchPlaceholder}
                className="w-full bg-white pl-12 pr-6 py-3 rounded-2xl border border-its-aqua/30 focus:outline-none focus:ring-2 focus:ring-its-main-blue/50 font-medium text-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${!selectedTag ? 'bg-its-main-blue text-white shadow-lg' : 'bg-white text-its-main-blue border border-its-aqua/30 hover:bg-its-aqua/10'}`}
              >
                {t.news.allTags}
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${selectedTag === tag ? 'bg-its-main-blue text-white shadow-lg' : 'bg-white text-its-main-blue border border-its-aqua/30 hover:bg-its-aqua/10'}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-its-aqua/30">
              <span className="text-xs font-black text-gray-400 uppercase">{t.news.sortBy}</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-its-main-blue focus:outline-none cursor-pointer"
              >
                <option value="latest">{t.news.sortLatest}</option>
                <option value="oldest">{t.news.sortOldest}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 space-y-8 max-w-5xl">
          {filteredNews.map((news, i) => (
            <div 
              key={news.id} 
              className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-50 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 animate-[fadeIn_0.5s_ease-in]"
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => setSelectedNewsId(news.id)}
            >
              <div className="w-full md:w-72 h-48 overflow-hidden rounded-[2rem]">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">{news.date}</span>
                    <div className="flex gap-2">
                      {news.tags.map(tag => (
                        <span key={tag} className="bg-its-aqua/10 text-its-main-blue px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-its-dark-green mb-4 group-hover:text-its-main-blue transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-its-main-blue font-black text-sm cursor-pointer group/link">
                  <span>{t.news.readMore}</span>
                  <div className="w-6 h-0.5 bg-its-main-blue transition-all group-hover/link:w-10"></div>
                </div>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
               <Droplets size={48} className="mx-auto text-gray-300 mb-4" />
               <p className="text-gray-400 font-bold">No results found.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen text-gray-800 font-quicksand overflow-x-hidden selection:bg-its-aqua">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
          >
            <div className="h-10 w-10 flex items-center justify-center">
              <img src="assets/images/logo.png" alt="ITSWARA Logo" className="h-full w-auto object-contain" />
            </div>
            <span className="text-2xl font-fredoka font-bold text-its-dark-green tracking-tight uppercase">ITSWARA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedNewsId(null); }} 
              className={`font-bold transition-all ${activeTab === 'home' ? 'text-its-main-blue' : 'hover:text-its-main-blue'}`}
            >
              {t.nav.home}
            </button>
            <a href="#about" className="hover:text-its-main-blue font-bold transition-colors">{t.nav.about}</a>
            <a href="#vision" className="hover:text-its-main-blue font-bold transition-colors">{t.nav.vision}</a>
            <a href="#products" className="hover:text-its-main-blue font-bold transition-colors">{t.nav.services}</a>
            <button 
              onClick={() => { setActiveTab('news'); setSelectedNewsId(null); }} 
              className={`font-bold transition-all ${activeTab === 'news' ? 'text-its-main-blue' : 'hover:text-its-main-blue'}`}
            >
              {t.nav.news}
            </button>
            <button onClick={toggleLang} className="flex items-center gap-2 bg-its-aqua/30 px-3 py-1.5 rounded-full border border-its-main-blue/20 hover:bg-its-aqua/50 transition-all">
              <span className="text-sm font-bold uppercase">{lang}</span>
              <Globe size={16} className="text-its-main-blue" />
            </button>
            <a href="#contact" className="bg-its-main-blue text-white px-6 py-2.5 rounded-full font-bold hover:bg-its-dark-green hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              {t.nav.contact}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-sm font-bold uppercase p-2 border border-its-main-blue/20 rounded-lg">{lang}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden pt-24 px-8 space-y-6 flex flex-col items-center">
          <button onClick={() => { setIsMenuOpen(false); setActiveTab('home'); }} className="text-2xl font-bold">{t.nav.home}</button>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">{t.nav.about}</a>
          <button onClick={() => { setIsMenuOpen(false); setActiveTab('news'); }} className="text-2xl font-bold">{t.nav.news}</button>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-its-main-blue text-white py-4 rounded-xl font-bold text-xl">{t.nav.contact}</a>
        </div>
      )}

      {activeTab === 'home' ? renderHome() : renderNews()}

      <section id="contact" className="py-32 bg-its-main-blue relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-its-green/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight">
            {t.contactCTA.headline}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-its-main-blue px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              {t.contactCTA.cta1}
            </button>
            <button className="bg-its-dark-green text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              {t.contactCTA.cta2}
            </button>
          </div>
        </div>
      </section>

      <footer className="relative bg-its-dark-green text-white pt-32 pb-12">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none translate-y-[-99.5%] pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24 fill-current text-its-dark-green">
            <path d="M0,120 C240,0 480,120 720,60 C960,0 1200,120 1440,60 V120 H0 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="grid md:grid-cols-4 gap-12 items-start justify-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                  <img src="assets/images/logo.png" alt="ITSWARA Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-4xl font-fredoka font-bold tracking-tight uppercase">ITS WARA</span>
              </div>
              <p className="text-white/70 text-lg leading-relaxed max-w-xs">{t.footer.desc}</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-black mb-6 uppercase tracking-widest">{t.footer.navTitle}</h4>
              <ul className="space-y-4 text-white/60 font-medium text-lg">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-its-aqua transition-colors">Tentang Kami</button></li>
                <li><button onClick={() => setActiveTab('news')} className="hover:text-its-aqua transition-colors">Berita</button></li>
                <li><a href="#contact" className="hover:text-its-aqua transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-black mb-6 uppercase tracking-widest">{t.footer.contactTitle}</h4>
              <ul className="space-y-4 text-white/60 font-medium text-lg">
                <li>info@itswara.co.id</li>
                <li>+62 (21) 555-0123</li>
                <li className="max-w-[200px] leading-relaxed">{t.footer.address}</li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-black mb-6 uppercase tracking-widest">{t.footer.socialTitle}</h4>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-its-green hover:scale-110 transition-all">
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 text-center text-white/40 font-bold uppercase tracking-widest text-sm">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
