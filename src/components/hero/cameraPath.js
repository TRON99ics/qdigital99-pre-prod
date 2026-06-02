// Camera storyboard expressed in normalized model space.
// posY/lookY: fraction of model height from feet (0) to head (1).
// posZ: distance in front of the model, as a fraction of model height.
// All values are interpolated and damped at runtime — never the model scale.
export const KEYS = [
  // SHOT 01 — ARRIVAL: near the ground, only feet & lower legs.
  { p: 0.0, posY: 0.03, posZ: 0.5, lookY: 0.1 },
  // SHOT 02 — ASCENSION: rising past knees and upper legs.
  { p: 0.24, posY: 0.34, posZ: 0.72, lookY: 0.46 },
  // SHOT 03 — REVEAL: torso, shoulders, detail.
  { p: 0.47, posY: 0.66, posZ: 0.88, lookY: 0.72 },
  // SHOT 04 — EYE CONTACT: face fills frame, camera pulls closer.
  { p: 0.66, posY: 0.9, posZ: 0.6, lookY: 0.94 },
  // HOLD — brief pause to absorb the reveal (same framing).
  { p: 0.78, posY: 0.9, posZ: 0.58, lookY: 0.94 },
  // SHOT 05 — THE DIVE: camera moves into the face.
  { p: 0.93, posY: 0.93, posZ: 0.28, lookY: 0.96 },
  // Into the portal → black.
  { p: 1.0, posY: 0.95, posZ: 0.12, lookY: 0.98 },
]

const smooth = (t) => t * t * (3 - 2 * t)

/**
 * Sample the storyboard at progress p (0..1) and resolve to world-space
 * position + look target using the model bounds.
 */
export function sampleCamera(p, bounds, out) {
  const { size, center, min } = bounds
  const h = size.y || 1
  let i = 0
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const span = b.p - a.p || 1
  const e = smooth(Math.min(1, Math.max(0, (p - a.p) / span)))

  const posY = a.posY + (b.posY - a.posY) * e
  const posZ = a.posZ + (b.posZ - a.posZ) * e
  const lookY = a.lookY + (b.lookY - a.lookY) * e

  out.pos.set(center.x, min.y + posY * h, center.z + posZ * h)
  out.look.set(center.x, min.y + lookY * h, center.z)
  return out
}
