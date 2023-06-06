/* eslint-disable no-undef */
const generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', async () => {
  const paragraphsInput = document.getElementById('paragraphs');
  const numParagraphs = parseInt(paragraphsInput.value);

  if (!isValidNumParagraphs(numParagraphs)) {
    alert('Number of paragraphs must be between 1 and 10.');
    return;
  }

  try {
    const response = await fetch(`/lorem?numParagraphs=${numParagraphs}`);
    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();

    const outputDiv = document.getElementById('result');
    outputDiv.innerHTML = '';

    data.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      outputDiv.appendChild(p);
    });
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
});

function isValidNumParagraphs(numParagraphs) {
  return !isNaN(numParagraphs) && numParagraphs >= 1 && numParagraphs <= 10;
}
