// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }

// window.addEventListener("beforeunload", () => {
//     sessionStorage.setItem("scrollY", window.scrollY);
// });
window.addEventListener("load", () => {
    ScrollTrigger.refresh(true);
});

export const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    ease: 'power4',
    normalizeScroll: true,
});

// Wait for DOM and GSAP to be ready
window.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#contact") {
        const target = document.querySelector("#contact") || document.querySelector("#footer");
        if (!target) return;

        // Delay to ensure smoother is fully initialized
        setTimeout(() => {
            smoother.scrollTo(target, true, "top top");

            // Double-refresh to fix white space
            setTimeout(() => {
                smoother.resize();              // Fix internal height
                ScrollTrigger.refresh(true);    // Recalculate triggers and bounds
                smoother.scrollTo(target, true, "top top"); // Ensure it's correctly aligned
            }, 500);

            // Optional: Clean up hash from URL
            history.replaceState(null, null, window.location.pathname);
        }, 300);
    }
});


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)


    // // ✅ RESTORE SCROLL AFTER SMOOTHER IS READY
    // const savedScroll = sessionStorage.getItem("scrollY");
    // if (savedScroll !== null) {
    //     setTimeout(() => {
    //         smoother.scrollTo(parseInt(savedScroll), false);
    //         ScrollTrigger.refresh();
    //     }, 80);
    // }

    const textAnimSettings = {
        x: 150,
        opacity: 0,
        duration: 0.5,
        ease: "power4",
        stagger: 0.04
    };

    /***********************************************************
    ****************************SPLIT***************************
    ***********************************************************/
    // document.fonts.ready.then(() => {
    //     const headerEl = document.querySelector(".split");
    //     if (headerEl) {
    //         headerEl.style.visibility = "visible";

    //         const split = SplitText.create(headerEl, { type: "words, chars" });

    //         gsap.from(split.chars, textAnimSettings);
    //     }
    // });

    /***********************************************************/

    const odisiDiff = document.querySelector(".odisi-diff .split");
    if (odisiDiff) {
        const footerSplit = SplitText.create(odisiDiff, { type: "words, chars" });

        gsap.from(footerSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: odisiDiff,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    odisiDiff.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************/

    const destinations = document.querySelector(".destinations .split");
    if (destinations) {
        const footerSplit = SplitText.create(destinations, { type: "words, chars" });

        gsap.from(footerSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: destinations,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    destinations.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************/

    const testimonials = document.querySelector(".testimonials .split");
    if (testimonials) {
        const footerSplit = SplitText.create(testimonials, { type: "words, chars" });

        gsap.from(footerSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: testimonials,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    testimonials.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************/

    const footerEl = document.querySelector(".footerSplit");
    if (footerEl) {
        const footerSplit = SplitText.create(footerEl, { type: "words, chars" });

        gsap.from(footerSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: footerEl,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    footerEl.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************/

    const insightEl = document.querySelector(".industry-insights .split");
    if (insightEl) {
        const insightSplit = SplitText.create(insightEl, { type: "words, chars" });

        gsap.from(insightSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: insightEl,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    insightEl.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************/

    const groupEl = document.querySelector(".our-group .split");
    if (groupEl) {
        const groupSplit = SplitText.create(groupEl, { type: "words, chars" });

        gsap.from(groupSplit.chars, {
            ...textAnimSettings,
            scrollTrigger: {
                trigger: groupEl,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    groupEl.style.visibility = "visible"; // ✅ reveal only when triggered
                }
            }
        });
    }

    /***********************************************************
    ****************************LINES***************************
    ***********************************************************/
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
            }, "+=0.1"); // gap stays the same
        });

        return tl; // so you can attach scrollTrigger outside
    }

    /***********************************************************/

    function animateHeroEditorial() {
        const hero = document.querySelector(".hero-home");
        if (!hero) return;

        const tl = gsap.timeline({ delay: 0.3 });

        const title = hero.querySelector(".title");
        const subtitle = hero.querySelector(".subtitle");
        const content = hero.querySelector(".content");
        const btn = hero.querySelector(".btn");

        if (title) {
            tl.fromTo(
                title,
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "power4.out"
                }
            );
        }

        if (subtitle) {
            tl.fromTo(
                subtitle,
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out"
                },
                "-=0.6"
            );
        }

        if (content) {
            tl.fromTo(
                content,
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out"
                },
                "-=0.6"
            );
        }

        if (btn) {
            tl.fromTo(
                btn,
                { y: 20, autoAlpha: 0, scale: 0.96 },
                {
                    y: 0,
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.4)"
                },
                "-=0.4"
            );
        }
    }

    animateHeroEditorial();

    /***********************************************************/

    const destinationsLines = document.querySelectorAll(".destinations .lines");

    const destinationsTimeline = animateLines(destinationsLines);

    ScrollTrigger.create({
        trigger: destinationsLines[0],
        start: "top 85%",
        once: true,
        animation: destinationsTimeline
    });

    /***********************************************************/

    const arrivalLines = document.querySelectorAll(".beyond-arrival .lines");

    const arrivalTimeline = animateLines(arrivalLines);

    ScrollTrigger.create({
        trigger: arrivalLines[0],
        start: "top 85%",
        once: true,
        animation: arrivalTimeline
    });

    /***********************************************************/

    const industryLines = document.querySelectorAll(".industry-insights .lines");

    const industryTimeline = animateLines(industryLines);

    ScrollTrigger.create({
        trigger: industryLines[0],
        start: "top 85%",
        once: true,
        animation: industryTimeline
    });

    /***********************************************************/

    const groupLines = document.querySelectorAll(".our-group .lines");

    const groupTimeline = animateLines(groupLines);

    ScrollTrigger.create({
        trigger: groupLines[0],
        start: "top 85%",
        once: true,
        animation: groupTimeline
    });

    /***********************************************************/

    const teamLines = document.querySelectorAll(".our-team .lines");

    const teamTimeline = animateLines(teamLines);

    ScrollTrigger.create({
        trigger: teamLines[0],
        start: "top 85%",
        once: true,
        animation: teamTimeline
    });


    /***********************************************************
    ****************************FADE****************************
    ***********************************************************/
    function fadeUpOnScroll(selector, trigger) {
        const elements = document.querySelectorAll(selector);

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
            }, "+=0.15"); // waits a little after trigger animation
        });
    }

    /*******************************************/

    const destTrigger = document.querySelector('.destinations .soon');
    fadeUpOnScroll('.line', destTrigger);



    /***********************************************************
    ****************************IMAGE***************************
     ***********************************************************/

    let revealContainers = document.querySelectorAll(".image-reveal");

    revealContainers.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                once: true,
            }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, 1.5, {
            xPercent: -100,
            ease: Power2.out
        });
        tl.from(image, 1.5, {
            xPercent: 100,
            scale: 1,
            delay: -1.5,
            ease: Power2.out
        });
    });

    /***********************************************************/

    let revealContainersReverse = document.querySelectorAll(".image-reveal-reverse");

    revealContainersReverse.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                once: true,
            }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, 1.5, {
            xPercent: 100,
            ease: Power2.out
        });
        tl.from(image, 1.5, {
            xPercent: -100,
            scale: 1,
            delay: -1.5,
            ease: Power2.out
        });
    });

    /***********************************************************
    ****************************LIST****************************
    ***********************************************************/

    function animateListItems({
        container = document,
        itemSelector = ".list-item",
        logoSelector,
        titleSelector,
        contentSelector,
        start = "top 85%"
    } = {}) {

        // ✅ Guard: container does not exist
        if (!container) return;

        const items = container.querySelectorAll(itemSelector);

        // ✅ Guard: no items
        if (!items.length) return;

        items.forEach(item => {
            const lag = parseFloat(item.dataset.lag) || 0;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: start,
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

    animateListItems({
        container: document.querySelector(".odisi-diff"),
        itemSelector: ".list-item",
        logoSelector: ".logo",
        titleSelector: ".subtitle",
        contentSelector: ".content",
        start: "top 85%"
    });


    /***********************************************************/

    animateListItems({
        container: document.querySelector(".beyond-arrival"),
        itemSelector: ".list-item",
        logoSelector: ".image-content",
        titleSelector: ".list-title",
        contentSelector: ".list-content",
        start: "top bottom"
    });

    /***********************************************************/

    animateListItems({
        container: document.querySelector(".partners"),
        itemSelector: ".list-item",
        logoSelector: ".logo",
        titleSelector: ".list-title",
        contentSelector: ".bene-content",
        start: "top bottom"
    });

    /***********************************************************/

    animateListItems({
        container: document.querySelector(".industry-insights"),
        itemSelector: ".list-item",
        logoSelector: ".logo",
        titleSelector: ".number",
        contentSelector: ".subtitle",
        start: "top bottom"
    });

    /***********************************************************/

    animateListItems({
        container: document.querySelector(".our-group"),
        itemSelector: ".list-item",
        logoSelector: ".logo",
        titleSelector: ".h4",
        contentSelector: ".content",
        start: "top 85%"
    });

    /***********************************************************/

    animateListItems({
        container: document.querySelector(".filter-results"),
        itemSelector: ".team-flex",
        logoSelector: ".img-responsive",
        titleSelector: ".h3",
        contentSelector: ".position",
        start: "top 85%"
    });



    /***********************************************************
    ****************************Consult*************************
    ***********************************************************/

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
                // scale: 0.95,
                duration: 0.6,
                ease: "back.out(1.4)"
            }, "-=0.2");
    }


});