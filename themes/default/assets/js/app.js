(() => {
  let activePackageFilter = 'all';

  function copyToClipboard(text) {
    if (!navigator.clipboard) return Promise.resolve();
    return navigator.clipboard.writeText(text).catch(() => {});
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlightDonna(source) {
    let html = escapeHtml(source);
    const held = {};
    let heldCount = 0;

    function holdKey(index) {
      let out = '';
      let n = index;
      do {
        out = String.fromCharCode(65 + (n % 26)) + out;
        n = Math.floor(n / 26) - 1;
      } while (n >= 0);
      return `@@DONNAHL${out}@@`;
    }

    function stash(cls, value) {
      const key = holdKey(heldCount);
      heldCount += 1;
      held[key] = `<span class="${cls}">${value}</span>`;
      return key;
    }

    html = html.replace(/(&quot;[^\n]*?&quot;|"[^\n]*?")/g, (match) => stash('hl-str', match));
    html = html.replace(/(\/\/.*)$/gm, (match) => stash('hl-comment', match));
    html = html.replace(/(\bimport\s+)([A-Za-z0-9_\/]+)/g, (_match, _kw, mod) => `${stash('hl-kw', 'import')} ${stash('hl-module', mod)}`);
    html = html.replace(/\b([a-z_][A-Za-z0-9_]*)(?=\.)/g, (match) => stash('hl-module', match));
    html = html.replace(/(\|&gt;\s*)([a-z_][A-Za-z0-9_]*)/g, (_match, op, fn) => `${stash('hl-op', op.trim())} ${stash('hl-fn', fn)}`);
    html = html.replace(/(\|&gt;|-&gt;|=&gt;|&lt;&gt;)/g, (match) => stash('hl-op', match));
    html = html.replace(/\blet\s+([a-z_][A-Za-z0-9_]*)/g, (_match, name) => `${stash('hl-kw', 'let')} ${stash('hl-var', name)}`);
    html = html.replace(/\b(echo|panic)\s+([a-z_][A-Za-z0-9_]*)\b/g, (_match, kw, name) => `${stash('hl-kw', kw)} ${stash('hl-var', name)}`);
    html = html.replace(/\bcase\s+([a-z_][A-Za-z0-9_]*)\b(?!\s*\()/g, (_match, name) => `${stash('hl-kw', 'case')} ${stash('hl-var', name)}`);
    html = html.replace(/\b(pub|fn|type|const|case|if|opaque|external|echo|panic|todo|as)\b/g, (match) => stash('hl-kw', match));
    html = html.replace(/\b([a-z_][A-Za-z0-9_]*)(?=\s*\()/g, (match) => stash('hl-fn', match));
    html = html.replace(/\b([A-Z][A-Za-z0-9_]*)(?=\s*\()/g, (match) => stash('hl-constructor', match));
    html = html.replace(/\b(Int|String|Bool|Float|List|Nil|Result|Option)\b/g, (match) => stash('hl-type', match));
    html = html.replace(/\b(True|False|Some|None|Ok|Err)\b/g, (match) => stash('hl-constructor', match));
    html = html.replace(/\b([0-9]+(?:\.[0-9]+)?)\b/g, (match) => stash('hl-num', match));
    html = html.replace(/@@DONNAHL[A-Z]+@@/g, (match) => held[match] || match);
    return html;
  }

  function shouldHighlightDonna(code) {
    return code.classList.contains('language-donna')
      || /\b(pub fn|fn |import |pub type|pub const|case |let )\b/.test(code.textContent || '');
  }

  function initDonnaHighlight() {
    document.querySelectorAll('pre code').forEach((code) => {
      if (code.dataset.highlighted || !shouldHighlightDonna(code)) return;
      code.innerHTML = highlightDonna(code.textContent || '');
      code.dataset.highlighted = 'true';
    });
  }

  function initMobileNav() {
    const burger = document.getElementById('nav-burger');
    const mobile = document.getElementById('nav-mobile');
    if (!burger || !mobile) return;

    burger.addEventListener('click', (event) => {
      event.stopPropagation();
      burger.classList.toggle('open');
      mobile.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!burger.contains(event.target) && !mobile.contains(event.target)) {
        burger.classList.remove('open');
        mobile.classList.remove('open');
      }
    });
  }

  function setTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('theme-light', isLight);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      button.setAttribute('aria-pressed', String(isLight));
      const label = button.querySelector('.theme-toggle-label');
      if (label) label.textContent = isLight ? 'Light theme' : 'Dark theme';
    });
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem('donna-theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(savedTheme || preferredTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
        localStorage.setItem('donna-theme', nextTheme);
        setTheme(nextTheme);
      });
    });
  }

  function initHomeNavSpy() {
    const navLinks = document.querySelectorAll('.page-index .nav-links a:not(.nav-cta)');
    if (!navLinks.length) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY + 80;
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;

        const active = y >= target.offsetTop && y < target.offsetTop + target.offsetHeight;
        link.style.color = active ? 'var(--text)' : '';
      });
    });
  }

  function initSidebarSpy(selector, linkSelector, fallbackId) {
    const sections = document.querySelectorAll(selector);
    const links = document.querySelectorAll(linkSelector);
    if (!sections.length || !links.length) return;

    const update = () => {
      const y = window.scrollY + 90;
      let current = fallbackId || '';
      sections.forEach((section) => {
        if (y >= section.offsetTop) current = section.id || fallbackId || '';
      });
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initTweaksProtocol() {
    const panel = document.getElementById('tweaks-panel');
    if (!panel) return;

    window.addEventListener('message', (event) => {
      if (!event.data) return;
      if (event.data.type === '__activate_edit_mode') window.showTweaks();
      if (event.data.type === '__deactivate_edit_mode') window.hideTweaks();
    });

    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }

  function initTweaksControls() {
    document.getElementById('tweaks-close')?.addEventListener('click', window.closeTweaks);
    document.getElementById('tweak-accent')?.addEventListener('input', (event) => window.setAccent(event.target.value));
    document.getElementById('tweak-bg')?.addEventListener('input', (event) => window.setBg(event.target.value));
    document.getElementById('tweak-scale')?.addEventListener('input', (event) => window.setScale(event.target.value));
    document.getElementById('tweak-donna')?.addEventListener('change', (event) => window.setDonna(event.target.value));
  }

  function initCopyControls() {
    document.querySelectorAll('[data-copy-snippet]').forEach((element) => {
      element.addEventListener('click', () => window.copySnippet());
    });

    document.querySelectorAll('[data-copy-command]').forEach((element) => {
      element.addEventListener('click', () => window.copyCmd(element, element.dataset.copyCommand));
    });

    document.querySelectorAll('.code-block, .code-panel, .article-code').forEach((block) => {
      const code = block.querySelector('pre code');
      const bar = block.querySelector('.code-bar, .code-block-bar, .article-code-bar');
      if (!code || !bar || bar.querySelector('.copy-code')) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code';
      button.textContent = 'copy';
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        copyToClipboard(code.textContent || '');
        button.textContent = 'copied!';
        button.style.color = 'var(--orange)';
        setTimeout(() => {
          button.textContent = 'copy';
          button.style.color = '';
        }, 1800);
      });
      bar.appendChild(button);
    });
  }

  function initPackageControls() {
    document.getElementById('search-input')?.addEventListener('input', window.filterPackages);
    document.getElementById('sort-select')?.addEventListener('change', (event) => window.sortPackages(event.target.value));

    document.querySelectorAll('[data-package-filter]').forEach((element) => {
      element.addEventListener('click', () => window.setFilter(element, element.dataset.packageFilter));
    });
  }

  function initNewsControls() {
    document.getElementById('subscribe-form')?.addEventListener('submit', window.handleSubscribe);

    document.querySelectorAll('[data-news-tag]').forEach((element) => {
      element.addEventListener('click', () => window.filterTag(element, element.dataset.newsTag));
    });
  }

  window.showTweaks = function showTweaks() {
    const panel = document.getElementById('tweaks-panel');
    if (panel) panel.style.display = 'block';
  };

  window.hideTweaks = function hideTweaks() {
    const panel = document.getElementById('tweaks-panel');
    if (panel) panel.style.display = 'none';
  };

  window.closeTweaks = function closeTweaks() {
    window.hideTweaks();
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  function persist(edits) {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  }

  window.setAccent = function setAccent(value) {
    document.documentElement.style.setProperty('--orange', value);
    persist({ accentColor: value });
  };

  window.setBg = function setBg(value) {
    document.documentElement.style.setProperty('--bg', value);
    persist({ bgColor: value });
  };

  window.setScale = function setScale(value) {
    document.body.style.fontSize = `${(value / 100) * 16}px`;
    persist({ fontScale: Number(value) });
  };

  window.setDonna = function setDonna(value) {
    const heroImage = document.querySelector('.hero-right');
    if (heroImage) heroImage.style.display = value === 'hide' ? 'none' : '';
    persist({ showDonna: value });
  };

  window.copySnippet = function copySnippet() {
    copyToClipboard('curl -sSf https://donna-lang.org/install.sh | sh');
    const label = document.getElementById('snip-lbl');
    if (!label) return;

    label.textContent = 'copied!';
    label.style.color = 'var(--orange)';
    label.style.opacity = '1';
    setTimeout(() => {
      label.textContent = 'copy';
      label.style.color = '';
      label.style.opacity = '';
    }, 2000);
  };

  window.copyCmd = function copyCmd(element, text) {
    copyToClipboard(text);
    const button = element.querySelector('.copy-btn');
    if (!button) return;

    button.textContent = 'copied!';
    button.style.color = 'var(--orange)';
    setTimeout(() => {
      button.textContent = 'copy';
      button.style.color = '';
    }, 2000);
  };

  window.setFilter = function setFilter(element, tag) {
    document.querySelectorAll('.filter-pill').forEach((pill) => pill.classList.remove('active'));
    element.classList.add('active');
    activePackageFilter = tag;
    window.filterPackages();
  };

  window.filterPackages = function filterPackages() {
    const input = document.getElementById('search-input');
    const cards = document.querySelectorAll('.pkg-card');
    const countLabel = document.getElementById('results-count');
    if (!input || !cards.length || !countLabel) return;

    const query = input.value.toLowerCase();
    let count = 0;

    cards.forEach((card) => {
      const name = card.querySelector('.pkg-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.pkg-desc')?.textContent.toLowerCase() || '';
      const tags = card.dataset.tags || '';
      const matchesSearch = !query || name.includes(query) || desc.includes(query);
      const matchesFilter = activePackageFilter === 'all' || tags.includes(activePackageFilter);
      const visible = matchesSearch && matchesFilter;
      card.style.display = visible ? '' : 'none';
      if (visible) count += 1;
    });

    countLabel.innerHTML = `<strong>${count}</strong> package${count !== 1 ? 's' : ''}`;
  };

  window.sortPackages = function sortPackages(value) {
    const grid = document.getElementById('packages-grid');
    if (!grid) return;

    const cards = [...grid.querySelectorAll('.pkg-card')];
    cards.sort((a, b) => {
      if (value === 'az') {
        return a.querySelector('.pkg-name').textContent.localeCompare(b.querySelector('.pkg-name').textContent);
      }
      if (value === 'popular') {
        const aCount = Number.parseInt(a.querySelector('.pkg-meta span').textContent.replace(/\D/g, ''), 10);
        const bCount = Number.parseInt(b.querySelector('.pkg-meta span').textContent.replace(/\D/g, ''), 10);
        return bCount - aCount;
      }
      return 0;
    });
    cards.forEach((card) => grid.appendChild(card));
  };

  window.handleSubscribe = function handleSubscribe(event) {
    event.preventDefault();
    const button = event.target.querySelector('button');
    const input = document.getElementById('sub-email');
    if (!button || !input) return;

    button.textContent = 'Subscribed ✓';
    button.style.background = 'oklch(0.55 0.14 145)';
    input.disabled = true;
    button.disabled = true;
  };

  window.filterTag = function filterTag(element, tag) {
    document.querySelectorAll('.tag-pill').forEach((pill) => pill.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.article').forEach((article) => {
      if (tag === 'all') {
        article.style.display = '';
        return;
      }
      article.style.display = article.querySelector(`.article-tag.${tag}`) ? '' : 'none';
    });
  };

  initMobileNav();
  initThemeToggle();
  initHomeNavSpy();
  initTweaksProtocol();
  initTweaksControls();
  initDonnaHighlight();
  initCopyControls();
  initPackageControls();
  initNewsControls();
  initSidebarSpy('.page-docs section[id]', '.page-docs .sidebar-nav a');
  initSidebarSpy('.page-package .section[id]', '.page-package .sidebar-nav a', 'overview');
  initSidebarSpy('.page-package-docs section[id], .page-package-docs .fn-card[id]', '.page-package-docs .sidebar-nav a', 'intro');
  initSidebarSpy('.page-article .prose section[id], .page-article header', '.page-article .toc-nav a', 'overview');
})();
