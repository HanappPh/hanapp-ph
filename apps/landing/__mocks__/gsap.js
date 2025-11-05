// Minimal mock for gsap used in tests
exports.gsap = {
  timeline: () => ({
    to: () => null,
    kill: () => null,
  }),
  set: () => null,
};
