'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { num: '01', title: 'Who are you?',           sub: "Let's start with the basics."      },
  { num: '02', title: 'What are you building?',  sub: 'Describe your project or venture.' },
  { num: '03', title: 'Where are you right now?', sub: 'Pick your current stage.'         },
  { num: '04', title: 'What do you need most?',  sub: 'Select everything that applies.'   },
  { num: '05', title: 'One last thing.',          sub: 'Make your case for getting in.'   },
];

const STAGES = [
  { id: 'idea',     label: 'Just an idea',       desc: 'Still in concept phase'   },
  { id: 'mvp',      label: 'Building the MVP',   desc: 'Actively developing'      },
  { id: 'launched', label: 'Launched & testing', desc: 'Live, gathering feedback' },
  { id: 'growing',  label: 'Growing & scaling',  desc: 'Revenue and beyond'       },
];

const NEEDS = ['Accountability', 'Peer feedback', 'Network & intros', 'Mentorship', 'Strategy sessions', 'Guest speakers'];

type FormData = {
  name: string; email: string; building: string;
  stage: string; needs: string[]; why: string; commit: boolean;
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 52 : -52, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -52 : 52, opacity: 0 }),
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-inter font-bold text-[10px] uppercase tracking-[0.13em] text-forest/40 mb-2 mt-0">
      {children}
    </p>
  );
}

function Step1({ d, u }: { d: FormData; u: (p: Partial<FormData>) => void }) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <FieldLabel>Full Name</FieldLabel>
        <input className="vc-input" placeholder="Your name" value={d.name} onChange={e => u({ name: e.target.value })} />
      </div>
      <div>
        <FieldLabel>Email Address</FieldLabel>
        <input className="vc-input" type="email" placeholder="you@example.com" value={d.email} onChange={e => u({ email: e.target.value })} />
      </div>
    </div>
  );
}

function Step2({ d, u }: { d: FormData; u: (p: Partial<FormData>) => void }) {
  return (
    <div>
      <FieldLabel>Your venture, project, or idea</FieldLabel>
      <textarea className="vc-textarea" rows={6}
        placeholder="I'm building a platform that helps founders ship faster by..."
        value={d.building} onChange={e => u({ building: e.target.value })} />
    </div>
  );
}

