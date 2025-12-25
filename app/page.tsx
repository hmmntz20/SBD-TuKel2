"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  Database, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Lock,
  Zap,
  Activity,
  Box,
  FileText,
  User,
  Server,
  Globe
} from 'lucide-react';

import resumeImage from './resume.jpg';

// --- CONFIGURATION & THEME ---
const THEME = {
  colors: {
    background: '#000000',
    glass: 'rgba(255, 255, 255, 0.08)',
    glassHigh: 'rgba(255, 255, 255, 0.15)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#2997FF', // iOS Blue yang lebih soft
    danger: '#FF453A', // iOS Red
    success: '#30D158', // iOS Green
    warning: '#FFD60A', // iOS Yellow
  },
  font: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
};

// --- DATA CONTENT (REVISED & IMPROVED) ---
const SLIDES_DATA = [
  {
    id: 1,
    type: 'cover',
    title: 'Centralized Database System Architecture',
    subtitle: 'Analisis Arsitektur & Tren Basis Data Terkini',
    meta: ['Sistem Basis Data'],
    team: [
      { name: 'Pascal Zaidane Athallah', nim: '103012400033' },
      { name: 'Hamam Nashiruddin', nim: '103012400118' }
    ]
  },
  {
    id: 2,
    type: 'content',
    title: 'Latar Belakang',
    icon: <Box size={32} />,
    layout: 'split',
    content: {
      left: [
        { type: 'highlight', text: 'Evolusi Arsitektur' },
        { type: 'text', text: 'Sebelum era Cloud & Distributed Systems, pengelolaan data dimulai dengan konsep terpusat yang kokoh.' },
        { type: 'highlight', text: 'Relevansi Saat Ini' },
        { type: 'text', text: 'Meski teknologi bergeser, sistem ini tetap menjadi fondasi sistem Legacy (Perbankan/Militer) karena kontrol mutlaknya.' }
      ],
      right: {
        type: 'quote',
        text: "Satu lokasi fisik. Satu titik kontrol. Keamanan maksimal tanpa kompleksitas sinkronisasi.",
        author: 'Konsep Dasar'
      }
    }
  },
  {
    id: 3,
    type: 'content',
    title: 'Definisi Sistem',
    icon: <Database size={32} />,
    layout: 'center',
    content: [
      { 
        type: 'big-text', 
        text: 'Sebuah sistem di mana DBMS, Seluruh Data, dan Aplikasi berjalan pada satu situs tunggal (Single Site).' 
      },
      {
        type: 'list',
        items: [
          'Processing Logic: Eksekusi query & transaksi terjadi di server pusat.',
          'Terminal Role: Pengguna hanya melakukan Input/Output (Dumb Terminal).',
          'No Replication: Data tidak disebar, meminimalisir redundansi.'
        ]
      }
    ]
  },
  {
    id: 4,
    type: 'diagram-single',
    title: 'Arsitektur: Single-User',
    icon: <User size={32} />,
    description: 'Umum ditemukan pada Personal Computer (Desktop DB).',
    points: [
      'Dedicated Resource: CPU & Disk untuk 1 pengguna.',
      'Simple Design: Tidak butuh mekanisme locking rumit.',
      'Limitation: Tidak mendukung Concurrency (akses bersamaan).'
    ]
  },
  {
    id: 5,
    type: 'diagram-multi',
    title: 'Arsitektur: Multi-User',
    icon: <Users size={32} />,
    description: 'Standar Industri (Mainframe / High-end Server).',
    points: [
      'Central Server: Menjalankan DBMS & OS Multiprogramming.',
      'Communication Controller: Mengatur trafik data dari ratusan terminal.',
      'Client: Mengirim request, Server memproses segalanya.'
    ]
  },
  {
    id: 6,
    type: 'cards',
    title: 'Keunggulan Utama',
    icon: <ShieldCheck size={32} />,
    variant: 'success',
    cards: [
      { 
        title: 'Centralized Security', 
        icon: <Lock />, 
        desc: 'Keamanan absolut. Admin hanya perlu memasang firewall & kebijakan akses di satu titik server fisik.' 
      },
      { 
        title: 'Data Integrity', 
        icon: <Database />, 
        desc: 'Konsistensi terjamin. Tidak ada risiko konflik data antar-cabang karena data hanya ada di satu tempat.' 
      },
      { 
        title: 'Cost Efficiency', 
        icon: <Zap />, 
        desc: 'Biaya setup awal lebih rendah untuk satu lokasi. Tidak memerlukan infrastruktur jaringan global yang rumit.' 
      }
    ]
  },
  {
    id: 7,
    type: 'cards',
    title: 'Kelemahan & Risiko',
    icon: <AlertTriangle size={32} />,
    variant: 'danger',
    cards: [
      { 
        title: 'Single Point of Failure', 
        icon: <Activity />, 
        desc: 'Risiko Kritikal (SPoF). Jika server pusat mati (down), seluruh operasional bisnis lumpuh total.' 
      },
      { 
        title: 'Performance Bottleneck', 
        icon: <Layers />, 
        desc: 'Antrian proses menumpuk di satu CPU saat trafik tinggi, menyebabkan latensi ekstrem.' 
      },
      { 
        title: 'Limited Scalability', 
        icon: <Maximize2 />, 
        desc: 'Hanya bisa Vertical Scaling (Upgrade Hardware) yang biayanya mahal dan memiliki batas fisik.' 
      }
    ]
  },
  {
    id: 8,
    type: 'content',
    title: 'Kesimpulan',
    icon: <FileText size={32} />,
    layout: 'center',
    content: [
      { type: 'highlight', text: 'Karakteristik Utama' },
      { type: 'text', text: 'Memusatkan seluruh sumber daya komputasi dan penyimpanan di satu lokasi demi kemudahan kontrol.' },
      { type: 'highlight', text: 'Rekomendasi Penggunaan' },
      { type: 'text', text: 'Ideal untuk sistem internal dengan keamanan tinggi. Namun, untuk layanan 24/7, wajib dimitigasi dengan strategi backup yang solid.' }
    ]
  },
  {
    id: 9,
    type: 'resume',
    title: 'Recent Trend of Database',
    paperTitle: 'Centralized Database: A Prerequisite for Security and Sustainable Development in Nigeria',
    paperAuthor: 'Abubakar Mohammed, Bashir Maina Saleh',
    paperYear: '2017 (IJIRCST Vol-5)',
    summaryPoints: [
      'Topik Utama: Urgensi penerapan Centralized Database untuk mendukung keamanan nasional dan pembangunan berkelanjutan di Nigeria.',
      'Masalah: Penggunaan database terdistribusi saat ini menyebabkan redundansi (pengulangan) dan inkonsistensi data identitas warga antar-lembaga.',
      'Kesimpulan: Database terpusat adalah solusi strategis untuk meningkatkan efektivitas administrasi pemerintahan dan mencegah duplikasi data.'
    ],
    imageSrc: resumeImage.src // PENTING: Rename file "CamScanner..." kamu jadi "scan-resume.jpg" dan taruh di folder public
  },
  {
    id: 10,
    type: 'cover',
    title: 'Terima Kasih',
    subtitle: 'Ampun bang jangan ditanya',
    meta: ['Sistem Basis Data'],
    team: []
  }
];

