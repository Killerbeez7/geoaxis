"""Generate the GeoAxis geo-line patterns in public/patterns/.

The SVGs are used as CSS masks (see the PATTERNS block in src/app/globals.css), so only their
shape and alpha matter: lines are black, fades use stroke-opacity.

Made for one place:
  cta.svg      final call to action: contour lines around a calm valley where the text sits
  footer.svg   footer: layered ridge lines rising from the bottom edge
  hero.svg     inner-page hero: a hill on the right, calm on the left where the title is
  summit.svg   service placeholder tile: loops around a summit where the icon sits
  globe.svg    About card: the graticule of a large globe from the bottom-right corner
Universal, seamless tiles:
  topo.svg     contour lines
  grid.svg     survey grid with crosses
  network.svg  triangulation network

Usage: python3 scripts/generate-patterns.py   (needs numpy)
"""

import math
import os
import random

import numpy as np

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "patterns")


# ---------- Contour lines ----------

def gauss(X, Y, cx, cy, sx, sy, rot=0.0):
    xr = (X - cx) * math.cos(rot) + (Y - cy) * math.sin(rot)
    yr = -(X - cx) * math.sin(rot) + (Y - cy) * math.cos(rot)
    return np.exp(-(xr**2 / (2 * sx**2) + yr**2 / (2 * sy**2)))


def marching_squares(xs, ys, Z, level):
    segments = []
    above = Z > level
    for j in range(len(ys) - 1):
        for i in range(len(xs) - 1):
            idx = above[j, i] + 2 * above[j, i + 1] + 4 * above[j + 1, i + 1] + 8 * above[j + 1, i]
            if idx in (0, 15):
                continue
            corners = [(xs[i], ys[j]), (xs[i + 1], ys[j]), (xs[i + 1], ys[j + 1]), (xs[i], ys[j + 1])]
            vals = [Z[j, i], Z[j, i + 1], Z[j + 1, i + 1], Z[j + 1, i]]
            cut = []
            for k in range(4):
                a, b = k, (k + 1) % 4
                if (vals[a] > level) != (vals[b] > level):
                    t = (level - vals[a]) / (vals[b] - vals[a])
                    cut.append((corners[a][0] + t * (corners[b][0] - corners[a][0]),
                                corners[a][1] + t * (corners[b][1] - corners[a][1])))
            segments += [(cut[0], cut[1])] + ([(cut[2], cut[3])] if len(cut) == 4 else [])
    return segments


def join(segments, min_points):
    def key(p):
        return (round(p[0], 3), round(p[1], 3))

    adjacency = {}
    for a, b in segments:
        adjacency.setdefault(key(a), []).append(b)
        adjacency.setdefault(key(b), []).append(a)
    used, lines = set(), []
    for a, b in segments:
        edge = (key(a), key(b))
        if edge in used or edge[::-1] in used:
            continue
        used.add(edge)
        line = [a, b]
        for forward in (True, False):
            while True:
                end = line[-1] if forward else line[0]
                nxt = None
                for cand in adjacency.get(key(end), []):
                    e = (key(end), key(cand))
                    if e not in used and e[::-1] not in used:
                        used.add(e)
                        nxt = cand
                        break
                if nxt is None:
                    break
                line.append(nxt) if forward else line.insert(0, nxt)
        if len(line) >= min_points:
            lines.append(line)
    return lines


