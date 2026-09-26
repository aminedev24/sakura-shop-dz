'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';

/** A password input with a reveal toggle.
 *
 *  The button is type="button" so it never submits the form, and the input
 *  keeps its id and autoComplete so browsers and password managers still treat
 *  it as a password field while hidden. */
export default function PasswordField({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const { t } = useLang();
  const [shown, setShown] = useState(false);

  return (
    <div className="passwrap">
      <input
        id={id}
        type={shown ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="passtoggle"
        aria-label={shown ? t.hidePass : t.showPass}
        aria-pressed={shown}
        onClick={() => setShown((v) => !v)}
      >
        {shown ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A9.7 9.7 0 0 1 12 5c5 0 9 4.5 9 7a12 12 0 0 1-2.4 3.3" />
            <path d="M6.2 6.6A12.6 12.6 0 0 0 3 12c0 2.5 4 7 9 7a9.9 9.9 0 0 0 4.2-.9" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
