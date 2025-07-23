class App {
  onReady() {
    this.customApp();
  }

  applyAnimationsByDirection(containerSelector, direction) {
    const targets = document.querySelectorAll(containerSelector);
    if (!targets.length) return;

    const observerOptions = {
      threshold: 0.01,
      rootMargin: "-500px 0px 0px 0px"
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(`animation__slide--${direction}`);

          entry.target.addEventListener(
            "animationend",
            function () {
              entry.target.classList.remove(`animation__slide--${direction}`);
            },
            { once: true }
          );

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    targets.forEach(target => observer.observe(target));
  }

  customApp() {
    this.applyAnimationsByDirection(".animation__left", "left");
    this.applyAnimationsByDirection(".animation__right", "right");
    this.applyAnimationsByDirection(".animation__fade-in-upscale", "fade-in-upscale");
    this.applyAnimationsByDirection(".animation__up", "up");
    this.applyAnimationsByDirection(".animation__down", "down");
  }

  init() {
    this.onReady();
  }
}

const app = new App();
app.init();
