(function () {
const services = [
  {
    icon: 'globe',
    title: "Business Websites",
    desc: 'Custom, branded websites designed to present your business clearly, build trust, and convert visitors into leads.',
    modal: {
      problem: "Your website is often the first impression potential customers have of your business. Outdated designs, generic templates, and poor mobile experiences can make it harder to earn trust and generate leads.",
      solution: "I build custom, mobile-responsive websites designed around your brand, goals, and customer journey — not a one-size-fits-all template.",
      includes: ["Custom design", "Mobile responsiveness", "Lead capture forms", "SEO foundation", "Google indexing", "Analytics integration"],
      thisIsForYou: ["Your current website is outdated or difficult to update", "Most of your business comes from referrals", "Customers ask questions that should be answered on your website", "You need a more professional online presence"]
    }
  },
  {
    icon: 'layout-dashboard',
    title: "Client & Admin Portals",
    desc: 'Centralized dashboards that help manage clients, workflows, communication, and daily business operations.',
    modal: {
      problem: "Many businesses rely on spreadsheets, email threads, and disconnected tools to manage clients, projects, and daily operations.",
      solution: "A centralized dashboard gives you one place to manage information, track progress, communicate, and stay organized.",
      includes: ["Client dashboards", "Admin management tools", "User logins", "Task tracking", "Document management", "Status reporting"],
      thisIsForYou: ["You're managing information in spreadsheets", "Clients regularly ask for status updates", "Team members need access to the same information", "You're juggling emails, documents, and notes across multiple places"]
    }
  },
  {
    icon: 'workflow',
    title: "Workflow Automation",
    desc: 'Streamline repetitive business processes with systems that automate tracking, notifications, approvals, and operational tasks.',
    modal: {
      problem: "Repetitive administrative tasks consume valuable time and increase the likelihood of mistakes and missed follow-ups.",
      solution: "Workflow automation keeps processes moving automatically so your team can focus on higher-value work.",
      includes: ["Approval workflows", "Automated reminders", "Status tracking", "Follow-up sequences", "Notifications", "Process management"],
      thisIsForYou: ["The same tasks are repeated every day or every week", "Employees spend time updating spreadsheets manually", "Important follow-ups are sometimes forgotten", "Processes slow down because someone has to manually move things forward"]
    }
  },
  {
    icon: 'bot',
    title: 'Business Automation',
    desc: 'Reduce manual work and improve efficiency with automated systems that handle repetitive tasks and operational workflows.',
    modal: {
      problem: "As businesses grow, manual processes become harder to manage consistently and reliably.",
      solution: "Business automation creates systems that operate behind the scenes to improve consistency, reduce errors, and streamline operations.",
      includes: ["Data processing", "Automated communications", "System integrations", "Business rule automation", "Reporting workflows", "Operational triggers"],
      thisIsForYou: ["Growth is creating more administrative work", "Your team spends too much time on repetitive tasks", "Human error is causing inconsistencies", "You're doing work that software could handle automatically"]
    }
  },
  {
    icon: 'rocket',
    title: "Onboarding Workflows",
    desc: 'Structured onboarding systems that guide clients, members, or staff through organized digital workflows from day one.',
    modal: {
      problem: "New clients, members, or employees often receive inconsistent onboarding experiences that create confusion and unnecessary support requests.",
      solution: "Structured onboarding workflows guide people through the right information at the right time.",
      includes: ["Welcome sequences", "Digital forms", "Task completion tracking", "Training materials", "Automated communications", "Progress monitoring"],
      thisIsForYou: ["New clients frequently ask the same questions", "Onboarding looks different every time", "Important documents or forms are sometimes missed", "You want a more professional first impression"]
    }
  },
  {
    icon: 'users',
    title: 'Customer Management',
    desc: 'Custom client management systems designed to organize communication, customer activity, scheduling, and day-to-day operations.',
    modal: {
      problem: "Customer information is often scattered across emails, spreadsheets, notes, and multiple systems.",
      solution: "A custom customer management system keeps everything organized and accessible in one place.",
      includes: ["Customer profiles", "Communication history", "Activity tracking", "Follow-up management", "Scheduling tools", "Relationship management"],
      thisIsForYou: ["Customer information is scattered across multiple systems", "You struggle to remember past conversations", "Follow-ups occasionally fall through the cracks", "You need a better way to manage customer relationships"]
    }
  },
  {
    icon: 'credit-card',
    title: 'Scheduling & Payments',
    desc: 'Integrated booking, scheduling, and payment systems designed to simplify operations for both businesses and customers.',
    modal: {
      problem: "Manual scheduling, appointment coordination, and payment collection can create unnecessary back-and-forth communication.",
      solution: "Integrated booking and payment systems simplify the process for both your business and your customers.",
      includes: ["Online scheduling", "Appointment management", "Deposit collection", "Payment processing", "Confirmation workflows", "Reminder notifications"],
      thisIsForYou: ["Scheduling appointments requires multiple emails or texts", "Customers frequently miss appointments", "You spend time manually collecting payments", "You need deposits, confirmations, and reminders to happen automatically"]
    }
  },
  {
    icon: 'sparkles',
    title: 'Digital Brand Experiences',
    desc: 'Professionally designed digital experiences that strengthen brand identity, improve engagement, and create a polished customer presence.',
    modal: {
      problem: "Generic digital experiences often fail to communicate what makes a business unique.",
      solution: "Custom digital experiences help your brand stand out while creating memorable interactions for your audience.",
      includes: ["Landing pages", "Interactive experiences", "Branded customer portals", "Event websites", "Marketing microsites", "Custom user experiences"],
      thisIsForYou: ["Your online presence doesn't reflect the quality of your business", "Your brand feels inconsistent across platforms", "You need something more memorable than a template website", "You want customers to have a premium experience from the first interaction"]
    }
  }
];

window._globeServices = services;

  const canvas = document.getElementById("globeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const gcIcon = document.getElementById("gcIcon");
  const gcTitle = document.getElementById("gcTitle");
  const gcDesc = document.getElementById("gcDesc");

const N = services.length;
  let W, H, cx, cy, R;

  function resize() {
    const scene = canvas.parentElement;
    W = canvas.width = scene.offsetWidth;
    H = canvas.height = scene.offsetHeight;
    cx = W / 2;
    cy = H / 2;
    R = Math.min(W, H) * 0.41;
  }
  resize();
  window.addEventListener("resize", resize);

  const STEP_MS = 7000;
  let activeIdx = 0;
  let highlightIdx = -1;
  let lastStep = performance.now();
  let lastFrame = performance.now();

  const globeCenter = document.querySelector('.globe-center');
  if (globeCenter) {
    globeCenter.style.cursor = 'pointer';
    globeCenter.style.pointerEvents = 'auto';
    globeCenter.addEventListener('click', () => {
      const idx = highlightIdx < 0 ? 0 : highlightIdx;
      const service = services[idx];
      if (service && service.modal) {
        openServiceModal(service);
      }
    });
  }

  

  const orbits = services.map((_, i) => ({
    rx: R * (0.72 + (i % 3) * 0.1),
    ry: R * (0.28 + (i % 4) * 0.07),
    tilt: (i / N) * Math.PI * 0.9,
    angle: (i / N) * Math.PI * 2,
    speed: 0.00018 + (i % 3) * 0.00004,
  }));

  function setHighlight(idx) {
    if (idx === highlightIdx) return;
    highlightIdx = idx;
    const s = services[idx];
    if (gcIcon) gcIcon.style.opacity = "0";
    if (gcTitle) gcTitle.style.opacity = "0";
    if (gcDesc) gcDesc.style.opacity = "0";
    setTimeout(() => {
      if (gcIcon) {
        gcIcon.innerHTML = `<i data-lucide="${s.icon}"></i>`;

        if (window.lucide) {
          lucide.createIcons();
        }
        gcIcon.style.opacity = "1";
      }
      if (gcTitle) {
        gcTitle.textContent = s.title;
        gcTitle.style.opacity = "1";
      }
      if (gcDesc) {
        gcDesc.textContent = s.desc;
        gcDesc.style.opacity = "1";
      }
    }, 220);
  }

  function draw() {
    const now = performance.now();
    const dt = now - lastFrame;
    lastFrame = now;

    // advance active index every 7 seconds
    if (now - lastStep >= STEP_MS) {
      activeIdx = (activeIdx + 1) % N;
      lastStep = now;
      setHighlight(activeIdx);
    }

    // advance each orbit independently
    orbits.forEach((o) => {
      o.angle += o.speed * dt;
    });

    ctx.clearRect(0, 0, W, H);

    // pronounced glow behind center circle
    const cGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.2);
    cGlow.addColorStop(0, "rgba(55,138,221,0.60)");
    cGlow.addColorStop(0.35, "rgba(55,138,221,0.35)");
    cGlow.addColorStop(0.7, "rgba(55,138,221,0.12)");
    cGlow.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = cGlow;
    ctx.fill();

    // large outer circle
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(55,138,221,0.28)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // compute screen positions
    const pts = orbits.map((o, i) => {
      const lx = Math.cos(o.angle) * o.rx;
      const ly = Math.sin(o.angle) * o.ry;
      const px = cx + lx * Math.cos(o.tilt) - ly * Math.sin(o.tilt);
      const py = cy + lx * Math.sin(o.tilt) + ly * Math.cos(o.tilt);
      const depth = (Math.sin(o.angle) * Math.cos(o.tilt) + 1) / 2;
      return { px, py, depth, angle: o.angle, i };
    });

    // paint back-to-front
    pts
      .sort((a, b) => a.depth - b.depth)
      .forEach(({ px, py, depth, angle, i }) => {
        const isActive = i === activeIdx;
        const svc = services[i];

        // active glow halos
        if (isActive) {
          ctx.beginPath();
          ctx.arc(px, py, 16, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(55,138,221,0.12)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(55,138,221,0.24)";
          ctx.fill();
        }

        // dot
        const dotR = isActive
          ? Math.min(7, R * 0.04)
          : Math.min(3 + depth * 2.5, R * 0.03);
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        if (isActive) {
          ctx.fillStyle = "#378ADD";
          ctx.shadowColor = "rgba(55,138,221,1)";
          ctx.shadowBlur = 20;
        } else {
          ctx.fillStyle = `rgba(133,183,235,${0.3 + depth * 0.55})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // label
        const label = svc.title;
        const fontSize = isActive ? 14 : 10 + depth * 2;
        ctx.font = `${isActive ? 700 : 400} ${fontSize}px 'Syne', sans-serif`;

        // offset label to the side of the dot
        const dx = px - cx;
        const maxX = W - ctx.measureText(label).width - 16;
        const minX = 8;
        const idealX =
          dx >= 0
            ? px + dotR + 8
            : px - ctx.measureText(label).width - dotR - 8;
        const lx2 = Math.max(minX, Math.min(idealX, maxX));
        const ly2 = py + fontSize * 0.36;

        ctx.textAlign = "left";
        if (isActive) {
          ctx.font = `700 ${fontSize}px 'Syne', sans-serif`;
          ctx.fillStyle = "#fff";
          ctx.shadowColor = "rgba(55,138,221,0.8)";
          ctx.shadowBlur = 10;
          ctx.fillText(label, lx2, ly2);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(181,212,244,${0.3 + depth * 0.5})`;
          ctx.fillText(label, lx2, ly2);
        }
      });

    requestAnimationFrame(draw);
  }

  // init
  setHighlight(0);
  draw();
})();

// counter animation
function animateCount(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start) + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

// scroll reveal — re-triggers every time element enters viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      } else {
        e.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ── NAV SCROLL EFFECT ──
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) {
    nav.style.background =
      window.scrollY > 40 ? "rgba(2,27,51,0.97)" : "rgba(2,27,51,0.85)";
  }
});

