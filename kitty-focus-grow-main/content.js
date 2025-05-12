
// Este arquivo é injetado como content script
// Carrega o bundle de React compilado
const script = document.createElement('script');
script.src = chrome.runtime.getURL('index.js');
(document.head || document.documentElement).appendChild(script);
script.onload = function() {
  script.remove();
};
