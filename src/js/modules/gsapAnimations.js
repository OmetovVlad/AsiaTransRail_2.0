import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import {bodyUnLock} from "./baseFunctions.js";

const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

// ScrollSmoother.create({
//   wrapper: ".smooth-wrapper",
//   content: ".smooth-content",
//   smooth: 1.2, // скорость плавности, чем выше — тем мягче
//   effects: true, // можно использовать data-speed/data-lag для эффектов параллакса
// });

window.addEventListener('load', () => {
  document.querySelectorAll('a.anchor').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.dataset.target || a.getAttribute('href').slice(1);
      const el = document.getElementById(id);

      if (!el) return;

      document.querySelector(`.mobile-header`).classList.remove('open');
      document.querySelector(`.mobile-header .open_menu`).classList.remove('open');
      bodyUnLock();

      gsap.to(window, { duration: 0, scrollTo: { y: el, offsetY: 20 } }); // offsetY — при необходимости
      history.replaceState(null, '', window.location.pathname + window.location.search); // убрать хеш
    });
  });
});

if ( window.innerWidth > 768 ) {
  window.addEventListener('load', () => {

    let preloaderAnimation = gsap.timeline({
      defaults: { duration: 0.75, ease: "power3.inOut" }
    });

    preloaderAnimation
      .to(
        "body",
        {
          duration: 0.3,
          className: "start"
        }
      )
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
      .to(
        "body",
        {
          duration: 0.3,
        }
      )

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


    function animateBlock(selector) {
      const el = document.querySelector(selector);
      if (!el) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          toggleActions: "play none none none",
          once: true
        },
        defaults: { ease: "power3.inOut" }
      });

      tl.fromTo(el, { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0 });
    }

    function animateBlockBottom(selector) {
      const el = document.querySelector(selector);
      const elements = document.querySelectorAll(selector + ' > *');
      if (!el) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'center bottom',
          toggleActions: "play none none none",
          once: true
        },
        defaults: { ease: "power3.inOut" }
      });

      tl.fromTo(el, { opacity: 0 }, { opacity: 1 })
        .fromTo(elements, { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0 });
    }

    function animateBlockTop(selector) {
      const el = document.querySelector(selector);
      const elements = document.querySelectorAll(selector + ' > *');
      if (!el) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          toggleActions: "play none none none",
          once: true
        },
        defaults: { ease: "power3.inOut" }
      });

      tl.fromTo(el, { opacity: 0 }, { opacity: 1 })
        .fromTo(elements, { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0 });
    }

    animateBlockTop("#aboutSlider");
    animateBlockTop("#aboutCompany");
    animateBlockTop("#story");
    animateBlockTop("#tariffs");
    animateBlockTop("#clients");
    animateBlockTop("#geography");
    animateBlockTop("#partners");
    animateBlockTop("#types");
    animateBlockTop("#callbackOrder");
    animateBlockTop("#services");
    animateBlockTop("#youCompany");
    animateBlockTop("#youGet");
    animateBlockTop("#day1");
    animateBlockBottom("#footer");

    // function typesImagePin(selector) {
    //   const el = document.querySelector(selector);
    //
    //   if (!el) return;
    //
    //   const content = el.querySelector(".info__content");
    //   const image = el.querySelector(".info__image-wrapper");
    //
    //   if (!content || !image) return;
    //
    //   ScrollTrigger.create({
    //     trigger: content,
    //     start: "top-=" + remToPx(42,85714285714286) + " top",
    //     end: () => "+=" + (content.offsetHeight - image.offsetHeight ), // длина пина
    //     pin: image,
    //     pinSpacing: false,
    //   });
    // }
    //
    // typesImagePin("#types");

  });

  const aboutListItemsNums = document.querySelectorAll(".advantages_item .name span");

  aboutListItemsNums.forEach(el => {
    const cleanValue = el.textContent
      .trim()
      .replace(/\s/g, '')
      .replace(',', '.');

    const finalValue = parseFloat(cleanValue);
    const obj = { val: 0 }; // отдельный объект для анимации
    el.textContent = 0;

    gsap.to(obj, {
      val: finalValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el.closest(".advantages_list"),
        start: "top-=50% bottom",
        end: "bottom-=50% bottom",
        once: true,
      },
      onUpdate: () => {
        let displayVal = obj.val;

        if (finalValue >= 1000) {
          el.textContent = Math.floor(displayVal)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        } else if (!Number.isInteger(finalValue)) {
          el.textContent = displayVal.toFixed(1).replace('.', ',');
        } else {
          el.textContent = Math.floor(displayVal);
        }
      },
    });
  });
}