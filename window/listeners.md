https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
```
addEventListener("keydown", (event) => {});

onkeydown = (event) => {};
```


```
// can be used as a typeahead
currentInput = document.getElementById('prompt-textarea');
console.log(currentInput);

window.addEventListener('keydown', event => {
  // Auto-focus the current input when a key is typed
  if (!(event.ctrlKey || event.metaKey || event.altKey)) {
    currentInput.focus();
  }
  // When the client hits ENTER on their keyboard
  const inputValue = currentInput.value; // Get the value of the input
    if (event.key === "Enter") {
    console.log("Enter key pressed! Input value:", inputValue);
  }
  console.log("key pressed", inputValue);
});
```