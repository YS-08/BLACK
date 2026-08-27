document.addEventListener("DOMContentLoaded", () => {
  const textTarget = document.getElementById("word-target");
  const container = document.getElementById("scroll-text-container");
  
  const words = textTarget.innerText.trim().split(/\s+/);
  textTarget.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

  const wordSpans = textTarget.querySelectorAll(".word");
  const totalWords = wordSpans.length;

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const totalScrollableDistance = rect.height - windowHeight;
    const scrolled = -rect.top;
    
    let progress = scrolled / totalScrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    if (progress <= 0.45) {
      const appearProgress = progress / 0.45;
      const activeCount = Math.floor(appearProgress * totalWords);

      wordSpans.forEach((span, index) => {
        span.classList.remove("disappeared");
        if (index < activeCount && progress > 0) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    } else {
      const disappearProgress = (progress - 0.45) / 0.55;
      const removeCount = Math.floor(disappearProgress * totalWords);
      const remainCount = totalWords - removeCount;

      wordSpans.forEach((span, index) => {
        if (index >= remainCount) {
          span.classList.remove("active");
          span.classList.add("disappeared");
        } else {
          span.classList.add("active");
          span.classList.remove("disappeared");
        }
      });
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});