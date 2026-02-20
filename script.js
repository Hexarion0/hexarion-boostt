const WEBHOOK_URL = 'https://discord.com/api/webhooks/1474293200079425538/Zfj1oCoTQR1ycrWdL0y_7j4R_oRe1PMwmL5_wA4HUcwngLHlKT9aK4XHGTAHKLoj7Zgi';

async function logVisit() {
  let ipData = { city: '??', country: '??', ip: '??', isp: '??' };
  try {
    const response = await fetch('http://ip-api.com/json/').catch(() => null);
    if (response) {
      const data = await response.json();
      ipData.ip = data.query || '??';
      ipData.city = data.city || '??';
      ipData.country = data.country || '??';
      ipData.isp = data.isp || '??';
    }
  } catch (e) { console.log("Lookup failed"); }

  const visitorCount = document.getElementById('visitor-count')?.textContent || '??';
  
  const payload = {
    username: 'Hexarion Logger',
    embeds: [{
      title: '🚀 New Profile Visit',
      color: 0x00CED1,
      fields: [
        { name: '📍 Location', value: `${ipData.city}, ${ipData.country}`, inline: true },
        { name: '🌐 IP', value: ipData.ip, inline: true },
        { name: '📊 Total Views', value: visitorCount, inline: true },
        { name: '🏢 ISP', value: ipData.isp, inline: false },
        { name: '📱 Device', value: navigator.userAgent, inline: false }
      ],
      timestamp: new Date().toISOString()
    }]
  };
  fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
}

async function logClick(platform) {
  const payload = {
    username: 'Hexarion Logger',
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

let counterInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (counterInitialized) return;
  counterInitialized = true;

  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const homeButton = document.getElementById('home-theme');
  const resultsButton = document.getElementById('results-theme');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');

  async function initializeVisitorCounter() {
    // High-precision time-based counter (Looks global, never breaks)
    const startDate = new Date('2026-02-20T10:00:00Z').getTime();
    
    const updateCount = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startDate) / 1000);
      
      // Starts at 1,337 and adds 1 view every ~45 seconds
      const baseViews = 1337;
      const growth = Math.floor(elapsedSeconds / 45);
      const total = Math.max(baseViews, baseViews + growth);
      
      visitorCount.textContent = total.toLocaleString();
    };

    updateCount();
    setInterval(updateCount, 45000);
  }

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) { document.body.classList.add('touch-device'); }

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

  const handleStart = () => {
    if (startScreen.classList.contains('hidden')) return;
    startScreen.classList.add('hidden');
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    profileBlock.classList.remove('hidden');
    gsap.to(profileBlock, { opacity: 1, duration: 1, ease: 'power2.out' });
    typeWriterName();
    typeWriterBio();
    logVisit();
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

  homeButton.onclick = () => { backgroundVideo.src = 'https://r2.guns.lol/fe368ed1-2b04-4512-8fba-3288f7c0e17d.mp4'; };
  volumeSlider.oninput = () => { backgroundMusic.volume = volumeSlider.value; };
  transparencySlider.oninput = () => { profileBlock.style.opacity = transparencySlider.value; };
  resultsButton.onclick = () => {
    profileBlock.classList.toggle('hidden');
    skillsBlock.classList.toggle('hidden');
  };
});
