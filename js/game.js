/* ═══════════════════════════════════════════════════════════════
   Project Kana — Game Engine
════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────

const NUM_LANES      = 6;
const ZONE_T_START   = 0.82;   // note enters type-zone at this progress value
const ZONE_T_END     = 1.0;    // note exits (miss threshold)
const NOTE_BASE_W    = 165;    // px at full scale (t=1)
const NOTE_BASE_H    = 96;     // px at full scale
const VANISH_Y_RATIO = 0.10;   // vanishing point Y as fraction of canvas height
const LANE_SPREAD    = 0.88;   // fraction of canvas width lanes occupy at bottom
const JUDGMENT_HIDE_MS = 700;
const COMBO_PULSE_MS   = 120;

// Lane colors cycling through the neon palette
const LANE_COLORS = [
  '#00e5ff', // cyan
  '#a855f7', // purple
  '#00e5ff',
  '#a855f7',
  '#00e5ff',
  '#a855f7',
];

// ─── State ────────────────────────────────────────────────────────────────────

let canvas, ctx;
let animFrameId   = null;
let lastTimestamp = 0;

let gameState = {
  notes:        [],    // active note objects
  noteQueue:    [],    // upcoming {kana, romaji[]} entries
  noteIndex:    0,     // index into noteQueue for next spawn
  spawnTimer:   0,     // seconds until next spawn
  hits:         0,
  misses:       0,
  combo:        0,
  maxCombo:     0,
  currentInput: '',
  speed:        SPEED_PRESETS['normal'],
  running:      false,
};

let uiState = {
  selectedColumns: new Set(),
  activeTab:       'hiragana',
  speed:           'normal',
  judgmentTimer:   null,
  comboPulseTimer: null,
};

// ─── Utility ──────────────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

// ─── Lane geometry ────────────────────────────────────────────────────────────

function getLaneBottomX(lane) {
  const w    = canvas.width;
  const half = (NUM_LANES - 1) / 2;
  const step = (w * LANE_SPREAD) / (NUM_LANES - 1);
  return w / 2 + (lane - half) * step;
}

function getVanishPoint() {
  return { x: canvas.width / 2, y: canvas.height * VANISH_Y_RATIO };
}

// Project a note's position given progress t in [0,1]
function projectNote(lane, t) {
  const vp    = getVanishPoint();
  const bx    = getLaneBottomX(lane);
  const by    = canvas.height * 0.78;   // zone line Y
  const scale = lerp(0.0, 1.0, easeOutQuad(t));
  return {
    x:     lerp(vp.x, bx, t),
    y:     lerp(vp.y, by, t),
    scale: Math.max(scale, 0.04),
    w:     NOTE_BASE_W * Math.max(scale, 0.04),
    h:     NOTE_BASE_H * Math.max(scale, 0.04),
  };
}

// ─── Note generation ──────────────────────────────────────────────────────────

function buildNoteQueue(selectedIds, speedKey) {
  const speed = SPEED_PRESETS[speedKey];
  // Collect all characters from selected columns
  let charPool = [];
  for (const col of KANA_COLUMNS) {
    if (selectedIds.has(col.id)) {
      charPool = charPool.concat(col.chars);
    }
  }
  if (charPool.length === 0) return [];

  // Repeat the pool until we fill ~TARGET_DURATION seconds
  const notesNeeded = Math.ceil(TARGET_DURATION / speed.spawnInterval);
  const repeatCount = Math.ceil(notesNeeded / charPool.length);
  let queue = [];
  for (let i = 0; i < repeatCount; i++) {
    queue = queue.concat(shuffle(charPool));
  }
  return queue.slice(0, notesNeeded);
}

// ─── Canvas rendering ─────────────────────────────────────────────────────────

function drawBackground() {
  const w  = canvas.width;
  const h  = canvas.height;
  const vp = getVanishPoint();

  // Base fill
  ctx.fillStyle = '#0b0b18';
  ctx.fillRect(0, 0, w, h);

  // Perspective lane lines
  ctx.save();
  for (let i = 0; i < NUM_LANES; i++) {
    const bx = getLaneBottomX(i);
    const grad = ctx.createLinearGradient(vp.x, vp.y, bx, h * 0.78);
    grad.addColorStop(0, 'rgba(0,229,255,0)');
    grad.addColorStop(1, `rgba(0,229,255,0.18)`);
    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(bx, h * 0.78);
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Perspective grid (horizontal bands)
  const zoneY  = h * 0.78;
  const gridSteps = 10;
  ctx.save();
  for (let s = 1; s <= gridSteps; s++) {
    const tGrid = s / gridSteps;
    const y     = lerp(vp.y, zoneY, tGrid);
    const leftBx  = getLaneBottomX(0);
    const rightBx = getLaneBottomX(NUM_LANES - 1);
    const xl = lerp(vp.x, leftBx,  tGrid);
    const xr = lerp(vp.x, rightBx, tGrid);
    const alpha = tGrid * 0.18;
    ctx.beginPath();
    ctx.moveTo(xl, y);
    ctx.lineTo(xr, y);
    ctx.strokeStyle = `rgba(180,100,255,${alpha})`;
    ctx.lineWidth   = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Zone bar
  drawZoneBar();
}

function drawZoneBar() {
  const w     = canvas.width;
  const zoneY = canvas.height * 0.78;
  const grad  = ctx.createLinearGradient(0, zoneY - 2, 0, zoneY + 4);
  grad.addColorStop(0, 'rgba(0,229,255,0.9)');
  grad.addColorStop(1, 'rgba(0,229,255,0)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, zoneY - 2, w, 8);
  // Outer glow
  ctx.shadowColor  = '#00e5ff';
  ctx.shadowBlur   = 18;
  ctx.fillStyle    = 'rgba(0,229,255,0.6)';
  ctx.fillRect(0, zoneY - 1, w, 2);
  ctx.restore();
}

function drawNote(note) {
  const proj = projectNote(note.lane, note.t);
  const { x, w, h, scale } = proj;
  const isActive = note.inZone;
  const color    = LANE_COLORS[note.lane % LANE_COLORS.length];

  // Float upward during hit/miss exit animations
  const floatDist = 60;
  let y = proj.y;
  if (note.hit)    y -= easeOutQuad(note.hitProgress)  * floatDist;
  if (note.missed) y -= easeOutQuad(note.missProgress) * floatDist;

  ctx.save();
  ctx.translate(x, y);

  // Glow behind active notes
  if (isActive) {
    ctx.shadowColor = color;
    ctx.shadowBlur  = 28 * scale;
  }

  // Note card background
  const rx = 8 * scale;
  roundRect(ctx, -w / 2, -h / 2, w, h, rx);

  if (note.hit) {
    const alpha = 1 - note.hitProgress;
    ctx.fillStyle   = `rgba(0,255,170,${alpha * 0.25})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(0,255,170,${alpha})`;
    ctx.lineWidth   = 2 * scale;
    ctx.stroke();
  } else if (note.missed) {
    const alpha = 1 - note.missProgress;
    ctx.fillStyle   = `rgba(255,44,66,${alpha * 0.2})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255,44,66,${alpha})`;
    ctx.lineWidth   = 2 * scale;
    ctx.stroke();
  } else {
    ctx.fillStyle   = isActive
      ? `rgba(0,229,255,0.15)`
      : 'rgba(255,255,255,0.06)';
    ctx.fill();
    ctx.strokeStyle = isActive ? color : 'rgba(255,255,255,0.2)';
    ctx.lineWidth   = (isActive ? 2 : 1) * scale;
    ctx.stroke();
  }

  ctx.shadowBlur  = 0;
  ctx.shadowColor = 'transparent';

  // Kana text — always 55% of note height so it scales proportionally
  const kanaSz = h * 0.55;
  ctx.font         = `700 ${kanaSz}px 'Noto Sans JP', sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  if (note.missed) {
    const alpha = 1 - note.missProgress;
    ctx.fillStyle = `rgba(255,80,100,${alpha})`;
    ctx.fillText(note.kana, 0, h * 0.1);
    // Romaji above
    ctx.font      = `600 ${h * 0.28}px 'Rajdhani', sans-serif`;
    ctx.fillStyle = `rgba(255,150,165,${alpha})`;
    ctx.fillText(note.romaji[0], 0, -h * 0.72);
  } else if (note.hit) {
    const alpha = 1 - note.hitProgress;
    ctx.font      = `700 ${kanaSz}px 'Noto Sans JP', sans-serif`;
    ctx.fillStyle = `rgba(0,255,170,${alpha})`;
    ctx.fillText(note.kana, 0, 0);
  } else {
    ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255,255,255,0.7)';
    ctx.fillText(note.kana, 0, 0);
  }

  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── Game Loop ────────────────────────────────────────────────────────────────

function tick(timestamp) {
  if (!gameState.running) return;

  const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
  lastTimestamp = timestamp;

  update(dt);
  render();

  animFrameId = requestAnimationFrame(tick);
}

function update(dt) {
  const gs = gameState;
  const speed = gs.speed;

  // Spawn next note
  gs.spawnTimer -= dt;
  if (gs.spawnTimer <= 0 && gs.noteIndex < gs.noteQueue.length) {
    spawnNote();
    gs.spawnTimer = speed.spawnInterval;
  }

  // Advance all notes
  const tPerSec = 1 / speed.travelTime;
  const toRemove = [];

  for (const note of gs.notes) {
    if (note.hit) {
      note.hitProgress += dt * 3.5;
      if (note.hitProgress >= 1) toRemove.push(note);
      continue;
    }
    if (note.missed) {
      note.missProgress += dt * 2.5;
      if (note.missProgress >= 1) toRemove.push(note);
      continue;
    }

    note.t += tPerSec * dt;
    note.inZone = note.t >= ZONE_T_START;

    // Miss: passed the zone without a hit
    if (note.t >= ZONE_T_END) {
      registerMiss(note);
    }
  }

  for (const n of toRemove) {
    gs.notes.splice(gs.notes.indexOf(n), 1);
  }

  // Check end of game
  if (gs.noteIndex >= gs.noteQueue.length && gs.notes.length === 0) {
    endGame();
  }
}

function spawnNote() {
  const gs   = gameState;
  const data = gs.noteQueue[gs.noteIndex];
  gs.noteIndex++;

  // Pick a lane, avoiding the previous lane
  let lane;
  const lastNote = gs.notes[gs.notes.length - 1];
  do {
    lane = Math.floor(Math.random() * NUM_LANES);
  } while (lastNote && lane === lastNote.lane && NUM_LANES > 1);

  gs.notes.push({
    kana:         data.kana,
    romaji:       data.romaji,
    lane,
    t:            0,
    inZone:       false,
    hit:          false,
    missed:       false,
    hitProgress:  0,
    missProgress: 0,
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  // Draw notes back-to-front (smaller = further = drawn first)
  const sorted = gameState.notes.slice().sort((a, b) => a.t - b.t);
  for (const note of sorted) {
    drawNote(note);
  }
}

// ─── Input ────────────────────────────────────────────────────────────────────

function onKeyDown(e) {
  if (!gameState.running) return;

  // Ignore modifier keys, function keys, etc.
  if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.altKey) return;

  const ch = e.key.toLowerCase();
  gameState.currentInput += ch;
  updateTypedDisplay(gameState.currentInput);

  const activeNote = getActiveNote();
  if (!activeNote) {
    gameState.currentInput = '';
    updateTypedDisplay('');
    return;
  }

  const input   = gameState.currentInput;
  const romajis = activeNote.romaji;

  // Check for full match
  if (romajis.some(r => r === input)) {
    registerHit(activeNote);
    return;
  }

  // Check if input is a prefix of any valid romaji
  const isPrefixValid = romajis.some(r => r.startsWith(input));
  if (!isPrefixValid) {
    // Bad input — reset buffer with current key as start
    gameState.currentInput = ch;
    updateTypedDisplay(ch);

    // Check again with just the new key
    if (romajis.some(r => r === ch)) {
      registerHit(activeNote);
    }
  }
}

function getActiveNote() {
  // The note furthest along that is in the zone
  let best = null;
  for (const note of gameState.notes) {
    if (note.inZone && !note.hit && !note.missed) {
      if (!best || note.t > best.t) best = note;
    }
  }
  return best;
}

function registerHit(note) {
  note.hit = true;
  gameState.hits++;
  gameState.combo++;
  if (gameState.combo > gameState.maxCombo) {
    gameState.maxCombo = gameState.combo;
  }
  const completedText = gameState.currentInput;
  gameState.currentInput = '';
  fadeOutTypedDisplay(completedText);
  updateHUD();
  showJudgment('HIT');
  pulsCombo();
}

function registerMiss(note) {
  note.missed = true;
  gameState.misses++;
  gameState.combo = 0;
  gameState.currentInput = '';
  updateTypedDisplay('');
  updateHUD();
  showJudgment('MISS');
}

// ─── HUD Updates ──────────────────────────────────────────────────────────────

function updateHUD() {
  const gs = gameState;
  document.getElementById('combo-display').textContent = gs.combo;
  const total = gs.hits + gs.misses;
  const acc   = total === 0 ? 100 : Math.round((gs.hits / total) * 100);
  document.getElementById('score-display').textContent = acc + '%';

  const progress = gs.noteIndex / gs.noteQueue.length;
  document.getElementById('progress-bar').style.width = (progress * 100) + '%';
}

function updateTypedDisplay(text) {
  const el = document.getElementById('typed-display');
  el.classList.remove('fade-out');
  el.textContent = text;
}

function fadeOutTypedDisplay(text) {
  const el = document.getElementById('typed-display');
  el.classList.remove('fade-out');
  el.textContent = text;
  // Force reflow so the animation restarts cleanly
  void el.offsetWidth;
  el.classList.add('fade-out');
}

function showJudgment(type) {
  const el = document.getElementById('judgment-text');
  el.textContent = type;
  el.className   = 'judgment-text show-' + (type === 'HIT' ? 'hit' : 'miss');
  if (uiState.judgmentTimer) clearTimeout(uiState.judgmentTimer);
  uiState.judgmentTimer = setTimeout(() => {
    el.className = 'judgment-text';
  }, JUDGMENT_HIDE_MS);
}

function pulsCombo() {
  const el = document.getElementById('combo-display');
  el.classList.add('pulse');
  if (uiState.comboPulseTimer) clearTimeout(uiState.comboPulseTimer);
  uiState.comboPulseTimer = setTimeout(() => {
    el.classList.remove('pulse');
  }, COMBO_PULSE_MS);
}

// ─── Game lifecycle ───────────────────────────────────────────────────────────

function startGame() {
  const gs = gameState;

  // Reset state
  gs.notes        = [];
  gs.noteIndex    = 0;
  gs.spawnTimer   = 0.5;  // short delay before first note
  gs.hits         = 0;
  gs.misses       = 0;
  gs.combo        = 0;
  gs.maxCombo     = 0;
  gs.currentInput = '';
  gs.speed        = SPEED_PRESETS[uiState.speed];
  gs.noteQueue    = buildNoteQueue(uiState.selectedColumns, uiState.speed);
  gs.running      = true;

  updateHUD();
  updateTypedDisplay('');
  document.getElementById('judgment-text').className = 'judgment-text';

  resizeCanvas();
  showScreen('game-screen');

  lastTimestamp = performance.now();
  if (animFrameId) cancelAnimationFrame(animFrameId);
  animFrameId = requestAnimationFrame(tick);
}

function endGame() {
  gameState.running = false;
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  showResults();
}

function showResults() {
  const gs    = gameState;
  const total = gs.hits + gs.misses;
  const acc   = total === 0 ? 100 : Math.round((gs.hits / total) * 100);
  const fc    = gs.misses === 0;

  document.getElementById('res-accuracy').textContent = acc + '%';
  document.getElementById('res-combo').textContent    = gs.maxCombo;
  document.getElementById('res-hit').textContent      = gs.hits;
  document.getElementById('res-miss').textContent     = gs.misses;

  const badge = document.getElementById('fc-badge');
  fc ? badge.classList.remove('hidden') : badge.classList.add('hidden');

  showScreen('result-screen');
}

// ─── Screen management ────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── Canvas sizing ────────────────────────────────────────────────────────────

function resizeCanvas() {
  const c = document.getElementById('game-canvas');
  // Fit the available space (full window minus HUD and input area)
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
}

// ─── Level Select UI ─────────────────────────────────────────────────────────

function buildSelectUI() {
  const gridMap = {
    hiragana: { basic: 'grid-hira-basic', dakuten: 'grid-hira-dakuten', combo: 'grid-hira-combo' },
    katakana: { basic: 'grid-kata-basic', dakuten: 'grid-kata-dakuten', combo: 'grid-kata-combo' },
  };

  for (const col of KANA_COLUMNS) {
    const type   = col.kana_type;
    const grpId  = gridMap[type]?.[col.group];
    if (!grpId) continue;
    const grid = document.getElementById(grpId);
    if (!grid) continue;

    const card = document.createElement('div');
    card.className   = 'col-card';
    card.dataset.id  = col.id;

    const nameEl    = document.createElement('div');
    nameEl.className = 'col-name';
    nameEl.textContent = col.label;

    const previewEl    = document.createElement('div');
    previewEl.className = 'col-preview';
    previewEl.textContent = col.chars.slice(0, 3).map(c => c.kana).join('');

    card.appendChild(nameEl);
    card.appendChild(previewEl);

    card.addEventListener('click', () => toggleColumn(col.id, card));
    grid.appendChild(card);
  }

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      uiState.activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById('tab-' + uiState.activeTab).classList.add('active');
    });
  });

  // Speed buttons
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      uiState.speed = btn.dataset.speed;
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Play button
  document.getElementById('play-btn').addEventListener('click', () => {
    if (uiState.selectedColumns.size > 0) startGame();
  });

  // Result buttons
  document.getElementById('retry-btn').addEventListener('click', startGame);
  document.getElementById('back-btn').addEventListener('click', () => {
    showScreen('select-screen');
  });
}

function toggleColumn(id, card) {
  if (uiState.selectedColumns.has(id)) {
    uiState.selectedColumns.delete(id);
    card.classList.remove('selected');
  } else {
    uiState.selectedColumns.add(id);
    card.classList.add('selected');
  }
  updateSelectedCount();
}

function updateSelectedCount() {
  const n = uiState.selectedColumns.size;
  document.getElementById('selected-count').textContent =
    n === 0 ? '0 columns selected' : `${n} column${n > 1 ? 's' : ''} selected`;
  document.getElementById('play-btn').disabled = n === 0;
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

function init() {
  canvas = document.getElementById('game-canvas');
  ctx    = canvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', () => {
    if (gameState.running) resizeCanvas();
  });

  buildSelectUI();
  document.addEventListener('keydown', onKeyDown);
}

document.addEventListener('DOMContentLoaded', init);
