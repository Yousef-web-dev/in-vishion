import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";

// الـ id لازم يطابق id القسم في الصفحة (Hero = home, About = about, ...)
const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // بنوقف الـ scroll spy لحظيًا بعد الضغط، عشان الـ active ما يتنططش أثناء السكرول
  const lock = useRef(false);
  const lockTimer = useRef(null);

  /* ---------- الانتقال للقسم ---------- */
  const pending = useRef(null); // قسم مستني قائمة الموبايل تتقفل الأول

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const runPending = () => {
    if (!pending.current) return;
    const id = pending.current;
    pending.current = null;
    scrollToId(id);
  };

  const goTo = (e, id) => {
    if (!document.getElementById(id)) return; // القسم مش موجود: سيب المتصفح يتصرف عادي

    e.preventDefault();
    lock.current = true;
    setActive(id);

    if (open) {
      // موبايل: اقفل القائمة الأول، وبعد ما تخلص نسكرول
      // (السكرول أثناء حركة القفل كان بيتلغي)
      pending.current = id;
      setOpen(false);
      setTimeout(runPending, 450); // احتياطي لو onExitComplete ما اشتغلش
    } else {
      scrollToId(id);
    }

    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lock.current = false;
    }, 1700);
  };

  /* ---------- خلفية الـ navbar + آخر الصفحة ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && !lock.current) setActive(links[links.length - 1].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Scroll spy: القسم اللي في نص الشاشة هو النشط ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !lock.current) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      clearTimeout(lockTimer.current);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-black/60" : "border-transparent bg-black/40"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#home" onClick={(e) => goTo(e, "home")} aria-label="IN VISION - Home">
          <img src={logo} alt="IN VISION" className="h-11 w-auto  md:h-14 rounded-full" />
        </a>

        {/* لينكات الديسكتوب */}
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => goTo(e, l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#e11d2e] ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#e11d2e] shadow-[0_0_10px_#e11d2e]"
                    />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-[#e11d2e]/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* زر القائمة للموبايل */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* قائمة الموبايل */}
      <AnimatePresence onExitComplete={runPending}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-black/85 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => goTo(e, l.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-3 border-b border-white/5 py-4 text-lg font-medium transition-all ${
                        isActive ? "text-[#e11d2e]" : "text-white/90 hover:text-[#e11d2e]"
                      }`}
                    >
                      <span
                        className={`h-5 w-1 rounded-full bg-[#e11d2e] transition-opacity ${
                          isActive ? "opacity-100 shadow-[0_0_10px_#e11d2e]" : "opacity-0"
                        }`}
                      />
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}