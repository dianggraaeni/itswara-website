import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ChevronLeft,
  Star,
  Download,
  ExternalLink,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  TrendingUp,
  Activity,
  AlertCircle,
  BookOpen,
  Check,
  PieChart,
  Map as MapIcon
} from 'lucide-react';

// --- Types & Data ---

type ProductTab = 'home' | 'news' | 'about' | 'products' | 'iwa-app' | 'iwa-bot' | 'contact' | 'iwa-analytics' | 'iwa-store' | 'iwa-bot-detail';

interface RiverData {
  id: string;
  name: string;
  location: string;
  fullAddress: string;
  coordinates: string;
  lastMeasured: string;
  ph: number;
  temp: number;
  turbidity: number;
  status: 'Layak' | 'Cukup Layak' | 'Tidak Layak';
}

const riverList: RiverData[] = [
  { id: 'SM-001', name: 'Sungai Mulyorejo', location: 'Mulyorejo, Surabaya', fullAddress: 'Jl. Mulyorejo No. 45, Kec. Mulyorejo, Kota Surabaya', coordinates: '-7.265, 112.793', lastMeasured: '21 Mei 2024, 10:00', ph: 7.2, temp: 28.5, turbidity: 12, status: 'Layak' },
  { id: 'SC-002', name: 'Sungai Ciliwung', location: 'Manggarai, Jakarta', fullAddress: 'Pintu Air Manggarai, Jakarta Selatan', coordinates: '-6.209, 106.840', lastMeasured: '21 Mei 2024, 09:45', ph: 6.5, temp: 30.2, turbidity: 45, status: 'Tidak Layak' },
  { id: 'SB-003', name: 'Sungai Brantas', location: 'Kediri, Jawa Timur', fullAddress: 'Jembatan Brawijaya, Kota Kediri', coordinates: '-7.816, 112.011', lastMeasured: '21 Mei 2024, 08:30', ph: 7.8, temp: 27.8, turbidity: 22, status: 'Cukup Layak' },
  { id: 'SK-004', name: 'Sungai Kapuas', location: 'Pontianak, Kalimantan', fullAddress: 'Aliran Tengah, Pontianak Kota', coordinates: '-0.024, 109.344', lastMeasured: '21 Mei 2024, 07:15', ph: 6.9, temp: 29.1, turbidity: 18, status: 'Layak' },
  { id: 'SM-005', name: 'Sungai Mahakam', location: 'Samarinda, Kalimantan', fullAddress: 'Tepian Mahakam, Samarinda', coordinates: '-0.502, 117.153', lastMeasured: '21 Mei 2024, 06:50', ph: 7.1, temp: 28.9, turbidity: 25, status: 'Cukup Layak' },
];

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'ITSWARA Luncurkan IWABOT untuk Monitoring Sampah Berbasis IoT',
    excerpt: 'ITSWARA memperkenalkan IWABOT sebagai solusi pemantauan volume sampah secara real-time untuk mendukung pengelolaan lingkungan yang lebih efisien.',
    content: 'IWABOT adalah inovasi terbaru kami yang menggabungkan sensor IoT dengan kecerdasan buatan untuk mendeteksi kapasitas tempat sampah secara akurat. Dengan teknologi ini, petugas kebersihan dapat mengoptimalkan rute pengangkutan sampah, mengurangi konsumsi bahan bakar, dan mencegah sampah meluap. Implementasi awal di kawasan perkotaan menunjukkan peningkatan efisiensi pengumpulan hingga 40%.',
    date: '2024-03-15',
    tags: ['Product Update', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'IWAAPP Digunakan oleh Komunitas Lingkungan di 5 Kota Besar',
    excerpt: 'Melalui IWAAPP, masyarakat dapat berpartisipasi aktif dalam pelaporan dan edukasi pengelolaan sampah berbasis digital.',
    content: 'Aplikasi mobile IWAAPP kini telah mencapai 50.000 pengguna aktif di Jakarta, Bandung, Surabaya, Medan, dan Makassar. Aplikasi ini memfasilitasi pelaporan tumpukan sampah ilegal dan menyediakan modul edukasi interaktif tentang pemilahan sampah di rumah. Keberhasilan ini membuktikan bahwa partisipasi digital adalah kunci perubahan perilaku masyarakat terhadap lingkungan.',
    date: '2024-02-28',
    tags: ['Community', 'Product Update'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'IWAANALYTICS Dukung Pengambilan Keputusan Berbasis Data Lingkungan',
    excerpt: 'Platform analitik ITSWARA membantu mitra memahami pola sampah dan kualitas air secara menyeluruh melalui dashboard interaktif.',
    content: 'IWAANALYTICS menyediakan visualisasi data yang mendalam bagi pemerintah daerah and mitra industri. Dengan memantau tren kualitas air sungai dan akumulasi sampah harian, pemangku kepentingan dapat merancang kebijakan yang lebih tepat sasaran. Dashboard kami kini mencakup lebih dari 500 titik sensor di seluruh Indonesia.',
    date: '2024-02-10',
    tags: ['Research', 'Environmental Insight'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Kolaborasi ITSWARA dan KLHK dalam Program Lestari Sungai',
    excerpt: 'Kemitraan strategis ini bertujuan untuk mengembalikan kejernihan air sungai melalui teknologi penyaringan modular.',
    content: 'Kami bangga bermitra dengan Kementerian Lingkungan Hidup dan Kehutanan (KLHK) untuk mengimplementasikan filter air modular di daerah aliran sungai kritis. Proyek percontohan di Sungai Citarum menunjukkan penurunan tingkat polutan makro hingga 25% dalam tiga bulan pertama penggunaan.',
    date: '2024-01-20',
    tags: ['Partnership', 'Environmental Insight'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop'
  }
];

const getAvatarProps = (name: string) => {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['bg-its-main-blue', 'bg-its-green', 'bg-its-dark-green', 'bg-its-soft-blue', 'bg-its-aqua'];
  const bgColor = colors[name.length % colors.length];
  return { initial, bgColor };
};

// --- Sub-component for Product Cards ---
const ProductCard: React.FC<{
  icon: React.ReactNode, title: string, desc: string, tag: string, cta: string, isMain?: boolean, onClick: () => void 
}> = ({ icon, title, desc, tag, cta, isMain, onClick }) => {
  const cardClasses = isMain 
    ? "bg-gradient-to-br from-its-main-blue to-its-dark-green text-white border-4 border-white shadow-2xl" 
    : "bg-white text-its-dark-green border border-gray-100 shadow-lg";

  return (
    <div className="flex flex-col group h-full">
      <div onClick={onClick} className={`flex-1 p-10 rounded-[3rem] flex flex-col justify-between transform transition-all duration-500 hover:scale-[1.05] cursor-pointer ${cardClasses}`}>
        <div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl transition-all ${isMain ? 'bg-white text-its-main-blue group-hover:rotate-6' : 'bg-its-aqua/20 text-its-main-blue group-hover:bg-its-aqua'}`}>{icon}</div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest border ${isMain ? 'bg-white/20 text-white border-white/20' : 'bg-its-aqua/10 text-its-main-blue border-its-aqua/20'}`}>{tag}</span>
          <h3 className="text-2xl font-black mb-4">{title}</h3>
          <p className={`text-sm font-medium mb-8 leading-relaxed ${isMain ? 'text-white/80' : 'text-gray-500'}`}>{desc}</p>
        </div>
        <div className={`pt-8 border-t ${isMain ? 'border-white/10' : 'border-gray-100'}`}>
           <button className={`flex items-center gap-2 text-sm font-black transition-all ${isMain ? 'bg-white text-its-dark-green py-4 rounded-xl w-full justify-center hover:bg-its-aqua' : 'text-its-main-blue hover:gap-3'}`}>{cta}</button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // --- States ---
  const [lang, setLang] = useState<Language>('id');
  const [activeTab, setActiveTab] = useState<ProductTab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMascotDetailOpen, setIsMascotDetailOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [downloadState, setDownloadState] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [selectedRiver, setSelectedRiver] = useState<RiverData | null>(null);
  const [botView, setBotView] = useState<'map' | 'search'>('map');
  const [analyticsView, setAnalyticsView] = useState<'volume' | 'hotspots' | 'types'>('volume');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulasi loading selama 2 detik
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  const productsRef = useRef<HTMLElement>(null);
  const t = translations[lang];


  // --- Static Data inside Component ---
  const logos = [
    { name: "DLH", icon: <Building2 />, type: "Government" },
    { name: "ITB", icon: <GraduationCap />, type: "University" },
    { name: "WWF", icon: <Leaf />, type: "Environment" },
    { name: "KLHK", icon: <ShieldCheck />, type: "Institutional" },
    { name: "UGM", icon: <GraduationCap />, type: "University" },
    { name: "WALHI", icon: <Waves />, type: "Environment" },
  ];

  const testimonialList = [
    { text: lang === 'id' ? "IWABOT sangat membantu operasional pengangkutan sampah di perumahan kami, beneran efisien!" : "IWABOT really helps waste collection operations in our housing complex, truly efficient!", author: "Ahmad Fauzi", role: lang === 'id' ? "Ketua RW Digital" : "Digital Neighborhood Head" },
    { text: lang === 'id' ? "Lewat IWAAPP, anak-anak muda di sini jadi lebih melek soal pemilahan sampah organik dan anorganik." : "Through IWAAPP, the youth here are becoming more aware of organic and inorganic waste sorting.", author: "Maya Indah", role: lang === 'id' ? "Aktivis Millennial" : "Millennial Activist" },
    { text: lang === 'id' ? "Dashboard analitiknya sangat presisi untuk memonitor kualitas air sungai secara real-time." : "The analytical dashboard is very precise for monitoring river water quality in real-time.", author: "Handoko", role: lang === 'id' ? "Praktisi Lingkungan" : "Environmental Practitioner" },
    { text: lang === 'id' ? "Produk daur ulangnya punya kualitas premium, saya kaget banget waktu pertama kali beli di IWASTORE." : "The recycled products have premium quality, I was really surprised when I first bought from IWASTORE.", author: "Lestari", role: lang === 'id' ? "Eco-Shopper" : "Eco-Shopper" },
    { text: lang === 'id' ? "Respon tim Itswara sangat cepat dan solusi yang ditawarkan beneran konkret untuk masalah banjir lokal." : "The Itswara team's response is very fast and the solutions offered are truly concrete for local flood issues.", author: "Rizky", role: lang === 'id' ? "Warga Terdampak" : "Affected Resident" },
    { text: lang === 'id' ? "Misi lingkungannya beneran kerasa, bukan cuma sekedar branding atau strategi marketing semata." : "The environmental mission is truly felt, not just branding or marketing strategy.", author: "Farah", role: lang === 'id' ? "Relawan Hijau" : "Green Volunteer" },
    { text: lang === 'id' ? "Teknologi IoT yang digunakan stabil banget, sangat mempermudah kerja dinas kebersihan kota." : "The IoT technology used is very stable, greatly facilitating the work of the city sanitation department.", author: "Doni Pratama", role: lang === 'id' ? "Staf Ahli DLH" : "DLH Expert Staff" },
    { text: lang === 'id' ? "Kolaborasi yang sangat menginspirasi bagi penggiat lingkungan lokal seperti kami di daerah." : "A very inspiring collaboration for local environmental activists like us in the regions.", author: "Ratna", role: lang === 'id' ? "Pegiat Bank Sampah" : "Waste Bank Activist" },
    { text: lang === 'id' ? "Integrasi antara hardware IWABOT dan aplikasi cloud-nya sangat seamless, top banget pokoknya!" : "The integration between IWABOT hardware and its cloud app is very seamless, simply top notch!", author: "Bagus Setiawan", role: lang === 'id' ? "DevOps Engineer" : "DevOps Engineer" },
    { text: lang === 'id' ? "Kami melihat penurunan signifikan dalam waktu respon tumpukan sampah liar." : "We observed a significant decrease in response time for illegal waste piles.", author: "Susi", role: lang === 'id' ? "Kepala Kebersihan" : "Sanitation Lead" },
    { text: lang === 'id' ? "Sangat membantu dalam memetakan area rawan limbah di pesisir pantai." : "Very helpful in mapping waste-prone areas on the coastline.", author: "Bambang", role: lang === 'id' ? "Peneliti Kelautan" : "Marine Researcher" },
    { text: lang === 'id' ? "Anak-anak sekolah sangat antusias menggunakan IWAAPP untuk belajar ekosistem." : "School children are very enthusiastic about using IWAAPP to learn about ecosystems.", author: "Dewi", role: lang === 'id' ? "Guru Biologi" : "Biology Teacher" },
  ];
  
  // Effect 1: Mengatur scroll background (Kunci scroll saat modal buka)
  useEffect(() => {
    if (isMascotDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMascotDetailOpen]);

  // Effect 2: Mengatur perubahan navbar saat di-scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tambahkan ini di bagian atas komponen App (setelah state-state lainnya)
useEffect(() => {
  window.scrollTo(0, 0);
}, [activeTab]); // Setiap activeTab berubah, layar otomatis ke paling atas

  // --- Functions ---
  const navigateTo = (tab: ProductTab) => {
  setActiveTab(tab);
  // Gunakan 'instant' atau langsung window.scrollTo(0,0) tanpa smooth
  // agar tidak ada efek meluncur yang tertinggal dari halaman sebelumnya
  window.scrollTo({ top: 0, behavior: 'auto' }); 
  setIsMenuOpen(false);
};

  const navigateToEcosystem = () => {
    setActiveTab('home');
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const handleDownload = () => {
    setDownloadState('processing');
    setTimeout(() => {
      setDownloadState('complete');
      setTimeout(() => setDownloadState('idle'), 6000);
    }, 2500);
  };

  // --- Memos for Filtering ---
  const filteredRivers = useMemo(() => {
    return riverList.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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

  // --- Render Helpers ---
  const renderBackBtn = () => {
    let onClickAction = navigateToEcosystem;
    if (activeTab === 'iwa-bot-detail') {
      onClickAction = () => { setBotView('map'); setSelectedRiver(null); setActiveTab('iwa-bot'); };
    }
    return (
      <button 
        onClick={onClickAction} 
        className="flex items-center gap-2 text-its-main-blue font-black mb-8 hover:translate-x-[-4px] transition-transform group"
      >
        <ChevronLeft size={20} className="group-hover:text-its-dark-green" /> 
        <span className="group-hover:text-its-dark-green">{t.products.backLabel}</span>
      </button>
    );
  };

  const renderCrossSell = () => (
    <div className="mt-24 pt-16 border-t border-gray-100 flex flex-col items-center">
      <h3 className="text-2xl font-black text-its-dark-green mb-10 text-center">{t.products.crossSellTitle}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl justify-items-center">
        {[
          { id: 'iwa-app', icon: <Smartphone />, name: t.products.p2Name },
          { id: 'iwa-bot', icon: <Bot />, name: t.products.p1Name },
          { id: 'iwa-analytics', icon: <BarChart3 />, name: t.products.p3Name },
          { id: 'iwa-store', icon: <ShoppingBag />, name: t.products.p4Name }
        ].map(feature => (
          <button 
            key={feature.id} 
            onClick={() => navigateTo(feature.id as any)}
            className={`flex flex-col items-center gap-4 p-8 border rounded-[2.5rem] transition-all transform hover:-translate-y-2 shadow-sm hover:shadow-xl w-full text-center ${activeTab === feature.id ? 'bg-its-main-blue text-white border-transparent' : 'bg-white text-its-dark-green border-gray-100 hover:bg-its-aqua/10 hover:border-its-main-blue'}`}
          >
            <div className={activeTab === feature.id ? 'text-white' : 'text-its-main-blue'}>{feature.icon}</div>
            <span className="font-black text-sm">{feature.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAppGallery = () => {
  // Membuat array 20 gambar dari folder lokal: ./assets/app-gallery/screen-1.png dst.
  const galleryImages = Array.from({ length: 20 }, (_, i) => `./assets/app-gallery/screen-${i + 1}.png`);

  return (
    <div className="mt-24">
      {/* Judul Gallery */}
      <h3 className="text-3xl font-black text-its-dark-green mb-10 px-4 text-center md:text-left">
        {t.products.galleryTitle}
      </h3>

      {/* Wrapper dengan efek Masking Fade */}
      <div className="mask-fade-horizontal">
        <div className="flex overflow-x-auto gap-6 pb-12 px-[10%] no-scrollbar scroll-smooth">
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-64 h-[500px] bg-white rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[8px] border-white transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
            >
              <img 
                src={src} 
                alt={`App Preview ${i + 1}`} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  // Fallback jika file lokal belum ada atau salah nama
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&text=Local+Image+Missing`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderHome = () => (
    <>
      {/* --- Style Keyframes Mirror --- */}
      <style>{`
        @keyframes float-leaf-left {
          /* Daun Kiri: Miring ke Kanan (Positif) */
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1.5); }
          50% { transform: translateY(-45px) rotate(15deg) scale(1.65); }
        }
        @keyframes float-leaf-right {
          /* Daun Kanan: Miring ke Kiri (Negatif - Mirror) */
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1.5); }
          50% { transform: translateY(-45px) rotate(-15deg) scale(1.65); }
        }
        @keyframes surf-mascot {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes wave-effect {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes gentle-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        @keyframes gentle-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-faq-mascot {
        0%, 100% { transform: translateY(0) rotate(2deg); }
        50% { transform: translateY(-20px) rotate(-2deg); }
      }
        @keyframes playful-jump {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.03) rotate(2deg); }
        70% { transform: translateY(5px) scale(0.98) rotate(-1deg); }
      }

      @keyframes mascot-breathing {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      `}</style>

      {/* Hero Section Utama */}
      <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden">
        
        {/* 1. Latar Belakang */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="./assets/images/hero-bg.png" 
            alt="Background" 
            className="w-full h-full object-cover object-center"
            onError={(e) => {(e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2070&auto=format&fit=crop"}}
          />
        </div>

        {/* 2. Elemen Daun (MIRROR ANIMATION) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Leaf 1 (Kiri Atas) - Rotate Positif */}
          <img 
            src="./assets/images/leaf-1.png" 
            className="absolute top-[8%] left-[5%] w-44 md:w-60 opacity-80" 
            style={{animation: 'float-leaf-left 6s ease-in-out infinite'}} 
            alt="" 
          />

          {/* Leaf 2 (Kanan Atas) - Rotate Negatif (Mirror) */}
          <img 
            src="./assets/images/leaf-2.png" 
            className="absolute top-[6%] right-[8%] w-48 md:w-64 opacity-70" 
            style={{animation: 'float-leaf-right 6s ease-in-out infinite'}} 
            alt="" 
          />

          {/* Leaf Tambahan (Kanan Bawah) - Ikut Mirror Kanan */}
          <img 
            src="./assets/images/leaf-1.png" 
            className="absolute bottom-[35%] right-[6%] w-32 md:w-48 opacity-60" 
            style={{animation: 'float-leaf-right 6s ease-in-out infinite'}} 
            alt="" 
          />
        </div>

        {/* 3. Konten Teks & Button (Z-50) */}
        {/* 3. Konten Teks & Button (Z-50) */}
        <div className="container mx-auto px-6 relative z-50 text-center pt-20 md:pt-28">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Headline - Mengambil dari translations */}
            <h1 className="text-4xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] whitespace-pre-line">
              {t.hero.headline}
            </h1>

            {/* Subheadline - Mengambil dari translations */}
            <p className="text-xl md:text-2xl font-medium text-white/95 max-w-3xl mx-auto drop-shadow-lg">
              {t.hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {/* Tombol 1 - Sekarang Kontak Kami (Kiri) */}
            <button 
              onClick={() => navigateTo('contact')} 
              className="bg-white text-its-main-blue px-10 py-4 rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-its-aqua hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              {t.nav.contact} <ArrowRight size={20} />
            </button>

            {/* Tombol 2 - Sekarang Jelajahi/Kenali Itswara (Kanan) */}
            <button 
              onClick={navigateToEcosystem} 
              className="bg-white/10 backdrop-blur-xl text-white border-2 border-white px-10 py-4 rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-its-main-blue transition-all shadow-xl cursor-pointer"
            >
              {t.hero.cta1} <ArrowRight size={20} />
            </button>
          </div>
          </div>
          </div>

          

        {/* 4. ASET TENGAH */}
        <div 
          className="relative z-30 mt-[-30px] md:mt-[-60px] w-[75%] md:w-[60%] max-w-[950px] pointer-events-none"
          style={{animation: 'gentle-y 4.5s ease-in-out infinite'}}
        >
          <img 
            src="./assets/images/aset-tengah.png" 
            alt="Aset Tengah" 
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]" 
          />
        </div>

        {/* 5. AREA MASKOT (Z-40) */}
        <div className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none z-40">
          
          {/* Maskot Kiri - Pastikan pointer-events-auto ada di sini agar bisa diklik */}
          <div 
            className="absolute bottom-[8%] md:bottom-[12%] left-[-45px] md:left-[0%] w-[48%] max-w-[580px] cursor-pointer pointer-events-auto"
            style={{animation: 'gentle-x 5.5s ease-in-out infinite'}}
            onClick={() => setIsMascotDetailOpen(true)} 
          >
            <img src="./assets/images/maskot-kiri.png" alt="Maskot Kiri" className="w-full h-auto drop-shadow-2xl" />
          </div>

          {/* Maskot Kanan (Berselancar) - Tetap none agar tidak menghalangi klik lain */}
          <div 
            className="absolute bottom-[10%] md:bottom-[15%] right-[-10px] md:right-[5%] w-[35%] max-w-[450px]"
            style={{animation: 'surf-mascot 3.2s ease-in-out infinite'}}
          >
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-56 h-14 bg-white/40 rounded-[100%] blur-2xl" style={{animation: 'wave-effect 1.8s ease-out infinite'}}></div>
            <img src="./assets/images/maskot-kanan.png" alt="Maskot Kanan" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Trust Section (Didukung & Dipercaya) */}
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
      </section>

      {/* About Section (Dengan Detail Before/After) */}
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
                <img 
                  src="./assets/images/about-waste-management.jpg"
                  alt="Waste Management" 
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Vision, Mission & Mascot Philosophy Section */}
<section id="vision" className="py-24 bg-white relative overflow-hidden">
  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-black text-its-dark-green mb-4">{t.visionMission.title}</h2>
      <div className="w-24 h-2 bg-its-main-blue mx-auto rounded-full"></div>
    </div>

    <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
      
      {/* --- KOLOM KIRI: MASKOT AREA (LOMPAT & BUBBLE BIRU) --- */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
        
        {/* COMIC BUBBLE (BIRU) */}
        <div className="relative mb-8 animate-bounce">
          {/* Outline Shadow Komik */}
          <div className="absolute inset-0 bg-its-dark-green rounded-[2rem] translate-x-1 translate-y-1"></div>
          
          <div className="relative bg-its-main-blue text-white px-8 py-4 rounded-[2rem] border-[3px] border-its-dark-green z-10 shadow-xl">
            <p className="...">
            {lang === 'id' ? 'Ahoy! Namaku ITSWARA! 🏴‍☠️🌊' : 'Ahoy! My name is ITSWARA! 🏴‍☠️🌊'}
          </p>
          </div>
          
          {/* Ekor Bubble */}
          <div className="absolute -bottom-4 left-6 w-8 h-8">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-its-main-blue stroke-its-dark-green stroke-[12px]">
              <path d="M 0 0 L 50 100 L 100 0 Z" />
            </svg>
          </div>
        </div>

        {/* MASKOT (LOMPAT & INTERAKTIF) */}
        <div 
          className="relative mb-10 cursor-pointer group"
          onClick={() => setIsMascotDetailOpen(true)}
        >
          {/* Glow Efek Dinamis */}
          <div className="absolute inset-0 bg-its-main-blue/10 rounded-full blur-[60px] animate-pulse -z-10"></div>
          
          <img 
            src="./assets/images/maskot-kiri.png" 
            alt="ITSWARA Mascot" 
            className="w-full max-w-[320px] h-auto drop-shadow-2xl transition-transform"
            style={{ 
              animation: 'playful-jump 4s ease-in-out infinite' 
            }}
          />
        </div>

        {/* BUTTON FILOSOFI (UPGRADED) */}
        <button 
          onClick={() => setIsMascotDetailOpen(true)}
          className="group relative bg-gradient-to-r from-its-dark-green to-its-main-blue text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
        >
          {/* Efek Kilatan (Shine) */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></div>
          
          <span className="...">
          {lang === 'id' ? 'Klik Untuk Filosofi' : 'Click for Philosophy'} <Sparkles size={18} />
        </span>
        </button>
      </div>

      {/* --- KOLOM KANAN: VISI MISI CARDS --- */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-l-[12px] border-its-main-blue hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-14 h-14 bg-its-main-blue/10 rounded-2xl flex items-center justify-center text-its-main-blue"><Globe size={28} /></div>
            <h3 className="text-2xl font-black text-its-dark-green">{t.visionMission.visionTitle}</h3>
          </div>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">{t.visionMission.visionContent}</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-l-[12px] border-its-green hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-14 h-14 bg-its-green/10 rounded-2xl flex items-center justify-center text-its-green"><Zap size={28} /></div>
            <h3 className="text-2xl font-black text-its-dark-green">{t.visionMission.missionTitle}</h3>
          </div>
          <ul className="space-y-4">
            {[t.visionMission.m1, t.visionMission.m2, t.visionMission.m3].map((m, i) => (
              <li key={i} className="flex gap-4 text-gray-600 text-lg font-medium italic items-start">
                <CheckCircle2 className="text-its-green flex-shrink-0 mt-1" size={24} />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </div>

        {/* --- MODAL DETAIL FILOSOFI MASKOT --- */}
        {isMascotDetailOpen && (
          <div 
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-its-dark-green/60 backdrop-blur-md"
            onClick={() => {
              setIsMascotDetailOpen(false); // Klik di luar area card juga menutup modal
            }}
          >
            {/* Kontainer Card (StopPropagation agar klik di dalam card tidak ikut menutup) */}
            <div 
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative border-8 border-its-aqua/20 animate-[fadeIn_0.3s_ease-out]"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Tombol Close (Silang) */}
              <button 
                onClick={() => setIsMascotDetailOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 bg-gray-100 hover:bg-red-500 text-gray-500 hover:text-white rounded-full flex items-center justify-center transition-all z-[1000] cursor-pointer pointer-events-auto"
              >
                <X size={28} strokeWidth={3} />
              </button>
                    
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-5xl font-black text-its-dark-green tracking-tighter uppercase">FILOSOFI MASKOT</h2>
                  <div className="w-24 h-2 bg-its-green mx-auto mt-2 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Visual Maskot dalam Card */}
                  <div className="sticky top-0 bg-its-aqua/10 rounded-[2.5rem] p-8 flex flex-col items-center">
                    <img src="./assets/images/maskot-kiri.png" alt="Mascot Detail" className="w-full h-auto drop-shadow-2xl animate-v-scroll-slow" />
                    <div className="mt-6 bg-its-dark-green text-white px-6 py-4 rounded-2xl w-full text-center">
                       <p className="font-fredoka text-xl font-bold italic">“Ahoy! Namaku ITSWARA!” 🏴‍☠️🌊</p>
                    </div>
                  </div>

                  {/* Deskripsi Filosofi */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="inline-block bg-its-green text-its-dark-green px-4 py-1 rounded-lg font-black text-sm">DESAIN & TEKNOLOGI</h4>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        Maskot ITSWARA berbentuk robot humanoid yang merepresentasikan pemanfaatan teknologi cerdas <b>(AI, IoT, dan robotika)</b> sebagai mitra manusia dalam menjaga kelestarian sungai. Dominasi warna biru melambangkan air, kebersihan, dan kepercayaan, sementara aksen hijau mencerminkan keberlanjutan serta ekonomi sirkular.
                      </p>
                    </div>

                    <div className="grid gap-4">
                       <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 overflow-hidden p-2 border border-gray-50">
                            <img 
                              src="./assets/images/logo-itswara.png" 
                              alt="Logo Itswara" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          <p className="font-black text-its-dark-green text-sm uppercase mb-2">
                            LOGO <span className="text-its-main-blue">ITS</span><span className="text-its-green">WARA</span>
                          </p>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Representasi visual dari tetesan air dan daun yang menyatu, melambangkan komitmen kami dalam menjaga kemurnian air dan kelestarian alam secara berdampingan.
                          </p>
                       </div>
                       <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-sm text-its-green"><Trash2 size={20}/></div>
                          <div><p className="font-black text-its-dark-green text-sm uppercase">Ikon Daur Ulang</p><p className="text-xs text-gray-500">Melambangkan sampah memiliki nilai (Circular Economy) selaras dengan IWA-STORE.</p></div>
                       </div>
                       <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-sm text-its-main-blue"><Smartphone size={20}/></div>
                          <div><p className="font-black text-its-dark-green text-sm uppercase">Digital Hub</p><p className="text-xs text-gray-500">Smartphone mewakili IWA-APP sebagai sarana partisipasi aktif masyarakat.</p></div>
                       </div>
                    </div>

                    <div className="bg-its-dark-green p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12"><Waves size={100}/></div>
                      <h4 className="text-xl font-black mb-4 flex items-center gap-2">SPIRIT BAJAK LAUT ⚓</h4>
                      <p className="text-sm text-white/80 leading-relaxed italic mb-4">
                        "ITSWARA terinspirasi dari bajak laut modern—bukan pemburu emas, melainkan pemburu sampah sebagai harta karun masa depan."
                      </p>
                      <p className="text-sm text-white/80 leading-relaxed">
                        Di tengah sungai yang tercemar, ITSWARA hadir dengan keberanian untuk melawan arus, menjadikan sampah bukan sebagai akhir, tetapi awal perubahan. Setiap sampah menyimpan nilai, harapan, dan peluang. 🌱⚓✨
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section id="products" className="py-32 bg-its-aqua/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black text-its-dark-green mb-4">{t.products.title}</h2>
             <p className="text-xl text-its-main-blue font-bold uppercase">{t.products.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
             <ProductCard icon={<Smartphone />} title={t.products.p2Name} desc={t.products.p2Desc} tag={t.products.p2Tag} cta={t.products.p2CTA} onClick={() => navigateTo('iwa-app')} isMain />
             <ProductCard icon={<Bot />} title={t.products.p1Name} desc={t.products.p1Desc} tag={t.products.p1Tag} cta={t.products.p1CTA} onClick={() => navigateTo('iwa-bot')} />
             <ProductCard icon={<BarChart3 />} title={t.products.p3Name} desc={t.products.p3Desc} tag={t.products.p3Tag} cta={t.products.p3CTA} onClick={() => navigateTo('iwa-analytics')} />
             <ProductCard icon={<ShoppingBag />} title={t.products.p4Name} desc={t.products.p4Desc} tag={t.products.p4Tag} cta={t.products.p4CTA} onClick={() => navigateTo('iwa-store')} />
          </div>
        </div>
      </section>

      {/* Why Us (Stats) Section */}
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

      {/* Testimonials Wall of Love */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-its-dark-green mb-6">
              {t.testimonials.title}
            </h2>
            <p className="text-its-main-blue font-bold text-lg max-w-2xl mx-auto">{t.testimonials.description}</p>
          </div>

          <div className="h-[700px] overflow-hidden relative mask-v-gradient">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
              {/* Column 1 */}
              <div className="flex flex-col gap-8 animate-v-scroll pause-on-hover">
                {[...testimonialList.slice(0, 4), ...testimonialList.slice(0, 4)].map((tm, i) => {
                  const { initial, bgColor } = getAvatarProps(tm.author);
                  return (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="flex text-its-main-blue mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-xl text-gray-700 italic font-medium leading-relaxed mb-8">"{tm.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl ${bgColor}`}>{initial}</div>
                        <div>
                          <p className="font-black text-its-dark-green text-lg">{tm.author}</p>
                          <p className="text-sm font-bold text-gray-400">{tm.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="hidden md:flex flex-col gap-8 animate-v-scroll-fast pause-on-hover mt-[-150px]">
                {[...testimonialList.slice(4, 8), ...testimonialList.slice(4, 8)].map((tm, i) => {
                  const { initial, bgColor } = getAvatarProps(tm.author);
                  return (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="flex text-its-main-blue mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-xl text-gray-700 italic font-medium leading-relaxed mb-8">"{tm.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl ${bgColor}`}>{initial}</div>
                        <div>
                          <p className="font-black text-its-dark-green text-lg">{tm.author}</p>
                          <p className="text-sm font-bold text-gray-400">{tm.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 3 */}
              <div className="hidden lg:flex flex-col gap-8 animate-v-scroll-slow pause-on-hover mt-[-50px]">
                {[...testimonialList.slice(8, 12), ...testimonialList.slice(8, 12)].map((tm, i) => {
                  const { initial, bgColor } = getAvatarProps(tm.author);
                  return (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="flex text-its-main-blue mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-xl text-gray-700 italic font-medium leading-relaxed mb-8">"{tm.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl ${bgColor}`}>{initial}</div>
                        <div>
                          <p className="font-black text-its-dark-green text-lg">{tm.author}</p>
                          <p className="text-sm font-bold text-gray-400">{tm.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="py-24 bg-its-soft-blue/10 overflow-hidden">
  <div className="container mx-auto px-6 max-w-6xl">
    
    {/* --- JUDUL RATA TENGAH --- */}
    <div className="text-center mb-24">
      <h2 className="text-4xl md:text-5xl font-black text-its-dark-green mb-4">
        {t.faq.title}
      </h2>
      <div className="w-24 h-2 bg-its-main-blue mx-auto rounded-full"></div>
    </div>

    <div className="grid lg:grid-cols-12 gap-12 items-start">
      
      {/* --- KOLOM FAQ (7/12) --- */}
      <div className="lg:col-span-7 space-y-4">
        {[
          { q: t.faq.q1, a: t.faq.a1 },
          { q: t.faq.q2, a: t.faq.a2 },
          { q: t.faq.q3, a: t.faq.a3 },
          { q: t.faq.q4, a: t.faq.a4 }
        ].map((item, i) => (
          <details key={i} className="group bg-white rounded-[2rem] shadow-sm border-2 border-transparent open:border-its-main-blue transition-all duration-300 overflow-hidden">
            <summary className="list-none p-6 cursor-pointer flex justify-between items-center hover:bg-its-aqua/5">
              <span className="text-lg font-black text-its-dark-green">{item.q}</span>
              <div className="text-its-main-blue group-open:rotate-180 transition-transform">
                <ChevronDown size={24} strokeWidth={3} />
              </div>
            </summary>
            <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed border-t border-gray-50">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      {/* --- KOLOM MASKOT (5/12) - DIPERBESAR & TENGAH --- */}
      <div className="lg:col-span-5 flex flex-col items-center relative">
        
        {/* COMIC SPEECH BUBBLE */}
        <div className="relative z-20 animate-bounce mb-4">
          {/* Garis Bayangan (Outline Blue) */}
          <div className="absolute inset-0 bg-its-main-blue rounded-[50%] translate-x-1.5 translate-y-1.5"></div>
          
          <div className="relative bg-white border-[4px] border-its-main-blue rounded-[50%] px-10 py-12 min-w-[340px] shadow-2xl">
            <p className="font-black text-its-dark-green text-center text-sm md:text-base leading-tight uppercase tracking-tight">
              Ingin tahu lebih banyak?<br/>Berikut pertanyaan yang<br/>paling sering diajukan! 🌊✨
            </p>
          </div>

          {/* Ekor Bubble (Dibuat pas di tengah bawah gelembung) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white stroke-its-main-blue stroke-[8px]">
              <path d="M 20 0 L 50 100 L 80 0 Z" />
            </svg>
          </div>
        </div>

        {/* MASKOT (Ukuran Extra & Posisi Center-Up) */}
        <div className="relative -mt-20 z-10 w-full flex justify-center">
           <img 
            src="./assets/images/maskot-faq.png" 
            alt="Mascot FAQ" 
            className="w-full max-w-[500px] h-auto drop-shadow-2xl scale-125 md:scale-[1.4] origin-top"
            style={{ 
              animation: 'float-faq-mascot 4s ease-in-out infinite',
            }}
          />
        </div>

      </div>

    </div>
  </div>
</section>
    </>
  );

  const renderIWAAPP = () => (
    <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
      <section className="container mx-auto px-6">
        {renderBackBtn()}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-its-dark-green leading-tight">{t.products.p2Name} — {lang === 'id' ? 'Pusat Solusi Terintegrasi' : 'Integrated Solution Hub'}</h1>
            <p className="text-xl text-gray-600 font-medium">{t.products.appDescLong}</p>
            
            <div className="space-y-4">
              <button 
                onClick={handleDownload}
                disabled={downloadState !== 'idle'}
                className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 ${downloadState === 'complete' ? 'bg-its-green text-white' : 'bg-its-dark-green text-white'}`}
              >
                {downloadState === 'idle' && <><Download /> {t.products.p2CTA}</>}
                {downloadState === 'processing' && <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> {lang === 'id' ? 'Memproses...' : 'Processing...'}</>}
                {downloadState === 'complete' && <><Check /> {lang === 'id' ? 'Berhasil!' : 'Success!'}</>}
              </button>
            </div>
          </div>
          <div className="relative flex justify-center py-10">
             <div className="w-[300px] h-[600px] bg-its-dark-green rounded-[3.5rem] p-4 shadow-2xl relative border-[8px] border-white/20">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden p-6 flex flex-col gap-4">
                   <div className="h-4 w-1/3 bg-gray-100 rounded-full mx-auto"></div>
                   <div className="h-32 bg-its-main-blue rounded-3xl p-4 text-white flex flex-col justify-end">
                      <p className="text-[10px] font-black opacity-80 uppercase">Dashboard</p>
                      <p className="text-xl font-black">{lang === 'id' ? 'Halo, IWAGanks!' : 'Hello, Citizen!'}</p>
                   </div>
                   <div className="space-y-3">
                      <div className="h-12 bg-gray-50 rounded-xl flex items-center px-4 gap-3"><Bot size={18} /><div className="h-2 flex-1 bg-gray-200 rounded-full"></div></div>
                      <div className="h-12 bg-gray-50 rounded-xl flex items-center px-4 gap-3"><BarChart3 size={18} /><div className="h-2 flex-1 bg-gray-200 rounded-full"></div></div>
                      <div className="h-12 bg-gray-50 rounded-xl flex items-center px-4 gap-3"><ShoppingBag size={18} /><div className="h-2 flex-1 bg-gray-200 rounded-full"></div></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {renderAppGallery()}
        {renderCrossSell()}
      </section>
    </div>
  );

  const renderIWABOT = () => (
    <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
      <section className="container mx-auto px-6">
        {renderBackBtn()}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-its-dark-green mb-6">{t.products.p1Name} — {lang === 'id' ? 'Monitoring Secara Real-Time' : 'Real-Time Monitoring'}</h1>
          <p className="text-xl text-gray-500 font-medium">{t.products.botDescLong}</p>
        </div>

        <div className="flex justify-center mb-12">
           <div className="bg-gray-100 p-1 rounded-2xl flex">
              <button onClick={() => setBotView('map')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${botView === 'map' ? 'bg-white text-its-main-blue shadow-md' : 'text-gray-400'}`}>{lang === 'id' ? 'Tampilan Peta' : 'Map View'}</button>
              <button onClick={() => setBotView('search')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${botView === 'search' ? 'bg-white text-its-main-blue shadow-md' : 'text-gray-400'}`}>{lang === 'id' ? 'Cari Sungai' : 'Search River'}</button>
           </div>
        </div>

        {botView === 'map' ? (
          <div className="bg-its-aqua/10 rounded-[3rem] h-[600px] relative overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner">
             <div className="absolute inset-0 z-0 opacity-40">
                <svg width="100%" height="100%" viewBox="0 0 1000 600">
                  <path d="M0,300 Q250,150 500,300 T1000,300" fill="none" stroke="#6EACCD" strokeWidth="80" strokeLinecap="round" className="animate-flow" />
                  <circle cx="500" cy="300" r="250" fill="rgba(162, 202, 103, 0.15)" stroke="rgba(162, 202, 103, 0.3)" strokeWidth="2" strokeDasharray="5 5" />
                </svg>
             </div>
             
             {riverList.map((r, i) => (
               <div key={r.id} className="relative group">
                 <button 
                  onClick={() => setSelectedRiver(r)}
                  className={`relative z-10 w-16 h-16 transition-all transform hover:scale-110 active:scale-95 ${selectedRiver?.id === r.id ? 'scale-125' : ''}`}
                  style={{ transform: `translate(${(i-2)*150}px, ${(i % 2 === 0 ? -1 : 1)*50}px)` }}
                 >
                   <div className={`w-full h-full rounded-full border-4 shadow-xl flex items-center justify-center overflow-hidden transition-all ${selectedRiver?.id === r.id ? 'border-its-main-blue bg-white' : 'border-white bg-its-main-blue'}`}>
                      <div className="flex flex-col items-center justify-center">
                        <Bot size={28} className={selectedRiver?.id === r.id ? 'text-its-main-blue' : 'text-white'} />
                        <div className={`w-4 h-1 rounded-full mt-0.5 ${selectedRiver?.id === r.id ? 'bg-its-main-blue' : 'bg-white'}`}></div>
                      </div>
                   </div>
                   <div className="absolute -inset-4 bg-its-green/20 rounded-full animate-ripple -z-10"></div>
                 </button>
                 
                 {selectedRiver?.id === r.id && (
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 border border-gray-50 animate-[fadeIn_0.3s_ease-out]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{r.id}</p>
                          <h4 className="text-xl font-black text-its-dark-green leading-tight">{r.name}</h4>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${r.status === 'Layak' ? 'bg-its-green/20 text-its-dark-green' : 'bg-red-100 text-red-500'}`}>{r.status}</div>
                      </div>
                      <div className="space-y-2 mb-6 text-[11px] text-gray-500 font-medium">
                        <div className="flex items-center gap-2"><Calendar size={14} /> <span>{r.lastMeasured}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={14} /> <span>{r.location}</span></div>
                      </div>
                      <button 
                        onClick={() => { setActiveTab('iwa-bot-detail'); window.scrollTo(0,0); }} 
                        className="w-full bg-its-main-blue text-white py-3 rounded-xl font-black text-sm hover:bg-its-dark-green transition-all shadow-md"
                      >
                        {lang === 'id' ? 'Lihat Detail Analisis' : 'See Analysis Details'}
                      </button>
                      <button onClick={() => setSelectedRiver(null)} className="absolute -top-2 -right-2 bg-white text-gray-400 w-8 h-8 rounded-full border border-gray-100 shadow-md flex items-center justify-center hover:text-red-500"><X size={16} /></button>
                   </div>
                 )}
               </div>
             ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-in]">
             <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-its-main-blue" />
                <input 
                  type="text" 
                  placeholder={t.news.searchPlaceholder} 
                  className="w-full bg-white border-2 border-its-aqua/30 rounded-[2.5rem] py-6 pl-16 pr-8 text-xl font-medium focus:outline-none focus:border-its-main-blue transition-all shadow-sm" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                />
             </div>
             <div className="grid gap-6">
                {filteredRivers.map(r => (
                  <div key={r.id} className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-xl hover:border-its-main-blue/30 transition-all">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                         <h4 className="text-2xl font-black text-its-dark-green">{r.name}</h4>
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r.status === 'Layak' ? 'bg-its-green/10 text-its-green' : 'bg-red-50 text-red-400'}`}>{r.status}</span>
                       </div>
                       <p className="text-sm text-gray-500 font-medium">{r.location}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-3 flex items-center gap-2"><Calendar size={12}/> Update: {r.lastMeasured}</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedRiver(r); setActiveTab('iwa-bot-detail'); window.scrollTo(0,0); }} 
                      className="flex items-center gap-3 bg-its-aqua/10 text-its-main-blue px-6 py-4 rounded-2xl font-black hover:bg-its-main-blue hover:text-white transition-all transform"
                    >
                      {lang === 'id' ? 'Lihat Detail Analisis' : 'See Analysis Details'} <ArrowRight size={20} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}
        {renderCrossSell()}
      </section>
    </div>
  );

  const renderIWABOTDetail = () => {
    const r = selectedRiver || riverList[0];
    return (
      <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
        <section className="container mx-auto px-6 max-w-5xl">
          {renderBackBtn()}
          <div className="grid md:grid-cols-2 gap-16 items-start">
             <div className="space-y-10">
                <div>
                   <span className="bg-its-main-blue/10 text-its-main-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">{lang === 'id' ? 'Detail Analisis' : 'Analysis Detail'}</span>
                   <h1 className="text-5xl font-black text-its-dark-green mb-4 leading-tight">{r.name}</h1>
                   <p className="text-its-main-blue font-black flex items-center gap-2"><Bot size={18} /> Station ID: {r.id}</p>
                </div>
                <div className="grid gap-6">
                   <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl"><MapPin className="text-its-main-blue mt-1" /> <div><p className="text-[10px] font-black text-gray-400 uppercase">{lang === 'id' ? 'Alamat Lengkap' : 'Full Address'}</p><p className="font-medium text-gray-700">{r.fullAddress}</p></div></div>
                   <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl"><Globe className="text-its-main-blue mt-1" /> <div><p className="text-[10px] font-black text-gray-400 uppercase">{lang === 'id' ? 'Koordinat' : 'Coordinates'}</p><p className="font-medium text-gray-700">{r.coordinates}</p></div></div>
                   <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl"><Calendar className="text-its-main-blue mt-1" /> <div><p className="text-[10px] font-black text-gray-400 uppercase">{lang === 'id' ? 'Pengukuran Terakhir' : 'Last Measured'}</p><p className="font-medium text-gray-700">{r.lastMeasured}</p></div></div>
                </div>
             </div>
             
             <div className="space-y-10">
                <div className="bg-white p-10 rounded-[3rem] border-4 border-its-aqua/20 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-its-aqua/10 rounded-bl-[4rem] -z-10"></div>
                   <h3 className="text-2xl font-black text-its-dark-green mb-8 flex items-center gap-3"><Activity /> {lang === 'id' ? 'Prediksi Kualitas Air (AI)' : 'Water Quality Prediction (AI)'}</h3>
                   <div className="flex items-center gap-8 mb-10">
                      <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-black text-center p-4 shadow-lg ${r.status === 'Layak' ? 'bg-its-green' : r.status === 'Cukup Layak' ? 'bg-its-main-blue' : 'bg-red-400'}`}>
                        <p className="text-[10px] opacity-70 mb-1">STATUS</p>
                        <p className="text-sm leading-tight uppercase">{r.status}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-its-dark-green mb-1">{lang === 'id' ? 'Waktu Prediksi: 1 Jam' : 'Prediction Time: 1 Hour'}</p>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{lang === 'id' ? 'Analisis cerdas berdasarkan tren curah hujan and volume limbah terdeteksi di hulu.' : 'Smart analysis based on rainfall trends and detected upstream waste volume.'}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:border-its-main-blue transition-colors">
                         <p className="text-[10px] font-black text-gray-400 mb-2 uppercase">pH</p>
                         <p className="text-2xl font-black text-its-main-blue">{r.ph}</p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:border-its-main-blue transition-colors">
                         <p className="text-[10px] font-black text-gray-400 mb-2 uppercase">{lang === 'id' ? 'SUHU (°C)' : 'TEMP (°C)'}</p>
                         <p className="text-2xl font-black text-its-main-blue">{r.temp}</p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:border-its-main-blue transition-colors">
                         <p className="text-[10px] font-black text-gray-400 mb-2 uppercase">NTU</p>
                         <p className="text-2xl font-black text-its-main-blue">{r.turbidity}</p>
                      </div>
                   </div>
                </div>

                <div className="bg-its-main-blue text-white p-12 rounded-[4rem] relative overflow-hidden shadow-2xl group transition-all hover:scale-[1.02]">
                   <Smartphone className="absolute -top-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                   <h3 className="text-3xl font-black mb-6 relative z-10 flex items-center gap-4"><Download /> {t.products.botDeepDiveTitle}</h3>
                   <p className="text-white/80 font-medium mb-10 relative z-10 leading-relaxed">{t.products.botDeepDiveDesc}</p>
                   <button 
                    onClick={() => navigateTo('iwa-app')} 
                    className="bg-white text-its-main-blue px-10 py-5 rounded-2xl font-black text-lg hover:bg-its-aqua hover:text-its-dark-green transition-colors flex items-center gap-3 relative z-10 shadow-lg"
                   >
                     <ExternalLink size={24} /> {t.products.botDeepDiveCTA}
                   </button>
                </div>
             </div>
          </div>
          {renderCrossSell()}
        </section>
      </div>
    );
  };

  const renderIWAANALYTICS = () => (
    <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
      <section className="container mx-auto px-6">
        {renderBackBtn()}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl font-black text-its-dark-green mb-8 tracking-tight">{t.products.p3Name} — {lang === 'id' ? 'Data Jadi Keputusan Nyata' : 'Data Turned Into Real Action'}</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">{t.products.analyticsDescLong}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
           <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${analyticsView === 'volume' ? 'bg-its-main-blue text-white' : 'bg-gray-100 text-gray-400'}`}><BarChart3 size={20} /></div>
                  <div>
                    <h3 className="font-black text-its-dark-green text-xl">
                      {analyticsView === 'volume' ? (lang === 'id' ? 'Volume Sampah Terkumpul' : 'Collected Waste Volume') : analyticsView === 'hotspots' ? (lang === 'id' ? 'Titik Rawan Pencemaran' : 'Pollution Hotspots') : (lang === 'id' ? 'Jenis Sampah Terbanyak' : 'Most Common Waste Types')}
                    </h3>
                  </div>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                   <button onClick={() => setAnalyticsView('volume')} className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${analyticsView === 'volume' ? 'bg-white text-its-main-blue shadow-sm' : 'text-gray-400'}`}>VOLUME</button>
                   <button onClick={() => setAnalyticsView('hotspots')} className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${analyticsView === 'hotspots' ? 'bg-white text-its-main-blue shadow-sm' : 'text-gray-400'}`}>HOTSPOTS</button>
                   <button onClick={() => setAnalyticsView('types')} className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${analyticsView === 'types' ? 'bg-white text-its-main-blue shadow-sm' : 'text-gray-400'}`}>TYPES</button>
                </div>
              </div>

              {analyticsView === 'volume' && (
                <div className="h-64 flex items-end gap-3 group animate-[fadeIn_0.3s_ease-in]">
                   {[35, 60, 45, 85, 65, 80, 50, 70, 95, 60, 40, 75].map((h, i) => (
                     <div 
                       key={i} 
                       className="flex-1 bg-gradient-to-t from-its-main-blue to-its-aqua rounded-t-xl hover:opacity-80 transition-all relative group" 
                       style={{ height: `${h}%` }}
                     >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-its-dark-green text-white text-[9px] font-black px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">{h} Ton</div>
                     </div>
                   ))}
                </div>
              )}

              {analyticsView === 'hotspots' && (
                <div className="h-64 relative bg-gray-100/50 rounded-[2rem] flex items-center justify-center overflow-hidden animate-[fadeIn_0.3s_ease-in]">
                   <MapIcon className="absolute inset-0 w-full h-full text-gray-200 opacity-30" />
                   {[
                     { x: '15%', y: '40%', r: 50 },
                     { x: '65%', y: '25%', r: 30 },
                     { x: '45%', y: '55%', r: 70 },
                     { x: '75%', y: '70%', r: 40 },
                   ].map((dot, i) => (
                     <div 
                      key={i} 
                      className="absolute bg-red-500/30 border border-red-500 rounded-full animate-pulse"
                      style={{ left: dot.x, top: dot.y, width: dot.r, height: dot.r }}
                     ></div>
                   ))}
                   <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-red-100 text-center">
                      <p className="font-black text-red-500 text-sm flex items-center gap-2 justify-center"><AlertCircle size={18} /> {lang === 'id' ? 'Deteksi Area Kritis (Surabaya)' : 'Critical Area Detection (Surabaya)'}</p>
                   </div>
                </div>
              )}

              {analyticsView === 'types' && (
                <div className="h-64 flex flex-col justify-center gap-4 animate-[fadeIn_0.3s_ease-in]">
                   {[
                     { label: lang === 'id' ? 'Plastik Sekali Pakai' : 'Single-use Plastic', val: 58, color: 'bg-its-main-blue' },
                     { label: lang === 'id' ? 'Limbah Organik' : 'Organic Waste', val: 24, color: 'bg-its-green' },
                     { label: lang === 'id' ? 'Material Logam' : 'Metal Materials', val: 12, color: 'bg-its-dark-green' },
                     { label: lang === 'id' ? 'Lain-lain' : 'Others', val: 6, color: 'bg-gray-300' },
                   ].map(item => (
                     <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-tighter"><span>{item.label}</span><span>{item.val}%</span></div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner"><div className={`${item.color} h-full transition-all duration-1000 shadow-sm`} style={{ width: `${item.val}%` }}></div></div>
                     </div>
                   ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="p-4 bg-its-aqua/10 rounded-2xl flex flex-col justify-center"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'id' ? 'AKURASI PREDIKSI' : 'PREDICTION ACCURACY'}</p><p className="text-2xl font-black text-its-main-blue">94.2%</p></div>
                <div className="p-4 bg-its-green/10 rounded-2xl flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'id' ? 'REDUKSI LIMBAH' : 'WASTE REDUCTION'}</p>
                    <p className="text-2xl font-black text-its-green">1,420 Ton</p>
                  </div>
                  <CheckCircle2 className="text-its-green" />
                </div>
              </div>
           </div>

           <div className="flex flex-col gap-6">
              <div className="bg-its-dark-green p-10 rounded-[3rem] text-white flex flex-col justify-between h-full shadow-xl">
                 <div>
                    <div className="bg-its-green text-its-dark-green w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg"><TrendingUp size={30} /></div>
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{lang === 'id' ? 'Eksplor Wilayah Lain' : 'Explore Other Regions'}</h4>
                    <p className="text-base text-white font-medium leading-relaxed mb-8">{lang === 'id' ? 'Dapatkan akses ke ribuan dataset wilayah lainnya di seluruh Indonesia.' : 'Get access to thousands of datasets for other regions across Indonesia.'}</p>
                 </div>
                 <button onClick={() => navigateTo('iwa-app')} className="w-full bg-its-main-blue text-white py-5 rounded-2xl font-black text-sm hover:bg-its-aqua hover:text-its-dark-green transition-all shadow-lg flex items-center justify-center gap-3">
                   {lang === 'id' ? 'Akses via IWA-APP' : 'Access via IWA-APP'} <Smartphone size={18} />
                 </button>
              </div>
           </div>
        </div>
        
        {renderCrossSell()}
      </section>
    </div>
  );

  const renderIWASTORE = () => (
    <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
      <section className="container mx-auto px-6">
        {renderBackBtn()}
        <div className="text-center mb-20 max-w-4xl mx-auto">
           <h1 className="text-6xl font-black text-its-dark-green mb-6 tracking-tight">{t.products.p4Name} — {lang === 'id' ? 'Marketplace Produk Eco-Friendly' : 'Eco-Friendly Marketplace'}</h1>
           <p className="text-2xl text-its-green font-bold mb-10">{lang === 'id' ? 'Tukar Sampahmu dengan Koleksi Eksklusif' : 'Trade Your Waste for Exclusive Collections'}</p>
           <div className="bg-its-aqua/10 p-10 rounded-[3rem] border-2 border-dashed border-its-main-blue/30 inline-flex flex-col items-center gap-4 text-its-main-blue font-bold max-w-3xl shadow-sm">
              <div className="flex items-center gap-3"><AlertCircle size={32} /> <span className="text-xl">{lang === 'id' ? 'Akses Terbatas' : 'Limited Access'}</span></div>
              <p className="text-base text-center leading-relaxed">{t.products.storeDescLong}</p>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
           <div className="grid grid-cols-2 gap-8">
              {[
                { name: 'Rare Recycled Jacket', price: '1.200.000', img: './assets/images/store-item-1.png', rare: true },
                { name: 'Artisan Eco-Pot', price: '450.000', img: './assets/images/store-item-2.png', rare: true },
                { name: 'Stainless Eco-Kit', price: '150.000', img: './assets/images/store-item-3.png' },
                { name: 'Bamboo Cutlery Set', price: '85.000', img: './assets/images/store-item-4.png' }
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm relative group">
                   <div className="h-52 overflow-hidden relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                        onError={(e) => {(e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop"}}
                      />
                      {p.rare && <div className="absolute top-4 right-4 bg-its-green text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white/20 uppercase tracking-tighter">RARE ITEM</div>}
                   </div>
                   <div className="p-8">
                      <p className="text-xs font-black text-its-dark-green mb-1 uppercase tracking-tighter">{p.name}</p>
                      <p className="text-its-main-blue font-black text-base">{t.products.storePricePrefix} {p.price}</p>
                   </div>
                   <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-8 text-center cursor-not-allowed">
                      <p className="text-sm font-black text-its-dark-green leading-tight">{t.products.storeRedeemHint}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="space-y-10">
              <div className="bg-its-main-blue p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                 <h3 className="text-4xl font-black mb-8 leading-tight">{lang === 'id' ? 'Dapatkan Koleksi Rare Item Sekarang!' : 'Get Your Rare Item Collection Now!'}</h3>
                 <p className="text-lg text-white font-medium mb-10 leading-relaxed">
                   {lang === 'id' ? 'Setiap produk di IWA-STORE diproduksi secara eksklusif and terbatas oleh pengrajin lokal.' : 'Every product in IWA-STORE is produced exclusively and in limited quantities by local artisans.'}
                 </p>
                 <button 
                  onClick={() => navigateTo('iwa-app')} 
                  className="w-full bg-white text-its-main-blue py-6 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-4 active:scale-95"
                 >
                   <Download /> {lang === 'id' ? 'Akses via IWA-APP' : 'Access via IWA-APP'}
                 </button>
              </div>
           </div>
        </div>
        {renderCrossSell()}
      </section>
    </div>
  );

  // --- Full News View (Dengan Filter, Sort, & Detail) ---
const renderNews = () => {
    // --- View Detail Berita ---
    if (selectedNewsId && selectedNews) {
      return (
        <section className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_ease-in]">
          <div className="container mx-auto px-6 max-w-4xl">
            <button 
              onClick={() => { setSelectedNewsId(null); window.scrollTo(0, 0); }} 
              className="flex items-center gap-2 text-its-main-blue font-bold mb-8 hover:translate-x-[-4px] transition-transform"
            >
              <ChevronLeft size={20} /> {t.news.back}
            </button>
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-12" />
            <div className="flex gap-2 mb-6">
              {selectedNews.tags.map(tag => (<span key={tag} className="bg-its-aqua/20 text-its-main-blue px-4 py-1 rounded-full text-xs font-black uppercase">{tag}</span>))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-its-dark-green mb-6 leading-tight">{selectedNews.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 font-bold mb-10"><Calendar size={18} /> <span>{selectedNews.date}</span></div>
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-6"><p>{selectedNews.content}</p></div>
          </div>
        </section>
      );
    }

    // --- View Daftar Berita ---
    return (
      <section className="pt-32 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-6 text-center mb-16 animate-[fadeIn_0.5s_ease-in]">
          <h1 className="text-4xl md:text-6xl font-black text-its-dark-green mb-6">{t.news.headerTitle}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">{t.news.headerDesc}</p>
        </div>
        <div className="container mx-auto px-6 mb-12">
          <div className="bg-its-aqua/10 backdrop-blur-md p-4 rounded-[2rem] border border-its-aqua/20 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-its-main-blue" size={20} />
              <input 
                type="text" placeholder={t.news.searchPlaceholder}
                className="w-full bg-white pl-12 pr-6 py-3 rounded-2xl border border-its-aqua/30 focus:outline-none focus:ring-2 focus:ring-its-main-blue/50 font-medium text-gray-600"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setSelectedTag(null)} className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${!selectedTag ? 'bg-its-main-blue text-white shadow-lg' : 'bg-white text-its-main-blue border border-its-aqua/30'}`}>{t.news.allTags}</button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${selectedTag === tag ? 'bg-its-main-blue text-white shadow-lg' : 'bg-white text-its-main-blue border border-its-aqua/30'}`}>{tag}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 space-y-8 max-w-5xl">
          {filteredNews.map((news) => (
            <div 
              key={news.id} 
              className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-50 hover:shadow-2xl transition-all cursor-pointer" 
              onClick={() => { 
                setSelectedNewsId(news.id); 
                window.scrollTo({ top: 0, behavior: 'instant' }); // PERBAIKAN: Paksa scroll ke atas saat klik
              }}
            >
              <div className="w-full md:w-72 h-48 overflow-hidden rounded-[2rem]"><img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">{news.date}</span>
                    <div className="flex gap-2">{news.tags.map(tag => (<span key={tag} className="bg-its-aqua/10 text-its-main-blue px-3 py-1 rounded-full text-[10px] font-black uppercase">{tag}</span>))}</div>
                  </div>
                  <h3 className="text-2xl font-black text-its-dark-green mb-4 group-hover:text-its-main-blue transition-colors">{news.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">{news.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-its-main-blue font-black text-sm group/link"><span>{t.news.readMore}</span><div className="w-6 h-0.5 bg-its-main-blue transition-all group-hover/link:w-10"></div></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderContact = () => (
  <div className="pt-32 pb-24 bg-white animate-[fadeIn_0.5s_use-in]">
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* SISI KIRI: INFO & MAP */}
        <div className="space-y-10">
          <div>
            <h1 className="text-5xl font-black text-its-dark-green mb-6 leading-tight">
              {lang === 'id' ? 'Kami Siap Membantu!' : "We're ready to assist!"}
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {lang === 'id' 
                ? 'Punya pertanyaan mengenai teknologi kami atau ingin berkolaborasi? Jangan ragu untuk menghubungi tim kami.' 
                : 'Have questions about our technology or want to collaborate? Feel free to contact our team.'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-2 rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6919!2d112.793!3d-7.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnNTQuMCJTIDExMsKwNDcnMzQuOCJF!5e0!3m2!1sid!2sid!4v1700000000000"
                className="w-full h-64 rounded-[2rem]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-its-aqua/10 rounded-3xl border border-its-aqua/20">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-its-main-blue shadow-sm">
                <Mail />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                <p className="font-bold text-its-dark-green">info@itswara.co.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: FORM DENGAN NOTIFIKASI */}
        <div className="bg-its-dark-green p-8 md:p-12 rounded-[4rem] shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
          
          {/* Overlay Notifikasi Berhasil */}
          {formStatus === 'success' && (
            <div className="absolute inset-0 z-50 bg-its-green flex flex-col items-center justify-center text-white p-10 text-center animate-[fadeIn_0.4s_ease-out]">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Check size={48} strokeWidth={4} />
              </div>
              <h3 className="text-3xl font-black mb-3">{lang === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}</h3>
              <p className="font-medium text-white/90 text-lg">
                {lang === 'id' 
                  ? 'Terima kasih! Kami akan segera membalas melalui email Anda.' 
                  : 'Thank you! We will get back to you shortly via email.'}
              </p>
              <button 
                onClick={() => setFormStatus('idle')} 
                className="mt-10 bg-white text-its-green px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform"
              >
                {lang === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
              </button>
            </div>
          )}

          {/* Form Utama */}
          <form onSubmit={handleContactSubmit} className={`space-y-6 transition-opacity duration-300 ${formStatus === 'success' ? 'opacity-0' : 'opacity-100'}`}>
            <div className="space-y-2">
              <label className="text-white/70 text-xs font-black uppercase ml-4">Name</label>
              <input required type="text" placeholder="John Doe" className="w-full bg-white/10 border-2 border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-its-aqua transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-xs font-black uppercase ml-4">Email Address</label>
              <input required type="email" placeholder="john@example.com" className="w-full bg-white/10 border-2 border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-its-aqua transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-xs font-black uppercase ml-4">Message</label>
              <textarea required rows={4} placeholder="How can we help you?" className="w-full bg-white/10 border-2 border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-its-aqua transition-all resize-none"></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full bg-its-main-blue hover:bg-its-aqua text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-4 group"
            >
              {formStatus === 'submitting' ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{lang === 'id' ? 'Mengirim...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  </div>
);

  // --- View Switcher ---
  const currentView = useMemo(() => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'about':    
      case 'products': 
      return renderHome();
      case 'news': return renderNews();
      case 'contact': return renderContact();
      case 'iwa-app': return renderIWAAPP();
      case 'iwa-bot': return renderIWABOT();
      case 'iwa-bot-detail': return renderIWABOTDetail();
      case 'iwa-analytics': return renderIWAANALYTICS();
      case 'iwa-store': return renderIWASTORE();
      default: return renderHome();
    }
  }, [activeTab, lang, selectedNewsId, downloadState, botView, selectedRiver, searchQuery, analyticsView, selectedTag, sortBy, t, isMascotDetailOpen,  formStatus]);

  // --- Main Render ---
  return (
    <div className="min-h-screen text-gray-800 font-quicksand overflow-x-hidden selection:bg-its-aqua">
{/* Navbar */}
<nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
  /* LOGIKA: Pakai mode gelap jika sudah scroll ATAU jika tidak sedang di Beranda */
  (isScrolled || activeTab !== 'home') 
    ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
    : 'bg-white/10 backdrop-blur-md border-b border-white/10 py-5'
}`}>
  <div className="container mx-auto px-6 flex justify-between items-center">
    
    {/* Logo Branding */}
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-1.5 border transition-all ${
        (isScrolled || activeTab !== 'home') ? 'bg-white border-gray-100' : 'bg-white/20 border-white/30'
      }`}>
        <img src="./assets/images/logo-itswara.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <span className="text-2xl font-fredoka font-bold tracking-tight uppercase">
        {/* Teks ITS jadi biru kalau di detail fitur/news */}
        <span className={(isScrolled || activeTab !== 'home') ? 'text-its-main-blue' : 'text-white'}>ITS</span>
        <span className={(isScrolled || activeTab !== 'home') ? 'text-its-green' : 'text-its-aqua'}>WARA</span>
      </span>
    </div>

    {/* Menu Navigasi */}
    <div className="hidden md:flex items-center gap-8">
      {[
        { id: 'home', label: t.nav.home },
        { id: 'about', label: t.nav.about },
        { id: 'products', label: t.nav.services },
        { id: 'news', label: t.nav.news }
      ].map((item) => (
        <button 
          key={item.id}
          onClick={() => {
            if (item.id === 'home' || item.id === 'news') {
              navigateTo(item.id as any);
            } else {
              // Untuk About & Produk, kita pastikan ke home dulu baru scroll
              setActiveTab(item.id as any);
              setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100);
            }
          }} 
          className={`font-bold transition-all ${
            activeTab === item.id 
              ? ((isScrolled || activeTab !== 'home') ? 'text-its-main-blue' : 'text-its-aqua underline underline-offset-8 decoration-2') 
              : ((isScrolled || activeTab !== 'home') ? 'text-its-dark-green hover:text-its-main-blue' : 'text-white/90 hover:text-white')
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* Tombol Bahasa */}
      <button 
        onClick={toggleLang} 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
          (isScrolled || activeTab !== 'home') 
            ? 'bg-its-aqua/30 border-its-main-blue/20 text-its-main-blue' 
            : 'bg-white/20 border-white/30 text-white'
        }`}
      >
        <span className="text-sm font-bold uppercase">{lang}</span>
        <Globe size={16} />
      </button>

      {/* Tombol Kontak */}
      <a 
        href="#contact" 
        className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-lg ${
          (isScrolled || activeTab !== 'home') 
            ? 'bg-its-main-blue text-white hover:bg-its-dark-green' 
            : 'bg-white/20 backdrop-blur-md text-white border border-white/40'
        }`}
      >
        {t.nav.contact}
      </a>
    </div>
  </div>
</nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] md:hidden pt-24 px-8 space-y-6 flex flex-col items-center">
          <button onClick={() => navigateTo('home')} className="text-2xl font-bold">{t.nav.home}</button>
          <button onClick={() => { setIsMenuOpen(false); navigateToEcosystem(); }} className="text-2xl font-bold">{t.nav.services}</button>
          <button onClick={() => navigateTo('news')} className="text-2xl font-bold">{t.nav.news}</button>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-its-main-blue text-white py-4 rounded-xl font-bold text-xl">{t.nav.contact}</a>
        </div>
      )}

      {currentView}

      {/* Contact CTA Section - Sebelum Footer */}
<section className="py-32 bg-its-main-blue relative overflow-hidden">
  <div className="container mx-auto px-6 text-center relative z-10">
    <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight">
      {t.contactCTA.headline}
    </h2>
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      {/* Tombol 1: Jelajahi ITSWARA (Scroll ke Section Produk) */}
      <button 
        onClick={navigateToEcosystem} 
        className="bg-white text-its-main-blue px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
      >
        {lang === 'id' ? 'Jelajahi ITSWARA' : 'Explore ITSWARA'}
      </button>

      {/* Tombol 2: Kontak Kami (Pindah ke Halaman Form Kontak) */}
      <button 
        onClick={() => navigateTo('contact')}
        className="bg-its-dark-green text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
      >
        {t.nav.contact}
      </button>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-its-dark-green text-white pt-20 pb-12">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-4 gap-12 items-start justify-between text-center md:text-left">
      
      {/* 1. BRANDING & DESKRIPSI */}
      <div className="flex flex-col items-center md:items-start space-y-6">
        <div className="flex items-center gap-3">
          {/* Box Logo Putih Transparan */}
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm">
            <img 
              src="./assets/images/logo-itswara.png" 
              alt="Logo Itswara Footer" 
              className="w-full h-full object-contain" 
            />
          </div>
          
          {/* Teks ITS (Biru Muda) dan WARA (Hijau Muda) */}
          <span className="text-3xl font-fredoka font-bold tracking-tight uppercase">
            <span className="text-[#A5C9E1]">ITS</span>
            <span className="text-[#A2CA67]">WARA</span>
          </span>
        </div>             
        <p className="text-white/80 text-sm leading-relaxed max-w-xs">
          {t.footer.desc} {/* <--- Mengambil dari types.ts */}
        </p>
      </div>

      {/* 2. NAVIGASI */}
      <div className="flex flex-col">
        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">{t.footer.navTitle}</h4>
        <ul className="space-y-4 text-white/70 font-medium">
          <li>
            <button 
              onClick={() => {
                setActiveTab('about');
                window.scrollTo(0, 0);
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="hover:text-white transition-colors"
            >
              {t.nav.about}
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo('news')} className="hover:text-white transition-colors">
              {t.nav.news}
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
              {t.nav.contact}
            </button>
          </li>
        </ul>
      </div>

      {/* 3. KONTAK & ALAMAT */}
      <div className="flex flex-col">
        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">{t.footer.contactTitle}</h4>
        <ul className="space-y-4 text-white/70 font-medium">
          <li className="flex items-center justify-center md:justify-start gap-3">
            <Mail size={18} className="text-[#A5C9E1]" />
            <span>info@itswara.co.id</span>
          </li>
          <li className="flex items-start justify-center md:justify-start gap-3">
            <MapPin size={18} className="text-[#A2CA67] mt-1 shrink-0" />
            <span>{t.footer.address}</span> {/* <--- Akan muncul: Pondok mutiara Blok Y, Sidoarjo */}
          </li>
        </ul>
      </div>

      {/* 4. SOCIAL MEDIA */}
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">{t.footer.socialTitle}</h4>
        <div className="flex gap-4">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all border border-white/5">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* COPYRIGHT AREA */}
    <div className="mt-20 pt-8 border-t border-white/10 text-center text-white/50 font-bold uppercase tracking-widest text-[10px]">
      {t.footer.rights} {/* <--- Akan muncul: © 2026 ITSWARA. All Rights Reserved. */}
    </div>
  </div>
</footer>
    </div>
  );
};

export default App;