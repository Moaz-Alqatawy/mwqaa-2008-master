import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowLeft,
  ChevronLeft,
  Gift,
  Heart,
  Orbit,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import finalLovePhoto from '../../../attached_assets/WhatsApp_Image_2026-09-06_at_6.37.06_AM_(1)_1788810447761.jpeg';
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
  universeCopy,
  universePlanets,
  wishes,
  wishesCopy,
} from '@/lib/data';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = pageMeta.title;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', pageMeta.description);
    setMeta('og:title', pageMeta.title, true);
    setMeta('og:description', pageMeta.socialDescription, true);
    setMeta('og:type', 'website', true);
  }, []);

  const openLetter = () => {
    setIsOpen(true);
    window.setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 160);
  };

  return (
    <div className="birthday-page" dir="rtl">
      <header className="site-header" data-testid="header-main">
        <a className="brand" href="#top" data-testid="link-home">
          <span className="brand-mark" aria-hidden="true">
            <Heart size={16} fill="currentColor" />
          </span>
          <span>{heroCopy.brand}</span>
        </a>
        <nav className="nav-links" aria-label={heroCopy.navLabel}>
          <a href="#letter" data-testid="link-letter">{heroCopy.nav.letter}</a>
          <a href="#memories" data-testid="link-memories">{heroCopy.nav.memories}</a>
          <a href="#surprise" data-testid="link-surprise">{heroCopy.nav.surprise}</a>
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
              <button
                className="primary-button"
                type="button"
                onClick={openLetter}
                data-testid="button-open-letter"
              >
                {heroCopy.openLetter}
                <ArrowLeft size={17} aria-hidden="true" />
              </button>
              <a className="outline-button" href="#memories" data-testid="link-browse-memories">
                {heroCopy.browseMemories}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-art" aria-label={heroCopy.envelopeLabel} role="img">
            <div className="envelope">
              <div className="letter-peek">
                <span className="eyebrow">{heroCopy.titleBefore} {giftDetails.recipient}</span>
                <div className="letter-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="seal" aria-hidden="true">
                <Heart size={29} fill="currentColor" />
              </div>
            </div>
            <span className="art-caption">{heroCopy.openSlowly}</span>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span />
            {heroCopy.scrollCue}
          </div>
        </section>

        <section className="section letter-section reveal" id="letter" aria-labelledby="letter-heading">
          <div className="letter-intro">
            <div className="section-label">{letterCopy.label}</div>
            <h2 className="section-heading" id="letter-heading">{letterCopy.heading}</h2>
            <p>{letterCopy.intro}</p>
          </div>
          <article className="paper" data-testid="article-love-letter">
            <p className="paper-kicker">{letterCopy.greeting} {giftDetails.recipient}،</p>
            {letterCopy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <span className="paper-signature">{letterCopy.signaturePrefix} {giftDetails.sender}</span>
          </article>
        </section>

        <section className="section memories-section reveal" id="memories" aria-labelledby="memories-heading">
          <div className="memory-header">
            <div>
                <h2 className="section-heading" id="memories-heading">{memoriesCopy.heading}</h2>
            </div>
            <p>{memoriesCopy.description}</p>
          </div>

          <div className="memory-layout">
            <div className="memory-list" aria-label={memoriesCopy.tabListLabel}>
              {memories.map((memory, index) => (
                <article
                  className="memory-tab"
                  key={memory.title}
                  data-testid={`button-memory-${index + 1}`}
                >
                  <span className="memory-index">٠{index + 1}</span>
                  <span>
                    <strong>{memory.title}</strong>
                    <small>{memory.subtitle}</small>
                  </span>
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
            <button
              className={`gift ${revealed ? 'is-revealed' : ''}`}
              type="button"
              onClick={() => setRevealed((value) => !value)}
              aria-label={revealed ? surpriseCopy.openedAriaLabel : surpriseCopy.closedAriaLabel}
              aria-expanded={revealed}
              data-testid="button-reveal-surprise"
            >
              <span className="gift-ribbon" aria-hidden="true" />
              <span className="gift-word">{revealed ? surpriseCopy.openedGift : surpriseCopy.closedGift}</span>
            </button>
            {revealed && (
              <div className="surprise-note" role="status" data-testid="status-surprise-note">
                <strong>{surpriseCopy.noteTitle}</strong>
                <p>{surpriseCopy.note}</p>
              </div>
            )}
          </div>
        </section>

        <section className="section wish-section reveal" aria-labelledby="wish-heading">
          <div className="section-label">{wishesCopy.label}</div>
          <h2 className="section-heading" id="wish-heading">{wishesCopy.heading}</h2>
          <p className="wish-lead">{wishesCopy.lead}</p>

          <div className="wish-grid">
            {wishes.map((wish, index) => (
              <article className="wish-card" key={wish.title} data-testid={`card-wish-${index + 1}`}>
                {index === 1 ? (
                  <Sparkles size={20} aria-hidden="true" />
                ) : (
                  <Quote size={20} aria-hidden="true" />
                )}
                <h3>{wish.title}</h3>
                <p>{wish.text}</p>
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
              <img src={finalLovePhoto} alt="صورة تجمع حلمنا الجميل" />
              <figcaption>صورة لحلمنا الجميل</figcaption>
            </figure>
            <article className="final-love-letter">
              {finalLoveCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <span className="final-love-signature">{finalLoveCopy.signature}</span>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-mark">
            <Heart size={14} fill="currentColor" aria-hidden="true" />
            {giftDetails.yearMark}
          </span>
          <span>{footerCopy.madeWithLove}</span>
          <span>{giftDetails.date}</span>
        </div>
      </footer>

    </div>
  );
}

function DigitalUniverse({ onClose }: { onClose: () => void }) {
  const [activePlanet, setActivePlanet] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="universe-overlay" role="dialog" aria-modal="true" aria-labelledby="universe-heading">
      <div className="universe-stars universe-stars-back" aria-hidden="true" />
      <div className="universe-stars universe-stars-front" aria-hidden="true" />
      <button
        className="universe-close"
        type="button"
        onClick={onClose}
        aria-label={universeCopy.close}
        data-testid="button-close-digital-universe"
      >
        <X size={19} aria-hidden="true" />
        <span>{universeCopy.close}</span>
      </button>

      <div className="universe-scroll">
        <section className="universe-intro">
          <div className="universe-orbit-mark" aria-hidden="true">
            <span />
            <span />
            <Orbit size={34} />
          </div>
          <span className="universe-eyebrow">{universeCopy.eyebrow}</span>
          <h2 id="universe-heading">{universeCopy.heading}</h2>
          <p>{universeCopy.intro}</p>
          <span className="universe-scroll-hint">
            <span className="universe-scroll-line" aria-hidden="true" />
            {universeCopy.scrollHint}
          </span>
        </section>

        <section className="planet-route" aria-label={universeCopy.scrollHint}>
          {universePlanets.map((planet, index) => (
            <article className="planet-stop" key={planet.name}>
              <button
                className={`planet planet-${planet.accent} ${activePlanet === index ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActivePlanet(index)}
                aria-label={`${planet.name} — ${universeCopy.selectedPlanet}`}
                data-testid={`button-planet-${index + 1}`}
              >
                <span className="planet-ring planet-ring-one" aria-hidden="true" />
                <span className="planet-ring planet-ring-two" aria-hidden="true" />
                <span className="planet-crater crater-one" aria-hidden="true" />
                <span className="planet-crater crater-two" aria-hidden="true" />
                <span className="planet-glow" aria-hidden="true" />
                <span className="planet-number">{planet.number}</span>
              </button>
              <div className={`planet-card ${activePlanet === index ? 'is-active' : ''}`}>
                <span className="planet-card-index">{planet.number}</span>
                <span className="planet-card-label">{planet.label}</span>
                <h3>{planet.name}</h3>
                <p>{planet.message}</p>
                <span className="planet-card-status">
                  {activePlanet === index ? universeCopy.selectedPlanet : universeCopy.scrollHint}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="universe-finale">
          <div className="finale-moon" aria-hidden="true">
            <span />
          </div>
          <span className="universe-eyebrow">{universeCopy.eyebrow}</span>
          <h2>{universeCopy.finale}</h2>
          <p>{universeCopy.finaleDescription}</p>
          <button
            className="universe-return"
            type="button"
            onClick={onClose}
            data-testid="button-return-from-universe"
          >
            <Heart size={16} fill="currentColor" aria-hidden="true" />
            {universeCopy.close}
          </button>
        </section>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;/* import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Orbit,
  Quote,
  Sparkles,
  Stars,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  footerCopy,
  giftDetails,
  heroCopy,
  letterCopy,
  memories,
  memoriesCopy,
  pageMeta,
  surpriseCopy,
  universeCopy,
  universePlanets,
  wishes,
  wishesCopy,
} from '@/lib/data';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  const [universeOpen, setUniverseOpen] = useState(false);

  useEffect(() => {
    document.title = pageMeta.title;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', pageMeta.description);
    setMeta('og:title', pageMeta.title, true);
    setMeta('og:description', pageMeta.socialDescription, true);
    setMeta('og:type', 'website', true);
  }, []);

  const openLetter = () => {
    setIsOpen(true);
    window.setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 160);
  };

  const changeMemory = (direction: number) => {
    setCurrentMemory((current) => {
      const next = current + direction;
      if (next < 0) return memories.length - 1;
      if (next >= memories.length) return 0;
      return next;
    });
  };

  const activeMemory = memories[currentMemory];

  return (
    <div className="birthday-page" dir="rtl">
      <header className="site-header" data-testid="header-main">
        <a className="brand" href="#top" data-testid="link-home">
          <span className="brand-mark" aria-hidden="true">
            <Heart size={16} fill="currentColor" />
          </span>
          <span>{heroCopy.brand}</span>
        </a>
        <nav className="nav-links" aria-label={heroCopy.navLabel}>
          <a href="#letter" data-testid="link-letter">{heroCopy.nav.letter}</a>
          <a href="#memories" data-testid="link-memories">{heroCopy.nav.memories}</a>
          <a href="#surprise" data-testid="link-surprise">{heroCopy.nav.surprise}</a>
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
              <button
                className="primary-button"
                type="button"
                onClick={openLetter}
                data-testid="button-open-letter"
              >
                {heroCopy.openLetter}
                <ArrowLeft size={17} aria-hidden="true" />
              </button>
              <a className="outline-button" href="#memories" data-testid="link-browse-memories">
                {heroCopy.browseMemories}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-art" aria-label={heroCopy.envelopeLabel} role="img">
            <div className="envelope">
              <div className="letter-peek">
                <span className="eyebrow">{heroCopy.titleBefore} {giftDetails.recipient}</span>
                <div className="letter-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="seal" aria-hidden="true">
                <Heart size={29} fill="currentColor" />
              </div>
            </div>
            <span className="art-caption">{heroCopy.openSlowly}</span>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span />
            {heroCopy.scrollCue}
          </div>
        </section>

        <section className="section letter-section reveal" id="letter" aria-labelledby="letter-heading">
          <div className="letter-intro">
            <div className="section-label">{letterCopy.label}</div>
            <h2 className="section-heading" id="letter-heading">{letterCopy.heading}</h2>
            <p>{letterCopy.intro}</p>
          </div>
          <article className="paper" data-testid="article-love-letter">
            <p className="paper-kicker">{letterCopy.greeting} {giftDetails.recipient}،</p>
            {letterCopy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <span className="paper-signature">{letterCopy.signaturePrefix} {giftDetails.sender}</span>
          </article>
        </section>

        <section className="section memories-section reveal" id="memories" aria-labelledby="memories-heading">
          <div className="memory-header">
            <div>
                <h2 className="section-heading" id="memories-heading">{memoriesCopy.heading}</h2>
            </div>
            <p>{memoriesCopy.description}</p>
          </div>

          <div className="memory-layout">
            <div className="memory-list" role="tablist" aria-label={memoriesCopy.tabListLabel}>
              {memories.map((memory, index) => (
                <button
                  className={`memory-tab ${index === currentMemory ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={index === currentMemory}
                  key={memory.title}
                  onClick={() => setCurrentMemory(index)}
                  data-testid={`button-memory-${index + 1}`}
                >
                  <span className="memory-index">٠{index + 1}</span>
                  <span>
                    <strong>{memory.title}</strong>
                    <small>{memory.subtitle}</small>
                  </span>
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="memory-stage" aria-live="polite">
              <span className="stage-sticker">{memoriesCopy.sticker[0]}<br />{memoriesCopy.sticker[1]}</span>
              <div className="photo-frame">
                <div className={`scene ${activeMemory.scene}`}>
                  <div className="scene-object">
                    <Stars size={25} aria-hidden="true" />
                    {activeMemory.object}
                  </div>
                  <span className="scene-label">{activeMemory.caption}</span>
                </div>
                <span className="photo-caption">
                  {activeMemory.title} · {activeMemory.subtitle}
                </span>
              </div>
              <div className="memory-controls">
                <button
                  className="circle-control"
                  type="button"
                  onClick={() => changeMemory(1)}
                  aria-label={memoriesCopy.next}
                  data-testid="button-next-memory"
                >
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
                <span>{String(currentMemory + 1).padStart(2, '٠')} / ٠٤</span>
                <button
                  className="circle-control"
                  type="button"
                  onClick={() => changeMemory(-1)}
                  aria-label={memoriesCopy.previous}
                  data-testid="button-previous-memory"
                >
                  <ChevronLeft size={17} aria-hidden="true" />
                </button>
              </div>
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
            <button
              className={`gift ${revealed ? 'is-revealed' : ''}`}
              type="button"
              onClick={() => setRevealed((value) => !value)}
              aria-label={revealed ? surpriseCopy.openedAriaLabel : surpriseCopy.closedAriaLabel}
              aria-expanded={revealed}
              data-testid="button-reveal-surprise"
            >
              <span className="gift-ribbon" aria-hidden="true" />
              <span className="gift-word">{revealed ? surpriseCopy.openedGift : surpriseCopy.closedGift}</span>
            </button>
            {revealed && (
              <div className="surprise-note" role="status" data-testid="status-surprise-note">
                <strong>{surpriseCopy.noteTitle}</strong>
                <p>{surpriseCopy.note}</p>
              </div>
            )}
          </div>
        </section>

        <section className="section wish-section reveal" aria-labelledby="wish-heading">
          <div className="section-label">{wishesCopy.label}</div>
          <h2 className="section-heading" id="wish-heading">{wishesCopy.heading}</h2>
          <p className="wish-lead">{wishesCopy.lead}</p>

          <div className="wish-grid">
            {wishes.map((wish, index) => (
              <article className="wish-card" key={wish.title} data-testid={`card-wish-${index + 1}`}>
                {index === 1 ? (
                  <Sparkles size={20} aria-hidden="true" />
                ) : (
                  <Quote size={20} aria-hidden="true" />
                )}
                <h3>{wish.title}</h3>
                <p>{wish.text}</p>
              </article>
            ))}
          </div>
          <button
            className="universe-trigger"
            type="button"
            onClick={() => setUniverseOpen(true)}
            data-testid="button-open-digital-universe"
          >
            <span className="universe-trigger-icon" aria-hidden="true">
              <Orbit size={22} />
            </span>
            <span>
              <strong>{universeCopy.button}</strong>
              <small>{universeCopy.buttonHint}</small>
            </span>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-mark">
            <Heart size={14} fill="currentColor" aria-hidden="true" />
            {giftDetails.yearMark}
          </span>
          <span>{footerCopy.madeWithLove}</span>
          <span>{giftDetails.date}</span>
        </div>
      </footer>

      {universeOpen && <DigitalUniverse onClose={() => setUniverseOpen(false)} />}
    </div>
  );
}

function DigitalUniverse({ onClose }: { onClose: () => void }) {
  const [activePlanet, setActivePlanet] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="universe-overlay" role="dialog" aria-modal="true" aria-labelledby="universe-heading">
      <div className="universe-stars universe-stars-back" aria-hidden="true" />
      <div className="universe-stars universe-stars-front" aria-hidden="true" />
      <button
        className="universe-close"
        type="button"
        onClick={onClose}
        aria-label={universeCopy.close}
        data-testid="button-close-digital-universe"
      >
        <X size={19} aria-hidden="true" />
        <span>{universeCopy.close}</span>
      </button>

      <div className="universe-scroll">
        <section className="universe-intro">
          <div className="universe-orbit-mark" aria-hidden="true">
            <span />
            <span />
            <Orbit size={34} />
          </div>
          <span className="universe-eyebrow">{universeCopy.eyebrow}</span>
          <h2 id="universe-heading">{universeCopy.heading}</h2>
          <p>{universeCopy.intro}</p>
          <span className="universe-scroll-hint">
            <span className="universe-scroll-line" aria-hidden="true" />
            {universeCopy.scrollHint}
          </span>
        </section>

        <section className="planet-route" aria-label={universeCopy.scrollHint}>
          {universePlanets.map((planet, index) => (
            <article className="planet-stop" key={planet.name}>
              <button
                className={`planet planet-${planet.accent} ${activePlanet === index ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActivePlanet(index)}
                aria-label={`${planet.name} — ${universeCopy.selectedPlanet}`}
                data-testid={`button-planet-${index + 1}`}
              >
                <span className="planet-ring planet-ring-one" aria-hidden="true" />
                <span className="planet-ring planet-ring-two" aria-hidden="true" />
                <span className="planet-crater crater-one" aria-hidden="true" />
                <span className="planet-crater crater-two" aria-hidden="true" />
                <span className="planet-glow" aria-hidden="true" />
                <span className="planet-number">{planet.number}</span>
              </button>
              <div className={`planet-card ${activePlanet === index ? 'is-active' : ''}`}>
                <span className="planet-card-index">{planet.number}</span>
                <span className="planet-card-label">{planet.label}</span>
                <h3>{planet.name}</h3>
                <p>{planet.message}</p>
                <span className="planet-card-status">
                  {activePlanet === index ? universeCopy.selectedPlanet : universeCopy.scrollHint}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="universe-finale">
          <div className="finale-moon" aria-hidden="true">
            <span />
          </div>
          <span className="universe-eyebrow">{universeCopy.eyebrow}</span>
          <h2>{universeCopy.finale}</h2>
          <p>{universeCopy.finaleDescription}</p>
          <button
            className="universe-return"
            type="button"
            onClick={onClose}
            data-testid="button-return-from-universe"
          >
            <Heart size={16} fill="currentColor" aria-hidden="true" />
            {universeCopy.close}
          </button>
        </section>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;*/