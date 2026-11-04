(() => {
  const strings = window.siteStrings;
  const diagramError = strings.diagramError;
  const { steps, tokenMeta, tokenDetails, warningToken, warningStep, keyboardNavigation } = window.topicData;
  const stepsEl = document.getElementById('steps');
  const previous = document.getElementById('prev');
  const next = document.getElementById('next');
  const sequence = document.getElementById('sequence');
  const tokens = document.getElementById('tokens');
  const note = document.getElementById('note');
  const progress = document.getElementById('step-progress');
  let current = 0;
  let focus = null;
  let renderVersion = 0;

  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true, securityLevel: 'strict', theme: 'base',
      flowchart: { useMaxWidth: false },
      sequence: { useMaxWidth: false, actorMargin: 35, width: 120, height: 45, messageMargin: 25 },
      themeVariables: {
        fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Songti SC", serif',
        background: '#fffdf8', primaryColor: '#e5f3eb', primaryTextColor: '#1c2430',
        primaryBorderColor: '#1f6b4a', lineColor: '#1f6b4a', signalColor: '#1c2430',
        signalTextColor: '#1c2430', noteBkgColor: '#e7f0fa', noteTextColor: '#1d4e89',
        noteBorderColor: '#9db7d6', actorBkg: '#fffdf8', actorBorder: '#1f6b4a', actorTextColor: '#1c2430'
      }
    });
  } else {
    document.querySelectorAll('.mermaid').forEach(element => { element.textContent = diagramError; });
  }

  function paintTokens() {
    const step = steps[current];
    const live = new Set(step.live || []);
    if (tokens) tokens.querySelectorAll('.token').forEach(element => {
      const key = element.dataset.key;
      element.dataset.state = focus === key && live.has(key) ? 'focus' : !live.has(key) ? 'idle' : tokenMeta[key].state;
      element.disabled = !live.has(key);
      element.setAttribute('aria-pressed', String(focus === key && live.has(key)));
    });
    const focused = focus && live.has(focus) && tokenDetails && tokenDetails[focus];
    note.textContent = focused || step.note || step.callout || '';
    note.classList.toggle('warn', Boolean(focused ? focus === warningToken : current === warningStep));
  }

  async function showStep(index) {
    if (index < 0 || index >= steps.length) return;
    current = index;
    focus = null;
    const step = steps[index];
    progress.textContent = strings.progress.replace('{current}', index + 1).replace('{total}', steps.length);
    document.getElementById('kicker').textContent = step.kicker;
    document.getElementById('step-title').textContent = step.title;
    document.getElementById('detail').textContent = step.detail;
    stepsEl.querySelectorAll('button').forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    previous.disabled = index === 0;
    next.disabled = index === steps.length - 1;
    paintTokens();
    const version = ++renderVersion;
    sequence.setAttribute('aria-busy', 'true');
    sequence.textContent = strings.loading;
    try {
      if (!window.mermaid) throw new Error('Mermaid unavailable');
      const result = await mermaid.render('sequence-' + version, step.diagram);
      if (version === renderVersion) sequence.innerHTML = result.svg;
    } catch (error) {
      if (version === renderVersion) sequence.textContent = diagramError;
    } finally {
      if (version === renderVersion) sequence.setAttribute('aria-busy', 'false');
    }
  }

  steps.forEach((step, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'step'; button.textContent = step.label;
    button.addEventListener('click', () => showStep(index));
    stepsEl.appendChild(button);
  });
  if (tokens && tokenMeta) Object.entries(tokenMeta).forEach(([key, meta]) => {
    const button = document.createElement('button');
    const label = document.createElement('b');
    const hint = document.createElement('span');
    button.type = 'button'; button.className = 'token'; button.dataset.key = key;
    label.textContent = meta.name; hint.textContent = meta.hint;
    button.append(label, hint);
    button.addEventListener('click', () => { focus = focus === key ? null : key; paintTokens(); });
    tokens.appendChild(button);
  });
  previous.addEventListener('click', () => showStep(current - 1));
  next.addEventListener('click', () => showStep(current + 1));
  if (keyboardNavigation) document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'ArrowRight') showStep(current + 1);
    if (event.key === 'ArrowLeft') showStep(current - 1);
  });
  const fromHash = steps.findIndex(step => step.id && step.id === location.hash.slice(1));
  showStep(Math.max(0, fromHash));
})();
