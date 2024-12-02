import { summarizeText } from 'api/summarize.js';
// import { detectLanguage, translateText } from 'api/translation.js';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('uploadBtn').addEventListener('click', function () {
    console.log('Upload button clicked'); // Log when the button is clicked
    
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (file && file.type === 'application/pdf') {
      console.log('PDF file selected:', file.name); // Log the file name when it's selected
      
      const fileReader = new FileReader();

      fileReader.onload = function () {
        console.log('File reading started...');
        const typedarray = new Uint8Array(this.result);

        pdfjsLib.getDocument(typedarray).promise.then(async function (pdf) {
          console.log('PDF loaded successfully.');
          
          const numPages = pdf.numPages;
          let fullText = '';

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            try {
              console.log(`Processing page ${pageNum}...`);
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(' ');
              fullText += pageText + '\n\n';
              console.log(`Page ${pageNum} processed.`);
            } catch (error) {
              console.error(`Error processing page ${pageNum}:`, error);
            }
          }

          // console.log('PDF text extraction complete.');
          // document.getElementById('textOutput').textContent = 'Detecting language...';

          try {
            // const detectedLanguage = await detectLanguage(fullText);
            // console.log("Detected Language:", detectedLanguage);

            // if (detectedLanguage !== 'en') {
            //   document.getElementById('textOutput').textContent = 'Translating to English...';
            //   fullText = await translateText(fullText, 'en');
            //   console.log('Translation to English complete.');
            // }

            document.getElementById('textOutput').textContent = 'Summarizing...';
            const summary = await summarizeText(fullText);
            document.getElementById('textOutput').textContent = summary;
            console.log('Summarization complete:', summary);
          } catch (error) {
            console.error("Error during processing:", error);
            document.getElementById('textOutput').textContent = 'Error during processing. Please try again.';
          }
        }).catch((error) => {
          console.error('Error loading PDF:', error);
          document.getElementById('textOutput').textContent = 'Error loading PDF. Please check the file and try again.';
        });
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      console.log('No valid PDF file selected.');
      alert('Upload a PDF cutie');
    }
  });
});