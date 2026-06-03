export const SITE_AUDIO_SRC = '/audio/chiled-lofi.mp3'
export const NAV_RIPPLE_SRC = '/audio/ripple.mp3'
export const AUDIO_STORAGE_KEY = 'qdigital99-audio-muted'

export function readMutedPreference() {
  try {
    return sessionStorage.getItem(AUDIO_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeMutedPreference(muted) {
  try {
    sessionStorage.setItem(AUDIO_STORAGE_KEY, muted ? '1' : '0')
  } catch {
    /* ignore */
  }
}
