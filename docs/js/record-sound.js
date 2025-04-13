let mediaRecorder;
let audioChunks = [];

async function initRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-audio.webm';
    a.click();
    audioChunks = [];
  };
}

async function startRecording() {
  if (!mediaRecorder) {
    await initRecorder();
  }
  mediaRecorder.start();
  console.log("Recording started");
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    console.log("Recording stopped");
  }
}