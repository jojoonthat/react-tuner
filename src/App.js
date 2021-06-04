import React, { useState, useEffect } from 'react';
import Tuner from './Tuner';

function App() {
  const [hasMicPerm, setHasMicPerm] = useState(false)
  const [currentFrequency, setCurrentFrequency] = useState("")

  useEffect(() => {
    if (!hasMicPerm) {
      navigator.mediaDevices.getUserMedia({ "audio": true })
        .then(rawStream => {
          setHasMicPerm(true)
          processStream(rawStream)
        })
        .catch(err => {
          alert(`Does not have mic permission: ${err.name}`)
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
      let loudest = -120;
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
      await sleep(10);
    }
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const calculateExpansion = () => {
    return currentFrequency / 9990 + 1;
  }

  const dotExpansion = {
    transform: `scale(${calculateExpansion(currentFrequency)})`
  }

return (
  <div className="App">
    <span class="dot"></span>
    <span class="dot-tuning" style={dotExpansion}></span>
    <Tuner frequency={currentFrequency} />
  </div>
);
}

export default App;
