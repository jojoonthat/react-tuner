import React, { useState, useEffect } from 'react';
import Tuner from './Tuner';

function App() {
  const [hasMicPerm, setHasMicPerm] = useState(false)
  const [currentFrequency, setCurrentFrequency] = useState("")

  useEffect(() => {
    if (!hasMicPerm) {
      navigator.mediaDevices.getUserMedia({ "audio": true })
        .then(rawStream => {
          console.log('Got mic permission!')
          setHasMicPerm(true)
          processStream(rawStream)
        })
        .catch(err => {
          // hasMicPerm should stay false
          console.log(`Does not have mic permission: ${err.name}`)
        });
    }
  });

  const processStream = async rawStream => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32768;
    const stream = audioCtx.createMediaStreamSource(rawStream);
    stream.connect(analyser);
    const nyquist = audioCtx.sampleRate / 2;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    while (true) {
      analyser.getFloatFrequencyData(dataArray);
      let loudest = -Infinity;
      let loudestIndex = -1;
      for (let i = 0; i < bufferLength; i++) {
        let currentLoudness = dataArray[i];
        if (currentLoudness > loudest) {
          loudest = currentLoudness;
          loudestIndex = i;
        }
      }
      const frequency = loudestIndex * (nyquist / bufferLength)
      setCurrentFrequency(frequency)
      await sleep(100);
    }
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className="App">
      {/* Conditional jsx to display different things based on the value of hasMicPerm */}
      {/* i.e. if hasMicPerm, show this, else show that */}
      <Tuner frequency={currentFrequency} />
    </div>
  );
}

export default App;
