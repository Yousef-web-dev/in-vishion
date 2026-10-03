import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import creativeShooting from "../assets/cre.jpg";
import motionGraphics from "../assets/motion-graphics.jpg";
import design from "../assets/design.jpg";
import web from "../assets/web.jpg";
import branding from "../assets/branding.jpg";
import data from "../assets/data.jpg";

gsap.registerPlugin(ScrollTrigger);

// أضف باقي الخدمات هنا (حتى 7). كل خدمة = كارت جديد تلقائيًا.
const services = [
  {
    id: "creative-shooting",
    title: "Creative Shooting",
    image: creativeShooting,
    description:
      "Photo and video shoots for brands, products and campaigns, in our studio or on location.",
    features: ["Photography", "Video production", "Studio setup", "Post-production"],
    titleLines: ["Creative", "Shooting"],
    titleColor: "#ffe4b5", // لون دافي يليق مع إضاءة الاستوديو
    glow: "rgba(255,160,50,0.75)",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    titleLines: ["Motion", "Graphics"],
    image: motionGraphics,
    description:
      "Animated visuals that bring your brand story to life, for ads, social media, events and screens.",
    features: ["2D animation", "Logo animation", "Explainer videos", "Social media content"],
    titleColor: "#ffffff",
    glow: "rgba(255,45,85,0.75)",
  },
  {
    id: "design",
    title: "Design",
    titleLines: ["Design"],
    image: design,
    description:
      "Visual identities and graphics that make your brand recognizable across every channel.",
    features: ["Brand identity", "Logo design", "Social media design", "Print & packaging"],
    titleColor: "#c8f5ee", // أخضر مائي هادي من ألوان الشاشة
    glow: "rgba(70,200,200,0.75)",
  },
  {
    id: "web-development",
    title: "Web Development",
    titleLines: ["Web", "Development"],
    image: web,
    description:
      "Fast, modern websites and web apps built around your brand and your customers.",
    features: ["Company websites", "Web applications", "E-commerce stores", "Maintenance & support"],
    titleColor: "#ffd9a0", // برتقالي فاتح من لون الكود على الشاشة
    glow: "rgba(255,140,40,0.75)",
  },
  {
    id: "branding",
    title: "Branding",
    titleLines: ["Branding"],
    image: branding,
    focus: "center 55%", // الصورة طولية، فبنحدد الجزء اللي يظهر منها
    description:
      "Brand strategy and identity that define who you are and make people remember you.",
    features: ["Brand strategy", "Visual identity", "Brand guidelines", "Naming & messaging"],
    titleColor: "#ffe0d4", // وردي خوخي من ألوان الكروت في الصورة
    glow: "rgba(235,150,130,0.8)",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    titleLines: ["Data", "Analysis"],
    image: data,
    description:
      "We turn your numbers into clear insights that guide smarter marketing and business decisions.",
    features: ["Market research", "Performance reports", "Dashboards", "Campaign analytics"],
    titleColor: "#d3e8ff", // أزرق فاتح من إضاءة الشاشات
    glow: "rgba(80,150,255,0.8)",
  },
];

const ease = [0.22, 1, 0.36, 1];

function ServiceCard({ s, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const base = (index % 3) * 0.15;

  const v = {
    card: {
      hidden: { opacity: 0, y: 120, scale: 0.9 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: base, ease } },
    },
    curtain: {
      hidden: { scaleX: 0, originX: 0 },
      show: {
        scaleX: [0, 1, 0],
        originX: [0, 0, 1],
        transition: { duration: 1.3, delay: base + 0.2, times: [0, 0.5, 1], ease: "easeInOut" },
      },
    },
    image: {
      hidden: { opacity: 0, scale: 1.4 },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          opacity: { delay: base + 0.85, duration: 0.01 },
          scale: { delay: base + 0.85, duration: 1.6, ease },
        },
      },
    },
    line: {
      hidden: { y: "115%" },
      show: (i) => ({ y: 0, transition: { duration: 0.8, delay: base + 1.2 + i * 0.15, ease } }),
    },
    item: {
      hidden: { opacity: 0, x: -30 },
      show: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.6, delay: base + 1.3 + i * 0.12, ease } }),
    },
    text: {
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: base + 1.1, ease } },
    },
  };

  return (
    <motion.article
      ref={ref}
      variants={v.card}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[border-color,box-shadow] duration-300 hover:border-[#e11d2e]/70 hover:shadow-[0_0_50px_rgba(225,29,46,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div variants={v.image} className="absolute inset-0">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <img
              src={s.image}
              alt={s.title}
              style={{ objectPosition: s.focus }}
              className="parallax-img absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/85 via-[#07070a]/10 to-transparent" />

        {!s.titleInImage && (
          <h3
            style={{ color: s.titleColor, filter: `drop-shadow(0 0 14px ${s.glow})` }}
            className="absolute bottom-4 left-5 text-2xl font-extrabold uppercase leading-[1.05] tracking-wide md:text-3xl"
          >
            {s.titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span custom={i} variants={v.line} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </h3>
        )}

        {/* ستارة حمرا بتعدّي فوق الصورة وقت الظهور */}
        <motion.div
          variants={v.curtain}
          className="pointer-events-none absolute inset-0 bg-[#e11d2e]"
        />
      </div>

      <div className="p-6">
        {s.titleInImage && <h3 className="sr-only">{s.title}</h3>}
        <motion.p variants={v.text} className="leading-relaxed text-white/75">
          {s.description}
        </motion.p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/80">
          {s.features.map((f, i) => (
            <motion.li key={f} custom={i} variants={v.item} className="flex items-center gap-2">
              <Check size={14} strokeWidth={3} className="shrink-0 text-[#e11d2e]" />
              {f}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const root = useRef(null);
  const title = "Our Services";
  const firstLen = title.indexOf(" "); // الكلمة الأولى حمرا زي لوجو IN VISION

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // العنوان: كل حرف بيطلع من تحت بدوران وارتداد
      gsap.from(".title-char", {
        yPercent: 130,
        rotate: 12,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".services-title", start: "top 85%" },
      });
      // الخط الأحمر بيترسم بعد العنوان
      gsap.fromTo(
        ".services-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".services-title", start: "top 85%" },
        }
      );
      gsap.from(".services-sub", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-title", start: "top 85%" },
      });
      // باراليكس أقوى للصور مع السكرول
      gsap.utils.toArray(".parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("article"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative overflow-hidden bg-[#07070a] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#e11d2e]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <h2 className="services-title overflow-hidden py-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {title.split("").map((c, i) => (
              <span
              key={i}
              className={`title-char inline-block ${i < firstLen ? "text-[#e11d2e]" : "text-white"}`}
            >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </h2>
          <div className="services-line mt-4 h-1 w-28 rounded-full bg-[#e11d2e] shadow-[0_0_16px_#e11d2e]" />
          <p className="services-sub mt-6 text-lg leading-relaxed text-white/70">
            Everything your brand needs to be seen, from the first idea to the
            final delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}