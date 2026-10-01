import { useState } from 'react'
import ambientGlowTop from '../assets/login/ambient-glow-top.svg'
import ambientGlowBottom from '../assets/login/ambient-glow-bottom.svg'
import croissant from '../assets/login/croissant.svg'
import eyeOff from '../assets/login/eye-off.svg'

function WelcomePanel() {
  return (
    <aside className="relative hidden w-[42%] max-w-[620px] shrink-0 flex-col justify-between gap-12 overflow-hidden bg-platform p-12 lg:flex xl:w-[620px] xl:p-16">
      {/* Anchored to the panel corners (not the 620×1024 frame origin) so they stay put as the panel resizes */}
      <img
        src={ambientGlowTop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-260px] right-[-260px] size-[520px] max-w-none"
      />
      <img
        src={ambientGlowBottom}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-250px] left-[-252px] size-[500px] max-w-none"
      />

      <div className="relative flex items-center gap-3.5">
        <div className="flex size-[46px] items-center justify-center rounded-full bg-platform-light">
          <img src={croissant} alt="" className="size-[29.44px]" />
        </div>
        <div className="flex flex-col gap-[3px] whitespace-nowrap">
          <p className="text-lg font-semibold text-white">Ross Bakers Co.</p>
          <p className="text-xs text-white/80">Freshly baked goods</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-[22px]">
        <p className="text-[13px] font-semibold tracking-[1.04px] text-white/80 uppercase">
          Unified operations portal
        </p>
        <h1 className="text-[36px] leading-[1.15] font-semibold text-white xl:text-[46px]">
          Everything your bakery needs, in one place.
        </h1>
        <p className="max-w-[460px] text-base leading-[1.6] text-white/80">
          Manage orders, branches, menus, customers, and performance from a
          workspace built for every shift.
        </p>
      </div>

      <p className="relative text-[11px] text-platform-light">
        © 2026 Ross Bakers Co. ·{' '}
        <a href="#" className="hover:underline">
          Privacy
        </a>{' '}
        ·{' '}
        <a href="#" className="hover:underline">
          Security
        </a>
      </p>
    </aside>
  )
}

function FormField({ id, label, children }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      <div className="flex h-14 w-full items-center justify-between gap-3 rounded-[10px] border border-border bg-surface px-4 transition-colors focus-within:border-platform">
        {children}
      </div>
    </div>
  )
}

const inputClass =
  'w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted'

export default function Login({ onSubmit }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.({ identifier, password })
  }

  return (
    <div className="flex min-h-dvh w-full bg-canvas">
      <WelcomePanel />

      <main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-8 px-4 py-10 sm:px-8">
        {/* The welcome panel is hidden below lg, so keep the brand visible above the card */}
        <div className="flex items-center gap-3.5 lg:hidden">
          <div className="flex size-[46px] items-center justify-center rounded-full bg-platform-light">
            <img src={croissant} alt="" className="size-[29.44px]" />
          </div>
          <div className="flex flex-col gap-[3px] whitespace-nowrap">
            <p className="text-lg font-semibold text-ink">Ross Bakers Co.</p>
            <p className="text-xs text-muted">Freshly baked goods</p>
          </div>
        </div>

        <div className="flex w-full max-w-[480px] flex-col gap-9 rounded-[20px] bg-surface p-6 shadow-card sm:p-11">
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] font-semibold text-ink sm:text-[30px]">Welcome back</h2>
            <p className="text-sm leading-[1.5] text-muted">
              Sign in with your work credentials. We’ll take you to the right
              dashboard automatically.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <FormField id="identifier" label="Email or Username">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="ross@rossbakers.com"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={inputClass}
                />
              </FormField>

              <FormField id="password" label="Password">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-platform"
                >
                  <img src={eyeOff} alt="" className="size-5" />
                </button>
              </FormField>
            </div>

            <button
              type="submit"
              className="flex h-[52px] w-full cursor-pointer items-center justify-center rounded-full bg-platform text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platform"
            >
              Sign in
            </button>
          </form>

          <div className="flex flex-col gap-2 border-t border-divider pt-5 text-center text-xs">
            <p className="text-muted">Need help accessing your account?</p>
            <p className="font-semibold text-ink">
              Contact your administrator or{' '}
              <a href="#" className="hover:underline">
                Support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
