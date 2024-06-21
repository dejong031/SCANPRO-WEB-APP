document.getElementById('startOCR').addEventListener('click', () => {
  const file = document.getElementById('imageUpload').files[0];
  if (!file) return alert('Please upload or capture an image');
  
  const reader = new FileReader();
  reader.onload = function(event) {
    Tesseract.recognize(
      event.target.result,
      'eng',
      {
        logger: (m) => console.log(m)
      }
    ).then(({ data: { text } }) => {
      document.getElementById('output').innerText = text;
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById('generatePDF').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById('output').innerText;
  doc.text(text, 10, 10);
  doc.save('document.pdf');
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
