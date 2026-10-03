import { motion } from "framer-motion";
import { Check } from "lucide-react";
import aboutImg from "../assets/about.jpg";

const points = [
  "Full-service company delivering creative solutions",
  "Immersive VR and interactive experiences",
  "Strategy, branding and marketing under one roof",
  "A team that takes ideas from concept to launch",
];

const viewport = { once: true, amount: 0.3 };

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#07070a] py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#e11d2e]/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#e11d2e]/40 via-transparent to-fuchsia-600/30 blur-2xl" />
          <img
            src={aboutImg}
            alt="IN VISION company profile"
            className="relative w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            <span className="text-[#e11d2e]">About</span> IN VISION
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            IN VISION is a full services company providing creative solutions.
            We combine technology and marketing to build experiences that
            people remember.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
                className="flex items-start gap-3 text-white/85"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e11d2e]/20 text-[#e11d2e]">
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}