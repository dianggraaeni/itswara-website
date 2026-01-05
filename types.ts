
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
    subtitle: string;
    p1Name: string;
    p1Desc: string;
    p1Tag: string;
    p1CTA: string;
    p2Name: string;
    p2Desc: string;
    p2Tag: string;
    p2CTA: string;
    p2Hint: string;
    p3Name: string;
    p3Desc: string;
    p3Tag: string;
    p3CTA: string;
    p4Name: string;
    p4Desc: string;
    p4Tag: string;
    p4CTA: string;
    featureLabel: string;
    crossSellTitle: string;
    galleryTitle: string;
    storePricePrefix: string;
    appDescLong: string;
    botDescLong: string;
    analyticsDescLong: string;
    storeDescLong: string;
    backLabel: string;
    botDeepDiveTitle: string;
    botDeepDiveDesc: string;
    botDeepDiveCTA: string;
    storeRedeemHint: string;
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
    description: string;
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
      headline: 'Bersama Menjaga Air,\nBersama Mengelola Sampah', 
      subheadline: 'Solusi teknologi ramah lingkungan untuk masa depan yang lebih bersih dan berkelanjutan.',
      cta1: 'Jelajahi ITSWARA',
      cta2: 'Hubungi Kami',
    },
    trusted: {
      title: 'Dipercaya & Didukung Oleh',
    },
    about: {
      title: 'Kenapa ITSWARA Ada?',
      subtitle: 'Membawa Perubahan Melalui Inovasi',
      content: 'Kami percaya bahwa air adalah sumber kehidupan dan sampah adalah tanggung jawab kita bersama. ITSWARA hadir untuk menjembatani tantangan lingkungan dengan solusi teknologi yang cerdas dan inklusif.',
      beforeLabel: 'Masalah Lingkungan',
      afterLabel: 'Solusi ITSWARA',
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
      subtitle: 'Satu Platform, Banyak Solusi Lingkungan',
      p1Name: 'IWA-BOT',
      p1Desc: 'Teknologi sensor dan bot untuk memantau kondisi sampah dan air secara real-time.',
      p1Tag: 'Monitoring Cerdas',
      p1CTA: 'Cek Peta →',
      p2Name: 'IWA-APP',
      p2Desc: 'Platform utama ITSWARA yang mengintegrasikan monitoring lingkungan, analitik data, dan ekonomi sirkular dalam satu aplikasi.',
      p2Tag: 'Super App / Platform Utama',
      p2CTA: 'Download di Play Store',
      p2Hint: 'Pusat Integrasi Ekosistem',
      p3Name: 'IWA-ANALYTICS',
      p3Desc: 'Sistem analitik untuk mengolah data lingkungan menjadi insight dan rekomendasi.',
      p3Tag: 'Data Insight',
      p3CTA: 'Lihat Analisis →',
      p4Name: 'IWA-STORE',
      p4Desc: 'Marketplace produk ramah lingkungan berbasis ekonomi sirkular.',
      p4Tag: 'Eco-Marketplace',
      p4CTA: 'Eksplor →',
      featureLabel: 'Fitur tersedia di dalam IWA-APP',
      crossSellTitle: 'Jelajahi Fitur Lainnya',
      galleryTitle: 'Galeri Aplikasi',
      storePricePrefix: 'Rp',
      appDescLong: 'Platform super app yang menghubungkan pemantauan IoT, analisis data prediktif, dan marketplace ekonomi sirkular dalam satu genggaman digital.',
      botDescLong: 'Teknologi pemantauan sungai dan volume sampah berbasis IoT yang aktif 24/7.',
      analyticsDescLong: 'Ubah data mentah menjadi keputusan nyata. Gunakan wawasan prediktif untuk masa depan lingkungan yang lebih terjaga.',
      storeDescLong: 'Marketplace produk ekonomi sirkular eksklusif untuk para penjaga lingkungan.',
      backLabel: 'Kembali',
      botDeepDiveTitle: 'Ingin Monitoring Lebih Detail?',
      botDeepDiveDesc: 'Dapatkan histori data lengkap, notifikasi alert realtime, dan analisis kualitas air mendalam melalui aplikasi IWA-APP.',
      botDeepDiveCTA: 'Buka di IWA-APP',
      storeRedeemHint: 'Tukarkan poin IWA-APP Anda atau beli melalui aplikasi.'
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
      title: 'Kenapa Harus ITSWARA?',
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
      description: 'Berbagai cerita dari mitra dan pengguna yang bersama ITSWARA membangun perubahan melalui teknologi lingkungan yang berkelanjutan.',
      t1: 'ITSWARA membantu komunitas kami mengelola sampah dengan lebih terstruktur dan berdampak nyata.',
      t1Author: 'Koordinator Komunitas Lingkungan',
      t2: 'Solusi air bersih yang ditawarkan sangat inovatif and mudah diimplementasikan di desa kami.',
      t2Author: 'Relawan Sosial',
    },
    faq: {
      title: 'Sering Ditanyakan',
      q1: 'Apa itu ITSWARA?',
      a1: 'ITSWARA adalah startup teknologi lingkungan yang berfokus pada pengelolaan sampah dan pelestarian air.',
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
      rights: '© 2026 ITSWARA. Bersama Menjaga Air, Bersama Mengelola Sampah.',
      navTitle: 'Navigasi',
      contactTitle: 'Kontak',
      socialTitle: 'Social Media',
      address: 'Pondok mutiara Blok Y, Sidoarjo',
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', vision: 'Vision', services: 'Products', news: 'News', contact: 'Contact' },
    hero: {
      headline: 'Preserving Water Together, Managing Waste Together',
      subheadline: 'Eco-friendly technology solutions for a sustainable and cleaner future.',
      cta1: 'Meet ITSWARA',
      cta2: 'Contact Us',
    },
    trusted: {
      title: 'Trusted & Supported By',
    },
    about: {
      title: 'Why ITSWARA Exists?',
      subtitle: 'Driving Change Through Innovation',
      content: 'We believe water is the source of life and waste is our shared responsibility. ITSWARA exists to bridge environmental challenges with smart, inclusive technological solutions.',
      beforeLabel: 'Environmental Issues',
      afterLabel: 'ITSWARA Solution',
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
      subtitle: 'One Platform, Many Environmental Solutions',
      p1Name: 'IWA-BOT',
      p1Desc: 'Sensor technology and bots to monitor waste and water conditions in real-time.',
      p1Tag: 'Smart Monitoring',
      p1CTA: 'Check Map →',
      p2Name: 'IWA-APP',
      p2Desc: 'ITSWARA\'s core platform that integrates environmental monitoring, data analytics, and circular economy in one app.',
      p2Tag: 'Super App / Core Platform',
      p2CTA: 'Download on Play Store',
      p2Hint: 'Ecosystem Integration Hub',
      p3Name: 'IWA-ANALYTICS',
      p3Desc: 'Analytical system to process environmental data into insights and recommendations.',
      p3Tag: 'Data Insight',
      p3CTA: 'See Analytics →',
      p4Name: 'IWA-STORE',
      p4Desc: 'Eco-friendly marketplace products based on circular economy.',
      p4Tag: 'Eco-Marketplace',
      p4CTA: 'Explore →',
      featureLabel: 'Feature available inside IWA-APP',
      crossSellTitle: 'Explore More Features',
      galleryTitle: 'App Gallery',
      storePricePrefix: 'Rp',
      appDescLong: 'A super app platform connecting IoT monitoring, predictive data analysis, and circular economy marketplace in one digital hand.',
      botDescLong: 'IoT-based river monitoring and waste volume technology active 24/7.',
      analyticsDescLong: 'Turn raw data into real decisions. Use predictive insights for a more protected environmental future.',
      storeDescLong: 'Exclusive circular economy product marketplace for environmental guardians.',
      backLabel: 'Back',
      botDeepDiveTitle: 'Need More Detailed Monitoring?',
      botDeepDiveDesc: 'Get full data history, real-time alert notifications, and in-depth water quality analysis through the IWA-APP.',
      botDeepDiveCTA: 'Open in IWA-APP',
      storeRedeemHint: 'Redeem your IWA-APP points or purchase directly through the app.'
    },
    news: {
      headerTitle: 'News & Insights',
      headerDesc: 'Latest ITSWARA developments in environmental technology innovation, products, and sustainable collaborations.',
      searchPlaceholder: 'Search news or topics...',
      sortBy: 'Sort by:',
      sortLatest: 'Latest',
      sortOldest: 'Oldest',
      readMore: 'Read More',
      back: 'Back',
      loadMore: 'Load More',
      allTags: 'All Categories'
    },
    whyUs: {
      title: 'Why Choose ITSWARA?',
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
      description: 'Stories from partners and users working with ITSWARA to build change through sustainable environmental technology.',
      t1: 'ITSWARA helped our community manage waste more structurally with real impact.',
      t1Author: 'Eco-Community Coordinator',
      t2: 'The clean water solutions offered are very innovative and easy to implement in our village.',
      t2Author: 'Social Volunteer',
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1: 'What is ITSWARA?',
      a1: 'ITSWARA is an environmental tech startup focused on waste management and water preservation.',
      q2: 'Is it only focused on waste?',
      a2: 'No, we also have specific programs for water resource sustainability.',
      q3: 'Who can collaborate?',
      a3: 'From governments and corporations to local communities.',
      q4: 'Is the program sustainable?',
      a4: 'Yes, every initiative is designed for long-term impact with periodic monitoring.',
    },
    contactCTA: {
      headline: 'Small Steps for Big Impact',
      cta1: 'Collaborate',
      cta2: 'Contact Us',
    },
    footer: {
      desc: 'Building a greener future through digital technology and community participation.',
      rights: '© 2026 ITSWARA. All Rights Reserved.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      socialTitle: 'Social Media',
      address: 'Pondok mutiara Blok Y, Sidoarjo',
    },
  },
};
