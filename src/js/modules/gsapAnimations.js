import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import ScrollSmoother from "gsap/ScrollSmoother.js";

gsap.registerPlugin( ScrollSmoother, ScrollTrigger, ScrollToPlugin );

function splitText(selector, type = 'chars') {
  const el = document.querySelector(selector);
  if (!el) return [];

  const text = el.textContent.trim();
  el.textContent = '';

  let parts = [];
  if (type === 'chars') {
    parts = text.split('');
  } else if (type === 'words') {
    parts = text.split(' ');
  }

  parts.forEach((part, i) => {
    const span = document.createElement('span');
    span.textContent = part === ' ' ? '\u00A0' : part;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    el.appendChild(span);
  });

  return el.querySelectorAll('span');
}

const smoother = ScrollSmoother.create({
  wrapper: ".smooth-wrapper",
  content: ".smooth-content",
  smooth: 1.2, // скорость плавности, чем выше — тем мягче
  effects: true, // можно использовать data-speed/data-lag для эффектов параллакса
});

const header = document.querySelector("header.header");

let lastY = window.scrollY;
let headerHidden = false;
let isFixed = false;
let ticking = false;

// переключаем в fixed только после 100svh — до этого header остаётся неизменным
ScrollTrigger.create({
  trigger: document.body,
  start: "100svh top",
  onEnter: () => {
    headerHidden = true;
    isFixed = true;
  },
  onLeaveBack: () => {
    headerHidden = false;
    isFixed = false;
  }
});

// отслеживаем направление скролла — управляем только когда header fixed
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (isFixed) {
        const delta = y - lastY;
        if (delta > 5) { // скролл вниз
          if (!headerHidden) {
            gsap.to(header, { y: "-100%", duration: 0.28, ease: "power2.out" });
            headerHidden = true;
          }
        } else if (delta < -5) { // скролл вверх
          if (headerHidden) {
            gsap.to(header, { y: "0%", duration: 0.28, ease: "power2.out" });
            headerHidden = false;
          }
        }
      }
      lastY = y;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// const marquee = document.querySelector(".trans-time .marquee");
// const content = marquee.innerHTML;
// marquee.innerHTML += content;
// gsap.to(
//   marquee,
//   {
//     x: `-${marquee.scrollWidth / 2}px`,
//     ease: "none",
//     duration: 25, // скорость
//     repeat: -1
//   })
//
// const marqueeBrands = document.querySelector("#brands .marquee");
// const contentBrands = marqueeBrands.innerHTML;
// marqueeBrands.innerHTML += contentBrands;
// gsap.to(
//   marqueeBrands,
//   {
//     x: `-${marqueeBrands.scrollWidth / 2}px`,
//     ease: "none",
//     duration: 15,
//     repeat: -1
//   })

