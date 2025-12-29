const pumpModeButtons = document.querySelectorAll('[data-pump-mode]');
const pumpModeViews = document.querySelectorAll('[data-pump-view]');

function setPumpMode(mode) {
  pumpModeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pumpMode === mode);
  });
  pumpModeViews.forEach(view => {
    view.classList.toggle('hidden', view.dataset.pumpView !== mode);
  });
}

pumpModeButtons.forEach(btn => {
  btn.addEventListener('click', () => setPumpMode(btn.dataset.pumpMode));
});

if (pumpModeButtons.length) {
  setPumpMode(pumpModeButtons[0].dataset.pumpMode);
}
