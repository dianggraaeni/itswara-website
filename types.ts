
export type Language = 'id' | 'en';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image: string;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    vision: string;
    services: string;
    news: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta1: string;
    cta2: string;
  };
  trusted: {
    title: string;
  };
  about: {
    title: string;
    subtitle: string;
    content: string;
    beforeLabel: string;
    afterLabel: string;
  };
  visionMission: {
    title: string;
    visionTitle: string;
    visionContent: string;
    missionTitle: string;
    m1: string;
    m2: string;
    m3: string;
  };
  products: {
    title: string;
    p1Name: string;
    p1Desc: string;
    p1Tag: string;
    p2Name: string;
    p2Desc: string;
    p2Tag: string;
    p3Name: string;
    p3Desc: string;
    p3Tag: string;
    p4Name: string;
    p4Desc: string;
    p4Tag: string;
  };
  news: {
    headerTitle: string;
    headerDesc: string;
    searchPlaceholder: string;
    sortBy: string;
    sortLatest: string;
    sortOldest: string;
    loadMore: string;
    readMore: string;
    back: string;
    allTags: string;
  };
  whyUs: {
    title: string;
    reason1: string;
    reason2: string;
    reason3: string;
    reason4: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  testimonials: {
    title: string;
    t1: string;
    t1Author: string;
    t2: string;
    t2Author: string;
  };
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  contactCTA: {
    headline: string;
    cta1: string;
    cta2: string;
  };
  footer: {
    desc: string;
    rights: string;
    navTitle: string;
    contactTitle: string;
    socialTitle: string;
    address: string;
  };
}