// Rising line with animated nodes
(function () {
  const canvas = document.getElementById("ekgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;

  const descs = [
    "We talk through your goals, pain points, and what success looks like for your business.",
    "I design and develop your platform with clean, efficient code built around your workflow.",
    "We launch your platform, I provide support, and your business starts running smarter.",
  ];

  // Zigzag line — nodes sit exactly at the 3 peaks
  const linePoints = [
    { xf: 0.0, yf: 0.98 },
    { xf: 0.07, yf: 0.82 },
    { xf: 0.18, yf: 0.9 },
    { xf: 0.28, yf: 0.58 }, // peak 1 — node 0 (Discover)
    { xf: 0.38, yf: 0.8 },
    { xf: 0.48, yf: 0.88 },
    { xf: 0.57, yf: 0.38 }, // peak 2 — node 1 (Build)
    { xf: 0.66, yf: 0.58 },
    { xf: 0.74, yf: 0.68 },
    { xf: 0.86, yf: 0.12 }, // peak 3 — node 2 (Deliver)
    { xf: 0.93, yf: 0.16 },
    { xf: 1.0, yf: 0.06 },
  ];

  // nodes sit exactly at the peaks
  const nodes = [
    { xf: 0.28, yf: 0.58, step: 0 },
    { xf: 0.57, yf: 0.38, step: 1 },
    { xf: 0.86, yf: 0.12, step: 2 },
  ];

  let activeStep = 0;
  let lastStep = performance.now();
  const STEP_MS = 6000;
  // pulse animation per node
  const pulseR = nodes.map(() => 0);
  const pulseA = nodes.map(() => 0);

  function activate(i) {
    activeStep = i;
    for (let s = 0; s < 3; s++) {
      const el = document.getElementById("ekgstep-" + s);
      if (el) el.classList.toggle("active", s === i);
    }
    const desc = document.getElementById("ekgDesc");
    if (desc) {
      desc.style.opacity = "0";
      setTimeout(() => {
        desc.textContent = descs[i];
        desc.style.opacity = "1";
      }, 200);
    }
    // trigger pulse on active node
    pulseR[i] = 0;
    pulseA[i] = 1;
  }

  function draw() {
    const now = performance.now();
    if (now - lastStep >= STEP_MS) {
      activeStep = (activeStep + 1) % 3;
      activate(activeStep);
      lastStep = now;
    }

    ctx.clearRect(0, 0, W, H);

    const pts = nodes.map((n) => ({ x: n.xf * W, y: n.yf * H, step: n.step }));
    const lpts = linePoints.map((p) => ({ x: p.xf * W, y: p.yf * H }));

    // sharp angular line — straight segments like a stock chart
    ctx.beginPath();
    ctx.moveTo(lpts[0].x, lpts[0].y);
    for (let i = 1; i < lpts.length; i++) {
      ctx.lineTo(lpts[i].x, lpts[i].y);
    }
    ctx.strokeStyle = "#378ADD";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(55,138,221,0.6)";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // arrow tip at the end
    const last = lpts[lpts.length - 1];
    const prev = lpts[lpts.length - 2];
    const angle = Math.atan2(last.y - prev.y, last.x - prev.x);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(
      last.x - 11 * Math.cos(angle - 0.4),
      last.y - 11 * Math.sin(angle - 0.4),
    );
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(
      last.x - 11 * Math.cos(angle + 0.4),
      last.y - 11 * Math.sin(angle + 0.4),
    );
    ctx.strokeStyle = "#378ADD";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "rgba(55,138,221,0.6)";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // draw nodes
    pts.forEach((p, i) => {
      const isActive = i === activeStep;

      // animate pulse ring
      if (pulseA[i] > 0) {
        const pColor = i === 2 ? "255,216,77" : "55,138,221";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7 + pulseR[i], 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pColor},${pulseA[i] * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        pulseR[i] += 0.5;
        pulseA[i] -= 0.018;
        if (pulseA[i] < 0) {
          pulseA[i] = 0;
          pulseR[i] = 0;
        }
      }

      // outer ring for active
      if (isActive) {
        const rColor =
          i === 2 ? "rgba(255,216,77,0.35)" : "rgba(55,138,221,0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = rColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // filled circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, isActive ? 6 : 5, 0, Math.PI * 2);
      const isDeliver = i === 2;
      const nodeColor = isDeliver ? "#FFD84D" : "#378ADD";
      const glowColor = isDeliver
        ? "rgba(255,216,77,0.8)"
        : "rgba(55,138,221,1)";
      ctx.fillStyle = isActive ? "#fff" : "rgba(55,138,221,0.0)";
      ctx.strokeStyle = isActive
        ? nodeColor
        : isDeliver
          ? "rgba(255,216,77,0.7)"
          : "rgba(133,183,235,0.7)";
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      if (isActive) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 18;
      }
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }

  activate(0);
  draw();
})();

function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector(".form-submit");
  btn.textContent = "Sending...";
  btn.disabled = true;
  const form = e.target;
  const data = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    service: form.querySelector('[name="service"]').value,
    budget: form.querySelector('[name="budget"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      return response.json();
    })
    .then(() => {
      form.style.display = "none";
      const s = document.getElementById("formSuccess");
      s.style.display = "flex";
    })
    .catch(() => {
      btn.innerHTML = "Let’s talk solutions";
      btn.disabled = false;
      alert("Something went wrong. Please try again.");
    });
}
// ── LIGHTBOX ──
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lb.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "";
}