// --- COMPONENTS ---

// 1. Background Particle System (Optimized)
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 120 + 30; 
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Warna partikel disesuaikan agar tidak terlalu mencolok (blue/indigo hues)
        this.color = `hsla(${Math.random() * 40 + 210}, 60%, 50%, 0.12)`; 
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 12; i++) { // Jumlah partikel dikurangi sedikit agar clean
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
};

// 2. Diagrams (Refined SVGs)
const SingleUserDiagram = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
    <svg width="650" height="550" viewBox="0 0 400 300" style={{ filter: 'drop-shadow(0px 0px 15px rgba(41, 151, 255, 0.3))' }}>
      <rect x="100" y="50" width="200" height="150" rx="10" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1.5" />
      <rect x="120" y="70" width="160" height="90" rx="5" fill="rgba(0,0,0,0.6)" />
      {/* Icon Inside */}
      <circle cx="200" cy="115" r="25" fill={THEME.colors.accent} opacity="0.8" />
      <text x="200" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">DBMS</text>
      
      <circle cx="200" cy="250" r="18" fill="white" />
      <path d="M170 300 Q200 250 230 300" fill="rgba(255,255,255,0.3)" />
      <line x1="200" y1="232" x2="200" y2="202" stroke="white" strokeDasharray="4,4" opacity="0.5" />
    </svg>
    <div style={{ marginTop: 15, textAlign: 'center', color: THEME.colors.textSecondary, fontFamily: 'monospace', fontSize: '0.9rem' }}>
      SINGLE USER ENV<br/>
      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>No Network • No Concurrency</span>
    </div>
  </div>
);