function Step3({ d, u }: { d: FormData; u: (p: Partial<FormData>) => void }) {
  return (
    <div>
      <FieldLabel>Current stage</FieldLabel>
      <div className="grid grid-cols-2 gap-[10px]">
        {STAGES.map(s => {
          const sel = d.stage === s.id;
          return (
            <button key={s.id} onClick={() => u({ stage: s.id })}
              className={`text-left p-[14px_16px] rounded-[12px] border-[1.5px] transition-all duration-200 ${
                sel ? 'bg-forest border-forest' : 'bg-transparent border-forest/[0.14] hover:border-forest/40 hover:bg-forest/[0.03]'
              }`}>
              <p className={`font-inter font-extrabold text-[13px] tracking-[-0.03em] leading-[1.2] ${sel ? 'text-cream' : 'text-forest'}`}>{s.label}</p>
              <p className={`font-inter font-medium text-[11px] tracking-[-0.02em] mt-1 leading-[1.3] ${sel ? 'text-cream/60' : 'text-forest/45'}`}>{s.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({ d, u }: { d: FormData; u: (p: Partial<FormData>) => void }) {
  const toggle = (item: string) => {
    const needs = d.needs.includes(item) ? d.needs.filter(x => x !== item) : [...d.needs, item];
    u({ needs });
  };
  return (
    <div>
      <FieldLabel>What you're looking for</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {NEEDS.map(n => {
          const sel = d.needs.includes(n);
          return (
            <button key={n} onClick={() => toggle(n)}
              className={`px-[18px] py-2 rounded-full border-[1.5px] font-inter font-bold text-[13px] tracking-[-0.03em] transition-all duration-200 ${
                sel ? 'bg-forest border-forest text-cream' : 'bg-transparent border-forest/[0.18] text-forest hover:border-forest/50'
              }`}>
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step5({ d, u }: { d: FormData; u: (p: Partial<FormData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <FieldLabel>Why do you want in?</FieldLabel>
        <textarea className="vc-textarea" rows={5}
          placeholder="VisionCircle feels right because..."
          value={d.why} onChange={e => u({ why: e.target.value })} />
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <div onClick={() => u({ commit: !d.commit })}
          className={`w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
            d.commit ? 'bg-forest border-2 border-forest' : 'bg-transparent border-2 border-forest/25'
          }`}>
          {d.commit && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#F9F4F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className="font-inter font-bold text-[13px] tracking-[-0.03em] text-forest leading-[1.45]">
          I commit to showing up fully — not just as a lurker.
        </span>
      </label>
    </div>
  );
}

function SuccessScreen() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-8">

      <svg viewBox="0 0 100 100" width="90" height="90" className="overflow-visible mb-6">
        <motion.circle cx="50" cy="50" r="44" fill="none" stroke="#0F3328" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }} />
        <motion.path d="M 28 51 L 44 67 L 72 33" fill="none" stroke="#0F3328" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.85 }} />
      </svg>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-inter font-black text-forest text-[30px] tracking-[-0.06em] leading-[1.05] m-0">
        You're in the queue.
      </motion.h2>

      <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 1.42, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center' }}
        className="block w-[42px] h-[1.5px] bg-forest/20 my-[18px]" />

      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-inter font-extrabold text-forest/68 text-[13px] tracking-[-0.05em] leading-[1.65] max-w-[310px] m-0">
        It will take around 48 hours to review the whole questionnaire. If you are the Right Fit, you will automatically get an exclusive link to join the community.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.75, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mt-7">
        <Link href="/" className="serif-i text-[16px] tracking-[-0.04em] bg-forest text-cream rounded-[8px] px-7 py-[10px] hover:opacity-87 transition">
          Back to VisionCircle →
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function JoinForm() {
  const [step, setStep]     = useState(0);
  const [dir,  setDir]      = useState(1);
  const [submitted, setSub] = useState(false);
  const [data, setData]     = useState<FormData>({
    name: '', email: '', building: '', stage: '', needs: [], why: '', commit: false,
  });

  const upd = (p: Partial<FormData>) => setData(d => ({ ...d, ...p }));

  const ok = () => {
    if (step === 0) return data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email);
    if (step === 1) return data.building.trim().length >= 15;
    if (step === 2) return !!data.stage;
    if (step === 3) return data.needs.length > 0;
    if (step === 4) return data.why.trim().length >= 15 && data.commit;
    return false;
  };

  const next = () => {
    if (!ok()) return;
    setDir(1);
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setSub(true);
  };

  const prev = () => {
    if (step > 0) { setDir(-1); setStep(s => s - 1); }
  };

  const progress = submitted ? 100 : ((step + 1) / (STEPS.length + 1)) * 100;

  const stepNodes: React.ReactNode[] = [
    <Step1 d={data} u={upd} />,
    <Step2 d={data} u={upd} />,
    <Step3 d={data} u={upd} />,
    <Step4 d={data} u={upd} />,
    <Step5 d={data} u={upd} />,
  ];

  return (
    <div className="min-h-screen relative grain-soft bg-cream flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-20 px-6 pt-5 flex items-center justify-between pointer-events-none">
        <Link href="/" className="flex items-center gap-1.5 font-inter font-bold text-[13px] tracking-[-0.03em] text-forest/45 hover:text-forest transition pointer-events-auto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          VisionCircle
        </Link>
        {!submitted && (
          <span className="font-inter font-bold text-[11px] uppercase tracking-[0.1em] text-forest/30">
            {STEPS[step].num} / 0{STEPS.length}
          </span>
        )}
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center px-4 py-[76px]">
        <div className="w-full max-w-[470px]">

          {/* Card */}
          <div className="bg-cream rounded-[24px] border border-forest/[0.075] overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(15,51,40,0.07), 0 16px 56px rgba(15,51,40,0.08)' }}>

            {/* Progress bar */}
            <div className="h-[3px] bg-forest/[0.08] w-full">
              <motion.div className="h-[3px] bg-forest rounded-r-sm"
                initial={false} animate={{ width: `${progress}%` }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />
            </div>

            {/* Content */}
            <div className="px-10 pt-9 pb-10">
              <AnimatePresence mode="wait" custom={dir}>
                {submitted ? (
                  <SuccessScreen key="success" />
                ) : (
                  <motion.div key={step} custom={dir} variants={variants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>

                    {/* Header */}
                    <div className="mb-7">
                      <h2 className="font-inter font-black text-forest text-[26px] tracking-[-0.055em] leading-[1.1] m-0">
                        {STEPS[step].title}
                      </h2>
                      <p className="serif-i text-forest/52 text-[17px] tracking-[-0.03em] mt-[5px] mb-0 leading-[1.3]">
                        {STEPS[step].sub}
                      </p>
                    </div>

                    {stepNodes[step]}

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between mt-9">
                      {step > 0 ? (
                        <button onClick={prev}
                          className="font-inter font-semibold text-[13px] tracking-[-0.03em] text-forest/45 hover:text-forest transition bg-transparent border-none cursor-pointer p-0">
                          ← Back
                        </button>
                      ) : <div />}
                      <button onClick={next} disabled={!ok()}
                        className={`serif-i text-[17px] tracking-[-0.04em] bg-forest text-cream border-none rounded-[9px] px-[30px] py-[10px] transition-all duration-200 ${
                          ok() ? 'opacity-100 hover:opacity-87 cursor-pointer hover:-translate-y-px' : 'opacity-30 cursor-not-allowed'
                        }`}>
                        {step === STEPS.length - 1 ? 'Submit application' : 'Continue →'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {!submitted && (
            <p className="text-center mt-[14px] font-inter font-semibold text-[11px] tracking-[-0.02em] text-forest/30">
              Handpicked. Not for everyone. That's the point.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
