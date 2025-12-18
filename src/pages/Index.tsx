import { useEffect, useRef } from "react";

const Index = () => {
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-primary: #030712;
          --bg-secondary: #0a1628;
          --bg-card: #111827;
          --accent-primary: #06b6d4;
          --accent-secondary: #8b5cf6;
          --accent-gradient: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --border-color: rgba(6, 182, 212, 0.2);
          --glow: 0 0 40px rgba(6, 182, 212, 0.3);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.7;
          overflow-x: hidden;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .bg-animation::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.05) 0%, transparent 30%);
          animation: bgFloat 20s ease-in-out infinite;
        }

        @keyframes bgFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(2%, 2%) rotate(1deg); }
          66% { transform: translate(-1%, 1%) rotate(-1deg); }
        }

        .grid-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: -1;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 1.5rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          backdrop-filter: blur(20px);
          background: rgba(3, 7, 18, 0.8);
          border-bottom: 1px solid var(--border-color);
        }

        .logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--accent-primary);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 5% 4rem;
          position: relative;
        }

        .hero-content {
          max-width: 900px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--accent-primary);
          margin-bottom: 2rem;
          animation: fadeInUp 0.8s ease forwards;
        }

        .hero-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.8s ease 0.1s forwards;
          opacity: 0;
        }

        .hero h1 span {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto 2.5rem;
          animation: fadeInUp 0.8s ease 0.2s forwards;
          opacity: 0;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.3s forwards;
          opacity: 0;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: var(--accent-gradient);
          color: var(--bg-primary);
          box-shadow: var(--glow);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 60px rgba(6, 182, 212, 0.5);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: rgba(6, 182, 212, 0.1);
          border-color: var(--accent-primary);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%);
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
          bottom: 20%;
          left: 5%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        section {
          padding: 6rem 5%;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
        }

        .about {
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }

        .about-image {
          position: relative;
        }

        .about-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 400px;
          margin: 0 auto;
        }

        .about-image-bg {
          position: absolute;
          inset: -20px;
          background: var(--accent-gradient);
          border-radius: 30px;
          opacity: 0.2;
          transform: rotate(6deg);
        }

        .about-image-main {
          position: relative;
          width: 100%;
          height: 100%;
          background: var(--bg-card);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .about-avatar {
          font-size: 8rem;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-content h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }

        .about-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--bg-card);
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .skills {
          background: var(--bg-secondary);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .skill-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .skill-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: var(--glow);
        }

        .skill-icon {
          width: 60px;
          height: 60px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }

        .skill-card h4 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.4rem 0.8rem;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .experience {
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--accent-gradient);
        }

        .timeline-item {
          padding-left: 3rem;
          padding-bottom: 3rem;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 14px;
          height: 14px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-primary);
        }

        .timeline-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }

        .timeline-company {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .timeline-content {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .timeline-content ul {
          color: var(--text-secondary);
          padding-left: 1.2rem;
        }

        .timeline-content li {
          margin-bottom: 0.5rem;
        }

        .projects {
          background: var(--bg-primary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-card {
          background: var(--bg-card);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--glow);
          border-color: var(--accent-primary);
        }

        .project-image {
          height: 200px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          position: relative;
          overflow: hidden;
        }

        .project-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .project-card:hover .project-image::before {
          transform: translateX(100%);
        }

        .project-content {
          padding: 2rem;
        }

        .project-content h4 {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
        }

        .project-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .project-tech span {
          padding: 0.3rem 0.7rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--accent-secondary);
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 500;
          transition: gap 0.3s ease;
        }

        .project-link:hover {
          gap: 1rem;
        }

        .achievements {
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .achievement-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .achievement-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .achievement-card:hover {
          border-color: var(--accent-primary);
        }

        .achievement-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .achievement-card h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--accent-primary);
        }

        .achievement-card h5 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .achievement-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .publications {
          background: var(--bg-secondary);
        }

        .publications-list {
          max-width: 900px;
          margin: 0 auto;
        }

        .publication-item {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .publication-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .publication-item:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--glow);
        }

        .publication-item h4 {
          font-size: 1.15rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .publication-doi {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent-primary);
          word-break: break-all;
        }

        .education {
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .education-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .education-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .education-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-gradient);
        }

        .education-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .education-card h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .education-card h5 {
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }

        .education-card p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .contact {
          background: var(--bg-primary);
          text-align: center;
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-content > p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .contact-email {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.3rem;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-link:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--glow);
          transform: translateY(-3px);
        }

        .contact-link span:first-child {
          font-size: 1.5rem;
        }

        footer {
          background: var(--bg-secondary);
          padding: 3rem 5%;
          text-align: center;
          border-top: 1px solid var(--border-color);
        }

        footer p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        footer p span {
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          nav {
            padding: 1rem 5%;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 6rem 5% 3rem;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-stats {
            grid-template-columns: 1fr;
          }

          .timeline::before {
            left: 6px;
          }

          .timeline-item {
            padding-left: 2.5rem;
          }

          .timeline-item::before {
            left: 0;
          }

          .projects-grid,
          .achievements-grid,
          .education-grid {
            grid-template-columns: 1fr;
          }

          .contact-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="bg-animation"></div>
      <div className="grid-pattern"></div>

      {/* Navigation */}
      <nav>
        <div className="logo">&lt;SHR /&gt;</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span></span>
            Available for opportunities
          </div>
          <h1>Hi, I'm <span>Sadib Hassan Rumman</span></h1>
          <p className="hero-subtitle">
            Full Stack Developer & Machine Learning Engineer crafting secure, scalable applications with cutting-edge technology
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-header">
          <p className="section-tag">About Me</p>
          <h2 className="section-title">Passionate About Building</h2>
        </div>
        <div className="about-grid">
          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="about-image-bg"></div>
              <div className="about-image-main">
                <span className="about-avatar">👨‍💻</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <h3>Software Engineer & AI Enthusiast</h3>
            <p>
              A highly skilled and results-driven Software Engineer with hands-on experience in Full Stack Development, Machine Learning, and Software Security. Currently pursuing my M.Sc. in Software Engineering at University of Dhaka.
            </p>
            <p>
              I specialize in designing, developing, and optimizing web and mobile applications with a strong focus on security, scalability, and performance. My expertise spans from frontend development with React to backend systems with Node.js, and cutting-edge ML implementations.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Publications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Hackathon Wins</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3.51</div>
                <div className="stat-label">CGPA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="section-header">
          <p className="section-tag">Expertise</p>
          <h2 className="section-title">Technical Skills</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">⚛️</div>
            <h4>Frontend Development</h4>
            <div className="skill-tags">
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">React Native</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">JavaScript</span>
            </div>
          </div>
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">🔧</div>
            <h4>Backend Development</h4>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">RESTful APIs</span>
              <span className="skill-tag">WebSocket</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Java</span>
            </div>
          </div>
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">🗄️</div>
            <h4>Database & Cloud</h4>
            <div className="skill-tags">
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">MySQL</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">CI/CD</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Kubernetes</span>
            </div>
          </div>
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">🤖</div>
            <h4>Machine Learning & AI</h4>
            <div className="skill-tags">
              <span className="skill-tag">TensorFlow</span>
              <span className="skill-tag">PyTorch</span>
              <span className="skill-tag">YOLO</span>
              <span className="skill-tag">LLMs</span>
              <span className="skill-tag">NLP</span>
              <span className="skill-tag">Deep Learning</span>
            </div>
          </div>
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">🔐</div>
            <h4>Software Security</h4>
            <div className="skill-tags">
              <span className="skill-tag">Secure SDLC</span>
              <span className="skill-tag">OWASP</span>
              <span className="skill-tag">Cryptography</span>
              <span className="skill-tag">Threat Modeling</span>
              <span className="skill-tag">Data Privacy</span>
            </div>
          </div>
          <div className="skill-card" ref={addToRefs}>
            <div className="skill-icon">📱</div>
            <h4>Mobile Development</h4>
            <div className="skill-tags">
              <span className="skill-tag">React Native</span>
              <span className="skill-tag">Cross-platform</span>
              <span className="skill-tag">Mobile UI/UX</span>
              <span className="skill-tag">App Deployment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="section-header">
          <p className="section-tag">Career</p>
          <h2 className="section-title">Professional Experience</h2>
        </div>
        <div className="timeline">
          <div className="timeline-item" ref={addToRefs}>
            <div className="timeline-date">2024 - Present</div>
            <div className="timeline-title">Software Developer (Contract)</div>
            <div className="timeline-company">SoftKarrotBD</div>
            <div className="timeline-content">
              <ul>
                <li>Lead the development of secure, scalable, and high-performance web and mobile applications using React.js, Node.js, and React Native</li>
                <li>Collaborated with cross-functional teams to design and implement end-to-end solutions for e-commerce, healthcare, and enterprise applications</li>
                <li>Utilized Docker and Kubernetes for containerization and deployment, ensuring seamless CI/CD workflows</li>
                <li>Integrated Machine Learning models (NLP, Object Detection) to enhance features like recommendation engines</li>
                <li>Implemented secure authentication, data encryption, and security best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="section-header">
          <p className="section-tag">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-grid">
          <div className="project-card" ref={addToRefs}>
            <div className="project-image">🛒</div>
            <div className="project-content">
              <h4>FullStopBD</h4>
              <p>E-commerce platform providing integrated services like blood donation, product reselling, and job education courses.</p>
              <div className="project-tech">
                <span>React.js</span>
                <span>Node.js</span>
                <span>React Native</span>
                <span>MongoDB</span>
                <span>Docker</span>
              </div>
              <a href="https://fullstopbd.xyz" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Site →
              </a>
            </div>
          </div>
          <div className="project-card" ref={addToRefs}>
            <div className="project-image" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)" }}>⚖️</div>
            <div className="project-content">
              <h4>Bhola Bar Association</h4>
              <p>Web and mobile application for managing Bhola Bar Association's operations with modern tech stack.</p>
              <div className="project-tech">
                <span>React.js</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MongoDB</span>
              </div>
              <a href="https://bholabarassociation.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Site →
              </a>
            </div>
          </div>
          <div className="project-card" ref={addToRefs}>
            <div className="project-image" style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" }}>♻️</div>
            <div className="project-content">
              <h4>Waste Management System</h4>
              <p>National Finalist project at CodeSamurai Hackathon 2024. Complete waste management solution with web and mobile apps.</p>
              <div className="project-tech">
                <span>React.js</span>
                <span>Node.js</span>
                <span>React Native</span>
                <span>Docker</span>
              </div>
              <span className="project-link">Hackathon Project</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements">
        <div className="section-header">
          <p className="section-tag">Recognition</p>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="achievements-grid">
          <div className="achievement-card" ref={addToRefs}>
            <div className="achievement-icon">🏆</div>
            <h4>National Finalist</h4>
            <h5>CodeSamurai Hackathon 2024</h5>
            <p>CSE, University of Dhaka - Developed a comprehensive waste management system with React.js frontend, Node.js backend, and React Native mobile app.</p>
          </div>
          <div className="achievement-card" ref={addToRefs}>
            <div className="achievement-icon">🥇</div>
            <h4>Regional Champion</h4>
            <h5>BD Apps Hackathon 2023</h5>
            <p>Khulna/Barishal Region - Awarded for innovative mobile game app "TurboRush" with team Trojan Horse.</p>
          </div>
          <div className="achievement-card" ref={addToRefs}>
            <div className="achievement-icon">🥈</div>
            <h4>Runners-up</h4>
            <h5>National Mobile App Contest 2022</h5>
            <p>Ministry of ICT, South Region - Developed "Shorosheba", a medical facility app for patients seeking timely medical advice.</p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="publications">
        <div className="section-header">
          <p className="section-tag">Research</p>
          <h2 className="section-title">Publications</h2>
        </div>
        <div className="publications-list">
          <div className="publication-item" ref={addToRefs}>
            <h4>Improving Accuracy in Medical Imaging: A YOLO-NAS and SAM Hybrid Approach for Enhanced Medical Image Segmentation</h4>
            <p className="publication-doi">DOI: 10.1109/ICCIT64611.2024.11022134</p>
          </div>
          <div className="publication-item" ref={addToRefs}>
            <h4>Leveraging Large Language Models for Text-to-SQL with Attention to Data Security</h4>
            <p className="publication-doi">DOI: https://doi.org/10.1007/978-981-96-2721-9</p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="section-header">
          <p className="section-tag">Academic</p>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-grid">
          <div className="education-card" ref={addToRefs}>
            <div className="education-icon">🎓</div>
            <h4>M.Sc. in Software Engineering</h4>
            <h5>University of Dhaka</h5>
            <p>Ongoing - Institute of Information Technology</p>
          </div>
          <div className="education-card" ref={addToRefs}>
            <div className="education-icon">📚</div>
            <h4>B.Sc. in Computer Science & Engineering</h4>
            <h5>University of Barishal</h5>
            <p>CGPA: 3.51 | Graduation: 2024</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-header">
          <p className="section-tag">Get In Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
        </div>
        <div className="contact-content">
          <p>I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!</p>
          <p className="contact-email">rumman.cse5.bu@gmail.com</p>
          <div className="contact-links">
            <a href="mailto:rumman.cse5.bu@gmail.com" className="contact-link">
              <span>📧</span>
              <span>Email</span>
            </a>
            <a href="https://github.com/rumman9799" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>💻</span>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/sadib-hassan-rumman" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://scholar.google.com/citations?user=sadib-hassan-rumman" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>📖</span>
              <span>Google Scholar</span>
            </a>
            <a href="tel:+8801712258291" className="contact-link">
              <span>📱</span>
              <span>+880 1712 258291</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 <span>Sadib Hassan Rumman</span>. Built with passion & code.</p>
      </footer>
    </>
  );
};

export default Index;