const MultiUserDiagram = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
    <svg width="800" height="600" viewBox="0 0 600 400" style={{ filter: 'drop-shadow(0px 0px 15px rgba(41, 151, 255, 0.3))' }}>
      {/* Central Server */}
      <g transform="translate(250, 140)">
        <rect x="0" y="0" width="100" height="140" rx="8" fill={THEME.colors.accent} opacity="0.15" stroke={THEME.colors.accent} strokeWidth="2" />
        <text x="50" y="-15" textAnchor="middle" fill={THEME.colors.accent} fontSize="14" fontWeight="bold">CENTRAL SERVER</text>
        <path d="M20 30 h60 M20 50 h60 M20 70 h60" stroke={THEME.colors.accent} strokeWidth="2" opacity="0.4"/>
        <circle cx="50" cy="100" r="15" fill="white" opacity="0.9"/>
      </g>

      {/* Connections */}
      <path d="M300 140 L150 80" stroke="white" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
      <path d="M300 140 L450 80" stroke="white" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
      <path d="M300 280 L300 340" stroke="white" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />

      {/* Clients */}
      <g transform="translate(100, 30)">
        <rect width="100" height="60" rx="6" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />
        <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12">Client A</text>
      </g>
      <g transform="translate(400, 30)">
        <rect width="100" height="60" rx="6" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />
        <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12">Client B</text>
      </g>
       <g transform="translate(250, 340)">
        <rect width="100" height="50" rx="6" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />
        <text x="50" y="30" textAnchor="middle" fill="white" fontSize="12">Client C</text>
      </g>
    </svg>
    <div style={{ marginTop: 10, textAlign: 'center', color: THEME.colors.textSecondary, fontFamily: 'monospace', fontSize: '0.9rem' }}>
      MULTI-USER ENV<br/>
      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Central Processing • Dumb Terminals</span>
    </div>
  </div>
);

// 3. UI Helpers
const GlassCard = ({ children, style, className }) => (
  <div 
    className={className}
    style={{
      background: THEME.colors.glass,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid ${THEME.colors.glassBorder}`,
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      borderRadius: '24px',
      color: 'white',
      padding: '2.5rem',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      ...style
    }}
  >
    {children}
  </div>
);

const Badge = ({ text }) => (
  <span style={{
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    marginRight: '10px',
    display: 'inline-block',
    color: THEME.colors.textSecondary
  }}>
    {text}
  </span>
);

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.05)'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${THEME.colors.accent}, #9F7AEA)`,
        transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: `0 0 10px ${THEME.colors.accent}`
      }} />
    </div>
  );
};

// --- SLIDE RENDERERS ---

const CoverSlide = ({ data }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
    <div style={{ marginBottom: '2.5rem', opacity: 0.6 }}>
      <h3 style={{ letterSpacing: '6px', fontWeight: '400', fontSize: '0.9rem' }}>TELKOM UNIVERSITY</h3>
    </div>
    <GlassCard style={{ padding: '5rem 4rem', maxWidth: '900px', width: '100%', background: 'rgba(255,255,255,0.03)' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.1, margin: '0 0 1.5rem 0', letterSpacing: '-1px' }}>
        <span style={{ background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {data.title}
        </span>
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '400', color: THEME.colors.accent, marginBottom: '3rem', opacity: 0.9 }}>
        {data.subtitle}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
        {data.team.map((member, i) => (
          <div key={i} style={{ textAlign: i === 0 ? 'right' : 'left' }}>
            <div style={{ fontWeight: '600', fontSize: '1.2rem', marginBottom: '4px' }}>{member.name}</div>
            <div style={{ fontSize: '0.95rem', color: THEME.colors.textSecondary, fontFamily: 'monospace' }}>{member.nim}</div>
          </div>
        ))}
      </div>
    </GlassCard>
    <div style={{ marginTop: '3rem' }}>
      {data.meta.map((m, i) => <Badge key={i} text={m} />)}
    </div>
  </div>
);

