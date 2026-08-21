/**
 * Crossfade carousel.
 * Markup contract: [data-carousel] wrapper with .carousel__slide children,
 * one carrying .is-active. Optional data-interval (ms, default 3000).
 * Pauses while hovered and while the tab is hidden.
 */
function initCarousel(root) {
  const slides = Array.from(root.querySelectorAll('.carousel__slide'));
  if (slides.length < 2) return;

  const interval = Number(root.dataset.interval) || 3000;
  let index = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
  let timer = null;

  const show = (next) => {
    slides[index].classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
  };

  const start = () => {
    if (timer) return;
    timer = window.setInterval(() => show(index + 1), interval);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  start();
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);
