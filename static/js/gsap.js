gsap.registerPlugin(ScrollTrigger, SplitText);

// Init Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: t => 1 - Math.pow(1 - t, 4),
  smooth: true,
  smoothTouch: false
});

// Sync Lenis with GSAP
lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: window });

// RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ✅ Global access
window.lenis = lenis;

// ✅ Smooth scroll for anchor links
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

// ✅ SplitText Animation
function animateSplitText(selector, options = {}) {
  const el = document.querySelector(selector);
  if (!el) return;

  const split = SplitText.create(el, {
    type: "lines, words",
    lineThreshold: 0.5
  });

  el.style.visibility = "hidden";
  gsap.set(split.lines, { overflow: "hidden" });

  gsap.fromTo(
    split.lines,
    { y: 60, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          el.style.visibility = "visible";
        },
        ...options.scrollTrigger
      },
      ...options.gsap
    }
  );
}

// ✅ Apply SplitText animations
animateSplitText(".odisi-diff .split");
animateSplitText(".destinations .split");
animateSplitText(".testimonials .split");
animateSplitText(".footerSplit");
animateSplitText(".industry-insights .split");
animateSplitText(".our-group .split");

// ✅ Hero Editorial Animation
function animateHeroEditorial() {
  const hero = document.querySelector(".hero-home");
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.3 });
  const title = hero.querySelector(".title");
  const subtitle = hero.querySelector(".subtitle");
  const content = hero.querySelector(".content");
  const btn = hero.querySelector(".btn");

  if (title) {
    tl.fromTo(title, { y: 60, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power4.out"
    });
  }

  if (subtitle) {
    tl.fromTo(subtitle, { y: 40, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
  }

  if (content) {
    tl.fromTo(content, { y: 30, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
  }

  if (btn) {
    tl.fromTo(btn, { y: 20, autoAlpha: 0, scale: 0.96 }, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)"
    }, "-=0.4");
  }
}
animateHeroEditorial();

// ✅ Animate Lines Function
function animateLines(linesEls) {
  const tl = gsap.timeline({ delay: 0.3 });

  linesEls.forEach(el => {
    el.style.visibility = "visible";
    const splitLines = SplitText.create(el, { type: "words, lines" });
    tl.from(splitLines.lines, {
      rotationX: -100,
      transformOrigin: "50% 50% -160px",
      opacity: 0,
      duration: 0.8,
      ease: "power3",
      stagger: 0.25
    }, "+=0.1");
  });

  return tl;
}

// ✅ Setup ScrollTriggers for line animations
[
  { selector: ".destinations .lines" },
  { selector: ".beyond-arrival .lines" },
  { selector: ".industry-insights .lines" },
  { selector: ".our-group .lines" },
  { selector: ".our-team .lines" }
].forEach(({ selector }) => {
  const els = document.querySelectorAll(selector);
  if (els.length) {
    ScrollTrigger.create({
      trigger: els[0],
      start: "top 85%",
      once: true,
      animation: animateLines(els)
    });
  }
});

// ✅ Fade on scroll
function fadeUpOnScroll(selector, trigger) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top 85%",
      once: true
    }
  });

  elements.forEach(el => {
    tl.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.15");
  });
}
fadeUpOnScroll('.line', document.querySelector('.destinations .soon'));

// ✅ Image reveal
function imageReveal(selector, reverse = false) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    const image = container.querySelector("img");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, once: true }
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, 1.5, {
      xPercent: reverse ? 100 : -100,
      ease: Power2.out
    });
    tl.from(image, 1.5, {
      xPercent: reverse ? -100 : 100,
      scale: 1,
      delay: -1.5,
      ease: Power2.out
    });
  });
}
imageReveal(".image-reveal");
imageReveal(".image-reveal-reverse", true);

// ✅ Animate List Items
function animateListItems({ container, itemSelector, logoSelector, titleSelector, contentSelector, start = "top 85%" }) {
  if (!container) return;
  const items = container.querySelectorAll(itemSelector);
  if (!items.length) return;

  items.forEach(item => {
    const lag = parseFloat(item.dataset.lag) || 0;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start,
        once: true
      }
    });

    const logo = logoSelector ? item.querySelector(logoSelector) : null;
    const title = titleSelector ? item.querySelector(titleSelector) : null;
    const content = contentSelector ? item.querySelector(contentSelector) : null;

    if (logo) {
      tl.from(logo, {
        scale: 0.8,
        opacity: 0,
        duration: 0.55,
        ease: "back.out(1.7)",
        delay: lag
      });
    }

    if (title) {
      tl.from(title, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.1");
    }

    if (content) {
      tl.from(content, {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out"
      }, "-=0.3");
    }
  });
}

// ✅ Apply List Item Animations
animateListItems({ container: document.querySelector(".odisi-diff"), itemSelector: ".list-item", logoSelector: ".logo", titleSelector: ".subtitle", contentSelector: ".content" });
animateListItems({ container: document.querySelector(".beyond-arrival"), itemSelector: ".list-item", logoSelector: ".image-content", titleSelector: ".list-title", contentSelector: ".list-content", start: "top bottom" });
animateListItems({ container: document.querySelector(".partners"), itemSelector: ".list-item", logoSelector: ".logo", titleSelector: ".list-title", contentSelector: ".bene-content", start: "top bottom" });
animateListItems({ container: document.querySelector(".industry-insights"), itemSelector: ".list-item", logoSelector: ".logo", titleSelector: ".number", contentSelector: ".subtitle", start: "top bottom" });
animateListItems({ container: document.querySelector(".our-group"), itemSelector: ".list-item", logoSelector: ".logo", titleSelector: ".h4", contentSelector: ".content" });
animateListItems({ container: document.querySelector(".filter-results"), itemSelector: ".team-flex", logoSelector: ".img-responsive", titleSelector: ".h3", contentSelector: ".position" });

// ✅ Consultation section
const consultation = document.querySelector(".consultation");
if (consultation) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: consultation,
      start: "top 80%",
      once: true
    }
  });

  tl.from(consultation, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  })
    .from(".consultation h2", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".consultation h3", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3")
    .from(".consultation .btn", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.4)"
    }, "-=0.2");
}