const ContentSlide = ({ data }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
      <div style={{ background: 'rgba(41, 151, 255, 0.15)', padding: '12px', borderRadius: '16px', marginRight: '1.5rem', color: THEME.colors.accent }}>
        {data.icon}
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '600', margin: 0, letterSpacing: '-0.5px' }}>{data.title}</h2>
    </div>

    <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'stretch' }}>
      {data.layout === 'split' ? (
        <>
          <GlassCard style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {data.content.left.map((item, i) => (
              <div key={i} style={{ marginBottom: '2rem' }}>
                {item.type === 'highlight' && (
                  <h3 style={{ 
                    color: THEME.colors.accent, 
                    marginBottom: '0.8rem', 
                    fontSize: '1.1rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    fontWeight: 'bold' 
                  }}>
                    {item.text}
                  </h3>
                )}
                {item.type === 'text' && <p style={{ lineHeight: '1.7', color: THEME.colors.textSecondary, fontSize: '1.15rem', margin: 0 }}>{item.text}</p>}
              </div>
            ))}
          </GlassCard>
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GlassCard style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', border: 'none', fontStyle: 'italic', position: 'relative' }}>
              <div style={{ fontSize: '4rem', position: 'absolute', top: '-20px', left: '20px', opacity: 0.1 }}>"</div>
              <p style={{ fontSize: '1.6rem', lineHeight: '1.5', fontWeight: '300' }}>{data.content.right.text}</p>
              <div style={{ marginTop: '1.5rem', textAlign: 'right', color: THEME.colors.accent, fontWeight: '600', fontSize: '0.9rem' }}>— {data.content.right.author}</div>
            </GlassCard>
          </div>
        </>
      ) : (
        <GlassCard style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           {data.content.map((item, i) => (
             <div key={i} style={{ marginBottom: '2.5rem', maxWidth: '80%' }}>
                {item.type === 'big-text' && <h3 style={{ fontSize: '2.4rem', fontWeight: '300', lineHeight: '1.3' }}>{item.text}</h3>}
                {item.type === 'list' && (
                  <ul style={{ textAlign: 'left', display: 'inline-block', fontSize: '1.25rem', lineHeight: '2.2', listStyleType: 'none' }}>
                    {item.items.map((li, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: THEME.colors.accent, marginRight: '12px', marginTop: '8px' }}>•</span>
                        <span style={{ color: THEME.colors.textSecondary }}>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.type === 'highlight' && <h3 style={{ color: THEME.colors.accent, fontSize: '1.5rem', marginBottom: '1rem' }}>{item.text}</h3>}
                {item.type === 'text' && <p style={{ fontSize: '1.2rem', color: THEME.colors.textSecondary }}>{item.text}</p>}
             </div>
           ))}
        </GlassCard>
      )}
    </div>
  </div>
);

const DiagramSlide = ({ data, type }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '12px', marginRight: '1rem' }}>
          {data.icon}
        </div>
        <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '600' }}>{data.title}</h2>
      </div>
      <div style={{ opacity: 0.6, fontSize: '0.95rem', maxWidth: '400px', textAlign: 'right' }}>{data.description}</div>
    </div>

    <GlassCard style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.5fr', height: '100%' }}>
        <div style={{ background: 'rgba(0,0,0,0.1)', position: 'relative' }}>
          {type === 'single' ? <SingleUserDiagram /> : <MultiUserDiagram />}
        </div>
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ color: THEME.colors.accent, marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Karakteristik Utama</h4>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {data.points.map((p, i) => (
              <li key={i} style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', color: THEME.colors.textSecondary, fontSize: '1.1rem', lineHeight: '1.5' }}>
                <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: 'white', marginTop: '10px', marginRight: '15px', opacity: 0.5 }}></div>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  </div>
);

