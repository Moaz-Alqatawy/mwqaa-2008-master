import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  DoorOpen,
  Heart,
  Leaf,
  MapPin,
  Sparkles,
  Waves,
  Wind,
  X,
} from 'lucide-react';
import { portalCopy, portalStops } from '@/lib/data';
import portalPhoto from '../../../../attached_assets/WhatsApp_Image_2026-09-06_at_6.37.06_AM_(1)_1788775518176.jpeg';
import '../virtual-portal.css';

type VirtualPortalProps = {
  onClose: () => void;
};

const fireflies = Array.from({ length: 14 });
const portalStopImages = {
  dream: portalPhoto,
} as const;

export function VirtualPortal({ onClose }: VirtualPortalProps) {
  const [entered, setEntered] = useState(false);
  const [activeStop, setActiveStop] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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

  const sceneStyle = {
    '--portal-x': `${parallax.x}px`,
    '--portal-y': `${parallax.y}px`,
  } as CSSProperties;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setParallax({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 22,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 14,
    });
  };

  const renderStopIcon = (icon: (typeof portalStops)[number]['icon']) => {
    if (icon === 'waves') return <Waves size={18} aria-hidden="true" />;
    if (icon === 'leaf') return <Leaf size={18} aria-hidden="true" />;
    if (icon === 'heart') return <Heart size={18} fill="currentColor" aria-hidden="true" />;
    return <Sparkles size={18} aria-hidden="true" />;
  };

  return (
    <div
      className={`virtual-portal ${entered ? 'is-inside' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-heading"
      onPointerMove={handlePointerMove}
      style={sceneStyle}
    >
      <div className="portal-scene" aria-hidden="true">
        <div className="portal-stars portal-stars-back" />
        <div className="portal-stars portal-stars-front" />
        <div className="portal-aurora portal-aurora-one" />
        <div className="portal-aurora portal-aurora-two" />
        <div className="portal-moon">
          <span />
          <i />
          <b />
        </div>
        <div className="portal-clouds portal-clouds-back" />
        <div className="portal-mountains portal-mountains-back" />
        <div className="portal-mountains portal-mountains-front" />
        <div className="portal-lake">
          <span className="portal-lake-light" />
          <span className="portal-lake-ripples" />
        </div>
        <div className="portal-ground" />
        <div className="portal-path" />
        <div className="portal-arch">
          <div className="portal-arch-light" />
          <div className="portal-opening">
            <div className="portal-inside-sky" />
            <div className="portal-inside-trees" />
            <div className="portal-inside-lights" />
            <div className="portal-inside-path" />
          </div>
          <span className="portal-arch-vine portal-arch-vine-one" />
          <span className="portal-arch-vine portal-arch-vine-two" />
        </div>
        <div className="portal-fireflies">
          {fireflies.map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="portal-grass portal-grass-left" />
        <div className="portal-grass portal-grass-right" />
      </div>

      <button
        className="portal-close"
        type="button"
        onClick={onClose}
        aria-label={portalCopy.close}
        data-testid="button-close-virtual-portal"
      >
        <X size={17} aria-hidden="true" />
        <span>{portalCopy.close}</span>
      </button>

      <div className="portal-place-mark">
        <MapPin size={14} aria-hidden="true" />
        {portalCopy.placeLabel}
      </div>

      {!entered ? (
        <section className="portal-welcome">
          <span className="portal-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            {portalCopy.eyebrow}
          </span>
          <h2 id="portal-heading">{portalCopy.title}</h2>
          <p>{portalCopy.intro}</p>
          <button
            className="portal-enter"
            type="button"
            onClick={() => setEntered(true)}
            data-testid="button-enter-virtual-portal"
          >
            <DoorOpen size={18} aria-hidden="true" />
            <span>{portalCopy.enter}</span>
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <span className="portal-hint">
            <Wind size={14} aria-hidden="true" />
            {portalCopy.hint}
          </span>
        </section>
      ) : (
        <section className="portal-inside-panel" aria-live="polite">
          {(() => {
            const stop = portalStops[activeStop];
            const imageKey = 'image' in stop ? stop.image : undefined;

            return (
              <>
          <div className="portal-inside-heading">
            <span className="portal-eyebrow">{portalCopy.insideEyebrow}</span>
            <h2 id="portal-heading">{portalCopy.insideTitle}</h2>
            <p>{portalCopy.insideDescription}</p>
          </div>

          <div className="portal-stops" aria-label={portalCopy.insideTitle}>
            {portalStops.map((stop, index) => (
              <button
                className={`portal-stop ${activeStop === index ? 'is-active' : ''}`}
                key={stop.title}
                type="button"
                onClick={() => setActiveStop(index)}
                aria-pressed={activeStop === index}
              >
                <span className="portal-stop-icon">{renderStopIcon(stop.icon)}</span>
                <span>
                  <strong>{stop.title}</strong>
                  <small>{stop.label}</small>
                </span>
              </button>
            ))}
          </div>

          {imageKey ? (
            <figure className="portal-stop-photo">
              <img
                src={portalStopImages[imageKey]}
                alt="لحظة بنحلم نعيشها سوا"
              />
              <figcaption>صورة لحلمنا الجميل</figcaption>
            </figure>
          ) : null}

          <div className={`portal-stop-message ${imageKey ? 'has-photo' : ''}`}>
            <Heart size={17} fill="currentColor" aria-hidden="true" />
            <p>{stop.message}</p>
          </div>

          <div className="portal-panel-footer">
            <span>{portalCopy.signature}</span>
            <button type="button" onClick={() => setEntered(false)}>
              <ArrowLeft size={15} aria-hidden="true" />
              {portalCopy.back}
            </button>
          </div>
              </>
            );
          })()}
        </section>
      )}
    </div>
  );
}