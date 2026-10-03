# 🚀 IN VISION | Creative Technology & Marketing Agency

A modern, high-performance, and immersive web application built for **IN VISION** agency. The project showcases creative services, stunning UI/UX animations, responsive layouts, and a secure contact/hiring system.

---

## ✨ Features

- **Immersive Animations:** Powered by **GSAP** (ScrollTrigger) and **Framer Motion** for smooth scroll reveals, custom text animations, and fluid transitions.
- **Modern UI Design:** Crafted with **Tailwind CSS** following a sleek, dark-themed aesthetic (`#07070a`) with glowing accent details and custom glassmorphism.
- **Interactive Navbar & Scroll Spy:** Dynamic navigation with active section tracking, smooth scrolling, and mobile drawer support.
- **Secure Contact & Application System:** Input validation and sanitization for phone numbers, emails, and official social media URLs to prevent security vulnerabilities and malformed inputs.
- **Fully Responsive:** Meticulously optimized across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework:** [React.js](https://react.dev/) / [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
src/
├── assets/         # Images and media files (Hero, About, Services backgrounds)
├── components/     # Modular React components
│   ├── Navbar.jsx  # Navigation bar with scroll-spy & mobile menu
│   ├── Hero.jsx    # Hero section with animated glowing elements
│   ├── About.jsx   # About section highlighting agency expertise
│   ├── Services.jsx# Interactive services showcase with GSAP & Framer Motion
│   └── Contact.jsx # Secure contact & hiring section
├── App.jsx         # Main application assembly
├── main.jsx        # Application entry point
└── index.css       # Global styles & Tailwind configuration