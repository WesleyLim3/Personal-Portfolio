import { useEffect, useRef, useState } from 'react'
import court from './assets/portfolio/red-home-court-basic-markings.png'
import graduationPhoto from './assets/portfolio/wes-tux.jpeg'
import './App.css'

const sections = ['About', 'Projects', 'Experience', 'Skills', 'Contact']
const skillGroups = [
  { category: 'Languages', skills: [
    { name: 'Python', icon: 'python' },
    { name: 'Java', icon: 'java' },
    { name: 'C', icon: 'c' },
  ] },
  { category: 'Frameworks & Libraries', skills: [
    { name: 'React', icon: 'react' },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'Streamlit', icon: 'streamlit' },
  ] },
  { category: 'Tools & Technologies', skills: [
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'REST APIs', icon: 'rest-api' },
    { name: 'VS Code', icon: 'vscode' },
    { name: 'Eclipse', icon: 'eclipse' },
    { name: 'PyCharm', icon: 'pycharm' },
    { name: 'macOS/Linux Command Line', icon: 'terminal' },
  ] },
]
type IntroPhase = 'intro' | 'revealing' | 'ready'

function playMenuSound() {
  const context = new AudioContext()
  const gain = context.createGain()
  gain.gain.setValueAtTime(0.035, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16)
  gain.connect(context.destination)
  const oscillator = context.createOscillator()
  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(520, context.currentTime)
  oscillator.frequency.setValueAtTime(780, context.currentTime + 0.07)
  oscillator.connect(gain)
  oscillator.start()
  oscillator.stop(context.currentTime + 0.16)
  oscillator.onended = () => { void context.close() }
}

