document.addEventListener('DOMContentLoaded', function() {
  // Summarize text function
    async function summarizeText(text) {
      const canSummarize = await ai.summarizer.capabilities();
      
      if (!canSummarize || canSummarize.available === 'no') {
        console.error('Summarizer is not available at the moment.');
        return 'Summarizer is not available.';
      }
    
      let summarizer;
      summarizer = await ai.summarizer.create();
    
      if (canSummarize.available !== 'readily') {
        summarizer.addEventListener('downloadprogress', (e) => {
          console.log(`Download Progress: ${e.loaded} of ${e.total}`);
        });
        await summarizer.ready;
      }
    
      const result = await summarizer.summarize(text);
      summarizer.destroy();
      return result;
    }
  
    // Translate text function
    async function translateText(text, sourceLanguage, targetLanguage) {
      const languagePair = { sourceLanguage, targetLanguage };
      const canTranslate = await translation.canTranslate(languagePair);

      if (canTranslate === 'no') {
        console.error(`Translation not available for ${sourceLanguage} to ${targetLanguage}.`);
        return `Translation not available for ${sourceLanguage} to ${targetLanguage}.`;
      }

      let translator;
      if (canTranslate === 'readily') {
        translator = await translation.createTranslator(languagePair);
      } 
      else {
        translator = await translation.createTranslator(languagePair);
        translator.addEventListener('downloadprogress', (e) => {
          console.log(`Model download progress: ${e.loaded} of ${e.total}`);
        });
      await translator.ready;
      }

      const translatedText = await translator.translate(text);
      translator.destroy();
      return translatedText;
    }

    // Function to identify risks and return full sentences
  function identifyRisks(text) {
    const riskKeywords = [
      'penalty', 'liability', 'termination', 'fees', 
      'risk', 'compliance', 'breach', 'fine', 'responsibility'
    ];
    const sentences = text.match(/[^.!?]+[.!?]/g) || []; // Split text into sentences
    const risks = [];

    // Check each sentence for keywords
    sentences.forEach(sentence => {
      riskKeywords.forEach(keyword => {
        if (sentence.toLowerCase().includes(keyword)) {
          risks.push(sentence.trim());
        } 
      });
    });

    if (risks.length === 0) {
      return 'No risks identified in the document.';
    }

    return `Identified Risks:\n${risks.join('\n')}`;
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

            document.getElementById('textOutput').textContent = fullText;

            console.log("Full Text extracted from PDF:", fullText);

            // Check if the fullText is valid and not empty
            // if (fullText.trim().length === 0) {
            //   alert("No text found in the PDF.");
            //   return;
            // }

            // Summarize the extracted full text
            const summary = await summarizeText(fullText);
            console.log("Summarized Text:", summary); // Log the summarized result
            document.getElementById('summarizedOutput').textContent = summary;
          
            // Identify risks in the extracted text
            const risks = identifyRisks(fullText);
            console.log("Identified Risks:", risks); // Log identified risks
            document.getElementById('risksOutput').textContent = risks;

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

  // Handle translation
  document.getElementById('translateBtn').addEventListener('click', async function () {
    const summaryText = document.getElementById('summarizedOutput').textContent.trim();
    const targetLanguage = document.getElementById('languageSelect').value;

    if (!summaryText) {
      alert('Please summarize the text first.');
      return;
    }

    try {
      const translatedText = await translateText(summaryText, 'en', targetLanguage);
      document.getElementById('translatedOutput').textContent = translatedText;
      // Translate risks
      const risksText = document.getElementById('risksOutput').textContent.trim();
      const translatedRisks = await translateText(risksText, 'en', targetLanguage);
      document.getElementById('translatedRisksOutput').textContent = translatedRisks;
    } catch (error) {
      console.error('Translation error:', error);
      alert('Error during translation. Please try again.');
    }
  });
});