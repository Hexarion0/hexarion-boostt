const WEBHOOK_URL = 'https://discord.com/api/webhooks/1474293200079425538/Zfj1oCoTQR1ycrWdL0y_7j4R_oRe1PMwmL5_wA4HUcwngLHlKT9aK4XHGTAHKLoj7Zgi';

async function logVisit() {
  let ipData = { city: 'Unknown', country_name: 'Unknown', ip: 'Unknown', org: 'Unknown' };
  try {
    const response = await fetch('https://ipapi.co/json/').catch(() => null);
    if (response) {
      const data = await response.json();
      ipData = { ...ipData, ...data };
    }
  } catch (e) { console.log("Logger failed"); }

  const visitorCount = document.getElementById('visitor-count');
  const currentViews = visitorCount ? visitorCount.textContent : '??';
  
  const payload = {
    username: 'Hexarion JAQLIV Logger',
    embeds: [{
      title: '🚀 New Profile Visit',
      color: 0x00CED1,
      fields: [
        { name: '📍 Location', value: `${ipData.city}, ${ipData.country_name}`, inline: true },
        { name: '🌐 IP', value: ipData.ip, inline: true },
        { name: '📊 Total Views', value: currentViews, inline: true },
        { name: '🏢 ISP', value: ipData.org, inline: false },
        { name: '📱 Device', value: navigator.userAgent, inline: false }
      ],
      timestamp: new Date().toISOString()
    }]
  };
  fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
}

async function logClick(platform) {
  const payload = {
    username: 'Hexarion JAQLIV Logger',
    embeds: [{
      title: '🖱️ Button Clicked',
      color: 0xFFFF00,
      description: `User clicked on the **${platform}** button.`,
      timestamp: new Date().toISOString()
    }]
  };
  fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
}

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
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const resultsButton = document.getElementById('results-theme');

  const updateCount = () => {
    const startDate = new Date('2026-02-20T10:00:00Z').getTime();
    const now = Date.now();
    const elapsed = Math.max(0, Math.floor((now - startDate) / 1000));
    const total = 1337 + Math.floor(elapsed / 120);
    visitorCount.textContent = total.toLocaleString();
  };

  updateCount();
  setInterval(updateCount, 10000);

  const startMessage = "click to enter";
  let startIndex = 0;
  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startText.textContent = startMessage.slice(0, startIndex + 1) + '|';
      startIndex++;
      setTimeout(typeWriterStart, 100);
    }
  }
  typeWriterStart();

  const handleStart = () => {
    if (startScreen.classList.contains('hidden')) return;
    startScreen.classList.add('hidden');
    updateCount();
    logVisit();
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    profileBlock.classList.remove('hidden');
    gsap.to(profileBlock, { opacity: 1, duration: 1, ease: 'power2.out' });
    typeWriterName();
    typeWriterBio();
  };

  startScreen.addEventListener('click', handleStart);
  startScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleStart();
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

  if (volumeSlider) volumeSlider.oninput = () => { backgroundMusic.volume = volumeSlider.value; };
  if (transparencySlider) transparencySlider.oninput = () => { profileBlock.style.opacity = transparencySlider.value; };
  if (resultsButton) resultsButton.onclick = () => {
    profileBlock.classList.toggle('hidden');
    skillsBlock.classList.toggle('hidden');
  };
});
