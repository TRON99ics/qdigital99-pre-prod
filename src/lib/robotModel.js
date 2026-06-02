export const ROBOT_MODEL_URL = '/models/moon_man_yo_oc_humanoid.glb'

let preloadPromise = null

/** Shared GLB preload for hero + scroll walker + entering screen. */
export function preloadRobotModel() {
  if (!preloadPromise) {
    preloadPromise = fetch(ROBOT_MODEL_URL)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error('model fetch failed'))))
      .catch((err) => {
        console.warn('[preloadRobotModel]', err)
        preloadPromise = null
        return null
      })
  }
  return preloadPromise
}
