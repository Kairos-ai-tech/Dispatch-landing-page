(() => {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counts = {
    sent: document.getElementById("n-sent"),
    opened: document.getElementById("n-opened"),
    replied: document.getElementById("n-replied"),
  };
  const tally = { sent: 0, opened: 0, replied: 0 };
  const CREAM = [244, 240, 232];
  const AMBER = [232, 176, 96];

  let w = 0;
  let h = 0;
  let dpr = 1;
  let hubX = 0;
  let hubY = 0;
  let scale = 1;

  const rnd = (a, b) => a + Math.random() * (b - a);
  const N = 70;
  const nodes = Array.from({ length: N }, (_, i) => {
    const r = rnd(160, 560);
    const th = rnd(0, Math.PI * 2);
    const ph = Math.acos(rnd(-0.55, 0.55));
    return {
      x: r * Math.sin(ph) * Math.cos(th),
      y: r * Math.cos(ph) * 0.8,
      z: r * Math.sin(ph) * Math.sin(th),
      bend: rnd(-0.22, 0.22),
      lit: 0,
      reply: 0,
      seed: i,
      sx: 0,
      sy: 0,
      depth: 1,
    };
  });
  const peers = nodes.map((a, i) => {
    return nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .map((o) => o.j);
  });

  function sprite(rgb, size) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${rgb},1)`);
    grad.addColorStop(0.18, `rgba(${rgb},0.55)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }
  const glowCream = sprite(CREAM, 64);
  const glowAmber = sprite(AMBER, 64);

  function resize() {
    const box = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = box.width;
    h = box.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const wide = w > 860;
    hubX = wide ? w * 0.7 : w * 0.5;
    hubY = wide ? h * 0.5 : h * 0.8;
    scale = Math.min(w, h * 1.5) / 1100;
    if (!wide) scale *= 1.05;
  }

  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  addEventListener("pointermove", (e) => {
    tx = e.clientX / innerWidth - 0.5;
    ty = e.clientY / innerHeight - 0.5;
  });

  function project(n, rot) {
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    const x = n.x * c - n.z * s;
    const z = n.x * s + n.z * c;
    const f = 900 / (900 + z);
    n.depth = f;
    n.sx = hubX + (x * f + mx * 40 * f) * scale;
    n.sy = hubY + (n.y * f + my * 26 * f) * scale;
    n.zr = z;
  }

  const pulses = [];
  let nextSend = 0.6;
  function launch(node, back) {
    pulses.push({ node, t: 0, back, speed: back ? rnd(0.5, 0.7) : rnd(0.38, 0.55) });
  }

  function curve(a, b, bend, t) {
    const mxp = (a.x + b.x) / 2;
    const myp = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const cx = mxp - dy * bend;
    const cy = myp + dx * bend;
    const u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
      y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
    };
  }

  const hub = { x: 0, y: 0, ring: 0, glow: 0 };

  function bump(key) {
    tally[key]++;
    if (counts[key]) counts[key].textContent = tally[key];
  }

  function draw(now, dt) {
    ctx.clearRect(0, 0, w, h);
    const rot = now * 0.045;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    hub.sx = hubX + mx * 18 * scale * 2;
    hub.sy = hubY + my * 12 * scale * 2;
    nodes.forEach((n) => project(n, rot));

    nextSend -= dt;
    if (nextSend <= 0) {
      nextSend = rnd(0.9, 1.5);
      const pool = nodes.filter((n) => n.lit < 0.05 && n.reply < 0.05 && n.zr > -250);
      const n = pool[(Math.random() * pool.length) | 0];
      if (n) {
        launch(n, false);
        bump("sent");
      }
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1;
    peers.forEach((list, i) => {
      const a = nodes[i];
      list.forEach((j) => {
        const b = nodes[j];
        const al = 0.05 * Math.min(a.depth, b.depth) ** 2;
        ctx.strokeStyle = `rgba(${CREAM},${al})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      });
    });

    nodes.forEach((n) => {
      const al = 0.045 + 0.11 * n.depth ** 2 + n.lit * 0.35;
      ctx.strokeStyle = `rgba(${CREAM},${al})`;
      ctx.beginPath();
      const steps = 14;
      for (let k = 0; k <= steps; k++) {
        const p = curve({ x: hub.sx, y: hub.sy }, { x: n.sx, y: n.sy }, n.bend, k / steps);
        if (k) ctx.lineTo(p.x, p.y);
        else ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
    });

    nodes.forEach((n) => {
      const r = (1.4 + 1.8 * n.depth) * Math.max(scale, 0.7);
      ctx.fillStyle = `rgba(${CREAM},${0.28 + 0.45 * n.depth ** 2})`;
      ctx.beginPath();
      ctx.arc(n.sx, n.sy, r, 0, 6.2832);
      ctx.fill();
      if (n.lit > 0.02) {
        ctx.strokeStyle = `rgba(${CREAM},${n.lit * 0.55})`;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r + (1 - n.lit) * 22, 0, 6.2832);
        ctx.stroke();
      }
      if (n.reply > 0.02) {
        ctx.strokeStyle = `rgba(${AMBER},${Math.min(1, n.reply) * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r + 4, 0, 6.2832);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      n.lit *= Math.exp(-dt * 1.1);
      n.reply *= Math.exp(-dt * 0.18);
      if (n.opening) {
        n.opening -= dt;
        if (n.opening <= 0) {
          n.opening = 0;
          n.lit = 1;
          bump("opened");
          if (Math.random() < 0.55) setTimeout(() => launch(n, true), rnd(500, 1400));
        }
      }
    });

    ctx.globalCompositeOperation = "lighter";
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += dt * p.speed;
      const n = p.node;
      const tt = Math.min(p.t, 1);
      const pos = (t) => {
        const q = p.back ? 1 - t : t;
        return curve({ x: hub.sx, y: hub.sy }, { x: n.sx, y: n.sy }, n.bend, q);
      };
      const eased = 1 - (1 - tt) ** 3;
      const sprt = p.back ? glowAmber : glowCream;
      for (let k = 7; k >= 1; k--) {
        const t2 = Math.max(0, eased - k * 0.018);
        const q = pos(t2);
        const s = (22 - k * 2.2) * Math.max(scale, 0.75);
        ctx.globalAlpha = (1 - k / 8) * 0.5;
        ctx.drawImage(sprt, q.x - s / 2, q.y - s / 2, s, s);
      }
      const head = pos(eased);
      const hs = 38 * Math.max(scale, 0.75);
      ctx.globalAlpha = 0.95;
      ctx.drawImage(sprt, head.x - hs / 2, head.y - hs / 2, hs, hs);
      if (p.t >= 1) {
        pulses.splice(i, 1);
        if (p.back) {
          hub.glow = 1;
          n.reply = 1.6;
          bump("replied");
        } else {
          n.opening = rnd(0.6, 2.4);
          if (Math.random() < 0.4) n.opening = 0.01;
          n.lit = 0.6;
        }
      }
    }

    const g = hub.glow;
    hub.glow *= Math.exp(-dt * 1.6);
    ctx.globalAlpha = 0.55 + g * 0.45;
    const big = (150 + g * 70) * Math.max(scale, 0.8);
    ctx.drawImage(glowCream, hub.sx - big / 2, hub.sy - big / 2, big, big);
    if (g > 0.02) {
      ctx.globalAlpha = g * 0.7;
      const ab = (240 + g * 40) * Math.max(scale, 0.8);
      ctx.drawImage(glowAmber, hub.sx - ab / 2, hub.sy - ab / 2, ab, ab);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${CREAM})`;
    ctx.beginPath();
    ctx.arc(hub.sx, hub.sy, 6 * Math.max(scale, 0.8), 0, 6.2832);
    ctx.fill();
    ctx.strokeStyle = `rgba(${CREAM},0.35)`;
    ctx.beginPath();
    ctx.arc(hub.sx, hub.sy, 15 * Math.max(scale, 0.8), 0, 6.2832);
    ctx.stroke();
  }

  resize();
  addEventListener("resize", resize);

  if (reduced) {
    for (let i = 0; i < 12; i++) {
      nodes[i * 5].lit = 0.8;
      if (i % 4 === 0) nodes[i * 5].reply = 1;
    }
    draw(7, 0.016);
    return;
  }

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
  let last = performance.now();
  let clock = 5;
  function frame(t) {
    requestAnimationFrame(frame);
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    if (!visible || document.hidden) return;
    clock += dt;
    draw(clock, dt);
  }
  requestAnimationFrame(frame);
})();
