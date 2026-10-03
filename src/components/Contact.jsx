import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 * 1) CONFIG — بيانات التواصل الأساسية
 * ------------------------------------------------------------------ */
const CONTACT = {
  phone: "+201096099757",
  whatsapp: "+201096099757",
  email: "invision.agance@gmail.com",
  facebook: "https://www.facebook.com/share/1J5C8vHT4u/",
  instagram: "https://www.instagram.com/invisionagancy?utm_source=qr&stkn=cTY1eDJ0cDVhc214",
  whatsappMessage: "Hello IN VISION team, I'm interested in joining your team.",
};


const cleanPhone = (val) => {
  const digits = String(val).replace(/\D/g, "");
  return /^\d{8,15}$/.test(digits) ? digits : null;
};

const cleanEmail = (val) => {
  const email = String(val).trim();
  return /^[^\s@<>"'`]+@[^\s@<>"'`]+\.[^\s@<>"'`]+$/.test(email) ? email : null;
};

const cleanSocialUrl = (val, allowedHosts) => {
  try {
    const url = new URL(String(val));
    const host = url.hostname.replace(/^www\./, "");
    if (url.protocol !== "https:" || !allowedHosts.includes(host)) return null;
    return url.href;
  } catch {
    return null;
  }
};

const phoneDigits = cleanPhone(CONTACT.phone);
const waDigits = cleanPhone(CONTACT.whatsapp);
const email = cleanEmail(CONTACT.email);

const links = {
  phone: phoneDigits ? `tel:+${phoneDigits}` : null,
  email: email ? `mailto:${email}` : null,
  facebook: cleanSocialUrl(CONTACT.facebook, ["facebook.com", "fb.com"]),
  instagram: cleanSocialUrl(CONTACT.instagram, ["instagram.com"]),
  whatsapp: waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
    : null,
};

const ease = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ *
 * 3) مكون كارت التواصل الفردي
 * ------------------------------------------------------------------ */
function ContactRow({ icon: Icon, label, value, href, external, index }) {
  if (!href) return null;
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.a
      href={href}
      {...externalProps}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      whileHover={{ x: 8 }}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#e11d2e]/60 hover:bg-white/[0.07] hover:shadow-[0_0_35px_rgba(225,29,46,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e11d2e]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e11d2e]/15 text-[#e11d2e] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#e11d2e] group-hover:text-white">
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-white/50">{label}</span>
        <span className="block truncate font-semibold text-white">{value}</span>
      </span>
      <HiArrowUpRight
        size={20}
        className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e11d2e]"
        aria-hidden="true"
      />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ *
 * 4) القسم الرئيسي Contact
 * ------------------------------------------------------------------ */
export default function Contact() {
  const root = useRef(null);
  const title = "Let's Talk";
  const firstLen = title.indexOf(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-char", {
        yPercent: 130,
        rotate: 10,
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".contact-title", start: "top 85%" },
      });

      gsap.to(".cta-pulse", {
        scale: 1.35,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-[#07070a] py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#e11d2e]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="contact-title overflow-hidden py-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
          {title.split("").map((c, i) => (
            <span
              key={i}
              className={`contact-char inline-block ${i < firstLen ? "text-[#e11d2e]" : "text-white"}`}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease }}
          style={{ originX: 0 }}
          className="mt-4 h-1 w-28 rounded-full bg-[#e11d2e] shadow-[0_0_16px_#e11d2e]"
        />

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Have a project in mind? Reach out and let's build something people step into.
        </p>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ContactRow index={0} icon={FaPhoneAlt} label="Phone" value={CONTACT.phone} href={links.phone} />
            <ContactRow index={1} icon={FaEnvelope} label="Email" value={email} href={links.email} />
            <ContactRow index={2} icon={FaFacebookF} label="Facebook" value="IN VISION" href={links.facebook} external />
            <ContactRow index={3} icon={FaInstagram} label="Instagram" value="@invision" href={links.instagram} external />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e11d2e]/30 blur-[90px]" />

            <h3 className="relative font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              <span className="text-[#e11d2e]">We're</span> hiring
            </h3>
            <p className="relative mt-4 max-w-md leading-relaxed text-white/70">
              Join a team that turns bold ideas into immersive experiences. Send us a message and we'll get back to you.
            </p>

            {links.whatsapp && (
              <div className="relative mt-8 inline-block self-start">
                <span className="cta-pulse pointer-events-none absolute inset-0 rounded-full bg-[#e11d2e]/60" />
                <motion.a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center gap-3 rounded-full bg-[#e11d2e] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(225,29,46,0.5)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(225,29,46,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <FaWhatsapp size={22} aria-hidden="true" />
                  Apply on WhatsApp
                </motion.a>
              </div>
            )}
          </motion.div>
        </div>

        <p className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} IN VISION. All rights reserved.
        </p>
      </div>
    </section>
  );
}