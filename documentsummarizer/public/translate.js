// translation.js

/**
 * Function to detect the language of a given text.
 * @param {string} text - The text to detect the language of.
 * @returns {Promise<string>} - The detected language code (e.g., 'en', 'de', 'fr').
 */
export async function detectLanguage(text) {
    try {
      const canDetect = await translation.canDetect();
      let detector;
  
      if (canDetect !== 'no') {
        if (canDetect === 'readily') {
          detector = await translation.createDetector(); // Create the detector immediately
        } else {
          detector = await translation.createDetector(); // Wait for the model download if necessary
          detector.addEventListener('downloadprogress', (e) => {
            console.log(`Download Progress: ${e.loaded} of ${e.total}`);
          });
          await detector.ready; // Wait until the detector is ready
        }
  
        // Detect the language of the provided text
        const results = await detector.detect(text);
        const detectedLanguage = results[0].detectedLanguage; // Use the most probable language detected
        console.log(`Detected Language: ${detectedLanguage}`);
  
        return detectedLanguage; // Return the detected language code
      } else {
        throw new Error('Language Detection API is not available.');
      }
    } catch (error) {
      console.error("Error in language detection:", error);
      throw new Error('An error occurred while detecting the language.');
    }
  }
  
  /**
   * Function to translate the text to a target language (e.g., English).
   * @param {string} text - The text to translate.
   * @param {string} targetLanguage - The target language code (e.g., 'en').
   * @returns {Promise<string>} - The translated text.
   */
  export async function translateText(text, targetLanguage = 'en') {
    try {
      // Check if translation is supported (ensure the translation API is available)
      const canTranslate = await translation.canTranslate();
      
      if (canTranslate === 'no') {
        throw new Error('Translation API is not available.');
      }
  
      const translationResult = await translation.translate(text, targetLanguage);
      return translationResult.translatedText; // Return the translated text
    } catch (error) {
      console.error("Error in translation:", error);
      throw new Error('An error occurred while translating the text.');
    }
  }
  