if ( document.documentElement.classList.contains('_pc') ) {

  let preloaderAnimation = gsap.timeline({
    defaults: { duration: 0.75, ease: "power3.inOut" }
  });

  preloaderAnimation
    // .fromTo(
    //   ".logo.preloader",
    //   { autoAlpha: 0, scale: 0.35, borderRadius: '2em'},
    //   { autoAlpha: 1, scale: 0.5, borderRadius: '2em', duration: 0.75, ease: "back.inOut(2)", }
    // )
    .fromTo(
      ".logo.preloader img",
      { scale: 0.5, opacity: 0 },
      { scale: 1.5, opacity: 1, ease: "back.inOut(2)" }
    )
    .addLabel("animateLogo")
    .fromTo(
      ".logo.preloader img",
      { scale: 1.5, },
      { scale: 1 },
      "animateLogo"
    )
    .fromTo(
      ".logo.preloader",
      { height: '100%', background: '#fff' },
      { height: '6.857142857142857rem', background: 'transparent', pointerEvents: 'none' },
      "animateLogo"
    ).add(() => helloAnimation.play())
    .addLabel("preloaderAnimationEnd")

  const menuItems = document.querySelectorAll(".header .menu a");

  preloaderAnimation.fromTo(
    menuItems,
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    },
    'preloaderAnimationEnd'
  ).addLabel("menuItemsAnimationEnd");

  const menuEventButtons = document.querySelectorAll(".header .event_buttons > *");

  preloaderAnimation.fromTo(
    menuEventButtons,
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    },
    'menuItemsAnimationEnd'
  );


  const heroTitle = splitText(".logistics__title", "chars");
  const heroSubtitle = splitText(".logistics__subtitle", "chars");

  const heroIcons = document.querySelectorAll("#hero .logistics__line .logistics__icons .logistics__item");

  // const heroIcons_first = document.querySelectorAll("#hero .logistics__line.first .logistics__icons .logistics__item");
  const heroIconsLine_first = document.querySelectorAll("#hero .logistics__line.first .logistics__icons .line");
  const heroIconsDot_first = document.querySelectorAll("#hero .logistics__line.first .logistics__icons .line .dot");

  // const heroIcons_second = document.querySelectorAll("#hero .logistics__line.second .logistics__icons .logistics__item");
  const heroIconsLine_second = document.querySelectorAll("#hero .logistics__line.second .logistics__icons .line");
  const heroIconsDot_second = document.querySelectorAll("#hero .logistics__line.second .logistics__icons .line .dot");

  const servicesItem = document.querySelectorAll("#hero .logistics .services_list .services_item");
  const servicesNameList = document.querySelectorAll("#hero .services_name_list .services_name_item");

  let helloAnimation = gsap.timeline({ paused: true,
    defaults: { duration: 0.75, ease: "power3.inOut" }
  });

  helloAnimation.addLabel("starHeroAnimation")
    .fromTo(
      heroTitle,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.05,
        duration: 0.5,
      }
    )
    .fromTo(
      heroSubtitle,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.05,
        duration: 0.5,
        delay: 0.5,
      },
      "starHeroAnimation"
    )
    .addLabel("endTitleAnimation")
    .fromTo(
      heroIconsDot_first,
      {opacity: 0},
      {opacity: 1, delay: 1},
      "starHeroAnimation"
    )
    .fromTo(
      heroIconsDot_second,
      {opacity: 0},
      {opacity: 1, delay: 1.2},
      "starHeroAnimation"
    )
    .addLabel("endDotsAnimation")
    .fromTo(
      heroIconsLine_first,
      {width: 0},
      {width: '100%', delay: 1.1},
      "starHeroAnimation"
    )
    .fromTo(
      heroIconsLine_second,
      {width: 0},
      {width: '100%', delay: 1.2},
      "starHeroAnimation"
    )
    .fromTo(
      heroIcons,
      {
        opacity: 0,
        x: -20
      },
      {
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        stagger: 0.2,
        duration: 0.5,
      },
      "endDotsAnimation"
    )
    .fromTo(
      servicesItem,
      {
        opacity: 0,
        yPercent: 20
      },
      {
        opacity: 1,
        yPercent: 0,
        ease: 'power2.out',
        stagger: 0.2,
      },
      "endDotsAnimation"
    )
    .fromTo(
      servicesNameList,
      {
        opacity: 0,
        yPercent: 20
      },
      {
        opacity: 1,
        yPercent: 0,
        ease: 'power2.out',
        stagger: 0.2,
      },
      "endDotsAnimation"
    )


  // let heroAnimations = gsap.timeline({
  //   defaults: { duration: 0.75, ease: "power3.inOut" }
  // });
  //
  // heroAnimations
  //   .fromTo(
  //     "#hero .bg img",
  //     { autoAlpha: 0, scale: 0.35, borderRadius: '2em'},
  //     { autoAlpha: 1, scale: 0.5, borderRadius: '2em', duration: 0.75, ease: "back.inOut(2)", }
  //   )
  //   .fromTo(
  //     "#hero .bg img",
  //     { scale: 0.5, borderRadius: '2em' },
  //     { scale: 1, borderRadius: 0 , duration: 0.5 }
  //   )
  //   .addLabel("animateText")
  //   .fromTo(
  //     "#hero .utp h1",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0 }
  //   )
  //   .fromTo(
  //     "#hero .utp .list",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.2 },
  //     "animateText"
  //   )
  //   .fromTo(
  //     "#hero .form",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.4 },
  //     "animateText"
  //   )
  //   .fromTo(
  //     "#hero .swiper-navigation",
  //     { autoAlpha: 0 },
  //     { autoAlpha: 1, delay: 0.6 },
  //     "animateText"
  //   )
  //   .fromTo(
  //     "#hero .hero-progress",
  //     { autoAlpha: 0 },
  //     { autoAlpha: 1, delay: 0.6 },
  //     "animateText"
  //   )
  //   .addLabel("animateTransLine")
  //   .fromTo(
  //     "#hero .trans-time",
  //     { autoAlpha: 0 },
  //     { autoAlpha: 1 }
  //   )
  //   .fromTo(
  //     "header.header .logo",
  //     { autoAlpha: 0, y: 30 },
  //     { autoAlpha: 1, y: 0 },
  //     "animateTransLine"
  //   )
  //   .fromTo(
  //     "header.header menu",
  //     { autoAlpha: 0, y: 30 },
  //     { autoAlpha: 1, y: 0, delay: 0.2 },
  //     "animateTransLine"
  //   )
  //   .fromTo(
  //     "header.header .buttons",
  //     { autoAlpha: 0, y: 30 },
  //     { autoAlpha: 1, y: 0, delay: 0.4 },
  //     "animateTransLine"
  //   );
  //
  // const aboutListItems = document.querySelectorAll('#about .right .item');
  // const aboutListItemsNums = document.querySelectorAll('#about .right .item span span');
  // let aboutAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#about",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   },
  //   defaults: { ease: "power3.inOut" }
  // });
  //
  // const svgGraph_piece = document.querySelectorAll('#about svg .piece');
  // const svgGraph_percents = document.querySelectorAll('#about svg .percents');
  // const svgGraph_line = document.querySelectorAll('#about svg .line');
  // const svgGraph_dot = document.querySelectorAll('#about svg .dot');
  // const svgGraph_name = document.querySelectorAll('#about svg .name');
  //
  // aboutAnimations.addLabel('startAbout')
  //   .fromTo(
  //     "#about .left .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     "#about .left .title h4",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0, delay: 0.1 },
  //     'startAbout'
  //   )
  //   .fromTo(
  //     "#about .left .title p",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.2 },
  //     'startAbout'
  //   )
  //   .fromTo(
  //     svgGraph_piece,
  //     { autoAlpha: 0},
  //     { autoAlpha: 1, duration: 0.5, delay: 0.1, stagger: 0.2 },
  //     'startAbout'
  //   )
  //   .addLabel('graphComplete')
  //   .fromTo(
  //     svgGraph_percents,
  //     { autoAlpha: 1, scale: 0},
  //     { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.inOut(2)", delay: 0.1, stagger: 0.2 },
  //   )
  //   .fromTo(
  //     svgGraph_line,
  //     { autoAlpha: 0},
  //     { autoAlpha: 1, duration: 0.5, ease: "back.inOut(2)", delay: 0.1, stagger: 0.2 },
  //     'graphComplete'
  //   )
  //   .fromTo(
  //     svgGraph_dot,
  //     { autoAlpha: 0, scale: 0},
  //     { autoAlpha: 1,scale: 1 , duration: 0.5, ease: "back.inOut(2)", delay: 0.2, stagger: 0.2 },
  //     'graphComplete'
  //   )
  //   .fromTo(
  //     svgGraph_name,
  //     { autoAlpha: 0, scale: 0},
  //     { autoAlpha: 1,scale: 1 , duration: 0.5, ease: "back.inOut(2)", delay: 0.4, stagger: 0.2 },
  //     'graphComplete'
  //   )
  //   .fromTo(
  //     aboutListItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.1, stagger: 0.1 },
  //     'startAbout'
  //   )
  //   .fromTo(
  //     "#about .right .navigation",
  //     { autoAlpha: 0 },
  //     { autoAlpha: 1, delay: 0.5, stagger: 0.1 },
  //     'startAbout'
  //   )
  //
  // aboutListItemsNums.forEach(el => {
  //   aboutAnimations.fromTo(
  //     el,
  //     { textContent: 0 },
  //     {
  //       textContent: el.textContent,
  //       duration: 2,
  //       snap: Number.isInteger(Number(el.textContent)) ? { textContent: 1 } : { textContent: 0.1 },
  //     },
  //     'startAbout' // все стартуют одновременно
  //   );
  // });
  //
  //
  // const forBusinessItems = document.querySelectorAll('#you_business .you_business-list .item');
  // let forBusinessAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#you_business",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // forBusinessAnimations.addLabel('startBusiness')
  //   .fromTo(
  //     "#you_business .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     forBusinessItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.1, stagger: 0.1, },
  //     'startBusiness'
  //   )
  //
  //
  // let mapAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#map",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // mapAnimations.addLabel('startMap')
  //   .fromTo(
  //     "#map .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     "#map img",
  //     { autoAlpha: 0, scale: 0.9},
  //     { autoAlpha: 1, scale: 1},
  //   )
  //
  //
  // const brandsListItems = document.querySelectorAll('#brands .item');
  // let brandsAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#brands",
  //     markers: false,
  //     start: 'top bottom',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   },
  //   defaults: { ease: "power3.inOut" }
  // });
  //
  // brandsAnimations
  //   .fromTo(
  //     "#brands",
  //     { width: 0 },
  //     { width: '100%', delay: 0.5 },
  //   )
  //   .fromTo(
  //     brandsListItems,
  //     { autoAlpha: 0, scale: 0.5 },
  //     { autoAlpha: 1, scale: 1, stagger: 0.1 },
  //   )
  //
  //
  // const excellenceListItems = document.querySelectorAll('#excellence .excellence-list .item');
  // let excellenceAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#excellence",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // excellenceAnimations.addLabel('startExcellence')
  //   .fromTo(
  //     "#excellence .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     excellenceListItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.1, stagger: 0.1, },
  //     'startExcellence'
  //   )
  //
  //
  // const servicesListItems = document.querySelectorAll('#services .services-list .item');
  // let servicesAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#services",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // servicesAnimations.addLabel('startServices')
  //   .fromTo(
  //     "#services .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     "#services .title p",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.1 },
  //     'startServices'
  //   )
  //   .fromTo(
  //     servicesListItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.1, stagger: 0.1, },
  //     'startServices'
  //   )
  //
  //
  // const advantagesListItems = document.querySelectorAll('#advantages .advantages-list .item');
  // let advantagesAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#advantages",
  //     markers: false,
  //     start: 'top center',
  //     // end: 'bottom center',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // advantagesAnimations.addLabel('startAdvantages')
  //   .fromTo(
  //     "#advantages .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     "#advantages .title p",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.1 },
  //     'startAdvantages'
  //   )
  //   .fromTo(
  //     advantagesListItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.1, stagger: 0.1, },
  //     'startAdvantages'
  //   )
  //
  //
  // let consultationAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#consultation",
  //     markers: false,
  //     start: 'top 70%',
  //     // end: 'bottom bottom',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // consultationAnimations.addLabel('startConsultation')
  //   .fromTo(
  //     "#consultation .title h2",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     "#consultation .form",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.1 },
  //     'startConsultation'
  //   )
  //   .fromTo(
  //     "#consultation .Denis",
  //     { autoAlpha: 0, x: 20 },
  //     { autoAlpha: 1, x: 0, delay: 0.1 },
  //     'startConsultation'
  //   )
  //
  //
  // const footerListItems = document.querySelectorAll('#footer .list .item');
  // let footerAnimations = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#footer",
  //     markers: false,
  //     start: 'center bottom',
  //     // end: 'bottom bottom',
  //     pin: false,
  //     // scrub: 2,
  //     toggleActions: "play none none none", // играем один раз
  //     once: true // альтернативно — сразу выключает откат
  //   }
  // })
  //
  // footerAnimations.addLabel('startFooter')
  //   .fromTo(
  //     "footer .head",
  //     { autoAlpha: 0, x: 20},
  //     { autoAlpha: 1, x: 0},
  //   )
  //   .fromTo(
  //     footerListItems,
  //     { autoAlpha: 0, y: 20 },
  //     { autoAlpha: 1, y: 0, delay: 0.2, stagger: 0.1, },
  //     'startFooter'
  //   )

}