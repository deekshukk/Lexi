export async function summarizeText(text) {
  const canSummarize = await ai.summarizer.capabilities();
  
  let summarizer = '';

  if (canSummarize && canSummarize.available !== 'no') {
    if (canSummarize.available === 'readily') {
      summarizer = await ai.summarizer.create();
    } else {
      summarizer = await ai.summarizer.create();
      summarizer.addEventListener('downloadprogress', (e) => {
        console.log(e.loaded, e.total); 
      });
      await summarizer.ready; 
    }
    const result = await summarizer.summarize(text);

    summarizer.destroy();
    return result;
  } else {
    throw new Error('Summarizer is not available at the moment.');
  }
}