/* script.js */
document.addEventListener("DOMContentLoaded", () => {
  // 첫 번째 스크롤 인터랙션
  const textTarget = document.getElementById("word-target");
  const container = document.getElementById("scroll-text-container");
  
  const words = textTarget.innerText.trim().split(/\s+/);
  textTarget.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
  const wordSpans = textTarget.querySelectorAll(".word");
  const totalWords = wordSpans.length;

  function onScroll1() {
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

  // 두 번째 스크롤 인터랙션 (And . . . .)
  const textTarget2 = document.getElementById("word-target-2");
  const container2 = document.getElementById("scroll-text-container-2");
  
  const words2 = textTarget2.innerText.trim().split(/\s+/);
  textTarget2.innerHTML = words2.map(word => `<span class="word">${word}</span>`).join(" ");
  const wordSpans2 = textTarget2.querySelectorAll(".word");
  const totalWords2 = wordSpans2.length;

  function onScroll2() {
    const rect = container2.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;
    const scrolled = -rect.top;
    
    let progress = scrolled / totalScrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    if (progress <= 0.45) {
      const appearProgress = progress / 0.45;
      const activeCount = Math.floor(appearProgress * totalWords2);

      wordSpans2.forEach((span, index) => {
        span.classList.remove("disappeared");
        if (index < activeCount && progress > 0) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    } else {
      // 한 번에 사라지도록 설정
      wordSpans2.forEach((span) => {
        span.classList.remove("active");
        span.classList.add("disappeared");
      });
    }
  }

  function handleScroll() {
    onScroll1();
    onScroll2();
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