export const translations: Record<Language, Translation> = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', vision: 'Visi', services: 'Produk', news: 'Berita', contact: 'Kontak' },
    hero: {
      headline: 'Bersama Menjaga Air, Bersama Mengelola Sampah',
      subheadline: 'Solusi teknologi ramah lingkungan untuk masa depan yang lebih bersih dan berkelanjutan.',
      cta1: 'Kenali Itswara',
      cta2: 'Hubungi Kami',
    },
    trusted: {
      title: 'Dipercaya & Didukung Oleh',
    },
    about: {
      title: 'Kenapa Itswara Ada?',
      subtitle: 'Membawa Perubahan Melalui Inovasi',
      content: 'Kami percaya bahwa air adalah sumber kehidupan dan sampah adalah tanggung jawab kita bersama. Itswara hadir untuk menjembatani tantangan lingkungan dengan solusi teknologi yang cerdas dan inklusif.',
      beforeLabel: 'Masalah Lingkungan',
      afterLabel: 'Solusi Itswara',
    },
    visionMission: {
      title: 'Arah Langkah Kami',
      visionTitle: 'Visi Kami',
      visionContent: 'Menjadi pelopor solusi pengelolaan sampah dan air yang berkelanjutan di Indonesia.',
      missionTitle: 'Misi Kami',
      m1: 'Mengembangkan teknologi ramah lingkungan.',
      m2: 'Mengedukasi masyarakat tentang pengelolaan sampah.',
      m3: 'Mendukung keberlanjutan ekosistem air.',
    },
    products: {
      title: 'Ekosistem Produk ITSWARA',
      p1Name: 'IWABOT',
      p1Desc: 'Smart Waste Monitoring Bot yang memantau level sampah secara real-time.',
      p1Tag: 'Monitoring Cerdas',
      p2Name: 'IWAAPP',
      p2Desc: 'Platform digital untuk pelaporan komunitas dan edukasi lingkungan.',
      p2Tag: 'Partisipasi Digital',
      p3Name: 'IWAANALYTICS',
      p3Desc: 'Analisis data lingkungan untuk pengambilan keputusan yang tepat.',
      p3Tag: 'Data Insight',
      p4Name: 'IWASTORE',
      p4Desc: 'Marketplace produk ramah lingkungan dari hasil daur ulang.',
      p4Tag: 'Eco-Marketplace',
    },
    news: {
      headerTitle: 'Berita & Wawasan',
      headerDesc: 'Perkembangan terbaru ITSWARA dalam inovasi teknologi lingkungan, produk, dan kolaborasi berkelanjutan.',
      searchPlaceholder: 'Cari berita atau topik...',
      sortBy: 'Urutkan:',
      sortLatest: 'Terbaru',
      sortOldest: 'Terlama',
      loadMore: 'Muat Lebih Banyak',
      readMore: 'Selengkapnya',
      back: 'Kembali',
      allTags: 'Semua Kategori'
    },
    whyUs: {
      title: 'Kenapa Harus Itswara?',
      reason1: 'Berbasis Riset Mendalam',
      reason2: 'Tim Profesional & Berpengalaman',
      reason3: 'Pendekatan Berkelanjutan',
      reason4: 'Kolaborasi Komunitas Aktif',
      stat1: '120+',
      stat1Label: 'Komunitas',
      stat2: '30+',
      stat2Label: 'Program',
      stat3: '5',
      stat3Label: 'Kota',
    },
    testimonials: {
      title: 'Kata Mereka',
      t1: 'Itswara membantu komunitas kami mengelola sampah dengan lebih terstruktur dan berdampak nyata.',
      t1Author: 'Koordinator Komunitas Lingkungan',
      t2: 'Solusi air bersih yang ditawarkan sangat inovatif dan mudah diimplementasikan di desa kami.',
      t2Author: 'Relawan Sosial',
    },
    faq: {
      title: 'Sering Ditanyakan',
      q1: 'Apa itu Itswara?',
      a1: 'Itswara adalah startup teknologi lingkungan yang berfokus pada pengelolaan sampah dan pelestarian air.',
      q2: 'Apakah hanya fokus pada sampah?',
      a2: 'Tidak, kami memiliki program khusus untuk keberlanjutan sumber daya air juga.',
      q3: 'Siapa yang bisa bekerja sama?',
      a3: 'Mulai dari pemerintah, perusahaan, hingga komunitas lokal.',
      q4: 'Apakah programnya berkelanjutan?',
      a4: 'Ya, setiap inisiatif kami dirancang untuk jangka panjang dengan pemantauan berkala.',
    },
    contactCTA: {
      headline: 'Mulai Langkah Kecil untuk Dampak Besar',
      cta1: 'Kerja Sama',
      cta2: 'Kontak Kami',
    },
    footer: {
      desc: 'Membangun masa depan yang lebih hijau melalui teknologi digital dan partisipasi komunitas.',
      rights: '© 2024 ITSWARA. Semua Hak Dilindungi.',
      navTitle: 'Navigasi',
      contactTitle: 'Kontak',
      socialTitle: 'Sosial Media',
      address: 'Jl. Aliran Sungai No. 8, Jakarta Selatan',
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', vision: 'Vision', services: 'Products', news: 'News', contact: 'Contact' },
    hero: {
      headline: 'Preserving Water Together, Managing Waste Together',
      subheadline: 'Eco-friendly technology solutions for a cleaner and more sustainable future.',
      cta1: 'Meet Itswara',
      cta2: 'Contact Us',
    },
    trusted: {
      title: 'Trusted & Supported By',
    },
    about: {
      title: 'Why Itswara Exists?',
      subtitle: 'Driving Change Through Innovation',
      content: 'We believe water is the source of life and waste is our shared responsibility. Itswara exists to bridge environmental challenges with smart, inclusive technological solutions.',
      beforeLabel: 'Environmental Issues',
      afterLabel: 'Itswara Solution',
    },
    visionMission: {
      title: 'Our Direction',
      visionTitle: 'Our Vision',
      visionContent: 'To be the pioneer of sustainable waste and water management solutions in Indonesia.',
      missionTitle: 'Our Mission',
      m1: 'Developing eco-friendly technologies.',
      m2: 'Educating society on waste management.',
      m3: 'Supporting water ecosystem sustainability.',
    },
    products: {
      title: 'ITSWARA Product Ecosystem',
      p1Name: 'IWABOT',
      p1Desc: 'Smart Waste Monitoring Bot that tracks waste levels in real-time.',
      p1Tag: 'Smart Monitoring',
      p2Name: 'IWAAPP',
      p2Desc: 'Digital platform for community reporting and eco-education.',
      p2Tag: 'Digital Participation',
      p3Name: 'IWAANALYTICS',
      p3Desc: 'Environmental data analytics for informed decision making.',
      p3Tag: 'Data Insight',
      p4Name: 'IWASTORE',
      p4Desc: 'Eco-friendly marketplace for recycled and sustainable goods.',
      p4Tag: 'Eco-Marketplace',
    },
    news: {
      headerTitle: 'News & Insights',
      headerDesc: 'Latest ITSWARA developments in environmental technology innovation, products, and sustainable collaborations.',
      searchPlaceholder: 'Search news or topics...',
      sortBy: 'Sort by:',
      sortLatest: 'Latest',
      sortOldest: 'Oldest',
      loadMore: 'Load More',
      readMore: 'Read More',
      back: 'Back',
      allTags: 'All Categories'
    },
    whyUs: {
      title: 'Why Choose Itswara?',
      reason1: 'Evidence-Based Research',
      reason2: 'Professional & Expert Team',
      reason3: 'Sustainability Approach',
      reason4: 'Active Community Collaboration',
      stat1: '120+',
      stat1Label: 'Communities',
      stat2: '30+',
      stat2Label: 'Programs',
      stat3: '5',
      stat3Label: 'Cities',
    },
    testimonials: {
      title: 'What They Say',
      t1: 'Itswara helped our community manage waste more structurally with a real impact.',
      t1Author: 'Eco-Community Coordinator',
      t2: 'The clean water solutions offered are very innovative and easy to implement in our village.',
      t2Author: 'Social Volunteer',
    },
    faq: {
      title: 'Frequently Asked',
      q1: 'What is Itswara?',
      a1: 'Itswara is an environmental tech startup focused on waste management and water preservation.',
      q2: 'Is it only focused on waste?',
      a2: 'No, we have specific programs for water resource sustainability as well.',
      q3: 'Who can collaborate?',
      a3: 'From governments and corporations to local communities.',
      q4: 'Is the program sustainable?',
      a4: 'Yes, every initiative is designed for the long term with periodic monitoring.',
    },
    contactCTA: {
      headline: 'Small Steps for Big Impact',
      cta1: 'Collaborate',
      cta2: 'Contact Us',
    },
    footer: {
      desc: 'Building a greener future through digital technology and community participation.',
      rights: '© 2024 ITSWARA. All Rights Reserved.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      socialTitle: 'Social Media',
      address: 'Jl. Aliran Sungai No. 8, South Jakarta',
    },
  },
};
