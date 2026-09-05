// Scroll-reveal + animated skill bars using IntersectionObserver
  const revealTargets = document.querySelectorAll('.reveal, .skill-bar-item, .about-photo');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  // Subtle 3D tilt effect on photos (mouse-follow), skipped for touch/reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (!prefersReducedMotion && !isTouch) {
    document.querySelectorAll('.tilt-3d').forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = x * 30;
        const rotateX = -y * 30;
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
      });

      wrapper.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  if (!prefersReducedMotion && isTouch) {
    document.querySelectorAll('.tilt-3d').forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      wrapper.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = wrapper.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width - 0.5;
        const y = (touch.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.06)`;
      }, { passive: true });

      wrapper.addEventListener('touchend', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  // mobile nav auto-close on link click
  const navCheckbox = document.getElementById('navtoggle');
  document.querySelectorAll('.navlinks a').forEach(a => {
    a.addEventListener('click', () => { if (navCheckbox) navCheckbox.checked = false; });
  });
