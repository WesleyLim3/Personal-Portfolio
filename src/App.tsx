import marylandLogo from './assets/portfolio/X5.png'
import adcLogo from './assets/portfolio/adc-logo.png'
import portrait from './assets/portfolio/wes-tux.jpeg'
import './App.css'

const sections = ['About', 'Projects', 'Experience', 'Skills', 'Contact']

function App() {
  return (
    <>
      <header className="site-header">
        <nav aria-label="Main navigation">
          {sections.map((section) => (
            <a key={section} href={`#${section.toLowerCase()}`}>{section}</a>
          ))}
        </nav>
      </header>
      <main>
        <section id="about" className="hero" aria-labelledby="intro-title">
          <div className="hero-copy">
            <h1 id="intro-title">Hi, I’m Wes</h1>
            <p>
              I am a Computer Science student at the University of Maryland, passionate
              about Software Engineering and Artificial Intelligence. I enjoy building
              applications and software to solve problems.
            </p>
          </div>
          <div className="hero-visual">
            <div className="image-rotation">
              <img className="hero-image portrait" src={portrait} alt="Wesley Lim" />
              <img className="hero-image maryland" src={marylandLogo} alt="University of Maryland logo" />
              <img className="hero-image adc" src={adcLogo} alt="ADC logo" />
            </div>
          </div>
        </section>
        {sections.slice(1).map((section) => (
          <section
            key={section}
            id={section.toLowerCase()}
            className="content-section"
            aria-labelledby={`${section.toLowerCase()}-title`}
          >
            <h2 id={`${section.toLowerCase()}-title`}>{section}</h2>
          </section>
        ))}
      </main>
    </>
  )
}

export default App
