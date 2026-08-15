const KEY = "pqtv-learner-v1";

export function loadLearner() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}

export function saveLearner(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function logSpeak(item) {
  const cur = loadLearner() || {};
  const log = cur.speaks || [];
  log.unshift({ ...item, at: new Date().toISOString() });
  saveLearner({ ...cur, speaks: log.slice(0, 50) });
}
