// Optimized Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const setTheme = (isDark) => {
    if (isDark) {
        body.classList.replace('light-theme', 'dark-theme');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light-theme');
    }
};

// Initial Load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-theme') setTheme(true);

themeToggle.addEventListener('click', () => {
    setTheme(body.classList.contains('light-theme'));
});

// Advanced Chart Logic
const segments = document.querySelectorAll('.segment');
const legend = document.getElementById('chart-legend');
const chartColors = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];

const drawChart = () => {
    let offset = 0;
    segments.forEach((seg, i) => {
        const val = parseInt(seg.dataset.val);
        const lab = seg.dataset.label;
        
        seg.style.stroke = chartColors[i];
        seg.style.strokeDasharray = `${val} 100`;
        seg.style.strokeDashoffset = -offset;
        
        if(legend.children.length < segments.length) {
            const item = document.createElement('div');
            item.className = 'leg-item';
            item.innerHTML = `<span class="leg-dot" style="background:${chartColors[i]}"></span><span>${lab}</span><span style="margin-left:auto; opacity:0.5">${val}%</span>`;
            legend.appendChild(item);
        }
        offset += val;
    });
};

const chartObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        drawChart();
        chartObserver.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

if(document.querySelector('.chart-box')) chartObserver.observe(document.querySelector('.chart-box'));


// ====== SYSTEM ARCHIVE PANEL LOGIC ======
const openBtn = document.getElementById('open-panel-btn');
const closeBtn = document.getElementById('close-panel-btn');
const sidePanel = document.getElementById('project-panel');
const panelOverlay = document.getElementById('panel-overlay');

// Open Panel
openBtn.addEventListener('click', () => {
    sidePanel.classList.add('active');
    panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevents background scrolling
});

// Close Panel function
const closePanel = () => {
    sidePanel.classList.remove('active');
    panelOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restores scrolling
};

// Close when clicking the 'X' button
closeBtn.addEventListener('click', closePanel);

// Close when clicking outside the panel (on the overlay)
panelOverlay.addEventListener('click', closePanel);

// Close when pressing the Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
        closePanel();
    }
});