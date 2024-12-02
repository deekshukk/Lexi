document.addEventListener('DOMContentLoaded', function() {
  // Summarize text function
  async function summarizeText(text) {
    try {
      // Check if the summarizer service is available (assuming you have some summarizer logic here)
      const canSummarize = await ai.summarizer.capabilities();
      let summarizer = '';

      if (canSummarize && canSummarize.available !== 'no') {
        if (canSummarize.available === 'readily') {
          summarizer = await ai.summarizer.create();
        } else {
          summarizer = await ai.summarizer.create();
          summarizer.addEventListener('downloadprogress', (e) => {
            console.log(`Download Progress: ${e.loaded} of ${e.total}`);
          });
          await summarizer.ready;
        }

        // Perform the summarization
        const result = await summarizer.summarize(text);
        summarizer.destroy();
        return result;
      } else {
        throw new Error('Summarizer is not available at the moment.');
      }
    } catch (error) {
      console.error("Error in summarization:", error);
      throw new Error('An error occurred while summarizing the text.');
    }
  }

  document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (file && file.type === 'application/pdf') {
      const fileReader = new FileReader();

      fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);

        // Load the PDF document using pdf.js
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
          console.log('PDF loaded');
          const numPages = pdf.numPages;
          let fullText = ''; // Variable to store the full text

          // Loop through each page in the PDF and extract text
          (async function loopThroughPages() {
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              let pageText = textContent.items.map(item => item.str).join(' ');
              fullText += pageText + '\n\n';
            }

            // Display the full text in the "textOutput" div
            document.getElementById('textOutput').textContent = fullText;

            // Debug: Log the full text
            console.log("Full Text extracted from PDF:", fullText);

            // Check if the fullText is valid and not empty
            if (fullText.trim().length === 0) {
              alert("No text found in the PDF.");
              return;
            }

            // Summarize the extracted full text
            try {
              const summary = await summarizeText(fullText);
              console.log("Summarized Text:", summary); // Log the summarized result
              document.getElementById('summarizedOutput').textContent = summary;
            } catch (error) {
              console.error("Error in summarization:", error);
              alert("There was an error summarizing the text.");
            }
          })();
        }).catch(error => {
          console.error("Error loading PDF:", error);
          alert("There was an error loading the PDF.");
        });
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  });
});
