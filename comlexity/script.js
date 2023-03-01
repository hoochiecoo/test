function calculateCyclomaticComplexity() {
  const code = document.getElementById("code").value;
  const regex = /(if|while|for|switch)[\s\S]*?\)/g;
  const matches = code.match(regex);
  const count = matches ? matches.length : 1; // set default count to 1

  const result = document.getElementById("result");
  result.textContent = `The cyclomatic complexity of the code is ${count + 1}.`;
}
