'use client';

import { useEffect, useState } from 'react';
import { User } from '@/lib/useAuth';
import { useShop } from '@/lib/shop-context';
import { useLang } from '@/lib/i18n';

export default function AuthModal({
  open,
  onClose,
  onSubmit,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (mode: 'login' | 'register', payload: Record<string, string>) => Promise<User>;
  onSuccess: (u: User) => void;
}) {
  const { demo } = useShop();
  const { t } = useLang();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ loEmail: '', loPass: '', reName: '', reEmail: '', rePhone: '', rePass: '' });

  useEffect(() => { if (open) { setErr(''); setBusy(false); } }, [open]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function go() {
    setErr('');
    if (demo) return setErr(t.authDemo);
    const payload: Record<string, string> = mode === 'login'
      ? { email: f.loEmail.trim(), password: f.loPass }
      : { name: f.reName.trim(), email: f.reEmail.trim(), phone: f.rePhone.trim(), password: f.rePass };
    if (!payload.email || !payload.password) return setErr(t.authFill);
    setBusy(true);
    try {
      onSuccess(await onSubmit(mode, payload));
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : t.authNet);
    } finally {
      setBusy(false);
    }
  }

  const label = mode === 'login' ? t.login : t.registerDo;

  return (
    <>
      <div className={open ? 'scrim on' : 'scrim'} onClick={onClose} />
      <div className={open ? 'modal on' : 'modal'} role="dialog" aria-modal="true" aria-label={t.account} aria-hidden={!open}>
        <div className="mh">
          <b>{t.welcome}</b>
          <button className="mx" type="button" aria-label={t.close} onClick={onClose}>×</button>
        </div>
        <div className="mb single">
          <div>
            <p className="auth-sub">{t.authSub}</p>
            <div className="auth-tabs">
              <button type="button" className={mode === 'login' ? 'on' : ''} onClick={() => setMode('login')}>{t.login}</button>
              <button type="button" className={mode === 'register' ? 'on' : ''} onClick={() => setMode('register')}>{t.register}</button>
            </div>

            {mode === 'login' ? (
              <div className="frm">
                <div className="fl full"><label htmlFor="loEmail">{t.email}</label>
                  <input id="loEmail" type="email" placeholder="vous@exemple.com" autoComplete="email" value={f.loEmail} onChange={set('loEmail')} /></div>
                <div className="fl full"><label htmlFor="loPass">{t.password}</label>
                  <input id="loPass" type="password" placeholder="••••••••" autoComplete="current-password" value={f.loPass} onChange={set('loPass')} /></div>
              </div>
            ) : (
              <div className="frm">
                <div className="fl full"><label htmlFor="reName">{t.fullName}</label>
                  <input id="reName" type="text" placeholder={t.namePh} autoComplete="name" value={f.reName} onChange={set('reName')} /></div>
                <div className="fl full"><label htmlFor="reEmail">{t.email}</label>
                  <input id="reEmail" type="email" placeholder="vous@exemple.com" autoComplete="email" value={f.reEmail} onChange={set('reEmail')} /></div>
                <div className="fl full"><label htmlFor="rePhone">{t.phone}</label>
                  <input id="rePhone" type="tel" placeholder="0X XX XX XX XX" autoComplete="tel" value={f.rePhone} onChange={set('rePhone')} /></div>
                <div className="fl full"><label htmlFor="rePass">{t.password}</label>
                  <input id="rePass" type="password" placeholder={t.passPh} autoComplete="new-password" value={f.rePass} onChange={set('rePass')} /></div>
              </div>
            )}

            {err && <p className="auth-err">{err}</p>}
            <button className="ok" type="button" style={{ marginTop: 16 }} disabled={busy} onClick={go}>
              {busy ? (mode === 'login' ? t.loggingIn : t.creating) : label}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
