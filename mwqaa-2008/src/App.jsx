import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, Heart, Quote, Sparkles } from 'lucide-react';
import {
  finalLoveCopy,
  footerCopy,
  giftDetails,
  heroCopy,
  letterCopy,
  memories,
  memoriesCopy,
  pageMeta,
  surpriseCopy,
  wishes,
  wishesCopy,
} from './lib/data.js';
import PasswordGate from './components/password-gate.jsx';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = pageMeta.title;
  }, []);

  const openLetter = () => {
    setIsOpen(true);
    window.setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
    }, 160);
  };

  return (
    <div className={`birthday-page ${isOpen ? 'letter-is-open' : ''}`} dir="rtl">
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true"><Heart size={16} fill="currentColor" /></span>
          <span>{heroCopy.brand}</span>
        </a>
        <nav className="nav-links" aria-label={heroCopy.navLabel}>
          <a href="#letter">{heroCopy.nav.letter}</a>
          <a href="#memories">{heroCopy.nav.memories}</a>
          <a href="#surprise">{heroCopy.nav.surprise}</a>
        </nav>
      </header>

      <main>
        <section className={`hero ${isOpen ? 'is-open' : ''}`} id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 className="hero-title" id="hero-title">
              {heroCopy.titleBefore} <em>{giftDetails.recipient}</em>{heroCopy.titleAfter}
            </h1>
            <p className="hero-description">{heroCopy.description}</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={openLetter}>
                {heroCopy.openLetter}<ArrowLeft size={17} aria-hidden="true" />
              </button>
              <a className="outline-button" href="#memories">
                {heroCopy.browseMemories}<ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-art" aria-label={heroCopy.envelopeLabel} role="img">
            <div className="envelope">
              <div className="letter-peek">
                <span className="eyebrow">{heroCopy.titleBefore} {giftDetails.recipient}</span>
                <div className="letter-lines" aria-hidden="true"><span /><span /><span /><span /></div>
              </div>
              <div className="seal" aria-hidden="true"><Heart size={29} fill="currentColor" /></div>
            </div>
            <span className="art-caption">{heroCopy.openSlowly}</span>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span />{heroCopy.scrollCue}</div>
        </section>

        <section className="section letter-section reveal" id="letter" aria-labelledby="letter-heading">
          <div className="letter-intro">
            <div className="section-label">{letterCopy.label}</div>
            <h2 className="section-heading" id="letter-heading">{letterCopy.heading}</h2>
            <p>{letterCopy.intro}</p>
          </div>
          <article className="paper">
            <p className="paper-kicker">{letterCopy.greeting} {giftDetails.recipient}،</p>
            {letterCopy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <span className="paper-signature">{letterCopy.signaturePrefix} {giftDetails.sender}</span>
          </article>
        </section>

        <section className="section memories-section reveal" id="memories" aria-labelledby="memories-heading">
          <div className="memory-header">
            <div><h2 className="section-heading" id="memories-heading">{memoriesCopy.heading}</h2></div>
            <p>{memoriesCopy.description}</p>
          </div>
          <div className="memory-layout">
            <div className="memory-list" aria-label={memoriesCopy.tabListLabel}>
              {memories.map((memory, index) => (
                <article className="memory-tab" key={memory.title}>
                  <span className="memory-index">٠{index + 1}</span>
                  <span><strong>{memory.title}</strong><small>{memory.subtitle}</small></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section surprise-section reveal" id="surprise" aria-labelledby="surprise-heading">
          <div className="surprise-copy">
            <span className="eyebrow">{surpriseCopy.eyebrow}</span>
            <div className="section-label">{surpriseCopy.label}</div>
            <h2 className="section-heading" id="surprise-heading">{surpriseCopy.heading}</h2>
            <p>{surpriseCopy.description}</p>
          </div>
          <div className="gift-wrap">
            <div className="gift-glow" aria-hidden="true" />
            <button className={`gift ${revealed ? 'is-revealed' : ''}`} type="button" onClick={() => setRevealed((value) => !value)} aria-expanded={revealed} aria-label={revealed ? surpriseCopy.openedAriaLabel : surpriseCopy.closedAriaLabel}>
              <span className="gift-ribbon" aria-hidden="true" />
              <span className="gift-word">{revealed ? surpriseCopy.openedGift : surpriseCopy.closedGift}</span>
            </button>
            {revealed && <div className="surprise-note" role="status"><strong>{surpriseCopy.noteTitle}</strong><p>{surpriseCopy.note}</p></div>}
          </div>
        </section>

        <section className="section wish-section reveal" aria-labelledby="wish-heading">
          <div className="section-label">{wishesCopy.label}</div>
          <h2 className="section-heading" id="wish-heading">{wishesCopy.heading}</h2>
          <p className="wish-lead">{wishesCopy.lead}</p>
          <div className="wish-grid">
            {wishes.map((wish, index) => (
              <article className="wish-card" key={wish.title}>
                {index === 1 ? <Sparkles size={20} aria-hidden="true" /> : <Quote size={20} aria-hidden="true" />}
                <h3>{wish.title}</h3><p>{wish.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-love-section reveal" id="final-message" aria-labelledby="final-love-heading">
          <div className="final-love-heading">
            <div className="section-label">{finalLoveCopy.label}</div>
            <h2 className="section-heading" id="final-love-heading">{finalLoveCopy.heading}</h2>
            <p>{finalLoveCopy.intro}</p>
          </div>
          <div className="final-love-layout">
            <figure className="final-love-photo">
              <img src="/assets/love-photo.jpeg" alt="صورة تجمع حلمنا الجميل" />
              <figcaption>صورة لحلمنا الجميل</figcaption>
            </figure>
            <article className="final-love-letter">
              {finalLoveCopy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <span className="final-love-signature">{finalLoveCopy.signature}</span>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="footer-inner"><span className="footer-mark"><Heart size={14} fill="currentColor" aria-hidden="true" />{giftDetails.yearMark}</span><span>{footerCopy.madeWithLove}</span><span>{giftDetails.date}</span></div></footer>
    </div>
  );
}

export default function App() {
  return <PasswordGate><Home /></PasswordGate>;
}
