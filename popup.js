document.getElementById("processBtn").addEventListener("click", () => {
    const inputText = document.getElementById("textInput").value;
    const outputDiv = document.getElementById("output");
  
    if (inputText) {
      outputDiv.textContent = `You entered: ${inputText}`;
    } else {
      outputDiv.textContent = "Please enter some text.";
    }
  });
  