const CardSlide = ({ data }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
       <h2 style={{ fontSize: '2.8rem', marginBottom: '0.8rem', fontWeight: '700' }}>{data.title}</h2>
       <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: data.variant === 'danger' ? THEME.colors.danger : THEME.colors.success, margin: '0 auto', opacity: 0.8 }}></div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', flex: 1, paddingBottom: '1rem' }}>
      {data.cards.map((card, i) => (
        <GlassCard 
          key={i} 
          className="hover-card"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            borderTop: `4px solid ${data.variant === 'danger' ? THEME.colors.danger : THEME.colors.success}`,
            justifyContent: 'flex-start',
            paddingTop: '3rem'
          }}
        >
          <div style={{ 
            background: data.variant === 'danger' ? 'rgba(255, 69, 58, 0.15)' : 'rgba(48, 209, 88, 0.15)', 
            padding: '1.5rem', 
            borderRadius: '50%', 
            marginBottom: '2rem',
            color: data.variant === 'danger' ? THEME.colors.danger : THEME.colors.success,
            boxShadow: `0 0 20px ${data.variant === 'danger' ? 'rgba(255, 69, 58, 0.1)' : 'rgba(48, 209, 88, 0.1)'}`
          }}>
            {card.icon}
          </div>
          <h3 style={{ marginBottom: '1.2rem', fontSize: '1.4rem' }}>{card.title}</h3>
          <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '1rem' }}>{card.desc}</p>
        </GlassCard>
      ))}
    </div>
  </div>
);

const PlaceholderSlide = ({ data }) => (
  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
     <GlassCard style={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.2)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '2rem' }}>
           <FileText size={64} style={{ opacity: 0.8, color: THEME.colors.accent }} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data.title}</h1>
        <h2 style={{ fontWeight: '300', opacity: 0.7, marginBottom: '3rem', fontSize: '1.5rem' }}>{data.subtitle}</h2>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(255, 214, 10, 0.1)', color: '#FFD60A', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
            <AlertTriangle size={24} style={{ marginRight: '12px' }}/>
            <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Tugas Manual (Tulis Tangan)</span>
          </div>
        </div>
        
        <p style={{ marginTop: '2rem', opacity: 0.4, fontSize: '0.9rem', fontStyle: 'italic' }}>*Scan dokumen resume jurnal kelompok & lampirkan di slide ini.</p>
     </GlassCard>
  </div>
);

