import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/hero.jpg";

const rise = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const glows = useRef(null);
  const bg = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".glow").forEach((el, i) => {
        gsap.to(el, {
          x: gsap.utils.random(-70, 70),
          y: gsap.utils.random(-50, 50),
          scale: gsap.utils.random(0.9, 1.3),
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
      gsap.fromTo(bg.current, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" });
    }, glows);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={glows}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <img
        ref={bg}
        src={heroImg}
        alt="Futuristic VR experience"
        className="absolute top-3 h-full w-full object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/80 to-[#07070a]/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07070a] to-transparent" />

      <div className="glow pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#e11d2e]/30 blur-[110px]" />
      <div className="glow pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-fuchsia-600/25 blur-[110px]" />
      <div className="glow pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <motion.p
            {...rise(0.1)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-[#e11d2e] shadow-[0_0_10px_#e11d2e]" />
            Creative Technology &amp; Marketing
          </motion.p>

<motion.h1
  {...rise(0.25)}
  className="font-[Unbounded] text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl"
>
  We build worlds
  <br />
  people step into.
</motion.h1>

          <motion.p
            {...rise(0.4)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            IN VISION turns bold ideas into immersive brand experiences, from
            virtual reality to full marketing campaigns.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full bg-[#e11d2e] px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(225,29,46,0.45)] transition hover:bg-[#f0283a] hover:shadow-[0_0_45px_rgba(225,29,46,0.65)]"
            >
              Explore Our World
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}