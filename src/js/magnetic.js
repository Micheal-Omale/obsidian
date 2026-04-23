import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * All magnetic hover interactions — decoupled from animation timelines.
 */
export function initMagnetic() {
  // Product grid item magnetic effect
  document.querySelectorAll('.fashion-magnetic').forEach(item => {
    const img = item.querySelector('.image-mask');

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(img, {
        x: x * 0.1,
        y: y * 0.1,
        rotateX: -y * 0.05,
        rotateY: x * 0.05,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        x: 0, y: 0, rotateX: 0, rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });

  // Interactive section image cursor tracking
  const interactiveWrap = document.querySelector('.interactive-image-wrap');
  if (interactiveWrap) {
    const img = interactiveWrap.querySelector('img');

    interactiveWrap.addEventListener('mousemove', (e) => {
      const rect = interactiveWrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(img, {
        x: x * 18,
        y: y * 12,
        rotateY: x * 6,
        rotateX: -y * 6,
        scale: 1.04,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1200,
      });
    });

    interactiveWrap.addEventListener('mouseleave', () => {
      gsap.to(img, {
        x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.2)',
      });
    });
  }
}
