import Meter from './Meter';

function Tuner({ frequency }) {
  const notesArray = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];

  const middleA = 440;
  const middleAPlacement = 69;
  const nthNote = Math.round(12 * (Math.log(frequency / middleA) / Math.log(2))) + middleAPlacement;
  // octave weird
  const octave = parseInt(nthNote / 12) - 1
  const standardFrequency = middleA * Math.pow(2, (nthNote - middleAPlacement) / 12);
  const centDifference = Math.round(
    (1200 * Math.log(frequency / standardFrequency)) /
    Math.log(2)
  );
  const note = notesArray[nthNote % 12];
  const roundedFrequency = Math.round((frequency + Number.EPSILON) * 100) / 100;

  return (
    <div className='tuner'>
      <Meter cents={centDifference} />
      <div className='tuner-info'>
        {isNaN(octave) ? <h1>Play something :)</h1> : <h1> {note} <sub>{octave}</sub></h1>}
        {isNaN(centDifference) ? null : <h2 className='frequency-cents'>{centDifference} Cents</h2>}
        {roundedFrequency === -1.46 ? null : <h2 className='frequency'>{roundedFrequency} Hz</h2>}



      </div>
    </div>
  );
}

export default Tuner;