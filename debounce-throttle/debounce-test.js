const debouncedLogInput = debounce((input) => {
  console.log("Debounced Input:", input);
}, 300);

document.getElementById("prompt-textarea").addEventListener("input", (event) => {
  debouncedLogInput(event.target.value);
});

