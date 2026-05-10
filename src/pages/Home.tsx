import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [navHidden, setNavHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      if (cur > lastScroll.current && cur > 200) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScroll.current = cur;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --black: #0a0907;
          --ink: #15110b;
          --bone: #f0e6d2;
          --bone-warm: #e8dcc0;
          --sand: #d4bc8c;
          --sand-deep: #b89d68;
          --rust: #8b4a26;
          --burnt: #5c2e15;
          --gold: #d4a04a;
          --ocean: #2d5f6e;
          --ocean-deep: #1a3d4a;
          --ocean-light: #5a8a98;
          --foam: #d8e4e6;
          --shadow: #2a1f12;
          --line: rgba(240,230,210,0.18);
          --line-dark: rgba(21,17,11,0.18);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--black);
          color: var(--bone);
          overflow-x: hidden;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.08;
          mix-blend-mode: overlay;
          animation: grainShift 0.5s steps(3) infinite;
        }
        @keyframes grainShift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-1px, 1px); }
          66% { transform: translate(1px, -1px); }
        }
        .top-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--black);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .top-bar-track {
          display: flex;
          gap: 64px;
          white-space: nowrap;
          animation: scroll 50s linear infinite;
          width: max-content;
          padding: 14px 24px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--bone);
          font-weight: 300;
        }
        .top-bar-track .div { color: var(--gold); opacity: 0.8; }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        nav {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 90;
          background: rgba(10,9,7,0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: var(--bone);
          padding: 6px;
          display: flex;
          gap: 2px;
          transition: opacity 0.4s, transform 0.4s cubic-bezier(.2,.8,.2,1);
          border: 1px solid var(--line);
          border-radius: 999px;
        }
        nav a {
          text-decoration: none;
          color: var(--bone);
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 10px 18px;
          transition: all 0.2s;
          border-radius: 999px;
          opacity: 0.75;
        }
        nav a:hover {
          opacity: 1;
          background: rgba(240,230,210,0.08);
        }
        nav.hide {
          opacity: 0;
          transform: translateX(-50%) translateY(-200%);
        }
        .hero {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          background: var(--black);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -3;
          background: linear-gradient(180deg,
            #f4c878 0%, #d49050 14%, #8b4a26 26%, #5a3d4a 38%,
            #3a4d5e 48%, #2d5f6e 56%, #1a3d4a 70%, #15110b 92%);
        }
        .hero-sun {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          top: 28%;
          left: 50%;
          transform: translateX(-50%);
          z-index: -2;
          background: radial-gradient(circle at 50% 50%,
            #fff2c0 0%, #f4cc78 18%, rgba(212,160,74,0.5) 38%, transparent 65%);
          filter: blur(20px);
          animation: sunDrift 14s ease-in-out infinite;
        }
        @keyframes sunDrift {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.85; }
          50% { transform: translateX(-50%) scale(1.06); opacity: 1; }
        }
        .hero-ocean {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 36%;
          z-index: -1;
          overflow: hidden;
        }
        .hero-water {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #2d5f6e 0%, #1a3d4a 50%, #0a1f28 100%);
        }
        .hero-shimmer {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(180deg,
            transparent 0px, transparent 3px,
            rgba(244,200,120,0.06) 3px, rgba(244,200,120,0.06) 4px);
          animation: shimmer 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-2px); }
        }
        .hero-waves {
          position: absolute;
          bottom: 0;
          left: -10%;
          width: 220%;
          height: 60%;
        }
        .wave-path-1 { animation: waveMove 24s linear infinite; }
        .wave-path-2 { animation: waveMove 32s linear infinite reverse; }
        .wave-path-3 { animation: waveMove 18s linear infinite; }
        @keyframes waveMove {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        .hero-sand {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8%;
          z-index: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(21,17,11,0.7) 60%, var(--black) 100%);
        }
        .hero-palm-left, .hero-palm-right {
          position: absolute;
          top: 0;
          z-index: 0;
          width: 280px;
          height: 60%;
          pointer-events: none;
          opacity: 0.6;
        }
        .hero-palm-left { left: -40px; animation: sway 8s ease-in-out infinite; }
        .hero-palm-right { right: -40px; animation: swayRight 8s ease-in-out infinite -4s; transform: scaleX(-1); }
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes swayRight {
          0%, 100% { transform: scaleX(-1) rotate(0deg); }
          50% { transform: scaleX(-1) rotate(1.5deg); }
        }
        @media (max-width: 720px) {
          .hero-palm-left, .hero-palm-right { width: 160px; opacity: 0.4; }
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.16;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 1;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(10,9,7,0.4) 80%, rgba(10,9,7,0.85) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 3;
          height: 100vh;
          min-height: 700px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 100px 48px 60px;
          max-width: 1600px;
          margin: 0 auto;
        }
        @media (max-width: 720px) { .hero-content { padding: 100px 24px 40px; } }
        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
        }
        .hero-credit {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--bone);
          opacity: 0.65;
          font-weight: 300;
          line-height: 1.8;
        }
        .hero-credit strong { color: var(--gold); font-weight: 400; margin-right: 8px; }
        .hero-laurel {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: var(--gold);
          text-align: right;
          line-height: 1.5;
          opacity: 0.9;
          max-width: 220px;
        }
        .hero-laurel::before { content: '✦ '; }
        .hero-title-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 40px 0;
        }
        .hero-tag {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(20px, 2.4vw, 28px);
          color: var(--bone-warm);
          margin-bottom: 18px;
          font-weight: 400;
          opacity: 0.9;
          max-width: 600px;
        }
        .title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(120px, 22vw, 340px);
          line-height: 0.82;
          letter-spacing: -0.04em;
          color: var(--bone);
          text-transform: uppercase;
          margin-bottom: 20px;
          font-weight: 400;
          text-shadow: 0 4px 30px rgba(0,0,0,0.4);
          animation: titleIn 1.4s cubic-bezier(.2,.8,.2,1);
        }
        @keyframes titleIn {
          from { opacity: 0; transform: translateY(30px); letter-spacing: -0.02em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: -0.04em; }
        }
        .title-tagline {
          font-family: 'Anton', sans-serif;
          font-size: clamp(20px, 2.6vw, 32px);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 400;
          opacity: 0;
          animation: fadeIn 1.4s cubic-bezier(.2,.8,.2,1) 0.6s forwards;
        }
        @keyframes fadeIn { to { opacity: 1; } }
        .hero-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          flex-wrap: wrap;
        }
        .hero-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.4vw, 16px);
          max-width: 460px;
          color: rgba(240,230,210,0.78);
          line-height: 1.6;
          font-weight: 400;
        }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--bone);
          background: transparent;
          border: 1.5px solid var(--bone);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.2,.8,.2,1);
          position: relative;
          overflow: hidden;
        }
        .btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: var(--bone);
          transition: left 0.35s cubic-bezier(.2,.8,.2,1);
          z-index: 0;
        }
        .btn:hover { color: var(--ink); }
        .btn:hover::before { left: 0; }
        .btn span { position: relative; z-index: 1; display: inline-flex; gap: 8px; align-items: center; }
        .btn-solid { background: var(--bone); color: var(--ink); border-color: var(--bone); }
        .btn-solid::before { background: var(--ink); }
        .btn-solid:hover { color: var(--bone); }
        .btn-slate::before { background: var(--ocean); }
        .btn-lg { padding: 18px 36px; font-size: 14px; }
        .trailer-btn {
          position: relative;
          z-index: 2;
          cursor: pointer;
        }
        .trailer-section {
          padding: 100px 24px;
          background: var(--black);
          text-align: center;
          border-top: 1px solid var(--line);
        }
        .trailer-inner { max-width: 960px; margin: 0 auto; }
        .trailer-inner .section-title { margin-top: 12px; margin-bottom: 40px; }
        .trailer-embed {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .trailer-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .press-section {
          padding: 100px 24px;
          background: var(--ink);
          text-align: center;
        }
        .press-inner { max-width: 960px; margin: 0 auto; }
        .press-inner .section-title { margin-top: 12px; margin-bottom: 40px; }
        .press-embed {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .press-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .press-desc {
          max-width: 760px;
          margin: 32px auto 0;
          text-align: left;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(240,230,210,0.72);
        }
        .press-desc strong { color: var(--gold); font-weight: 500; }
        .press-source {
          display: inline-block;
          margin-top: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
        }
        .shoreline {
          position: relative;
          padding: 140px 24px;
          background: var(--black);
          overflow: hidden;
        }
        .shoreline-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.4;
        }
        .shoreline-inner { max-width: 760px; margin: 0 auto; position: relative; text-align: center; }
        .shoreline-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3.2vw, 42px);
          color: var(--bone);
          line-height: 1.4;
          font-weight: 400;
          margin-bottom: 24px;
        }
        .shoreline-quote em { color: var(--gold); font-style: normal; }
        .shoreline-cite {
          font-family: 'JetBrains Mono', monospace;
          font-style: normal;
          font-size: 10px;
          color: var(--gold);
          margin-top: 14px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0.85;
          font-weight: 400;
        }
        .sand-strip {
          height: 60px;
          background: linear-gradient(180deg, var(--black) 0%, var(--ink) 100%);
        }
        .film {
          padding: 140px 24px;
          background: var(--ink);
        }
        .film-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) { .film-grid { grid-template-columns: 1fr; gap: 40px; } }
        .poster {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .poster-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f4c878 0%, #d49050 30%, #8b4a26 60%, #5c2e15 80%, #2a1f12 100%);
        }
        .poster-sun {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, #fff2c0 0%, #f4cc78 40%, rgba(212,160,74,0.4) 60%, transparent 70%);
          filter: blur(10px);
        }
        .poster-portrait {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
        }
        .poster-portrait svg { width: 100%; height: auto; display: block; }
        .poster-title {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Anton', sans-serif;
          font-size: clamp(64px, 8vw, 100px);
          color: var(--bone);
          text-align: center;
          letter-spacing: -0.03em;
          line-height: 0.85;
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
        .poster-credits {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: var(--bone);
          text-align: center;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          line-height: 2;
          opacity: 0.8;
          white-space: nowrap;
        }
        .poster-tagline {
          position: absolute;
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: var(--gold);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .film-text { color: var(--bone); }
        .label {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .film-text h2 {
          font-family: 'Anton', sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          color: var(--bone);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
          font-weight: 400;
        }
        .film-text h2 em { color: var(--gold); font-style: normal; }
        .film-text .lead {
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 500;
          color: var(--bone);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .film-text p {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(240,230,210,0.75);
          margin-bottom: 16px;
        }
        .pull-quote {
          border-left: 2px solid var(--gold);
          padding: 16px 20px;
          margin: 28px 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          color: var(--bone);
          line-height: 1.6;
        }
        .pull-quote cite {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-style: normal;
          margin-top: 12px;
        }
        .stills {
          padding: 140px 0;
          background: var(--ink);
          overflow: hidden;
          position: relative;
        }
        .stills-header { max-width: 1280px; margin: 0 auto 60px; padding: 0 24px; }
        .section-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          color: var(--bone);
          line-height: 0.9;
          letter-spacing: -0.02em;
          font-weight: 400;
          margin-top: 12px;
        }
        .section-title em { color: var(--gold); font-style: normal; }
        .stills-strip {
          display: flex;
          gap: 4px;
          width: max-content;
          animation: strip 120s linear infinite;
        }
        @keyframes strip { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .still {
          width: 360px;
          aspect-ratio: 16/9;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .still::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .still-1 { background: linear-gradient(135deg, #f4c878, #8b4a26 60%, #2a1f12); }
        .still-2 { background: linear-gradient(180deg, #5a8a98 30%, #2d5f6e 70%, #1a3d4a); }
        .still-3 { background: linear-gradient(180deg, #f4cc78 20%, #d49050 50%, #2a1f12); }
        .still-4 { background: linear-gradient(180deg, #7ba6b3 30%, #d4bc8c 70%, #b89d68); }
        .still-5 { background: linear-gradient(180deg, #8b4a26 20%, #2a1f12 70%, #15110b); }
        .still-6 { background: linear-gradient(135deg, #d4bc8c 0%, #5a8a98 50%, #2d5f6e 100%); }
        .still-label {
          position: absolute;
          bottom: 12px;
          left: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--bone);
          opacity: 0.7;
          z-index: 2;
        }
        .team { padding: 140px 24px; background: var(--black); color: var(--bone); position: relative; overflow: hidden; }
        .team-inner { max-width: 1280px; margin: 0 auto; }
        .team-header { margin-bottom: 70px; max-width: 720px; }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; }
        .team-card { transition: all 0.4s cubic-bezier(.2,.8,.2,1); cursor: pointer; }
        .team-photo {
          width: 100%;
          aspect-ratio: 3/4;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(.2,.8,.2,1);
        }
        .team-photo > span {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          color: var(--bone);
          letter-spacing: -0.03em;
          z-index: 2;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
          line-height: 0.85;
        }
        .team-photo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }
        .team-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          z-index: 1;
          pointer-events: none;
        }
        .team-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; z-index: 0; }
        .team-card:hover .team-photo { transform: translateY(-4px); }
        .team-name { font-family: 'Anton', sans-serif; font-size: 22px; text-transform: uppercase; letter-spacing: -0.01em; color: var(--bone); margin-bottom: 4px; font-weight: 400; line-height: 1.05; }
        .team-role { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--gold); letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.85; }
        .merch { padding: 140px 24px; background: var(--ink); position: relative; }
        .merch-inner { max-width: 1280px; margin: 0 auto; }
        .merch-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 24px; }
        .merch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }
        .product { transition: all 0.4s cubic-bezier(.2,.8,.2,1); cursor: pointer; }
        .product:hover .product-img-wrap { transform: translateY(-8px); }
        .product-img-wrap { transition: transform 0.4s cubic-bezier(.2,.8,.2,1); margin-bottom: 18px; }
        .product-img { aspect-ratio: 1; position: relative; overflow: hidden; background: var(--black); display: flex; align-items: center; justify-content: center; }
        .product-img-inner { font-family: 'Anton', sans-serif; font-size: 48px; color: var(--bone); text-align: center; line-height: 0.9; letter-spacing: -0.02em; }
        .product-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          z-index: 3;
          pointer-events: none;
        }
        .product-tee .product-img { background: linear-gradient(135deg, var(--rust), var(--burnt)); }
        .product-cap .product-img { background: linear-gradient(135deg, var(--ocean), var(--ocean-deep)); }
        .product-poster .product-img { background: linear-gradient(135deg, var(--sand), var(--burnt)); }
        .product-board .product-img { background: linear-gradient(135deg, var(--ocean-light), var(--ocean-deep)); }
        .product-info { display: flex; justify-content: space-between; align-items: flex-start; }
        .product-name { font-family: 'Anton', sans-serif; font-size: 18px; color: var(--bone); text-transform: uppercase; letter-spacing: -0.01em; }
        .product-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(240,230,210,0.5); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }
        .product-price { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--gold); letter-spacing: 0.05em; }
        .stream { padding: 140px 24px; background: var(--black); }
        .stream-inner { max-width: 900px; margin: 0 auto; text-align: center; }
        .stream-sub { font-size: 16px; color: rgba(240,230,210,0.6); margin-top: 12px; }
        .stream-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 48px; }
        .stream-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: var(--ink);
          border: 1px solid var(--line-dark);
          color: var(--bone);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.1em;
          transition: all 0.3s cubic-bezier(.2,.8,.2,1);
        }
        .stream-btn:hover { background: var(--shadow); border-color: var(--gold); color: var(--gold); }
        .stream-btn .arrow { font-size: 18px; }
        .email-cta {
          position: relative;
          padding: 140px 24px 100px;
          background: var(--black);
          overflow: hidden;
        }
        .email-cta-waves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          pointer-events: none;
        }
        .email-cta-inner { max-width: 600px; margin: 0 auto; text-align: center; position: relative; }
        .email-cta p { font-size: 16px; color: rgba(240,230,210,0.65); margin: 16px 0 40px; line-height: 1.6; }
        .email-form { display: flex; gap: 0; max-width: 480px; margin: 0 auto; }
        .email-form input {
          flex: 1;
          padding: 16px 20px;
          background: rgba(240,230,210,0.05);
          border: 1px solid var(--line);
          border-right: none;
          color: var(--bone);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .email-form input::placeholder { color: rgba(240,230,210,0.3); }
        .email-form button {
          padding: 16px 28px;
          background: var(--bone);
          color: var(--ink);
          border: none;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .email-form button:hover { background: var(--gold); }
        .email-success {
          margin-top: 16px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 18px;
          color: var(--gold);
          display: none;
        }
        .email-success.show { display: block; }
        footer { padding: 60px 24px; background: var(--ink); text-align: center; }
        .footer-title { font-family: 'Anton', sans-serif; font-size: 32px; color: var(--bone); letter-spacing: -0.02em; margin-bottom: 24px; }
        .footer-socials { display: flex; justify-content: center; gap: 32px; margin-bottom: 24px; flex-wrap: wrap; }
        .footer-socials a { color: rgba(240,230,210,0.6); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; transition: color 0.2s; }
        .footer-socials a:hover { color: var(--gold); }
        .footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(240,230,210,0.3); letter-spacing: 0.2em; text-transform: uppercase; line-height: 2; }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-track">
          <span>Best Florida Feature — Gasparilla International Film Festival 2025</span>
          <span className="div">✦</span>
          <span>First Feature Film About Skimboarding in Cinema History</span>
          <span className="div">✦</span>
          <span>Starring Jadon Cal Fitzpatrick, David Hamzik, MG Barnes</span>
          <span className="div">✦</span>
          <span>Now Streaming on Plex, Prime Video, Apple TV</span>
          <span className="div">✦</span>
          <span>Best Florida Feature — Gasparilla International Film Festival 2025</span>
          <span className="div">✦</span>
          <span>First Feature Film About Skimboarding in Cinema History</span>
          <span className="div">✦</span>
          <span>Starring Jadon Cal Fitzpatrick, David Hamzik, MG Barnes</span>
          <span className="div">✦</span>
          <span>Now Streaming on Plex, Prime Video, Apple TV</span>
        </div>
      </div>

      {/* NAV */}
      <nav className={navHidden ? "hide" : ""}>
        <a href="#film">The Film</a>
        <a href="#stills">Stills</a>
        <a href="#team">Cast &amp; Crew</a>
        <a href="#merch">Merch</a>
        <a href="#watch">Watch</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-sun" />
        <div className="hero-ocean">
          <div className="hero-water" />
          <div className="hero-shimmer" />
          <div className="hero-waves">
            <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
              <path className="wave-path-1" d="M0,90 Q300,120 600,90 T1200,80 T1800,100 T2400,90 L2400,200 L0,200 Z" fill="#2d5f6e" opacity="0.6"/>
              <path className="wave-path-2" d="M0,130 Q400,110 800,130 T1600,120 T2400,130 L2400,200 L0,200 Z" fill="#1a3d4a" opacity="0.5"/>
            </svg>
          </div>
        </div>
        <div className="hero-sand" />
        <div className="hero-palm-left">
          <svg viewBox="0 0 280 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,420 Q30,300 80,220 Q40,240 20,280 Q50,180 120,100 Q60,140 30,200 Q80,80 160,20 Q80,100 50,180 Q100,60 160,10 Q100,80 70,160 Q140,40 200,0 Q110,80 80,160 Q150,50 220,20 Q130,100 100,180 Q180,80 260,60 Q160,140 120,200 Q200,120 280,120 Q180,180 140,240 Q210,160 280,160 Q200,220 160,280 Q230,200 280,200 Q220,260 180,320 Q250,240 280,240" fill="#2a1f12" opacity="0.6"/>
          </svg>
        </div>
        <div className="hero-palm-right">
          <svg viewBox="0 0 280 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,420 Q30,300 80,220 Q40,240 20,280 Q50,180 120,100 Q60,140 30,200 Q80,80 160,20 Q80,100 50,180 Q100,60 160,10 Q100,80 70,160 Q140,40 200,0 Q110,80 80,160 Q150,50 220,20 Q130,100 100,180 Q180,80 260,60 Q160,140 120,200 Q200,120 280,120 Q180,180 140,240 Q210,160 280,160 Q220,260 180,320 Q250,240 280,240 Q200,220 160,280 Q230,200 280,200 Q220,260 180,320 Q250,240 280,240" fill="#2a1f12" opacity="0.6"/>
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-top">
            <div className="hero-credit">
              <strong>OFF RIP</strong><br/>
              Written &amp; Directed by Jadon Cal Fitzpatrick<br/>
              A New Terrain Creative Production
            </div>
            <div className="hero-laurel">
              Winner — Best Florida Feature<br/>
              Gasparilla International Film Festival 2025
            </div>
          </div>

          <div className="hero-title-block">
            <p className="hero-tag">The first skimboarding sports drama in cinema history</p>
            <h1 className="title">OFF RIP</h1>
            <div className="title-tagline">Shred or Be Shredded</div>
          </div>

          <div className="hero-bottom">
            <p className="hero-sub">
              A young skim-boarder supporting his single mother fights against all odds to become the man his family has never known but has always needed, pushing through trials within friendships, the drug scene, relationships, and competition.
            </p>
            <div className="hero-ctas">
              <a href="#watch" className="btn btn-solid btn-lg"><span>Watch Now</span></a>
              <a href="#film" className="btn btn-lg"><span>About the Film</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER */}
      <section className="trailer-section">
        <div className="trailer-inner">
          <span className="label">Official Trailer</span>
          <h2 className="section-title">Watch the <em>Trailer</em></h2>
          <div className="trailer-embed">
            <iframe
              src="https://www.youtube.com/embed/9eEiEanqUXg?rel=0"
              title="Off Rip — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="press-section">
        <div className="press-inner">
          <span className="label">As Seen On</span>
          <h2 className="section-title">Press <em>Coverage</em></h2>
          <div className="press-embed">
            <iframe
              src="https://www.youtube.com/embed/4_cJfKvtuvo?rel=0"
              title="Off Rip — WFLA Bloom Tampa Bay Coverage"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="press-desc">
            <p>
              After <strong>Hurricanes Helene and Milton</strong> tore through the coastlines of Pinellas County, Florida — the very beaches where <em>Off Rip</em> was filmed — the cast and crew knew they had to come back. Writer-director <strong>Jadon Cal Fitzpatrick</strong>, cinematographer and producer <strong>Jake Jalbert</strong>, and actress <strong>Meghan Carrasquillo</strong> sat down with <em>Bloom Tampa Bay</em> on WFLA News Channel 8 to talk about the film, the community that raised it, and why they returned to host an exclusive Florida screening doubling as a <strong>hurricane relief fundraiser</strong>.
            </p>
            <p style={{ marginTop: '14px' }}>
              <em>Off Rip</em> — the first skimboarding feature film ever made for the big screen — was shot entirely on location along the shores of Pinellas County. When the storms hit, giving back wasn't a question. The screening brought together fans, local supporters, and the filmmaking team for a night of film and community, with all proceeds going toward hurricane recovery efforts for the neighborhoods that gave the movie its soul.
            </p>
            <span className="press-source">WFLA News Channel 8 · Bloom Tampa Bay · Tampa, FL</span>
          </div>
        </div>
      </section>

      {/* SHORELINE QUOTE */}
      <section className="shoreline">
        <div className="shoreline-waves">
          <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
            <path className="wave-path-1" d="M0,100 Q300,70 600,90 T1200,90 T1800,100 T2400,90 L2400,200 L0,200 Z" fill="#2d5f6e" opacity="0.4"/>
            <path className="wave-path-2" d="M0,130 Q400,115 800,130 T1600,125 T2400,130 L2400,200 L0,200 Z" fill="#15110b" opacity="0.6"/>
          </svg>
        </div>
        <div className="shoreline-inner">
          <p className="shoreline-quote">
            "A love letter and a <em>time capsule</em> — the salt-air specificity of <em>Floridian</em> beach culture, captured before the storm."
          </p>
          <div className="shoreline-cite">Pinellas County · Florida</div>
        </div>
      </section>

      <div className="sand-strip" />

      {/* FILM SECTION */}
      <section className="film" id="film">
        <div className="film-grid">
          <div className="poster">
            <img src="/images/3x4 Portrait.png" alt="Off Rip — Official Poster" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div className="film-text">
            <span className="label">The Film</span>
            <h2>A Story of <em>Perseverance</em>.</h2>
            <p className="lead">A young skim-boarder supporting his single mother fights against all odds to become the man his family has never known but has always needed, pushing through trials within friendships, the drug scene, relationships, and competition.</p>
            <p>Shot in St. Petersburg, Florida — the town writer-director-star Jadon Cal Fitzpatrick grew up in. Off Rip is the first feature film ever made about skimboarding. Pro skimmers including Red Bull athlete Lucas Fink appear in the film, with boards by Zap Skimboards out of Venice, FL.</p>
            <div className="pull-quote">
              Hands down the most heartfelt journey I've seen in a while, with sick skimboarding footage that has never been seen with such vibrant colors.
              <cite>— IMDb · 9.3/10</cite>
            </div>
            <p>Funny. Exciting. Specific to the salt-air specificity of Floridian beach culture — and universal in the family at its core.</p>
          </div>
        </div>
      </section>

      {/* STILLS */}
      <section className="stills" id="stills">
        <div className="stills-header">
          <span className="label">From the Film</span>
          <h2 className="section-title">Film <em>Stills</em></h2>
        </div>
        <div className="stills-strip">
          {[
            { file: "Best%20Moments_5.11.1.jpg",      label: "001" },
            { file: "Best%20Moments_5.65.1.jpg",      label: "002" },
            { file: "Best%20Moments_5.92.1.jpg",      label: "003" },
            { file: "Best%20Moments_5.141.1.jpg",     label: "004" },
            { file: "Best%20Moments_5.182.1.jpg",     label: "005" },
            { file: "Best%20Moments_5.242.1.jpg",     label: "006" },
            { file: "Best%20Moments_5.382.1.jpg",     label: "007" },
            { file: "Best%20Moments_5.581.1.jpg",     label: "008" },
            { file: "Best%20Moments_5.883.1.jpg",     label: "009" },
            { file: "Best%20Moments_5.1022.1.jpg",    label: "010" },
            { file: "Best%20Moments_5.1050.1.jpg",    label: "011" },
            { file: "additional%20stills_1.11.1.jpg", label: "012" },
            { file: "Best%20Moments_5.11.1.jpg",      label: "001" },
            { file: "Best%20Moments_5.65.1.jpg",      label: "002" },
            { file: "Best%20Moments_5.92.1.jpg",      label: "003" },
            { file: "Best%20Moments_5.141.1.jpg",     label: "004" },
            { file: "Best%20Moments_5.182.1.jpg",     label: "005" },
            { file: "Best%20Moments_5.242.1.jpg",     label: "006" },
            { file: "Best%20Moments_5.382.1.jpg",     label: "007" },
            { file: "Best%20Moments_5.581.1.jpg",     label: "008" },
            { file: "Best%20Moments_5.883.1.jpg",     label: "009" },
            { file: "Best%20Moments_5.1022.1.jpg",    label: "010" },
            { file: "Best%20Moments_5.1050.1.jpg",    label: "011" },
            { file: "additional%20stills_1.11.1.jpg", label: "012" },
          ].map((s, i) => (
            <div key={i} className="still" style={{ backgroundImage: `url('/images/${s.file}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <span className="still-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="team" id="team">
        <div className="team-inner">
          <div className="team-header">
            <span className="label">Cast &amp; Crew</span>
            <h2 className="section-title">The <em>People</em><br/>Behind the Film</h2>
          </div>
          <div className="team-grid">
            {[
              { initials: "JC", name: "Jadon Cal Fitzpatrick",           role: "Writer · Director · Lead",        bg: "linear-gradient(135deg, #8b4a26, #2a1f12)", photo: "/images/cast/jadon-cal.jpg" },
              { initials: "JJ", name: "Jake Jalbert",                  role: "Cinematographer · Producer",      bg: "linear-gradient(135deg, #2d5f6e, #0a1f28)", photo: null },
              { initials: "DH", name: "David Hamzik",        role: "Brent",                     bg: "linear-gradient(135deg, #2d5f6e, #15110b)", photo: null },
              { initials: "MB", name: "MG Barnes",           role: "Jake",                      bg: "linear-gradient(135deg, #d49050, #5c2e15)", photo: "/images/cast/mg-barnes.jpg" },
              { initials: "NM", name: "Nick McCallum",       role: "Pops",                      bg: "linear-gradient(135deg, #1a3d4a, #0a0907)", photo: "/images/cast/nick-mccallum.jpg" },
              { initials: "MC", name: "Meghan Carrasquillo", role: "Rosie",                     bg: "linear-gradient(135deg, #d4a04a, #5c2e15)", photo: "/images/cast/meghan-carrasquillo.jpg" },
              { initials: "JF", name: "Jim Fitzpatrick",     role: "Producer",                  bg: "linear-gradient(135deg, #5a8a98, #2d5f6e)", photo: "/images/cast/jim-fitzpatrick.jpg" },
              { initials: "NW", name: "Nicole Weider",       role: "Producer",                  bg: "linear-gradient(135deg, #5c2e15, #2a1f12)", photo: "/images/cast/nicole-weider.jpg" },
              { initials: "LF", name: "Lucas Fink",               role: "Pro Skimmer · Red Bull",      bg: "linear-gradient(135deg, #d49050, #2d5f6e)", photo: "/images/cast/lucas-fink.jpg" },
              { initials: "JK", name: "Jodi Knotts-Fitzpatrick", role: "Line Producer",               bg: "linear-gradient(135deg, #5a8a98, #15110b)", photo: null },
              { initials: "JA", name: "Jeff Alpert",              role: "Co-Executive Producer",       bg: "linear-gradient(135deg, #5c2e15, #0a0907)", photo: null },
            ].map(({ initials, name, role, bg, photo }) => (
              <div key={name} className="team-card">
                <div className="team-photo" style={{ background: bg }}>
                  {photo ? <img src={photo} alt={name} /> : <span>{initials}</span>}
                </div>
                <div className="team-name">{name}</div>
                <div className="team-role">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section className="merch" id="merch">
        <div className="merch-inner">
          <div className="merch-header">
            <div>
              <span className="label">The Drop</span>
              <h2 className="section-title">Wear the <em>Film</em></h2>
            </div>
            <a href="#" className="btn"><span>View All →</span></a>
          </div>
          <div className="merch-grid">
            {[
              { type: "product-tee", name: "Logo Tee", meta: "Heavyweight Cotton", price: "$28", inner: "OFF\nRIP" },
              { type: "product-cap", name: "Trucker Cap", meta: "Embroidered", price: "$32", inner: "OR" },
              { type: "product-poster", name: "27×40 Poster", meta: "Theatrical Print", price: "$24", inner: "OFF\nRIP" },
              { type: "product-board", name: "Sticker Pack", meta: "Set of 6", price: "$8", inner: "★" },
            ].map(({ type, name, meta, price, inner }) => (
              <div key={name} className={`product ${type}`}>
                <div className="product-img-wrap">
                  <div className="product-img">
                    <div className="product-img-inner" style={{ whiteSpace: "pre-line" }}>{inner}</div>
                  </div>
                </div>
                <div className="product-info">
                  <div>
                    <div className="product-name">{name}</div>
                    <div className="product-meta">{meta}</div>
                  </div>
                  <div className="product-price">{price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STREAM */}
      <section className="stream" id="watch">
        <div className="stream-inner">
          <div className="stream-header">
            <span className="label">Where to Watch</span>
            <h2 className="section-title">Stream <em>Now</em></h2>
            <p className="stream-sub">Available on all major platforms — wherever you watch the films you love.</p>
          </div>
          <div className="stream-grid">
            {[
              { name: "Apple TV", href: "#" },
              { name: "Prime Video", href: "#" },
              { name: "Plex", href: "https://watch.plex.tv/movie/off-rip" },
              { name: "YouTube", href: "#" },
              { name: "Tubi", href: "#" },
              { name: "Letterboxd", href: "https://letterboxd.com/film/off-rip/" },
            ].map(({ name, href }) => (
              <a key={name} href={href} className="stream-btn" target="_blank" rel="noopener noreferrer">
                <span>{name}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CTA */}
      <section className="email-cta">
        <div className="email-cta-waves">
          <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
            <path className="wave-path-1" d="M0,100 Q300,70 600,90 T1200,90 T1800,100 T2400,90 L2400,200 L0,200 Z" fill="#0a1f28" opacity="0.7"/>
            <path className="wave-path-2" d="M0,130 Q400,115 800,130 T1600,125 T2400,130 L2400,200 L0,200 Z" fill="#15110b" opacity="0.85"/>
          </svg>
        </div>
        <div className="email-cta-inner">
          <span className="label">Stay Close</span>
          <h2 className="section-title">Join the <em>Lineup</em></h2>
          <p>Tour dates, screenings, and the next film from Jadon Cal Fitzpatrick — direct to your inbox.</p>
          <form className="email-form" onSubmit={(e) => { e.preventDefault(); const s = e.currentTarget.querySelector(".email-success") as HTMLElement; if(s) s.classList.add("show"); e.currentTarget.reset(); }}>
            <input type="email" required placeholder="your email address" />
            <button type="submit">Subscribe →</button>
          </form>
          <div className="email-success">— You're in. See you on the sand.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-title">OFF RIP</div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/offripskim/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.imdb.com/title/tt12643976/" target="_blank" rel="noopener noreferrer">IMDb</a>
          <a href="https://letterboxd.com/film/off-rip/" target="_blank" rel="noopener noreferrer">Letterboxd</a>
          <a href="mailto:hello@offripmovie.com">Press</a>
        </div>
        <div className="footer-meta">
          © 2025 Off Rip Movie LLC · All Rights Reserved<br/>
          A Film by Jadon Cal Fitzpatrick · Made in Pinellas County · Florida
        </div>
      </footer>
    </>
  );
}