/**
 * Full-page particle field + scroll ripples + focal glow.
 * Desktop: orbit (smoothed focal point) leaves a glittery snake trail that lingers; optional velocity streak.
 * Touch / pen: while finger is down the glow tracks the touch point and leaves a path trail (including while scrolling);
 * on lift, a short firework biased along swipe velocity stays near the release point.
 * Expects <canvas id="particle-canvas"> as the first interactive layer.
 * Deferred until browser idle (or short timeout) so first paint and navigation stay responsive.
 */
(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var mm = window.matchMedia ? window.matchMedia.bind(window) : null;
  var hasTouchScreen = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0;
  var coarsePointer = !!(mm && mm('(pointer: coarse)').matches);
  var useTouchApiForFinger =
    coarsePointer ||
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (typeof navigator.platform === 'string' &&
      navigator.platform === 'MacIntel' &&
      typeof navigator.maxTouchPoints === 'number' &&
      navigator.maxTouchPoints > 1);
  var useMouseFollow = !!(
    mm &&
    mm('(pointer: fine)').matches &&
    mm('(hover: hover)').matches &&
    !coarsePointer &&
    !(hasTouchScreen && mm('(hover: none)').matches)
  );

  function startParticleField() {
  var ctx = canvas.getContext('2d');
  var W, H;
  var mouse = { x: 0, y: 0 };
  var target = { x: 0, y: 0 };
  var tiltX = 0, tiltY = 0;
  var cores = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 4;
  var lightDevice = coarsePointer || !useMouseFollow || hasTouchScreen || cores <= 4;
  var TOTAL = lightDevice ? 38 : 58;
  var particles = [];
  var waves = [];
  var touchBursts = [];
  var lastTouchBurstAt = 0;
  var lastTouchBurstX = 0;
  var lastTouchBurstY = 0;
  var orbitTrail = [];
  var ORBIT_TRAIL_MAX_AGE = 1340;
  var ORBIT_TRAIL_MAX_PTS = 300;
  var ORBIT_TRAIL_MIN_DIST_SQ = 0.65 * 0.65;
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
  /** After iOS touchcancel / gesture steal, pointer stream may briefly be the only signal. */
  var pointerTouchRecoverUntil = 0;
  var trailBoostUntil = 0;
  var lastTapX = 0;
  var lastTapY = 0;
  var lastTailNx = 0;
  var lastTailNy = -1;

  function pokeTouchImpulse(cx, cy) {
    var dx = cx - lastTapX;
    var dy = cy - lastTapY;
    var d = Math.sqrt(dx * dx + dy * dy);
    lastTapX = cx;
    lastTapY = cy;
    if (d > 1.2) {
      var inv = 1 / d;
      velX += dx * inv * 0.72;
      velY += dy * inv * 0.72;
    } else {
      var ang = Math.random() * Math.PI * 2;
      velX += Math.cos(ang) * 0.55;
      velY += Math.sin(ang) * 0.55;
    }
    var vm = Math.sqrt(velX * velX + velY * velY);
    if (vm > 1e-4) {
      lastTailNx = velX / vm;
      lastTailNy = velY / vm;
    }
    trailBoostUntil = Date.now() + 620;
  }

  function recordPointerPosition(cx, cy) {
    if (typeof cx !== 'number' || typeof cy !== 'number' || cx !== cx || cy !== cy) return;
    if (W > 1 && H > 1) {
      cx = Math.max(0, Math.min(W, cx));
      cy = Math.max(0, Math.min(H, cy));
    }
    var t = Date.now();
    lastClientX = cx;
    lastClientY = cy;
    lastPointerTime = t;
    var smooth = useMouseFollow ? VEL_SMOOTH_MOUSE : (activeTouchCount > 0 ? 0.74 : VEL_SMOOTH_TOUCH);
    var gapResetMs = useMouseFollow ? 100 : (activeTouchCount > 0 ? 200 : 55);
    if (lastSampleT === 0) {
      lastSampleX = cx;
      lastSampleY = cy;
      lastSampleT = t;
      if (!useMouseFollow) trailBoostUntil = Math.max(trailBoostUntil, t + 560);
      return;
    }
    var gap = t - lastSampleT;
    if (gap > gapResetMs) {
      if (activeTouchCount > 0 && gap < 420) {
        var dtJump = Math.max(1, gap);
        var jx = (cx - lastSampleX) / dtJump;
        var jy = (cy - lastSampleY) / dtJump;
        var jmag = Math.sqrt(jx * jx + jy * jy);
        var vcap2 = VEL_CLAMP;
        if (activeTouchCount > 0) vcap2 = useMouseFollow ? 4.2 : 3.5;
        if (jmag > vcap2) {
          jx *= vcap2 / jmag;
          jy *= vcap2 / jmag;
        }
        lastSampleX = cx;
        lastSampleY = cy;
        lastSampleT = t;
        velX += (jx - velX) * smooth * 1.08;
        velY += (jy - velY) * smooth * 1.08;
        var spj = Math.sqrt(velX * velX + velY * velY);
        if (spj > 0.06) {
          lastTailNx = velX / spj;
          lastTailNy = velY / spj;
        }
        trailBoostUntil = Math.max(trailBoostUntil, t + (useMouseFollow ? 260 : 620));
        return;
      }
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
    var vcap = VEL_CLAMP;
    if (activeTouchCount > 0) vcap = useMouseFollow ? 4.0 : 3.45;
    if (imag > vcap) {
      ix *= vcap / imag;
      iy *= vcap / imag;
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
    if (activeTouchCount > 0 && typeof cx === 'number' && typeof cy === 'number' && cx === cx && cy === cy) {
      var lx = lastClientX;
      var ly = lastClientY;
      var dx = cx - lx;
      var dy = cy - ly;
      var d2 = dx * dx + dy * dy;
      if (d2 > 28 * 28) {
        var steps = Math.min(14, Math.max(2, Math.ceil(Math.sqrt(d2) / 22)));
        var s;
        for (s = 1; s <= steps; s++) {
          recordPointerPosition(lx + (dx * s) / (steps + 1), ly + (dy * s) / (steps + 1));
        }
      }
    }
    recordPointerPosition(cx, cy);
  }

  function resize() {
    var ow = W;
    var oh = H;
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    var nowR = Date.now();
    var preserve =
      activeTouchCount > 0 ||
      (pointerTouchRecoverUntil > 0 && nowR < pointerTouchRecoverUntil) ||
      (lastPointerTime > 0 && nowR - lastPointerTime < 2800);
    var hasOld = typeof ow === 'number' && typeof oh === 'number' && ow > 16 && oh > 16;

    if (preserve && hasOld) {
      var sx = W / ow;
      var sy = H / oh;
      lastClientX = Math.max(0, Math.min(W, lastClientX * sx));
      lastClientY = Math.max(0, Math.min(H, lastClientY * sy));
      lastTapX = Math.max(0, Math.min(W, lastTapX * sx));
      lastTapY = Math.max(0, Math.min(H, lastTapY * sy));
      lastSampleX = Math.max(0, Math.min(W, lastSampleX * sx));
      lastSampleY = Math.max(0, Math.min(H, lastSampleY * sy));
      mouse.x = Math.max(0, Math.min(W, mouse.x * sx));
      mouse.y = Math.max(0, Math.min(H, mouse.y * sy));
      target.x = Math.max(0, Math.min(W, target.x * sx));
      target.y = Math.max(0, Math.min(H, target.y * sy));
      var oti;
      for (oti = 0; oti < orbitTrail.length; oti++) {
        var ot = orbitTrail[oti];
        ot.x = Math.max(0, Math.min(W, ot.x * sx));
        ot.y = Math.max(0, Math.min(H, ot.y * sy));
      }
      touchBursts.length = 0;
      waves.length = 0;
      return;
    }

    lastClientX = W / 2;
    lastClientY = H / 2;
    lastPointerTime = 0;
    lastSampleT = 0;
    velX = velY = 0;
    activeTouchCount = 0;
    pointerTouchRecoverUntil = 0;
    trailBoostUntil = 0;
    lastTapX = W / 2;
    lastTapY = H / 2;
    lastTailNx = 0;
    lastTailNy = -1;
    orbitTrail.length = 0;
    touchBursts.length = 0;
    waves.length = 0;
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
  }

  function isTouchLikePointer(e) {
    var pt = e.pointerType;
    if (pt === 'touch' || pt === 'pen') return true;
    if (pt === 'mouse') return false;
    return pt === '' && hasTouchScreen;
  }

  function rejectBadTouchClient(cx, cy) {
    if (cx !== 0 || cy !== 0) return false;
    var now = Date.now();
    if (activeTouchCount > 0 && (lastClientX > 48 || lastClientY > 48)) return true;
    if (lastPointerTime && now - lastPointerTime < 320 && (lastClientX > 48 || lastClientY > 48)) return true;
    return false;
  }

  function readTouchClient(t) {
    if (!t) return null;
    var cx = t.clientX;
    var cy = t.clientY;
    if (typeof cx === 'number' && typeof cy === 'number' && cx === cx && cy === cy) {
      if (rejectBadTouchClient(cx, cy)) return null;
      return { x: cx, y: cy };
    }
    if (typeof t.pageX === 'number' && typeof t.pageY === 'number' && t.pageX === t.pageX && t.pageY === t.pageY) {
      if (rejectBadTouchClient(t.pageX, t.pageY)) return null;
      return { x: t.pageX, y: t.pageY };
    }
    return null;
  }

  function pointerFingerClient(ev) {
    var cx = ev.clientX;
    var cy = ev.clientY;
    if (typeof cx !== 'number' || typeof cy !== 'number' || cx !== cx || cy !== cy) return null;
    if (rejectBadTouchClient(cx, cy)) return null;
    if (W > 1 && H > 1) {
      cx = Math.max(0, Math.min(W, cx));
      cy = Math.max(0, Math.min(H, cy));
    }
    return { x: cx, y: cy };
  }

  if (!useMouseFollow || hasTouchScreen) {
    function onPointerDown(e) {
      if (!isTouchLikePointer(e)) return;
      if (useTouchApiForFinger && e.pointerType !== 'pen' && e.pointerType !== 'mouse') {
        var pfd = pointerFingerClient(e);
        if (!pfd) return;
        pointerTouchRecoverUntil = 0;
        if (activeTouchCount === 0) {
          activeTouchCount = 1;
          pokeTouchImpulse(pfd.x, pfd.y);
        } else {
          activeTouchCount = Math.max(activeTouchCount, 1);
        }
        setLastClient(pfd.x, pfd.y);
        return;
      }
      activeTouchCount++;
      pokeTouchImpulse(e.clientX, e.clientY);
      setLastClient(e.clientX, e.clientY);
    }
    function onPointerMove(e) {
      if (!isTouchLikePointer(e)) return;
      if (useTouchApiForFinger && e.pointerType !== 'pen' && e.pointerType !== 'mouse') {
        var list = e.getCoalescedEvents && e.getCoalescedEvents();
        if (list && list.length > 0) {
          var ci;
          for (ci = 0; ci < list.length; ci++) {
            var pfc = pointerFingerClient(list[ci]);
            if (!pfc) continue;
            if (activeTouchCount > 0 || Date.now() < pointerTouchRecoverUntil) {
              if (activeTouchCount === 0) activeTouchCount = 1;
              setLastClient(pfc.x, pfc.y);
            }
          }
          return;
        }
        var pf = pointerFingerClient(e);
        if (!pf) return;
        if (activeTouchCount > 0 || Date.now() < pointerTouchRecoverUntil) {
          if (activeTouchCount === 0) activeTouchCount = 1;
          setLastClient(pf.x, pf.y);
        }
        return;
      }
      setLastClient(e.clientX, e.clientY);
    }
    function onPointerEnd(e) {
      if (!isTouchLikePointer(e)) return;
      if (useTouchApiForFinger && e.pointerType !== 'pen' && e.pointerType !== 'mouse') {
        var pfe = pointerFingerClient(e);
        if (activeTouchCount > 0 && pfe) {
          var bvx = velX;
          var bvy = velY;
          setLastClient(pfe.x, pfe.y);
          spawnTouchFirework(pfe.x, pfe.y, bvx, bvy);
          activeTouchCount = 0;
          pointerTouchRecoverUntil = 0;
        }
        return;
      }
      var rx = typeof e.clientX === 'number' ? e.clientX : lastClientX;
      var ry = typeof e.clientY === 'number' ? e.clientY : lastClientY;
      var burstVx = velX;
      var burstVy = velY;
      setLastClient(rx, ry);
      spawnTouchFirework(rx, ry, burstVx, burstVy);
      activeTouchCount = Math.max(0, activeTouchCount - 1);
    }
    function onPointerCancel(e) {
      if (!isTouchLikePointer(e)) return;
      if (useTouchApiForFinger && e.pointerType !== 'pen' && e.pointerType !== 'mouse') {
        pointerTouchRecoverUntil = Date.now() + 1700;
        activeTouchCount = 0;
        return;
      }
      onPointerEnd(e);
    }
    var cap = { passive: true, capture: true };
    window.addEventListener('pointerdown', onPointerDown, cap);
    window.addEventListener('pointermove', onPointerMove, cap);
    window.addEventListener('pointerup', onPointerEnd, cap);
    window.addEventListener('pointercancel', onPointerCancel, cap);

    function onTouchStartCoarse(e) {
      if (!useTouchApiForFinger) return;
      if (!e.touches || e.touches.length === 0) return;
      pointerTouchRecoverUntil = 0;
      var ti;
      var p = null;
      for (ti = 0; ti < e.touches.length; ti++) {
        p = readTouchClient(e.touches[ti]);
        if (p) break;
      }
      if (!p) return;
      activeTouchCount = e.touches.length;
      pokeTouchImpulse(p.x, p.y);
      setLastClient(p.x, p.y);
    }
    function onTouchMoveCoarse(e) {
      if (!useTouchApiForFinger) return;
      if (!e.touches || e.touches.length === 0) return;
      var ti;
      var p = null;
      for (ti = 0; ti < e.touches.length; ti++) {
        p = readTouchClient(e.touches[ti]);
        if (p) break;
      }
      if (!p) return;
      activeTouchCount = e.touches.length;
      setLastClient(p.x, p.y);
    }
    function onTouchEndCoarse(e) {
      if (!useTouchApiForFinger) return;
      if (e.touches.length > 0) {
        var t0 = e.touches[0];
        var p0 = readTouchClient(t0);
        if (p0) {
          activeTouchCount = e.touches.length;
          setLastClient(p0.x, p0.y);
        }
        return;
      }
      var burstVx = velX;
      var burstVy = velY;
      var ch = e.changedTouches && e.changedTouches[0];
      var p1 = ch ? readTouchClient(ch) : null;
      if (p1) {
        setLastClient(p1.x, p1.y);
        spawnTouchFirework(p1.x, p1.y, burstVx, burstVy);
      } else {
        spawnTouchFirework(lastClientX, lastClientY, burstVx, burstVy);
      }
      activeTouchCount = 0;
      pointerTouchRecoverUntil = 0;
    }
    function onTouchCancelCoarse(e) {
      if (!useTouchApiForFinger) return;
      if (e.touches.length > 0) {
        var t1 = e.touches[0];
        var pr = readTouchClient(t1);
        if (pr) {
          activeTouchCount = e.touches.length;
          setLastClient(pr.x, pr.y);
        }
        return;
      }
      pointerTouchRecoverUntil = Date.now() + 1700;
      activeTouchCount = 0;
    }
    window.addEventListener('touchstart', onTouchStartCoarse, cap);
    window.addEventListener('touchmove', onTouchMoveCoarse, cap);
    window.addEventListener('touchend', onTouchEndCoarse, cap);
    window.addEventListener('touchcancel', onTouchCancelCoarse, cap);
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

  /** Subtle firework when touch/pen lifts: soft core flash, expanding ring, short-lived sparks. Optional swipe vector biases sparks forward and keeps them compact. */
  function spawnTouchFirework(cx, cy, swipeVx, swipeVy) {
    var t = Date.now();
    var ddx = cx - lastTouchBurstX;
    var ddy = cy - lastTouchBurstY;
    var minGap = useTouchApiForFinger ? 38 : 70;
    var minDistSq = useTouchApiForFinger ? 100 : 196;
    if (t - lastTouchBurstAt < minGap && ddx * ddx + ddy * ddy < minDistSq) return;
    lastTouchBurstAt = t;
    lastTouchBurstX = cx;
    lastTouchBurstY = cy;
    swipeVx = typeof swipeVx === 'number' ? swipeVx : 0;
    swipeVy = typeof swipeVy === 'number' ? swipeVy : 0;
    var swSp = Math.sqrt(swipeVx * swipeVx + swipeVy * swipeVy);
    var hasSwipe = swSp > 0.11;
    var dark = isDark();
    var baseHue = 246 + Math.random() * 38;
    var sparks = [];
    var n = 18 + ((Math.random() * 10) | 0);
    var i;
    var baseAng = hasSwipe ? Math.atan2(swipeVy, swipeVx) : 0;
    for (i = 0; i < n; i++) {
      var ang;
      var spd;
      if (hasSwipe) {
        if (Math.random() < 0.74) {
          ang = baseAng + (Math.random() - 0.5) * 1.28;
          spd = 0.42 + Math.random() * 0.88 + Math.min(0.72, swSp * 0.18);
        } else {
          ang = baseAng + (Math.random() - 0.5) * (Math.PI * 0.92);
          spd = 0.35 + Math.random() * 0.62;
        }
      } else {
        ang = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.55;
        spd = 1.05 + Math.random() * 2.1;
      }
      sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        hue: baseHue + (Math.random() * 28 - 14),
        life: 1,
        r: hasSwipe ? 0.75 + Math.random() * 1.05 : 0.9 + Math.random() * 1.45,
        tight: hasSwipe ? 1 : 0
      });
    }
    touchBursts.push({
      x: cx,
      y: cy,
      sparks: sparks,
      ringR: 0,
      ringAlpha: dark ? 0.36 : 0.19,
      flash: dark ? 0.5 : 0.26,
      born: Date.now()
    });
    while (touchBursts.length > 4) touchBursts.shift();
  }

  function drawTouchFireworks(nowMs, dark) {
    if (!touchBursts.length) return;
    ctx.save();
    ctx.globalCompositeOperation = dark ? 'lighter' : 'screen';
    var b;
    for (b = touchBursts.length - 1; b >= 0; b--) {
      var B = touchBursts[b];
      var age = nowMs - B.born;
      if (age > 640) {
        touchBursts.splice(b, 1);
        continue;
      }
      var tNorm = age / 640;
      B.ringR += 4.8;
      B.ringAlpha *= 0.93;
      B.flash *= 0.86;

      if (B.flash > 0.04) {
        var rg = ctx.createRadialGradient(B.x, B.y, 0, B.x, B.y, 28 + age * 0.12);
        rg.addColorStop(0, dark ? 'hsla(260,100%,96%,' + (B.flash * 0.5) + ')' : 'hsla(260,100%,98%,' + (B.flash * 0.28) + ')');
        rg.addColorStop(0.45, dark ? 'hsla(255,90%,78%,' + (B.flash * 0.22) + ')' : 'hsla(255,85%,62%,' + (B.flash * 0.12) + ')');
        rg.addColorStop(1, 'hsla(255,90%,70%,0)');
        ctx.beginPath();
        ctx.arc(B.x, B.y, 36 + age * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();
      }

      if (B.ringR > 4 && B.ringAlpha > 0.02) {
        ctx.beginPath();
        ctx.arc(B.x, B.y, B.ringR, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(' + (248 + (b * 7) % 20) + ',85%,72%,' + (B.ringAlpha * (1 - tNorm * 0.6)) + ')';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (B.ringR > 12) {
          ctx.beginPath();
          ctx.arc(B.x, B.y, B.ringR * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = 'hsla(265,90%,82%,' + (B.ringAlpha * 0.35 * (1 - tNorm)) + ')';
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      var si;
      for (si = 0; si < B.sparks.length; si++) {
        var s = B.sparks[si];
        if (s.life < 0.04) continue;
        var tight = s.tight ? 1 : 0;
        var damp = tight ? 0.94 : 0.965;
        var grav = tight ? 0.018 : 0.032;
        var lifeMul = tight ? 0.91 : 0.94;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= damp;
        s.vy *= damp;
        s.vy += grav;
        s.life *= lifeMul;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + s.hue + ',88%,' + (dark ? '82' : '58') + '%,' + (s.life * (dark ? 0.52 : 0.28)) + ')';
        ctx.fill();
      }
    }
    ctx.restore();
  }

  /** Motion streak behind focal point (tail opposite velocity). Stronger on touch-first; capped while finger is down so swipes stay on-screen. */
  function drawShootingStar(mx, my, dark, nowMs, fingerDown) {
    fingerDown = !!fingerDown;
    var sp0 = Math.sqrt(velX * velX + velY * velY);
    var linger = nowMs < trailBoostUntil;
    var minLingerSp = useMouseFollow ? 0.18 : (fingerDown ? 0 : 0.42);
    var sp = linger ? Math.max(sp0, minLingerSp) : sp0;
    if (fingerDown) {
      sp = Math.min(sp, useMouseFollow ? 2.05 : 1.42);
    } else if (!useMouseFollow) {
      sp = Math.min(sp, 3.5);
    }
    var thresh = useMouseFollow ? 0.14 : (fingerDown ? 0.034 : 0.012);
    if (sp < thresh) return;

    var maxSp = useMouseFollow ? 2.8 : 6.2;
    if (fingerDown) maxSp = useMouseFollow ? 1.95 : 1.48;
    var u = Math.min(1, sp / maxSp);
    var baseLen = useMouseFollow ? 115 : 380;
    var tailExtra = useMouseFollow ? 52 : 220;
    if (fingerDown) {
      baseLen = useMouseFollow ? 70 : 86;
      tailExtra = useMouseFollow ? 28 : 36;
    }
    var tailLen = baseLen * u + tailExtra * u;
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
    var snx = Math.cos(baseAng);
    var sny = Math.sin(baseAng);
    var tx = mx - snx * tailLen;
    var ty = my - sny * tailLen;
    if (W > 1 && H > 1) {
      tx = Math.max(-24, Math.min(W + 24, tx));
      ty = Math.max(-24, Math.min(H + 24, ty));
    }

    var lg = ctx.createLinearGradient(tx, ty, mx, my);
    lg.addColorStop(0, 'hsla(258,100%,72%,' + a0 + ')');
    lg.addColorStop(0.45, 'hsla(255,92%,78%,' + (aMid * 0.85) + ')');
    lg.addColorStop(0.82, 'hsla(252,96%,90%,' + aHead + ')');
    lg.addColorStop(1, 'hsla(260,100%,100%,' + (aHead * 0.95) + ')');

    ctx.strokeStyle = lg;
    var lw0 = useMouseFollow ? 5 : 8;
    var lw1 = useMouseFollow ? 9 : 20;
    if (fingerDown) {
      lw0 = useMouseFollow ? 4 : 5;
      lw1 = useMouseFollow ? 5 : 8;
    }
    ctx.lineWidth = lw0 + lw1 * u;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(mx, my);
    ctx.stroke();

    ctx.strokeStyle = dark ? 'hsla(260,100%,100%,0.22)' : 'hsla(260,100%,98%,0.14)';
    ctx.lineWidth = 1.5 + 2.8 * u;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.restore();
  }

  /** Smoothed orbit / finger path: segment strokes fade from bright head to thin transparent tail; extra glitter. */
  function drawOrbitSnakeTrail(nowMs, dark) {
    if (orbitTrail.length < 2) return;
    var maxAge = ORBIT_TRAIL_MAX_AGE;
    var vp = [];
    for (var j = 0; j < orbitTrail.length; j++) {
      var q = orbitTrail[j];
      if (nowMs - q.t <= maxAge) vp.push(q);
    }
    if (vp.length < 2) return;

    var n = vp.length;
    var headAge = nowMs - vp[n - 1].t;
    var uHead = Math.max(0.12, 1 - headAge / maxAge);
    var baseA0 = (dark ? 0.36 : 0.17) * uHead;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = dark ? 'lighter' : 'screen';

    var segStride = lightDevice ? 2 : 1;
    var gi;
    for (gi = 1; gi < n; gi += segStride) {
      var a0 = vp[gi - 1];
      var a1 = vp[gi];
      var tAge = nowMs - a1.t;
      var w = Math.max(0, Math.min(1, 1 - tAge / maxAge));
      if (w < 0.028) continue;
      var wPow = Math.pow(w, 1.32);
      var wAlpha = Math.pow(w, 1.08);

      ctx.shadowBlur = dark ? (3 + 11 * wPow) : (2 + 9 * wPow);
      ctx.shadowColor = dark ? 'hsla(268,100%,80%,' + (0.2 * wAlpha) + ')' : 'hsla(268,88%,64%,' + (0.14 * wAlpha) + ')';
      ctx.beginPath();
      ctx.moveTo(a0.x, a0.y);
      ctx.lineTo(a1.x, a1.y);
      var lw = 0.15 + (2.5 + 4.6 * uHead) * wPow;
      var ao = Math.min(dark ? 0.52 : 0.3, baseA0 * wAlpha);
      ctx.strokeStyle = dark ? 'hsla(256,76%,84%,' + ao + ')' : 'hsla(256,70%,58%,' + ao + ')';
      ctx.lineWidth = lw;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    for (gi = 1; gi < n; gi += segStride) {
      a0 = vp[gi - 1];
      a1 = vp[gi];
      tAge = nowMs - a1.t;
      w = Math.max(0, Math.min(1, 1 - tAge / maxAge));
      if (w < 0.028) continue;
      wPow = Math.pow(w, 1.32);
      wAlpha = Math.pow(w, 1.08);
      ctx.beginPath();
      ctx.moveTo(a0.x, a0.y);
      ctx.lineTo(a1.x, a1.y);
      var lwIn = 0.1 + (0.75 + 1.65 * uHead) * wPow;
      var ai = Math.min(dark ? 0.38 : 0.24, baseA0 * 0.5 * wAlpha);
      ctx.strokeStyle = dark ? 'hsla(260,100%,99%,' + ai + ')' : 'hsla(260,100%,97%,' + ai + ')';
      ctx.lineWidth = lwIn;
      ctx.stroke();
    }

    var glitterStride = lightDevice ? 1 : 1;
    var maxGlitter = lightDevice ? 200 : 340;
    var gDraw = 0;
    for (gi = 1; gi < n && gDraw < maxGlitter; gi += glitterStride) {
      a0 = vp[gi - 1];
      a1 = vp[gi];
      tAge = nowMs - a1.t;
      w = Math.max(0, Math.min(1, 1 - tAge / maxAge));
      if (w < 0.04) continue;
      wAlpha = Math.pow(w, 0.9);
      var dx = a1.x - a0.x;
      var dy = a1.y - a0.y;
      var dlen = Math.sqrt(dx * dx + dy * dy) || 1;
      var px = -dy / dlen;
      var py = dx / dlen;
      var hue = 242 + ((gi * 19 + (nowMs >> 2)) % 42);
      var flick = 0.42 + 0.58 * Math.sin(nowMs * 0.007 + gi * 1.83);
      var specks = lightDevice ? 2 : 3;
      var sk;
      for (sk = 0; sk < specks && gDraw < maxGlitter; sk++) {
        var along = (sk + 0.25 + (sk * 0.31)) / (specks + 0.2);
        var mx = a0.x + dx * along;
        var my = a0.y + dy * along;
        mx += px * ((gi * 0.37 + sk * 1.1) % 2.6 - 1.3);
        my += py * ((gi * 0.51 + sk * 0.9) % 2.4 - 1.2);
        var ga = (dark ? 0.48 : 0.26) * wAlpha * wAlpha * flick;
        var rr = 0.5 + ((gi + sk * 3 + (nowMs >> 3)) % 7) * 0.19;
        ctx.beginPath();
        ctx.arc(mx, my, rr, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + hue + ',90%,' + (dark ? '90' : '74') + '%,' + ga + ')';
        ctx.fill();
        gDraw++;
        if (sk === 0 && w > 0.35 && gDraw < maxGlitter) {
          ctx.beginPath();
          ctx.arc(mx + px * 0.35, my + py * 0.35, rr * 0.42, 0, Math.PI * 2);
          ctx.fillStyle = 'hsla(260,100%,' + (dark ? '99' : '98') + '%,' + (ga * 0.88) + ')';
          ctx.fill();
          gDraw++;
        }
      }
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
    var touchHeldOrRecover = activeTouchCount > 0 || nowMs < pointerTouchRecoverUntil;
    if (idleMs > 28 && !touchHeldOrRecover) {
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

    if (activeTouchCount > 0) {
      target.x = lastClientX;
      target.y = lastClientY;
    } else if (!useMouseFollow) {
      var tSec = nowMs / 1000;
      var sp = Math.sqrt(velX * velX + velY * velY);
      var moving = !pointerStale || sp > 0.07 || idleMs < 520;
      var anchorStale = lastPointerTime === 0 || nowMs - lastPointerTime > 9000;
      var orbitCx = anchorStale ? W * 0.5 : lastClientX;
      var orbitCy = anchorStale ? H * 0.5 : lastClientY;
      var idleX = orbitCx + Math.cos(tSec * 0.36) * W * 0.058;
      var idleY = orbitCy + Math.sin(tSec * 0.29) * H * 0.046;
      var gyroPx = W * 0.5 + gyroX * W * 0.2;
      var gyroPy = H * 0.5 + gyroY * H * 0.16;
      if (nowMs - lastPointerTime < TOUCH_TARGET_MS) {
        var deepIdle = pointerStale && idleMs > 380 && sp < 0.065;
        if (moving || !deepIdle) {
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
      ? (activeTouchCount > 0 ? 1 : (moveSpeed > 0.35 ? 0.11 : 0.065))
      : (activeTouchCount > 0 ? 1 : (moveSpeed > 0.25 ? 0.16 : 0.075));
    mouse.x += (target.x - mouse.x) * followK;
    mouse.y += (target.y - mouse.y) * followK;
    if (activeTouchCount > 0) {
      mouse.x = lastClientX;
      mouse.y = lastClientY;
    }

    if (useMouseFollow || activeTouchCount > 0) {
      while (orbitTrail.length > 0 && nowMs - orbitTrail[0].t > ORBIT_TRAIL_MAX_AGE) {
        orbitTrail.shift();
      }
      var ox = W > 1 ? Math.max(0, Math.min(W, mouse.x)) : mouse.x;
      var oy = H > 1 ? Math.max(0, Math.min(H, mouse.y)) : mouse.y;
      var minDistSq = activeTouchCount > 0 ? 0.22 * 0.22 : ORBIT_TRAIL_MIN_DIST_SQ;
      var lt = orbitTrail.length ? orbitTrail[orbitTrail.length - 1] : null;
      if (!lt || (ox - lt.x) * (ox - lt.x) + (oy - lt.y) * (oy - lt.y) >= minDistSq) {
        orbitTrail.push({ x: ox, y: oy, t: nowMs });
        while (orbitTrail.length > ORBIT_TRAIL_MAX_PTS) orbitTrail.shift();
      }
    }

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

    drawOrbitSnakeTrail(nowMs, dark);

    var mx = activeTouchCount > 0 ? Math.max(0, Math.min(W, lastClientX)) : mouse.x;
    var my = activeTouchCount > 0 ? Math.max(0, Math.min(H, lastClientY)) : mouse.y;
    var starX = activeTouchCount > 0 ? lastClientX : (!useMouseFollow ? mx * 0.5 + lastClientX * 0.5 : mx);
    var starY = activeTouchCount > 0 ? lastClientY : (!useMouseFollow ? my * 0.5 + lastClientY * 0.5 : my);

    drawShootingStar(starX, starY, dark, nowMs, activeTouchCount > 0);

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

    drawTouchFireworks(nowMs, dark);
  }

  draw();
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(startParticleField, { timeout: hasTouchScreen || !useMouseFollow ? 400 : 2000 });
  } else {
    window.setTimeout(startParticleField, hasTouchScreen || !useMouseFollow ? 0 : 16);
  }
})();
