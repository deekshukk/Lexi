// summarize.js

/**
 * Function to summarize text using Gemini Nano Summarization API.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The summarized text.
 */
export async function summarizeText(text) {
    try {
      const canSummarize = await ai.summarizer.capabilities();
      let summarizer = '';
  
      if (canSummarize && canSummarize.available !== 'no') {
        if (canSummarize.available === 'readily') {
          summarizer = await ai.summarizer.create(); 
        } else {
          summarizer = await ai.summarizer.create(); // Create the summarizer after downloading resources
          summarizer.addEventListener('downloadprogress', (e) => {
            console.log(`Download Progress: ${e.loaded} of ${e.total}`);
          });
          await summarizer.ready; // Wait until the summarizer is ready
        }
  
        const result = await summarizer.summarize(text);
        summarizer.destroy();  
  
        return result;  
      } else {
        throw new Error('Summarizer is not available at the moment.');
      }
    } catch (error) {
      console.error("Error in summarization: ", error);
      throw new Error('An error occurred while summarizing the text.');
    }
}