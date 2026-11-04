/**
 * Nelakurthi Meghana - Interactive Portfolio Core Logic
 * Handles animations, typewriter, modals, navigation, filters, and contact actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavigation();
  initScrollReveal();
  initSkillFilters();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = [
    "GenAI & RAG Solutions Engineer",
    "Computer Science Graduate (8.2 CGPA)",
    "Data & Business Intelligence Analyst",
    "Python, LangChain & Streamlit Builder",
    "Azure Fundamentals (AZ-900) Certified"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1800;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   2. NAVIGATION & ACTIVE LINKS
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section spy on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. SKILLS FILTER TABS
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-zinc-200', 'text-black', 'border-white');
        b.classList.add('bg-zinc-900/80', 'text-zinc-300', 'border-zinc-800');
      });

      btn.classList.remove('bg-zinc-900/80', 'text-zinc-300', 'border-zinc-800');
      btn.classList.add('bg-zinc-200', 'text-black', 'border-white');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
const projectData = {
  bi: {
    title: "AI-Powered Business Intelligence Assistant",
    category: "Generative AI • RAG • Analytics",
    tech: ["Python", "SQL", "GenAI", "RAG", "LangChain", "Streamlit", "Vector DB", "Pandas"],
    image: "assets/images/project-bi.svg",
    github: "https://github.com/Nelakurthime",
    overview: "An enterprise-grade intelligent analytics platform bridging the gap between natural language questions and actionable data insights. Users can upload CSV or Excel files, ask complex business queries in plain English, and receive real-time answers, auto-generated SQL, and visual charts.",
    features: [
      "Natural Language to SQL conversion using LLM APIs and prompt engineering",
      "Retrieval-Augmented Generation (RAG) with vector embeddings for deep contextual documentation retrieval",
      "Automated exploratory data analysis, missing data handling, and automated KPI calculation",
      "Seamless Streamlit UI combining GenAI conversational agent with dynamic visualization charts"
    ],
    impact: "Eliminated the need for non-technical stakeholders to write SQL queries manually, cutting report extraction time from hours to seconds with 99%+ KPI accuracy."
  },
  ecommerce: {
    title: "E-Commerce Sales & Customer Analytics Dashboard",
    category: "Power BI • SQL • Data Analytics",
    tech: ["Power BI", "Excel", "SQL", "Python", "Data Modeling", "Cohort Analysis", "DAX"],
    image: "assets/images/project-ecommerce.svg",
    github: "https://github.com/Nelakurthime",
    overview: "A comprehensive business intelligence solution analyzing over 50,000+ real-world retail transactions. The dashboard tracks revenue performance, customer acquisition cohorts, profit margins, and inventory velocities with interactive filters.",
    features: [
      "Processed 50K+ raw transactional records using Python & Excel, resolving duplicates and inconsistent values",
      "Engineered high-performance SQL queries computing AOV (Average Order Value), customer retention, and category margin",
      "Created an interactive Power BI dashboard featuring dynamic slicers, KPI scorecards, and time-series trends",
      "Formulated cohort retention matrices identifying repeat purchase cycles and high-churn demographics"
    ],
    impact: "Uncovered high-margin product segments contributing 45% of total GMV and provided strategic recommendations to optimize marketing spend."
  },
  hackathon: {
    title: "LG Soft-Code for Good Challenge — Round-1 Qualifier",
    category: "Algorithms • Problem Solving • Hackathon",
    tech: ["Python", "Java", "Data Structures", "Algorithms", "System Optimization"],
    image: "assets/images/project-hackathon.svg",
    github: "https://github.com/Nelakurthime",
    overview: "Recognized as a Round-1 Qualifier in the highly competitive LG Soft-Code for Good Challenge. Formulated efficient algorithmic solutions targeting real-world engineering problems with strict time and space complexity constraints.",
    features: [
      "Qualified through rigorous national-level programming evaluations and complex test cases",
      "Demonstrated mastery of graph algorithms, dynamic programming, and data structures",
      "Applied modern object-oriented programming (OOP) principles in clean, modular code",
      "Active participant in multiple university and national hackathons pushing AI innovation"
    ],
    impact: "Ranked among top university participants, validating high-velocity problem-solving and algorithmic precision."
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');

  if (!modal) return;

  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      const techBadges = data.tech.map(t => 
        `<span class="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700">${t}</span>`
      ).join('');

      const featureList = data.features.map(f => 
        `<li class="flex items-start gap-2.5 text-zinc-300 text-sm">
          <span class="text-white mt-1">✦</span>
          <span>${f}</span>
        </li>`
      ).join('');

      modalContent.innerHTML = `
        <div class="relative rounded-xl overflow-hidden mb-6 border border-zinc-700/80 bg-zinc-950">
          <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover object-top" />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs uppercase tracking-wider font-semibold text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">${data.category}</span>
            <div class="flex items-center gap-2">
              <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-zinc-600">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub Code
              </a>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-white">${data.title}</h3>

          <p class="text-zinc-300 text-sm leading-relaxed">${data.overview}</p>

          <div class="py-2">
            <h4 class="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">Key Highlights & Architecture</h4>
            <ul class="space-y-2">
              ${featureList}
            </ul>
          </div>

          <div class="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
            <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Key Impact & Outcome</h4>
            <p class="text-zinc-200 text-xs leading-relaxed">${data.impact}</p>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Technologies Used</h4>
            <div class="flex flex-wrap gap-2">
              ${techBadges}
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   6. RESUME MODAL & PRINT/DOWNLOAD
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeResume = () => {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. CONTACT ACTIONS & TOAST
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notice px-5 py-3.5 rounded-xl flex items-center gap-3 text-sm text-zinc-100 font-medium';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

// Global copy email function
window.copyEmailAddress = function () {
  const email = "meghanavenkateswarlu26@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email address copied to clipboard!");
  }).catch(() => {
    showToast("Email: meghanavenkateswarlu26@gmail.com");
  });
};

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#sender-name')?.value || 'Guest';
    const email = form.querySelector('#sender-email')?.value || '';
    const subject = form.querySelector('#sender-subject')?.value || 'Portfolio Inquiry';
    const message = form.querySelector('#sender-message')?.value || '';

    // Create mailto link as fallback
    const mailtoUrl = `mailto:meghanavenkateswarlu26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Meghana,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
    
    showToast(`Thank you, ${name}! Opening email client...`);
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 900);

    form.reset();
  });
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
