(() => {
  const data = globalThis.IMM_DATA;
  if (!data) throw new Error('IMM data not loaded');

  const { collections, documents } = data;
  const state = { query: '', collection: 'ALL', selectedId: '' };

  const queryInput = document.getElementById('query');
  const clearButton = document.getElementById('clear');
  const volumeFilters = document.getElementById('volumeFilters');
  const resultsEl = document.getElementById('results');
  const resultCount = document.getElementById('resultCount');
  const selectedVolume = document.getElementById('selectedVolume');
  const selectedTitle = document.getElementById('selectedTitle');
  const selectedMeta = document.getElementById('selectedMeta');
  const previewStatus = document.getElementById('previewStatus');
  const previewContent = document.getElementById('previewContent');
  const copyApaButton = document.getElementById('copyApa');
  const doiSearchButton = document.getElementById('doiSearch');

  const required = [queryInput, clearButton, volumeFilters, resultsEl, resultCount, selectedVolume, selectedTitle, selectedMeta, previewStatus, previewContent, copyApaButton, doiSearchButton];
  if (required.some((node) => !node)) throw new Error('app root not found');

  const order = new Map(collections.map((value, index) => [value, index]));
  const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const sorted = (rows) => [...rows].sort((a, b) => (order.get(a.collection) - order.get(b.collection)) || a.title.localeCompare(b.title, 'ko'));
  const doiSearchUrl = (doc) => doc.doi ? `https://doi.org/${doc.doi}` : `https://search.crossref.org/?q=${encodeURIComponent([doc.title, doc.authorsRaw, doc.year].filter(Boolean).join(' '))}`;

  // Safe search text highlighting function for card text fields
  const highlightText = (text, query) => {
    if (!query || !query.trim()) return esc(text);
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return esc(text);

    let escaped = esc(text);
    terms.sort((a, b) => b.length - a.length);

    try {
      const pattern = terms.map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
      const regex = new RegExp(`(${pattern})`, 'gi');
      return escaped.replace(regex, '<span class="search-highlight">$1</span>');
    } catch (e) {
      return escaped;
    }
  };

  // Safe DOM-based text node highlighting for the paper preview body
  const highlightHtml = (htmlContent, query) => {
    if (!htmlContent) return '';
    if (!query || !query.trim()) return htmlContent;
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return htmlContent;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const walk = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let node;
    while (node = walk.nextNode()) {
      nodes.push(node);
    }

    terms.sort((a, b) => b.length - a.length);
    const pattern = terms.map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');

    nodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;
      if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.nodeName)) return;
      if (parent.classList?.contains('search-highlight')) return;

      const text = textNode.nodeValue;
      if (regex.test(text)) {
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        regex.lastIndex = 0;
        
        const matches = [...text.matchAll(regex)];
        matches.forEach(m => {
          const matchText = m[0];
          const matchIdx = m.index;
          
          if (matchIdx > lastIdx) {
            frag.appendChild(document.createTextNode(text.substring(lastIdx, matchIdx)));
          }
          
          const span = document.createElement('span');
          span.className = 'search-highlight';
          span.textContent = matchText;
          frag.appendChild(span);
          
          lastIdx = matchIdx + matchText.length;
        });
        
        if (lastIdx < text.length) {
          frag.appendChild(document.createTextNode(text.substring(lastIdx)));
        }
        
        parent.replaceChild(frag, textNode);
      }
    });

    return tempDiv.innerHTML;
  };

  // Toast Notification System using DaisyUI Alert Success
  const showToast = (message) => {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 transform translate-y-12 opacity-0 transition-all duration-300 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="alert alert-success shadow-lg py-3 px-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5 text-success-content" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm font-semibold">${esc(message)}</span>
      </div>
    `;
    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 2500);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}

    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  };

  const filteredRows = () => {
    const terms = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return sorted(documents
      .filter((doc) => state.collection === 'ALL' || doc.collection === state.collection)
      .filter((doc) => !terms.length || terms.every((term) => doc.search.includes(term))));
  };

  const pickSelected = (rows) => rows.some((doc) => doc.id === state.selectedId) ? state.selectedId : (rows[0]?.id || '');

  const setPreview = (doc) => {
    if (!doc) {
      selectedVolume.textContent = '\u2014';
      selectedVolume.className = 'badge badge-outline badge-neutral badge-xs uppercase font-bold tracking-wider';
      selectedTitle.textContent = '\uBB38\uC11C\uB97C \uC120\uD0DD\uD558\uC138\uC694';
      selectedMeta.textContent = '\uBAA9\uB85D\uC5D0\uC11C \uBB38\uC11C\uB97C \uC120\uD0DD\uD558\uBA74 \uC138\uBD80 \uB0B4\uC6A9\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.';
      previewStatus.textContent = '\uB300\uAE30 \uC911';
      previewContent.innerHTML = `
        <div class="card bg-base-100 shadow-md">
          <div class="card-body items-center text-center p-12 text-base-content/50 gap-4">
            <div class="p-4 bg-base-200 rounded-full text-base-content/40 animate-pulse">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-base-content">\uB9AC\uB354\uAE30 \uB300\uAE30 \uC911</h3>
              <p class="text-xs text-base-content/60 mt-1 max-w-xs leading-relaxed">
                \uC67C\uCCBD \uAC80\uC0C9 \uACB0\uACFC \uBAA9\uB85D\uC5D0\uC11C \uB17C\uBB38\uC744 \uD074\uB9AD\uD558\uC2DC\uBA74 \uC5EC\uAE30\uC5D0 APA7 \uD3EC\uB9DF \uC778\uC6A9 \uC815\uBCF4\uC640 \uBCF8\uBB38 \uC804\uCCB4 \uB0B4\uC6A9\uC774 \uB80C\uB354\uB9C1\uB429\uB2C8\uB2E4.
              </p>
            </div>
          </div>
        </div>
      `;
      copyApaButton.disabled = true;
      doiSearchButton.disabled = true;
      copyApaButton.dataset.id = '';
      doiSearchButton.dataset.id = '';
      return;
    }

    selectedVolume.textContent = `${doc.collection}${doc.year ? ` · ${doc.year}` : ''}`;
    selectedVolume.className = `badge badge-outline badge-xs uppercase font-bold tracking-wider ${
      doc.collection === 'V01' ? 'badge-primary' : 
      doc.collection === 'V73' ? 'badge-secondary' : 
      doc.collection === 'V75' ? 'badge-accent' : 'badge-neutral'
    }`;
    selectedTitle.textContent = doc.title;
    selectedMeta.textContent = [doc.authorsRaw || '\uC800\uC790 \uC815\uBCF4 \uC5C6\uC74C', doc.journal || 'Industrial Marketing Management', doc.pages ? `pp. ${doc.pages}` : '', doc.doi ? `DOI ${doc.doi}` : ''].filter(Boolean).join(' · ');
    previewStatus.textContent = '\uBCF8\uBB38 HTML\uC744 성공적으로 불러왔습니다.';
    
    // Render document cards directly to align with V01 design system
    previewContent.innerHTML = doc.bodyHtml ? highlightHtml(doc.bodyHtml, state.query) : '<div class="alert alert-info shadow-md">\uBCF8\uBB38\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
    
    // Auto-scroll reader window to the top
    if (previewContent.parentElement) {
      previewContent.parentElement.scrollTop = 0;
    }

    copyApaButton.disabled = false;
    doiSearchButton.disabled = false;
    copyApaButton.dataset.id = doc.id;
    doiSearchButton.dataset.id = doc.id;
  };

  const renderFilters = () => {
    volumeFilters.innerHTML = collections.map((item) => {
      const isActive = state.collection === item;
      return `
        <button 
          type="button" 
          class="btn btn-xs ${isActive ? 'btn-primary' : 'btn-outline btn-neutral'}" 
          data-collection="${item}"
        >
          ${item}
        </button>
      `;
    }).join('');
  };

  const renderResults = () => {
    const rows = filteredRows();
    state.selectedId = pickSelected(rows);
    const selected = documents.find((doc) => doc.id === state.selectedId);

    resultCount.textContent = `${rows.length} / ${documents.length}`;

    resultsEl.innerHTML = rows.length
      ? `<div class="flex flex-col divide-y divide-base-300">${rows.map((doc) => {
          const isSelected = doc.id === state.selectedId;
          const badgeClass = doc.collection === 'V01' ? 'badge-primary' : 
                             doc.collection === 'V73' ? 'badge-secondary' : 
                             doc.collection === 'V75' ? 'badge-accent' : 'badge-neutral';
          
          const highlightedTitle = highlightText(doc.title, state.query);
          const excerpt = doc.excerptEn || doc.excerptKo || '—';
          const highlightedExcerpt = highlightText(excerpt, state.query);
          const authors = doc.authorsRaw || '\uC800\uC790 \uC815\uBCF4 \uC5C6\uC74C';
          const highlightedAuthors = highlightText(authors, state.query);

          return `
            <div class="p-4 flex flex-col gap-2.5 cursor-pointer transition-all duration-150 border-l-4 group relative ${
              isSelected 
                ? 'bg-primary/5 border-primary pl-3' 
                : 'hover:bg-base-200 border-transparent hover:border-base-300'
            }" data-open="${doc.id}">
              <div class="flex items-center justify-between gap-2">
                <span class="badge badge-outline badge-sm ${badgeClass}">
                  ${esc(doc.collection)}
                </span>
                <span class="text-xs text-base-content/60 font-medium">
                  ${esc(doc.year || '')}
                </span>
              </div>
              <div class="space-y-1">
                <h3 class="text-xs font-bold leading-snug text-base-content group-hover:text-primary">
                  ${highlightedTitle}
                </h3>
                <p class="text-xs text-base-content/70 mt-1 line-clamp-1">
                  ${highlightedAuthors}
                </p>
              </div>
              <p class="text-xs text-base-content/60 line-clamp-2 bg-base-200/50 p-2.5 rounded border border-base-300/40 leading-relaxed">
                ${highlightedExcerpt}
              </p>
              <div class="flex items-center justify-end gap-1.5 mt-0.5">
                <button type="button" class="btn btn-xs btn-outline btn-neutral" data-copy="${doc.id}">
                  APA7
                </button>
                <button type="button" class="btn btn-xs btn-outline btn-neutral" data-doi="${doc.id}">
                  DOI
                </button>
              </div>
            </div>
          `;
        }).join('')}</div>`
      : '<div class="p-8 text-center text-base-content/50 flex flex-col items-center justify-center gap-2"><svg class="w-10 h-10 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p class="text-sm font-medium">\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8다.</p></div>';

    setPreview(selected);
  };

  const applyState = () => {
    queryInput.value = state.query;
    renderFilters();
    renderResults();
  };

  queryInput.addEventListener('input', () => {
    state.query = queryInput.value;
    renderResults();
  });

  clearButton.addEventListener('click', () => {
    state.query = '';
    state.collection = 'ALL';
    state.selectedId = '';
    applyState();
  });

  volumeFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-collection]');
    if (!button) return;
    state.collection = button.dataset.collection;
    state.selectedId = '';
    renderResults();
  });

  resultsEl.addEventListener('click', async (event) => {
    const clickable = event.target.closest('[data-open], [data-copy], [data-doi]');
    if (!clickable) return;

    if (clickable.dataset.open && !event.target.closest('[data-copy], [data-doi]')) {
      state.selectedId = clickable.dataset.open;
      renderResults();
      return;
    }

    if (clickable.dataset.copy) {
      const doc = documents.find((item) => item.id === clickable.dataset.copy);
      if (!doc) return;
      await copyText(doc.citationApa || doc.title);
      previewStatus.textContent = 'APA7 \uC785\uB825\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.';
      showToast('APA7 \uC778\uC6A9\uC774 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.');
      return;
    }

    if (clickable.dataset.doi) {
      const doc = documents.find((item) => item.id === clickable.dataset.doi);
      if (!doc) return;
      window.open(doiSearchUrl(doc), '_blank', 'noopener,noreferrer');
    }
  });

  copyApaButton.addEventListener('click', async () => {
    const doc = documents.find((item) => item.id === copyApaButton.dataset.id);
    if (!doc) return;
    await copyText(doc.citationApa || doc.title);
    previewStatus.textContent = 'APA7 \uC785\uB825\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.';
    showToast('APA7 \uC778\uC6A9\uC774 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.');
  });

  doiSearchButton.addEventListener('click', () => {
    const doc = documents.find((item) => item.id === doiSearchButton.dataset.id);
    if (!doc) return;
    window.open(doiSearchUrl(doc), '_blank', 'noopener,noreferrer');
  });

  applyState();
})();