import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * All GSAP animation timelines and ScrollTrigger sequences.
 */
export function initAnimations() {

  // 1. Entrance
  const tl = gsap.timeline();
  tl.from('.nav', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.distort-text', {
      y: 200,
      opacity: 0,
      skewY: 10,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    }, '-=0.5')
    .from('.hero-image-wrapper', {
      scale: 0.8, opacity: 0, rotateZ: -5,
      duration: 1.5, ease: 'power3.out',
    }, '-=1')
    .from('.meta', { opacity: 0, stagger: 0.1, duration: 1 }, '-=1');

  // 2. Hero parallax
  gsap.utils.toArray('.fashion-parallax').forEach((container) => {
    const img = container.querySelector('img');
    gsap.to(img, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // 3. Archive image parallax
  gsap.utils.toArray('.image-mask img').forEach(img => {
    gsap.to(img, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // 4. Archive section title reveal
  gsap.from('.section-title', {
    scrollTrigger: { trigger: '.archive', start: 'top 80%' },
    y: 100, opacity: 0, skewY: 5,
    duration: 1.2, ease: 'power3.out',
  });

  // 5. Horizontal scroll pin
  const hContainer = document.querySelector('.h-scroll-container');
  const hPin = document.querySelector('.horizontal-pin');

  if (hContainer && hPin) {
    gsap.to(hContainer, {
      xPercent: -66.6666,
      ease: 'none',
      scrollTrigger: {
        trigger: hPin,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1.5,
      },
    });

    gsap.to('.slide-left', {
      x: -300, ease: 'none',
      scrollTrigger: { trigger: hPin, start: 'top top', end: '+=300%', scrub: 1.5 },
    });

    gsap.to('.slide-right', {
      x: 300, ease: 'none',
      scrollTrigger: { trigger: hPin, start: 'top top', end: '+=300%', scrub: 1.5 },
    });

    gsap.from('.scale-img', {
      scale: 0.1, opacity: 0, ease: 'power2.inOut',
      scrollTrigger: { trigger: hPin, start: 'top top', end: '+=150%', scrub: 1.5 },
    });

    gsap.from('.expand-text', {
      letterSpacing: '-25px', opacity: 0, ease: 'power2.out',
      scrollTrigger: { trigger: hPin, start: 'top center', end: '+=250%', scrub: 1.5 },
    });
  }

  // 6. Interactive section scroll reveal
  gsap.from('.interactive-text > *', {
    scrollTrigger: { trigger: '.interactive-section', start: 'top 75%' },
    y: 60, opacity: 0,
    stagger: 0.15, duration: 1.1, ease: 'power3.out',
  });

  gsap.from('.interactive-image-wrap', {
    scrollTrigger: { trigger: '.interactive-section', start: 'top 70%' },
    x: 80, opacity: 0,
    duration: 1.4, ease: 'power3.out',
  });

  // 6b. Vertical parallax on interactive image as user scrolls past
  const interactiveImg = document.querySelector('.interactive-image-wrap img');
  if (interactiveImg) {
    gsap.to(interactiveImg, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.interactive-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // 7. Footer reveal
  gsap.from('.site-footer .footer-top > *', {
    scrollTrigger: { trigger: '.site-footer', start: 'top 85%' },
    y: 40, opacity: 0,
    stagger: 0.1, duration: 0.9, ease: 'power2.out',
  });
}
