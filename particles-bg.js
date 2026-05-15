/**
 * Full-page particle field + scroll ripples + focal glow.
 * Desktop: mouse follow + subtle shooting-star streak on quick moves.
 * Touch / pen: tight swipe follow, idle orbit anchored to last interaction, stronger streak while moving.
 * Touch-first: listeners use capture so touches are seen before site handlers; field starts immediately
 * (no idle deferral) so fast taps are never missed.
 */
(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function startParticleField() {
  var ctx = canvas.getContext('2d');
  var W, H;
  var mouse = { x: 0, y: 0 };
  var target = { x: 0, y: 0 };
  var tiltX = 0, tiltY = 0;
  var mm = window.matchMedia ? window.matchMedia.bind(window) : null;
  var useMouseFollow = !!(mm && mm('(pointer: fine)').matches && mm('(hover: hover)').matches);
  var cores = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 4;
  var lightDevice = !useMouseFollow || cores <= 4;
  var TOTAL = lightDevice ? 38 : 58;
  var particles = [];
  var waves = [];
  var lastClientX = 0;
  var lastClientY = 0;
  var lastPointerTime = 0;
  var TOUCH_TARGET_MS = 3200;
  var RIPPLE_ANCHOR_MS = 4500;
  var velX = 0;
  var velY = 0;
  var lastSampleX = 0;
  var lastSampleY = 0;
  var lastSampleT = 0;
  var VEL_SMOOTH_MOUSE = 0.38;
  var VEL_SMOOTH_TOUCH = 0.58;
  var VEL_CLAMP = 7.5;
  var activeTouchCount = 0;
  var trailBoostUntil = 0;
  var lastTailNx = 0;
  var lastTailNy = -1;
  /** One object per active pointerId: swipe vector = (lx,ly) - (sx,sy) */
  var gestures = Object.create(null);

  function isMousePointer(e) {
    return e.pointerType === 'mouse';
  }

  /** Immediate feedback on touch down (outward from screen center). */
  function miniBumpOnDown(cx, cy) {
    var gx = cx - W * 0.5;
    var gy = cy - H * 0.5;
    var gl = Math.sqrt(gx * gx + gy * gy) || 1;
    gx /= gl;
    gy /= gl;
    velX += gx * 0.62;
    velY += gy * 0.62;
    lastTailNx = gx;
    lastTailNy = gy;
    var t = Date.now();
    trailBoostUntil = Math.max(trailBoostUntil, t + 520);
  }

  /** On release: strong streak along swipe, or radial “tap star” when barely moved (every tap). */
  function finalizeSwipeBurst(g) {
    var dx = g.lx - g.sx;
    var dy = g.ly - g.sy;
    var d = Math.sqrt(dx * dx + dy * dy);
    var t = Date.now();
    trailBoostUntil = Math.max(trailBoostUntil, t + 780);
    var nx;
    var ny;
    var speed;
    if (d > 4) {
      var inv = 1 / d;
      nx = dx * inv;
      ny = dy * inv;
      speed = Math.min(5.5, 1.25 + d * 0.024);
    } else {
      nx = g.lx - W * 0.5;
      ny = g.ly - H * 0.5;
      var nl = Math.sqrt(nx * nx + ny * ny);
      if (nl < 12) {
        var tick = (Date.now() >> 4) & 7;
        var oct = tick * (Math.PI / 4);
        nx = Math.cos(oct);
        ny = Math.sin(oct);
      } else {
        nx /= nl;
        ny /= nl;
      }
      speed = 2.15;
    }
    velX = velX * 0.08 + nx * speed * 0.92;
    velY = velY * 0.08 + ny * speed * 0.92;
    lastTailNx = nx;
    lastTailNy = ny;
  }

  function recordPointerPosition(cx, cy) {
    var t = Date.now();
    lastClientX = cx;
    lastClientY = cy;
    lastPointerTime = t;
    var smooth = useMouseFollow ? VEL_SMOOTH_MOUSE : VEL_SMOOTH_TOUCH;
    var gapResetMs = useMouseFollow ? 100 : 55;
    if (lastSampleT === 0) {
      lastSampleX = cx;
      lastSampleY = cy;
      lastSampleT = t;
      if (!useMouseFollow) trailBoostUntil = Math.max(trailBoostUntil, t + 560);
      return;
    }
    var gap = t - lastSampleT;
    if (gap > gapResetMs) {
      lastSampleX = cx;
      lastSampleY = cy;
      lastSampleT = t;
      if (!useMouseFollow) trailBoostUntil = Math.max(trailBoostUntil, t + 560);
      return;
    }
    var dt = Math.max(1, gap);
    var ix = (cx - lastSampleX) / dt;
    var iy = (cy - lastSampleY) / dt;
    var imag = Math.sqrt(ix * ix + iy * iy);
    if (imag > VEL_CLAMP) {
      ix *= VEL_CLAMP / imag;
      iy *= VEL_CLAMP / imag;
    }
    lastSampleX = cx;
    lastSampleY = cy;
    lastSampleT = t;
    velX += (ix - velX) * smooth;
    velY += (iy - velY) * smooth;
    var spm = Math.sqrt(velX * velX + velY * velY);
    if (spm > 0.06) {
      lastTailNx = velX / spm;
      lastTailNy = velY / spm;
    }
    trailBoostUntil = Math.max(trailBoostUntil, t + (useMouseFollow ? 260 : 580));
  }

  function setLastClient(cx, cy) {
    recordPointerPosition(cx, cy);
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    lastClientX = W / 2;
    lastClientY = H / 2;
    lastPointerTime = 0;
    lastSampleT = 0;
    velX = velY = 0;
    activeTouchCount = 0;
    trailBoostUntil = 0;
    gestures = Object.create(null);
    lastTailNx = 0;
    lastTailNy = -1;
    mouse.x = target.x = W / 2;
    mouse.y = target.y = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  if (useMouseFollow) {
    window.addEventListener('mousemove', function (e) {
      recordPointerPosition(e.clientX, e.clientY);
      target.x = e.clientX;
      target.y = e.clientY;
    });
  } else {
    var cap = { passive: true, capture: true };
    function onPointerDown(e) {
      if (isMousePointer(e)) return;
      var id = e.pointerId;
      if (gestures[id]) return;
      var cx = e.clientX;
      var cy = e.clientY;
      activeTouchCount++;
      gestures[id] = { sx: cx, sy: cy, lx: cx, ly: cy };
      miniBumpOnDown(cx, cy);
      setLastClient(cx, cy);
    }
    function onPointerMove(e) {
      if (isMousePointer(e)) return;
      var id = e.pointerId;
      var g = gestures[id];
      var cx = e.clientX;
      var cy = e.clientY;
      if (g) {
        g.lx = cx;
        g.ly = cy;
      }
      setLastClient(cx, cy);
    }
    function onPointerEnd(e) {
      if (isMousePointer(e)) return;
      var id = e.pointerId;
      var g = gestures[id];
      var cx = e.clientX;
      var cy = e.clientY;
      if (g) {
        g.lx = cx;
        g.ly = cy;
        finalizeSwipeBurst(g);
        delete gestures[id];
        activeTouchCount = Math.max(0, activeTouchCount - 1);
      }
      setLastClient(cx, cy);
    }
    window.addEventListener('pointerdown', onPointerDown, cap);
    window.addEventListener('pointermove', onPointerMove, cap);
    window.addEventListener('pointerup', onPointerEnd, cap);
    window.addEventListener('pointercancel', onPointerEnd, cap);
  }

  var gyroX = 0, gyroY = 0;
  if (!useMouseFollow && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (e) {
      gyroX = (e.gamma || 0) / 45;
      gyroY = (e.beta || 0) / 90;
    });
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      document.addEventListener('touchstart', function askGyro() {
        DeviceOrientationEvent.requestPermission().catch(function () {});
        document.removeEventListener('touchstart', askGyro);
      }, { once: true });
    }
  }

  var scrollCooldown = 0;
  window.addEventListener('scroll', function () {
    var now = Date.now();
    if (now - scrollCooldown < 350) return;
    scrollCooldown = now;
    var ax = W / 2;
    var ay = H / 2;
    if (now - lastPointerTime < RIPPLE_ANCHOR_MS) {
      ax = Math.max(0, Math.min(W, lastClientX));
      ay = Math.max(0, Math.min(H, lastClientY));
    }
    waves.push({
      x: ax,
      y: ay,
      r: 0,
      maxR: Math.max(W, H) * 0.7,
      alpha: 0.55,
      hue: 240 + Math.random() * 40
    });
  }, { passive: true });

  function isDark() {
    return !document.documentElement.hasAttribute('data-theme') ||
      document.documentElement.getAttribute('data-theme') === 'dark';
  }

  /** Motion streak behind focal point (tail opposite velocity). Stronger on touch-first. */
  function drawShootingStar(mx, my, dark, nowMs) {
    var sp0 = Math.sqrt(velX * velX + velY * velY);
    var linger = nowMs < trailBoostUntil;
    var sp = linger ? Math.max(sp0, useMouseFollow ? 0.18 : 0.48) : sp0;
    var thresh = useMouseFollow ? 0.14 : 0.012;
    if (sp < thresh) return;

    var maxSp = useMouseFollow ? 2.8 : 6.2;
    var u = Math.min(1, sp / maxSp);
    var baseLen = useMouseFollow ? 115 : 380;
    var tailLen = baseLen * u + (useMouseFollow ? 52 : 220) * u;
    var lingerFade = linger ? Math.min(1, (trailBoostUntil - nowMs) / 420) : 1;
    var a0 = dark ? 0 : 0.02;
    var aMid = (dark ? 0.16 : 0.09) * (0.45 + 0.55 * u) * (0.55 + 0.45 * lingerFade);
    var aHead = (dark ? 0.5 : 0.28) * (0.5 + 0.5 * u) * (0.55 + 0.45 * lingerFade);

    ctx.save();
    ctx.globalCompositeOperation = dark ? 'lighter' : 'screen';
    ctx.lineCap = 'round';

    var nx;
    var ny;
    if (sp0 > 0.035) {
      var inv = 1 / sp0;
      nx = velX * inv;
      ny = velY * inv;
    } else {
      var tn = Math.sqrt(lastTailNx * lastTailNx + lastTailNy * lastTailNy) || 1;
      nx = lastTailNx / tn;
      ny = lastTailNy / tn;
    }
    var baseAng = Math.atan2(ny, nx);
    var spreads = useMouseFollow ? [0] : [0, -0.1, 0.1];
    for (var si = 0; si < spreads.length; si++) {
      var ang = baseAng + spreads[si];
      var snx = Math.cos(ang);
      var sny = Math.sin(ang);
      var branch = si === 0 ? 1 : 0.38;
      var tx = mx - snx * tailLen;
      var ty = my - sny * tailLen;

      var aMidB = aMid * branch;
      var aHeadB = aHead * branch;

      var lg = ctx.createLinearGradient(tx, ty, mx, my);
      lg.addColorStop(0, 'hsla(258,100%,72%,' + a0 + ')');
      lg.addColorStop(0.45, 'hsla(255,92%,78%,' + (aMidB * 0.85) + ')');
      lg.addColorStop(0.82, 'hsla(252,96%,90%,' + aHeadB + ')');
      lg.addColorStop(1, 'hsla(260,100%,100%,' + (aHeadB * 0.95) + ')');

      ctx.strokeStyle = lg;
      ctx.lineWidth = ((useMouseFollow ? 5 : 8) + (useMouseFollow ? 9 : 20) * u) * (si === 0 ? 1 : 0.55);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(mx, my);
      ctx.stroke();

      ctx.strokeStyle = dark ? 'hsla(260,100%,100%,' + (0.22 * branch) + ')' : 'hsla(260,100%,98%,' + (0.14 * branch) + ')';
      ctx.lineWidth = (1.5 + 2.8 * u) * (si === 0 ? 1 : 0.65);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(mx, my);
      ctx.stroke();
    }
    ctx.restore();
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = (Math.random() - 0.5) * 1800;
    this.y = (Math.random() - 0.5) * 1800;
    this.z = Math.random() * 1200 + 100;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.vz = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 2 + 0.8;
    this.hue = 230 + Math.random() * 60;
  };
  for (var i = 0; i < TOTAL; i++) particles.push(new Particle());

  function draw() {
    requestAnimationFrame(draw);
    var dark = isDark();
    var nowMs = Date.now();
    var idleMs = nowMs - lastPointerTime;
    var pointerStale = idleMs > 105;
    if (idleMs > 28) {
      if (idleMs < 420) {
        velX *= useMouseFollow ? 0.965 : 0.991;
        velY *= useMouseFollow ? 0.965 : 0.991;
      } else if (idleMs < 1100) {
        velX *= useMouseFollow ? 0.94 : 0.975;
        velY *= useMouseFollow ? 0.94 : 0.975;
      } else {
        velX *= useMouseFollow ? 0.9 : 0.935;
        velY *= useMouseFollow ? 0.9 : 0.935;
      }
    }

    if (!useMouseFollow) {
      var tSec = nowMs / 1000;
      var sp = Math.sqrt(velX * velX + velY * velY);
      var moving = activeTouchCount > 0 || !pointerStale || sp > 0.2;
      var anchorStale = lastPointerTime === 0 || nowMs - lastPointerTime > 9000;
      var orbitCx = anchorStale ? W * 0.5 : lastClientX;
      var orbitCy = anchorStale ? H * 0.5 : lastClientY;
      var idleX = orbitCx + Math.cos(tSec * 0.36) * W * 0.058;
      var idleY = orbitCy + Math.sin(tSec * 0.29) * H * 0.046;
      var gyroPx = W * 0.5 + gyroX * W * 0.2;
      var gyroPy = H * 0.5 + gyroY * H * 0.16;
      if (nowMs - lastPointerTime < TOUCH_TARGET_MS) {
        if (moving) {
          target.x = lastClientX * 0.94 + gyroPx * 0.06;
          target.y = lastClientY * 0.94 + gyroPy * 0.06;
        } else {
          target.x = lastClientX * 0.42 + idleX * 0.48 + gyroPx * 0.1;
          target.y = lastClientY * 0.42 + idleY * 0.48 + gyroPy * 0.1;
        }
      } else {
        target.x = idleX * 0.62 + gyroPx * 0.38;
        target.y = idleY * 0.62 + gyroPy * 0.38;
      }
    }
    var moveSpeed = Math.sqrt(velX * velX + velY * velY);
    var followK = useMouseFollow
      ? (moveSpeed > 0.35 ? 0.11 : 0.065)
      : (moveSpeed > 0.25 ? 0.16 : 0.075);
    mouse.x += (target.x - mouse.x) * followK;
    mouse.y += (target.y - mouse.y) * followK;

    tiltX += ((mouse.x - W / 2) * 0.20 - tiltX) * 0.05;
    tiltY += ((mouse.y - H / 2) * 0.20 - tiltY) * 0.05;

    ctx.clearRect(0, 0, W, H);

    var focalLength = 600;
    particles.sort(function (a, b) { return b.z - a.z; });

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy; p.z += p.vz;
      if (p.z > 1300) p.z = 100; if (p.z < 100) p.z = 1300;
      if (p.x > 900) p.x = -900; if (p.x < -900) p.x = 900;
      if (p.y > 900) p.y = -900; if (p.y < -900) p.y = 900;

      var scale = focalLength / (focalLength + p.z);
      var sx = (p.x - tiltX) * scale + W / 2;
      var sy = (p.y - tiltY) * scale + H / 2;
      var sr = p.r * scale;
      var depth = 1 - p.z / 1400;

      var alpha = dark ? 0.15 + depth * 0.7 : 0.10 + depth * 0.5;
      var lightness = dark ? 55 + depth * 25 : 40 + depth * 20;

      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(sr, 0.3), 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ',70%,' + lightness + '%,' + alpha + ')';
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var qs = focalLength / (focalLength + q.z);
        var qx = (q.x - tiltX) * qs + W / 2;
        var qy = (q.y - tiltY) * qs + H / 2;
        var dist = Math.sqrt((sx - qx) * (sx - qx) + (sy - qy) * (sy - qy));
        if (dist < 110) {
          var la = dark ? (1 - dist / 110) * 0.20 * depth : (1 - dist / 110) * 0.10 * depth;
          ctx.beginPath();
          ctx.moveTo(sx, sy); ctx.lineTo(qx, qy);
          ctx.strokeStyle = 'hsla(' + p.hue + ',60%,60%,' + la + ')';
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }

    for (var w = waves.length - 1; w >= 0; w--) {
      var wv = waves[w];
      wv.r += 6;
      wv.alpha *= 0.965;
      if (wv.alpha < 0.008 || wv.r > wv.maxR) { waves.splice(w, 1); continue; }
      ctx.beginPath();
      ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(' + wv.hue + ',80%,65%,' + wv.alpha + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (wv.r > 20) {
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(' + wv.hue + ',80%,72%,' + (wv.alpha * 0.4) + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    var mx = mouse.x, my = mouse.y;
    var starX = useMouseFollow ? mx : mx * 0.5 + lastClientX * 0.5;
    var starY = useMouseFollow ? my : my * 0.5 + lastClientY * 0.5;

    drawShootingStar(starX, starY, dark, nowMs);

    var g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
    g1.addColorStop(0, dark ? 'hsla(250,85%,68%,0.18)' : 'hsla(250,85%,52%,0.10)');
    g1.addColorStop(1, 'hsla(250,85%,68%,0)');
    ctx.beginPath(); ctx.arc(mx, my, 220, 0, Math.PI * 2);
    ctx.fillStyle = g1; ctx.fill();

    var g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
    g2.addColorStop(0, dark ? 'hsla(255,90%,72%,0.38)' : 'hsla(255,90%,55%,0.22)');
    g2.addColorStop(0.5, dark ? 'hsla(255,90%,72%,0.15)' : 'hsla(255,90%,55%,0.08)');
    g2.addColorStop(1, 'hsla(255,90%,72%,0)');
    ctx.beginPath(); ctx.arc(mx, my, 90, 0, Math.PI * 2);
    ctx.fillStyle = g2; ctx.fill();

    var g3 = ctx.createRadialGradient(mx, my, 0, mx, my, 18);
    g3.addColorStop(0, dark ? 'hsla(260,100%,85%,0.90)' : 'hsla(260,100%,65%,0.70)');
    g3.addColorStop(0.4, dark ? 'hsla(260,100%,75%,0.50)' : 'hsla(260,100%,55%,0.35)');
    g3.addColorStop(1, 'hsla(260,100%,70%,0)');
    ctx.beginPath(); ctx.arc(mx, my, 18, 0, Math.PI * 2);
    ctx.fillStyle = g3; ctx.fill();
  }

  draw();
  }

  if (useMouseFollow) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(startParticleField, { timeout: 2000 });
    } else {
      window.setTimeout(startParticleField, 16);
    }
  } else {
    startParticleField();
  }
})();