def simplify(points, tolerance):
    """Douglas–Peucker; keeps both ends."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    if math.hypot(dx, dy) < 1e-6:
        # A closed loop has no chord to measure against: split it at its farthest point first
        far = max(range(len(points)), key=lambda i: (points[i][0] - x1) ** 2 + (points[i][1] - y1) ** 2)
        return simplify(points[: far + 1], tolerance)[:-1] + simplify(points[far:], tolerance)
    norm = math.hypot(dx, dy)
    worst, idx = 0.0, 0
    for i in range(1, len(points) - 1):
        d = abs(dy * points[i][0] - dx * points[i][1] + x2 * y1 - y2 * x1) / norm
        if d > worst:
            worst, idx = d, i
    if worst > tolerance:
        return simplify(points[: idx + 1], tolerance)[:-1] + simplify(points[idx:], tolerance)
    return [points[0], points[-1]]


def smooth_path(points):
    """Quadratic curves through the midpoints: soft, hand-drawn lines."""
    d = f"M{points[0][0]:.1f} {points[0][1]:.1f}"
    for i in range(1, len(points) - 1):
        mx, my = (points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2
        d += f"Q{points[i][0]:.1f} {points[i][1]:.1f} {mx:.1f} {my:.1f}"
    return d + f"L{points[-1][0]:.1f} {points[-1][1]:.1f}"


def contours(W, H, field, levels, step=8, index_every=5, widths=(0.9, 1.6), tolerance=1.4, min_points=6):
    xs = np.linspace(0, W, int(W / step) + 1)
    ys = np.linspace(0, H, int(H / step) + 1)
    X, Y = np.meshgrid(xs, ys)
    Z = field(X, Y)
    paths = []
    for n, level in enumerate(levels):
        width = widths[1] if index_every and n % index_every == 0 else widths[0]
        for line in join(marching_squares(xs, ys, Z, level), min_points):
            lx, ly = [p[0] for p in line], [p[1] for p in line]
            if math.hypot(max(lx) - min(lx), max(ly) - min(ly)) < 14:
                continue
            pts = simplify(line, tolerance)
            if len(pts) >= 2:
                paths.append(f'<path d="{smooth_path(pts)}" stroke-width="{width}"/>')
    return paths


def svg(W, H, body, aspect="xMidYMid slice"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="{aspect}">'
            f'<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">{"".join(body)}</g></svg>')


# ---------- Made for one place ----------

def cta():
    W, H = 1600, 640

    def field(X, Y):
        z = np.zeros_like(X)
        # Hills all around the edge, a calm valley in the middle for the text
        for cx, cy, sx, sy, a, r in [
            (-60, 360, 340, 300, 1.0, 0.35), (260, -40, 260, 160, 0.7, -0.3), (380, 700, 300, 170, 0.6, 0.15),
            (1000, -170, 380, 160, 0.8, 0.12), (640, 820, 420, 170, 0.75, -0.1),
            (1680, 220, 300, 300, 1.05, -0.25), (1380, 700, 260, 160, 0.6, 0.35),
        ]:
            z += a * gauss(X, Y, cx, cy, sx, sy, r)
        # Long, slow ripples keep the lines organic instead of running parallel to the edges
        return z + 0.05 * np.sin(X / 170 + Y / 230) + 0.03 * np.cos(X / 90 - Y / 140)

    return svg(W, H, contours(W, H, field, np.linspace(0.24, 1.1, 19)))


def footer():
    W, H, N = 1600, 380, 13
    xs = np.arange(0, W + 1, 8.0)
    terrain = (0.9 * np.exp(-(((xs - 420) / 270) ** 2)) + 0.65 * np.exp(-(((xs - 1190) / 310) ** 2))
               + 0.18 * np.sin(xs / 140 + 1.0) + 0.1 * np.sin(xs / 61))
    terrain = (terrain - terrain.min()) / (terrain.max() - terrain.min())
    paths = []
    for k in range(N):
        relief = 96 - 7 * k  # the lowest line carries the most relief; never crosses the next
        ys = H - 18 - 22 * k - relief * terrain
        pts = simplify(list(zip(xs.tolist(), ys.tolist())), 0.8)
        opacity = 1 - 0.85 * k / (N - 1)
        width = 1.6 if k % 4 == 0 else 1.0
        paths.append(f'<path d="{smooth_path(pts)}" stroke-width="{width}" stroke-opacity="{opacity:.2f}"/>')
    return svg(W, H, paths, "xMidYMax slice")


def hero():
    # Drawn for a wide, short band: whole loops on the right, calm on the left where the title is
    W, H = 1600, 440

    def field(X, Y):
        return (1.0 * gauss(X, Y, 1250, 225, 140, 100, 0.3) + 0.8 * gauss(X, Y, 1505, 85, 110, 85, -0.2)
                + 0.6 * gauss(X, Y, 1490, 385, 120, 80, -0.4) + 0.45 * gauss(X, Y, 1040, 410, 120, 80)
                + 0.02 * np.sin(X / 110 + Y / 140))

    return svg(W, H, contours(W, H, field, np.linspace(0.1, 0.97, 22), step=4), "xMaxYMid slice")


def summit():
    W = H = 480

    def field(X, Y):
        return (1.0 * gauss(X, Y, 240, 245, 140, 118, 0.45) + 0.4 * gauss(X, Y, 390, 110, 100, 85)
                + 0.3 * gauss(X, Y, 80, 420, 120, 90) + 0.02 * np.sin(X / 45) * np.cos(Y / 55))

    # The top levels stay out, so the summit is an empty patch where the icon sits
    return svg(W, H, contours(W, H, field, np.linspace(0.04, 0.9, 24), step=4, tolerance=0.9))


def globe():
    # Wide frame: the outline and the pole stay in view on wide cards; tall cards show the pole
    W, H = 1600, 600
    cx, cy, r = 1430.0, 780.0, 700.0
    paths = [f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke-width="2"/>']
    for lon in range(15, 90, 15):
        rx = r * math.sin(math.radians(lon))
        w = 1.4 if lon % 45 == 0 else 0.9
        paths.append(f'<path d="M{cx} {cy - r}A{rx:.1f} {r} 0 0 0 {cx} {cy + r}A{rx:.1f} {r} 0 0 0 {cx} {cy - r}" stroke-width="{w}"/>')
    paths.append(f'<path d="M{cx} {cy - r}V{cy + r}" stroke-width="1.4"/>')
    for lat in range(15, 90, 15):
        y = cy - r * math.sin(math.radians(lat))
        h = math.sqrt(r * r - (y - cy) ** 2)
        w = 1.4 if lat % 45 == 0 else 0.9
        paths.append(f'<path d="M{cx - h:.1f} {y:.1f}H{cx + h:.1f}" stroke-width="{w}"/>')
    return svg(W, H, paths, "xMaxYMax slice")


# ---------- Universal tiles (seamless) ----------

def topo():
    T = 640
    rng = random.Random(4)
    terms = [(1, 0, 0.5), (0, 1, 0.45), (1, 1, 0.35), (1, -1, 0.3), (2, 1, 0.2), (1, 2, 0.18),
             (2, -1, 0.15), (3, 1, 0.08), (0, 3, 0.06)]
    phases = [rng.uniform(0, 2 * math.pi) for _ in terms]

    def field(X, Y):
        z = np.zeros_like(X)
        for (k, l, a), p in zip(terms, phases):
            z += a * np.cos(2 * math.pi * (k * X + l * Y) / T + p)
        return z

    levels = np.linspace(-1.45, 1.45, 20)
    return svg(T, T, contours(T, T, field, levels, step=4, index_every=5, tolerance=0.9, min_points=2), "xMidYMid meet")


def grid():
    T, c, arm = 120, 60, 8
    body = [
        f'<path d="M{c} 0V{T}M0 {c}H{T}" stroke-width="1" stroke-dasharray="1.5 4.5"/>',
        f'<path d="M{c - arm} {c}H{c + arm}M{c} {c - arm}V{c + arm}" stroke-width="1.6"/>',
    ]
    return svg(T, T, body, "xMidYMid meet")


def network():
    T = 480
    rng = random.Random(11)
    pts = []
    for _ in range(20000):  # dart throwing with a minimum (wrapped) distance, so the tile repeats evenly
        if len(pts) == 34:
            break
        p = (rng.uniform(0, T), rng.uniform(0, T))
        if all(min(abs(p[0] - q[0]), T - abs(p[0] - q[0])) ** 2 + min(abs(p[1] - q[1]), T - abs(p[1] - q[1])) ** 2 > 74 ** 2
               for q in pts):
            pts.append(p)
    tiled = [(x + dx * T, y + dy * T) for dx in (-1, 0, 1) for dy in (-1, 0, 1) for x, y in pts]
    edges = delaunay(tiled)
    margin = 4
    body = []
    for a, b in sorted(edges):
        (x1, y1), (x2, y2) = tiled[a], tiled[b]
        if max(x1, x2) < -margin or min(x1, x2) > T + margin or max(y1, y2) < -margin or min(y1, y2) > T + margin:
            continue
        body.append(f'<path d="M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}" stroke-width="0.9"/>')
    for x, y in tiled:
        if -6 < x < T + 6 and -6 < y < T + 6:
            body.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.4" fill="#000" stroke="none"/>')
    return svg(T, T, body, "xMidYMid meet")


def delaunay(points):
    """Bowyer–Watson; returns the edges as index pairs."""
    pts = list(points) + [(-1e5, -1e5), (1e5, -1e5), (0, 1e5)]
    n0 = len(points)
    tris = [(n0, n0 + 1, n0 + 2)]

    def circumcircle(t):
        (ax, ay), (bx, by), (cx, cy) = (pts[i] for i in t)
        d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
        ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
        uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d
        return ux, uy, (ax - ux) ** 2 + (ay - uy) ** 2

    cache = {}
    for i, (px, py) in enumerate(points):
        bad = []
        for t in tris:
            if t not in cache:
                cache[t] = circumcircle(t)
            ux, uy, r2 = cache[t]
            if (px - ux) ** 2 + (py - uy) ** 2 < r2:
                bad.append(t)
        count = {}
        for t in bad:
            for e in ((t[0], t[1]), (t[1], t[2]), (t[2], t[0])):
                k = tuple(sorted(e))
                count[k] = count.get(k, 0) + 1
        bad_set = set(bad)
        tris = [t for t in tris if t not in bad_set] + [(a, b, i) for (a, b), c in count.items() if c == 1]
    return {tuple(sorted(e)) for t in tris if max(t) < n0 for e in ((t[0], t[1]), (t[1], t[2]), (t[2], t[0]))}


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, make in [("cta", cta), ("footer", footer), ("hero", hero), ("summit", summit), ("globe", globe),
                       ("topo", topo), ("grid", grid), ("network", network)]:
        content = make()
        with open(os.path.join(OUT, f"{name}.svg"), "w") as fh:
            fh.write(content)
        print(f"{name}.svg  {len(content) // 1024} KB")
