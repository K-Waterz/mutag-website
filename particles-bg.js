/**
 * Full-page particle field + scroll ripples + focal glow.
 * Desktop: mouse follow + subtle shooting-star streak on quick moves.
 * Touch / pen: tight swipe follow, idle orbit anchored to last interaction, stronger streak while moving.
 * Optional gyro blend on touch-first; scroll ripples anchor to recent pointer when available.
 * Expects <canvas id="particle-canvas"> as the first interactive layer.
 * Deferred until browser idle (or short timeout) so first paint and navigation stay responsive.
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
  var VEL_SMOOTH = 0.38;
  var VEL_DECAY = 0.9;
  var VEL_CLAMP = 7.5;
  var activeTouchCount = 0;

  function recordPointerPosition(cx, cy) {
    var t = Date.now();
    lastClientX = cx;
    lastClientY = cy;
    lastPointerTime = t;
    if (lastSampleT === 0) {
      lastSampleX = cx;
      lastSampleY = cy;
      lastSampleT = t;
      return;
    }
    var gap = t - lastSampleT;
    if (gap > 100) {
      lastSampleX = cx;
      lastSampleY = cy;
      lastSampleT = t;
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
    velX += (ix - velX) * VEL_SMOOTH;
    velY += (iy - velY) * VEL_SMOOTH;
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
    function onPointerDown(e) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        activeTouchCount++;
        setLastClient(e.clientX, e.clientY);
      }
    }
    function onPointerMove(e) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        setLastClient(e.clientX, e.clientY);
      }
    }
    function onPointerEnd(e) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        activeTouchCount = Math.max(0, activeTouchCount - 1);
      }
    }
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
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
  function drawShootingStar(mx, my, dark) {
    var sp = Math.sqrt(velX * velX + velY * velY);
    var thresh = useMouseFollow ? 0.22 : 0.11;
    if (sp < thresh) return;

    var maxSp = useMouseFollow ? 2.8 : 4.2;
    var u = Math.min(1, sp / maxSp);
    var baseLen = useMouseFollow ? 100 : 200;
    var tailLen = baseLen * u + (useMouseFollow ? 40 : 90) * u;
    var inv = 1 / sp;
    var nx = velX * inv;
    var ny = velY * inv;
    var tx = mx - nx * tailLen;
    var ty = my - ny * tailLen;

    var a0 = dark ? 0 : 0.02;
    var aMid = (dark ? 0.16 : 0.09) * (0.45 + 0.55 * u);
    var aHead = (dark ? 0.5 : 0.28) * (0.5 + 0.5 * u);

    ctx.save();
    ctx.globalCompositeOperation = dark ? 'lighter' : 'screen';
    ctx.lineCap = 'round';

    var g = ctx.createLinearGradient(tx, ty, mx, my);
    g.addColorStop(0, 'hsla(258,100%,72%,' + a0 + ')');
    g.addColorStop(0.45, 'hsla(255,92%,78%,' + (aMid * 0.85) + ')');
    g.addColorStop(0.82, 'hsla(252,96%,90%,' + aHead + ')');
    g.addColorStop(1, 'hsla(260,100%,100%,' + (aHead * 0.95) + ')');

    ctx.strokeStyle = g;
    ctx.lineWidth = (useMouseFollow ? 5 : 7) + (useMouseFollow ? 8 : 16) * u;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(mx, my);
    ctx.stroke();

    ctx.strokeStyle = dark ? 'hsla(260,100%,100%,0.22)' : 'hsla(260,100%,98%,0.14)';
    ctx.lineWidth = 1.5 + 2.5 * u;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(mx, my);
    ctx.stroke();
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
    var pointerStale = nowMs - lastPointerTime > 70;
    if (pointerStale) {
      velX *= VEL_DECAY;
      velY *= VEL_DECAY;
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

    drawShootingStar(starX, starY, dark);

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

  if ('requestIdleCallback' in window) {
    requestIdleCallback(startParticleField, { timeout: 2000 });
  } else {
    window.setTimeout(startParticleField, 16);
  }
})();
