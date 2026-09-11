import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Heart, LockKeyhole, Sparkles } from 'lucide-react';
import { pageMeta, passwordGateCopy } from '@/lib/data';

type PasswordGateProps = {
  children: ReactNode;
};

function normalizeDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/\D/g, '')
    .slice(0, passwordGateCopy.password.length);
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    document.title = pageMeta.title;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code !== passwordGateCopy.password) {
      setError(true);
      return;
    }

    setError(false);
    setIsOpening(true);
    window.setTimeout(() => setIsUnlocked(true), 850);
  };

  if (isUnlocked) return <>{children}</>;

  return (
    <div className={`password-gate ${isOpening ? 'is-opening' : ''}`} dir="rtl">
      <div
        className="password-gate-stars password-gate-stars-one"
        aria-hidden="true"
      />
      <div
        className="password-gate-stars password-gate-stars-two"
        aria-hidden="true"
      />

      <main className="password-gate-shell">
        <div className="password-gate-ornament" aria-label="إلى هدوء">
          <span className="password-gate-ornament-line" aria-hidden="true" />
          <span className="password-gate-brand-mark" aria-hidden="true">
            <Heart size={16} fill="currentColor" />
          </span>
          <span className="password-gate-ornament-name">إلى هدوء</span>
          <span className="password-gate-ornament-line" aria-hidden="true" />
        </div>

        <div className="password-gate-copy">
          <span className="password-gate-eyebrow">
            <Sparkles size={13} aria-hidden="true" />
            {passwordGateCopy.eyebrow}
          </span>
          <h1>{passwordGateCopy.title}</h1>
          <p>{passwordGateCopy.description}</p>
        </div>

        <div
          className="sealed-envelope"
          role="img"
          aria-label={passwordGateCopy.sealLabel}
        >
          <div className="sealed-letter">
            <span>إلى هدوء،</span>
            <i />
            <i />
            <i />
          </div>
          <div className="sealed-flap" aria-hidden="true" />
          <div className="sealed-seal" aria-hidden="true">
            <LockKeyhole size={24} />
          </div>
          <span className="sealed-ribbon" aria-hidden="true" />
        </div>

        <form className="password-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="secret-code">{passwordGateCopy.inputLabel}</label>
          <div className={`password-field ${error ? 'has-error' : ''}`}>
            <input
              id="secret-code"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={code}
              onChange={(event) => {
                setCode(normalizeDigits(event.target.value));
                setError(false);
              }}
              placeholder={passwordGateCopy.placeholder}
              aria-invalid={error}
              aria-describedby={error ? 'password-error' : undefined}
              data-testid="input-secret-code"
            />
            <button
              type="submit"
              disabled={isOpening || code.length === 0}
              aria-label={
                isOpening ? passwordGateCopy.opening : passwordGateCopy.submit
              }
              data-testid="button-unlock-envelope"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          </div>
          {error ? (
            <p className="password-error" id="password-error" role="alert">
              {passwordGateCopy.error}
            </p>
          ) : null}
        </form>
      </main>
    </div>
  );
}
