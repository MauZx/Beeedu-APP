import React from 'react';
import './StudentDashboard.css';

const playlist = [
  {
    title: 'UX Designer com salário de 10 mil reais?',
    videoId: 'ugPM7j9AmFQ',
    duration: '8:38',
  },
  {
    title: 'Carreira de Designer - com Luan Mateus UX Designer',
    videoId: '1Q9Z4QwQ2lA',
    duration: '1:09:24',
  },
  {
    title: 'O que é UX Research - Com Gabriel Bastos',
    videoId: 'Qw7v7QvQ2lA',
    duration: '58:33',
  },
  // ...adicione mais vídeos se quiser
];

export default function UXDesignCoursePage() {
  const [selected, setSelected] = React.useState(0);
  const mainVideo = playlist[selected];

  return (
    <div className="student-dashboard" style={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span style={{ color: '#6699FF', fontWeight: 700, fontSize: 32 }}>🐝BEEEDU</span>
          </div>
        </div>
        <nav className="header-menu">
          <a href="/">INÍCIO</a>
          <a href="/matriculados">CURSOS MATRICULADOS</a>
          <a href="#">FEED</a>
        </nav>
      </header>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 0', gap: 40 }}>
        <div style={{ flex: 2, maxWidth: 900 }}>
          <div style={{ background: '#000', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px #0001' }}>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${mainVideo.videoId}?autoplay=0&rel=0&list=PLwgL9IEA0PxXwYSLBFSEuxZigG07_iet-`}
              title={mainVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block', width: '100%' }}
            ></iframe>
          </div>
          <h2 style={{ margin: '24px 0 8px', fontWeight: 700 }}>{mainVideo.title}</h2>
        </div>
        <aside style={{ flex: 1, minWidth: 320 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Playlist do Curso</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {playlist.map((video, idx) => (
              <div
                key={video.videoId}
                onClick={() => setSelected(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: idx === selected ? '#e6f0ff' : '#fff',
                  borderRadius: 8,
                  boxShadow: idx === selected ? '0 2px 8px #6699FF33' : '0 1px 4px #0001',
                  cursor: 'pointer',
                  padding: 8,
                  border: idx === selected ? '2px solid #6699FF' : '1px solid #eee',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/default.jpg`}
                  alt={video.title}
                  style={{ width: 80, height: 45, borderRadius: 4, objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#223' }}>{video.title}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{video.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
} 