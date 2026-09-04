document.addEventListener("DOMContentLoaded", () => {
  const coverWrappers = document.querySelectorAll(".cover-wrapper");
  const allAudioElements = document.querySelectorAll("audio[id^='bgm-audio']");

  coverWrappers.forEach(wrapper => {
    const audioId = wrapper.getAttribute("data-audio");
    const targetAudio = document.getElementById(audioId);

    if (targetAudio) {
      targetAudio.addEventListener("ended", () => {
        wrapper.classList.remove("playing");
        wrapper.classList.remove("clicked");
      });

      wrapper.addEventListener("click", () => {
        allAudioElements.forEach(audio => {
          if (audio !== targetAudio) {
            audio.pause();
            audio.currentTime = 0;
          }
        });

        coverWrappers.forEach(w => {
          if (w !== wrapper) {
            w.classList.remove("playing");
            w.classList.remove("clicked");
          }
        });

        wrapper.classList.add("clicked");
        setTimeout(() => {
          wrapper.classList.remove("clicked");
        }, 150);

        if (targetAudio.paused) {
          targetAudio.play().then(() => {
            wrapper.classList.add("playing");
          }).catch(error => {
            console.log("오디오 재생 실패:", error);
          });
        } else {
          targetAudio.pause();
          wrapper.classList.remove("playing");
        }
      });
    }
  });

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