const ResumeSlide = ({ data }: { data: any }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* SISI KIRI: Ringkasan Digital */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: THEME.colors.accent, padding: '12px', borderRadius: '14px', marginRight: '1rem' }}>
            <FileText size={28} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>{data.title}</h2>
            <span style={{ fontSize: '0.9rem', opacity: 0.6, letterSpacing: '1px' }}>RESUME PAPER JURNAL</span>
          </div>
        </div>

        <GlassCard style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', lineHeight: '1.4', fontWeight: '600', color: THEME.colors.accent }}>
              {data.paperTitle}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', opacity: 0.8, fontSize: '0.9rem', fontFamily: 'monospace' }}>
              <span>PENULIS : {data.paperAuthor}</span>
              <span>TAHUN   : {data.paperYear}</span>
            </div>
          </div>
          
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
            {data.summaryPoints.map((point: string, i: number) => (
              <li key={i} style={{ marginBottom: '1rem', listStyleType: 'disc' }}>
                {point}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* SISI KANAN: Bukti Scan Tulisan Tangan */}
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div 
          onClick={() => setIsZoomed(true)}
          style={{ 
            position: 'relative', 
            cursor: 'zoom-in', 
            transform: 'rotate(2deg)', 
            transition: 'all 0.3s ease',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
          className="group hover:rotate-0 hover:scale-105"
        >
          {/* Efek Kertas */}
          <div style={{ background: 'white', padding: '10px' }}>
             <img 
              src={data.imageSrc} 
              alt="Scan Resume Tulisan Tangan" 
              style={{ width: '100%', display: 'block', borderRadius: '4px' }} 
            />
          </div>

          {/* Tombol Hint Zoom */}
          <div style={{ 
            position: 'absolute', bottom: '20px', right: '20px', 
            background: 'rgba(0,0,0,0.7)', color: 'white', 
            padding: '8px 16px', borderRadius: '30px', fontSize: '0.85rem',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <Maximize2 size={14} /> Tap to Zoom
          </div>
        </div>
        <p style={{ marginTop: '1.5rem', opacity: 0.4, fontSize: '0.85rem', textAlign: 'center', fontStyle: 'italic' }}>
          *Bukti fisik resume ditulis tangan (Scan Asli)
        </p>
      </div>

      {/* MODAL ZOOM (Lightbox) */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'zoom-out'
          }}
        >
          <img 
            src={data.imageSrc} 
            style={{ maxHeight: '95vh', maxWidth: '95vw', borderRadius: '8px', boxShadow: '0 0 100px rgba(0,0,0,0.5)' }} 
          />
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'white', opacity: 0.8 }}>
             <Minimize2 size={48} strokeWidth={1.5} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < SLIDES_DATA.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const renderSlide = (slide) => {
    switch(slide.type) {
      case 'cover': return <CoverSlide data={slide} />;
      case 'content': return <ContentSlide data={slide} />;
      case 'diagram-single': return <DiagramSlide data={slide} type="single" />;
      case 'diagram-multi': return <DiagramSlide data={slide} type="multi" />;
      case 'cards': return <CardSlide data={slide} />;
      case 'resume': return <ResumeSlide data={slide} />; // <--- TAMBAHKAN INI
      case 'placeholder': return <PlaceholderSlide data={slide} />;
      default: return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      background: '#050505', 
      color: 'white', 
      fontFamily: THEME.font,
      overflow: 'hidden'
    }}>
      <style>{`
        .hover-card { transition: transform 0.3s ease, background 0.3s ease; }
        .hover-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12) !important;
        }
        button:active { transform: scale(0.95); }
      `}</style>

      <ParticleBackground />

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '2rem 3.5rem' 
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', boxShadow: '0 0 10px rgba(255,95,86,0.5)' }}></div>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', boxShadow: '0 0 10px rgba(255,189,46,0.5)' }}></div>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F', boxShadow: '0 0 10px rgba(39,201,63,0.5)' }}></div>
          </div>
          <div style={{ opacity: 0.6, fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '600', color: THEME.colors.accent }}>
            GROUP 06 • CENTRALIZED DATABASE SYSTEMS
          </div>
          <button onClick={toggleFullscreen} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '10px', borderRadius: '12px', transition: 'background 0.2s' }}>
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {/* Content Area */}
        <div style={{ 
          flex: 1, 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
           <div key={currentSlide} style={{ 
             flex: 1,
             animation: `slideUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
             opacity: 0
           }}>
             <style>{`
               @keyframes slideUp {
                 from { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px); }
                 to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
               }
             `}</style>
             {renderSlide(SLIDES_DATA[currentSlide])}
           </div>
        </div>

        {/* Footer */}
        <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.9rem', color: THEME.colors.textSecondary, fontFamily: 'monospace' }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES_DATA.length).padStart(2, '0')}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '50%', 
                width: '48px', 
                height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                opacity: currentSlide === 0 ? 0.3 : 1,
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === SLIDES_DATA.length - 1}
              style={{ 
                background: THEME.colors.accent, 
                border: 'none', 
                borderRadius: '50%', 
                width: '48px', 
                height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                cursor: currentSlide === SLIDES_DATA.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentSlide === SLIDES_DATA.length - 1 ? 0.5 : 1,
                transition: 'all 0.2s',
                boxShadow: `0 0 20px ${THEME.colors.accent}66`
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <ProgressBar current={currentSlide} total={SLIDES_DATA.length} />
      </div>
    </div>
  );
}