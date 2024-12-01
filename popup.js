import { summarizeText } from './summarize.js';
import { detectLanguage, translateText } from './translation.js';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('uploadBtn').addEventListener('click', function () {
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (file && file.type === 'application/pdf') {
      console.log('PDF file selected:', file.name); // Log when a file is selected

      const fileReader = new FileReader();

      fileReader.onload = function () {
        console.log('PDF file loaded successfully.'); // Log when the file is loaded

        const typedarray = new Uint8Array(this.result);

        pdfjsLib.getDocument(typedarray).promise.then(async function (pdf) {
          console.log('PDF document parsed. Number of pages:', pdf.numPages); // Log the number of pages

          const numPages = pdf.numPages;
          let fullText = '';

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            try {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(' ');
              console.log(`Extracted text from page ${pageNum}:`, pageText); // Log extracted text for each page
              fullText += pageText + '\n\n';
            } catch (error) {
              console.error(`Error extracting text from page ${pageNum}:`, error);
            }
          }

          console.log('Full extracted text:', fullText); // Log the full extracted text
          document.getElementById('textOutput').textContent = 'Detecting language...';

          try {
            const detectedLanguage = await detectLanguage(fullText);
            console.log('Detected language:', detectedLanguage); // Log the detected language

            if (detectedLanguage !== 'en') {
              document.getElementById('textOutput').textContent = 'Translating to English...';
              console.log('Translating text to English...'); // Log translation status
              fullText = await translateText(fullText, 'en');
              console.log('Translated text:', fullText); // Log the translated text
            }

            document.getElementById('textOutput').textContent = 'Summarizing...';
            console.log('Starting text summarization...'); // Log when summarization starts
            const summary = await summarizeText(fullText);
            console.log('Summarized text:', summary); // Log the summarized text
            document.getElementById('textOutput').textContent = summary;
          } catch (error) {
            console.error('Error during processing:', error); // Log any processing error
            document.getElementById('textOutput').textContent = 'Error during processing. Please try again.';
          }
        }).catch((error) => {
          console.error('Error loading PDF document:', error); // Log error if PDF loading fails
          document.getElementById('textOutput').textContent = 'Error loading PDF. Please check the file and try again.';
        });
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      alert('Upload a PDF cutie');
      console.log('No valid PDF file uploaded.'); // Log if no valid PDF file is uploaded
    }
  });
});