// close on background click
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  lightbox.addEventListener("click", function (e) {
    if (e.target === this) closeLightbox();
  });
}

// ── HAMBURGER MENU ──
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const burger = document.getElementById("hamburger");
  nav.classList.toggle("open");
  burger.classList.toggle("open");
}

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
    document.getElementById("hamburger").classList.remove("open");
  });
});
// ── SERVICE MODAL ──
let currentServiceIdx = 0;

function openServiceModal(service) {
  const modal = document.getElementById('serviceModal');
  const body = document.getElementById('serviceModalBody');
  const services = window._globeServices || [];
  currentServiceIdx = services.indexOf(service);
  if (currentServiceIdx < 0) currentServiceIdx = 0;

body.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:var(--blue-bright); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.5rem;">What I Do</div>
      <h2 style="font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:var(--white); margin-bottom:0;">${service.title}</h2>
    </div>
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:var(--teal-light); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">The Challenge</div>
      <p style="font-size:15px; color:var(--blue-ghost); line-height:1.75; font-weight:300;">${service.modal.problem}</p>
    </div>
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:var(--teal-light); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">How It Helps</div>
      <p style="font-size:15px; color:var(--blue-ghost); line-height:1.75; font-weight:300;">${service.modal.solution}</p>
    </div>
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:var(--teal-light); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.75rem;">What It Can Include</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
        ${service.modal.includes.map(item => `
          <div style="font-size:14px; color:var(--white); display:flex; align-items:center; gap:8px;">
            <span style="color:var(--white); font-size:18px; font-weight:700;">•</span> ${item}
          </div>
        `).join('')}
      </div>
    </div>
    <div style="margin-bottom:2rem;">
      <div style="font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:var(--teal-light); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.75rem;">This Might Be For You If...</div>
      <div style="display:flex; flex-direction:column; gap:0.25rem;">
        ${service.modal.thisIsForYou.map(item => `
          <div style="font-size:14px; color:var(--white); display:flex; align-items:center; gap:8px;">
            <span style="color:var(--white); font-size:18px; font-weight:700;">•</span> ${item}
          </div>
        `).join('')}
      </div>
    </div>
    <div style="border-top:1px solid rgba(55,138,221,0.2); padding-top:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <button onclick="navigateServiceModal(-1)" style="background:rgba(29,158,117,0.15); border:1px solid rgba(93,202,165,0.4); color:var(--teal-light); padding:8px 16px; border-radius:8px; cursor:pointer; font-family:'Syne',sans-serif; font-size:13px;">← Previous</button>
        <span style="font-size:12px; color:var(--blue-pale);">${currentServiceIdx + 1} of ${services.length}</span>
        <button onclick="navigateServiceModal(1)" style="background:rgba(29,158,117,0.15); border:1px solid rgba(93,202,165,0.4); color:var(--teal-light); padding:8px 16px; border-radius:8px; cursor:pointer; font-family:'Syne',sans-serif; font-size:13px;">Next →</button>
      </div>
      <p style="font-size:14px; color:var(--blue-ghost); margin-bottom:1rem; font-style:italic; text-align:center;">Not sure which solution fits your business? Let's start with a conversation about what's slowing your business down.</p>
      <div style="text-align:center;">
        <button class="btn-primary" onclick="closeServiceModal(); document.getElementById('contact').scrollIntoView({behavior:'smooth'});" style="margin:0 auto;">
          Let's talk →
        </button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  const modalContent = document.getElementById('serviceModalContent');
  if (modalContent) modalContent.scrollTop = 0;
}

function closeServiceModal() {
  document.getElementById('serviceModal').style.display = 'none';
  document.body.style.overflow = '';
}

function navigateServiceModal(direction) {
  const services = window._globeServices;
  if (!services) return;
  currentServiceIdx = (currentServiceIdx + direction + services.length) % services.length;
  openServiceModal(services[currentServiceIdx]);
}

// close on background click
document.getElementById('serviceModal').addEventListener('click', function(e) {
  if (e.target === this) closeServiceModal();
});

// ── PROCESS STEPS ──
function toggleStep(index) {
  const expand = document.getElementById('step-expand-' + index);
  if (!expand) return;
  const isOpen = expand.classList.contains('open');
  
  // close all steps first
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('step-expand-' + i);
    if (el) el.classList.remove('open');
  }
  
  // open clicked step if it wasn't already open
  if (!isOpen) {
    expand.classList.add('open');
  }
}
