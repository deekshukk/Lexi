import { summarizeText } from './summarize.js';
import { detectLanguage, translateText } from './translation.js';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('uploadBtn').addEventListener('click', function () {
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (file && file.type === 'application/pdf') {
      const fileReader = new FileReader();

      fileReader.onload = function () {
        const typedarray = new Uint8Array(this.result);

        pdfjsLib.getDocument(typedarray).promise.then(async function (pdf) {
          console.log('PDF loaded');
          const numPages = pdf.numPages;
          let fullText = '';

          // Extract text from the PDF
          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            try {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(' ');
              fullText += pageText + '\n\n';
            } catch (pageError) {
              console.error(`Error processing page ${pageNum}:`, pageError);
            }
          }

          // Display progress to the user
          document.getElementById('textOutput').textContent = 'Detecting language...';

          try {
            // Detect the language of the extracted text
            const detectedLanguage = await detectLanguage(fullText);

            // If the text is not in English, translate it
            if (detectedLanguage !== 'en') {
              document.getElementById('textOutput').textContent = 'Translating to English...';
              fullText = await translateText(fullText, 'en');
            }

            // Summarize the translated text
            document.getElementById('textOutput').textContent = 'Summarizing...';
            const summary = await summarizeText(fullText);
            document.getElementById('textOutput').textContent = summary;
          } catch (error) {
            console.error('Error during processing:', error);
            document.getElementById('textOutput').textContent = 'Error during processing. Please try again.';
          }
        }).catch((pdfError) => {
          console.error('Error loading PDF:', pdfError);
          document.getElementById('textOutput').textContent = 'Error loading PDF. Please check the file and try again.';
        });
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      alert('Upload a PDF cutie');
    }
  });
})