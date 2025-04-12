// Wait for the scene to load
document.addEventListener('DOMContentLoaded', () => {
  const textSrt = "align:center; width:1; wrapCount:20; color: red; value: {text};";
  let showSpeechBubble = false;
  let isRecognition = false;
  let recognitionProcessing = false;
  
  // Select the a-entity with the text component
  const textEntity = document.querySelector('#avatarText');
  // Update the text value dynamically
  textEntity.setAttribute('text', textSrt.replace('{text}', ''));

  const speechBubble = document.querySelector('#speechBubble');
  speechBubble.setAttribute('visible', false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    // recognition.lang = 'ja-JP';
    recognition.onresult = (event) => {
      console.log('Recognized:', event);

      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript.trim().toLowerCase();
      // api yomu
      if (transcript) {
        isRecognition = true;
      }
      console.log('Recognized:', transcript);
      textEntity.setAttribute('text', textSrt.replace('{text}', 'Answer: ' + transcript));

      const msg = new SpeechSynthesisUtterance("transcript");
      window.speechSynthesis.speak(msg);
    };

    recognition.onspeechstart = () => {
        isProcessingSpeech = true;
        console.log("🎙️ 会話認識中...");
        if (!showSpeechBubble) {
            speechBubble.setAttribute('visible', true);
        }
        textEntity.setAttribute('text', textSrt.replace('{text}', '🎙️Processing...'));
    };
    recognition.onspeechend = () => {
        isProcessingSpeech = false;
        if (!isRecognition) {
            textEntity.setAttribute('text', textSrt.replace('{text}', ''));
        }
        console.log("🔇 会話認識中完了.");
        if (!isRecognition) {
            textEntity.setAttribute('text', textSrt.replace('{text}', ''));
        }

    };
    recognition.onerror = (e) => {
    console.warn("⚠️ Error:", e.error);
    };
    recognition.onend = () => {
        console.log("🛑 Recognition ended — restarting...");
        recognition.start(); // Restart automatically
    };
    window.onload = () => {
        console.log("🛑 Recognition started");
        recognition.start();
    };
  } else {
    alert('SpeechRecognition not supported in this browser.');
  }
});