document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('uploadBtn').addEventListener('click', function() {
      const fileInput = document.getElementById('pdfInput');
      const file = fileInput.files[0];

      if (file && file.type === 'application/pdf') {
          const fileReader = new FileReader();

          fileReader.onload = function() {
              const typedarray = new Uint8Array(this.result);

              pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                  console.log('PDF loaded');
                  const numPages = pdf.numPages;
                  let fullText = '';

                  (async function loopThroughPages() {
                      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                          const page = await pdf.getPage(pageNum);
                          const textContent = await page.getTextContent();
                          let pageText = textContent.items.map(item => item.str).join(' ');
                          fullText += pageText + '\n\n';
                      }
                      document.getElementById('textOutput').textContent = fullText;
                  })();
              });
          };

          fileReader.readAsArrayBuffer(file);
      } else {
          alert('Upload a pdf cutie');
      }
  });
});