function App() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    window.location.hash && window.location.hash !== '#home' ? 'ready' : 'intro',
  )
  const [soundOn, setSoundOn] = useState(false)
  const [fullscreenError, setFullscreenError] = useState('')
  const consoleRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const introStartRef = useRef<HTMLButtonElement>(null)
  const portfolioStartRef = useRef<HTMLAnchorElement>(null)
  const didStartRef = useRef(false)
  const introActive = introPhase !== 'ready'

  useEffect(() => {
    if (introPhase === 'ready' && didStartRef.current) {
      portfolioStartRef.current?.focus({ preventScroll: true })
      didStartRef.current = false
    }
  }, [introPhase])

  useEffect(() => {
    if (!introActive) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    introStartRef.current?.focus({ preventScroll: true })
    return () => { document.body.style.overflow = previousOverflow }
  }, [introActive])

  useEffect(() => {
    if (introPhase !== 'revealing') return
    const overlay = introRef.current
    const screen = screenRef.current
    if (!overlay || !screen) return

    const finish = () => {
      setIntroPhase('ready')
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    const target = screen.getBoundingClientRect()
    const animation = overlay.animate([
      { top: '0px', left: '0px', width: `${window.innerWidth}px`, height: `${window.innerHeight}px`, borderRadius: '0px', opacity: 1 },
      { top: `${target.top}px`, left: `${target.left}px`, width: `${target.width}px`, height: `${target.height}px`, borderRadius: '6px', opacity: 1 },
    ], { duration: 1250, easing: 'cubic-bezier(0.65, 0, 0.2, 1)', fill: 'forwards' })
    animation.onfinish = finish
    // A viewport change invalidates the measured destination; reveal the responsive console.
    window.addEventListener('resize', finish, { once: true })
    return () => {
      animation.cancel()
      window.removeEventListener('resize', finish)
    }
  }, [introPhase])

  function startPortfolio() {
    if (introPhase !== 'intro') return
    didStartRef.current = true
    menuSound()
    setIntroPhase('revealing')
  }

  function menuSound() {
    if (soundOn) playMenuSound()
  }

  function toggleSound() {
    if (!soundOn) playMenuSound()
    setSoundOn(!soundOn)
  }

  async function expandScreen() {
    menuSound()
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await consoleRef.current?.requestFullscreen()
      setFullscreenError('')
    } catch {
      setFullscreenError('Full screen is unavailable in this browser.')
    }
  }

  return (
    <>
    <div className={`portfolio intro-${introPhase}`} inert={introActive} aria-hidden={introActive ? true : undefined}>
      <nav className="arcade-nav" aria-label="Main navigation">
        <span className="nav-dpad" aria-hidden="true"><i /></span>
        <div className="nav-sections">
          {sections.map((section, index) => (
            <a key={section} href={`#${section.toLowerCase()}`} onClick={menuSound}>
              <span className="nav-number" aria-hidden="true">0{index + 1}</span>
              <span>{section}</span>
              <span className="nav-arrow" aria-hidden="true">▶</span>
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="home" className="hero" aria-labelledby="intro-title">
          <div className="game-console" ref={consoleRef}>
            <div className="screen-bezel">
              <div className="game-screen" ref={screenRef}>
                <img className="court-image" src={court} alt="Retro basketball arena with black seating, red and white accents, and a red W at center court" fetchPriority="high" />
                <div className="screen-shade" aria-hidden="true" />
                <div className="screen-hud"><span><span className="live-dot" /> 1P · HOME COURT</span><button onClick={toggleSound} aria-pressed={soundOn} aria-label={`Turn menu sounds ${soundOn ? 'off' : 'on'}`}>SFX <span>{soundOn ? 'ON' : 'OFF'}</span></button></div>
                <div className="screen-intro">
                  <h1 id="intro-title">WESLEY LIM</h1>
                  <p className="screen-subheading">Personal Portfolio</p>
                </div>
                <div className="screen-menu">
                  <a className="start-button" href="#about" onClick={menuSound} ref={portfolioStartRef}><span className="start-arrow" aria-hidden="true">▶</span> PRESS START</a>
                </div>
                <div className="scanlines" aria-hidden="true" />
              </div>
            </div>
            <div className="console-deck">
              <div className="console-model"><span className="console-vents" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span><span>WL–01 <small>HOME COURT SYSTEM</small></span></div>
              <div className="console-power"><i /><span>POWER</span></div>
              <div className="console-controls"><button className="expand-button" onClick={() => { void expandScreen() }} aria-label="Toggle full screen"><span aria-hidden="true">⛶</span><span>FULL SCREEN</span></button><a href="#projects" onClick={menuSound} aria-label="View projects"><span className="console-key key-a">A</span><span>PROJECTS</span></a><a href="#experience" onClick={menuSound} aria-label="View experience"><span className="console-key key-b">B</span><span>EXPERIENCE</span></a></div>
            </div>
          </div>
          {fullscreenError && <p className="fullscreen-message" role="status">{fullscreenError}</p>}
        </section>

        <section id="about" className="portfolio-section about-section" aria-labelledby="about-title">
          <p className="section-eyebrow"><span>01</span>ABOUT ME</p>
          <h2 id="about-title">Hard Worker.<br />Problem Solver.<br />Team Player.</h2>
          <div className="about-copy">
            <p>Hi! I’m Wes, a Computer Science student at the University of Maryland. I enjoy building practical applications, exploring artificial intelligence, and turning ideas into working software.</p>
            <p>In my free time I love to play basketball and watch movies!</p>
          </div>
          <img className="about-photo" src={graduationPhoto} alt="Wesley Lim’s graduation portrait in a tuxedo against a blue backdrop" width="2375" height="2973" loading="lazy" decoding="async" />
        </section>

        <section id="projects" className="portfolio-section content-section" aria-labelledby="projects-title"><p className="section-eyebrow"><span>02</span>PROJECTS</p><div className="section-heading"><h2 id="projects-title">Projects</h2><span aria-hidden="true">↗</span></div></section>
        <section id="experience" className="portfolio-section content-section" aria-labelledby="experience-title"><p className="section-eyebrow"><span>03</span>EXPERIENCE</p><div className="section-heading"><h2 id="experience-title">Experience</h2><span aria-hidden="true">↗</span></div></section>
        <section id="skills" className="portfolio-section skills-section" aria-labelledby="skills-title">
          <div><p className="section-eyebrow"><span>04</span>SKILLS</p><h2 id="skills-title">Always leveling up.</h2></div>
          <dl className="skills-details">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <dt>{group.category}</dt>
                <dd><ul>{group.skills.map((skill) => (
                  <li className="skill-card" key={skill.name}>
                    <img className={`skill-icon${skill.icon === 'github' ? ' skill-icon-light' : ''}`} src={`/skill-icons/${skill.icon}.svg`} alt="" width="64" height="64" loading="lazy" decoding="async" />
                    <span>{skill.name}</span>
                  </li>
                ))}</ul></dd>
              </div>
            ))}
          </dl>
        </section>
        <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
          <div className="contact-intro">
            <p className="section-eyebrow"><span>05</span>CONTACT</p>
            <h2 id="contact-title">Good things start<br />with a team.</h2>
            <p className="contact-copy">I'm always looking for new opportunities to learn and grow. Feel free to reach out to me!</p>
            <a className="back-to-court" href="#home" onClick={menuSound}>BACK TO THE COURT <span aria-hidden="true">↑</span></a>
          </div>
          <div className="contact-links">
            <a href="mailto:wesley.a.lim@gmail.com" onClick={menuSound}>Email Me <span className="contact-arrow-up-right" aria-hidden="true">↓</span></a>
            <a href="/wesley-lim-resume.pdf" download="Wesley Lim Resume.pdf" onClick={menuSound}>Download Resume <span aria-hidden="true">↓</span></a>
            <a href="https://www.linkedin.com/in/wesley-lim-b122a3381" target="_blank" rel="noopener noreferrer" onClick={menuSound}>LinkedIn <span className="contact-arrow-up-right" aria-hidden="true">↓</span></a>
          </div>
        </section>
      </main>
    </div>
    {introActive && (
      <section className={`intro-screen ${introPhase === 'revealing' ? 'is-revealing' : ''}`} ref={introRef} aria-label="Enter Wesley Lim’s portfolio" aria-busy={introPhase === 'revealing'}>
        <img className="court-image" src={court} alt="Retro basketball court with red and black seating and a red W at center court" fetchPriority="high" />
        <div className="screen-shade" aria-hidden="true" />
        <div className="screen-hud intro-reveal-detail" aria-hidden="true"><span><span className="live-dot" /> 1P · HOME COURT</span><span>SFX OFF</span></div>
        <div className="screen-intro"><h1>WESLEY LIM</h1><p className="screen-subheading">Personal Portfolio</p></div>
        <div className="screen-menu"><button className="start-button" onClick={startPortfolio} ref={introStartRef} disabled={introPhase === 'revealing'}><span className="start-arrow" aria-hidden="true">▶</span> PRESS START</button></div>
        <div className="scanlines" aria-hidden="true" />
      </section>
    )}
    </>
  )
}

export default App
