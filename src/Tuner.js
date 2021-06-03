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
  const note = notesArray[nthNote % 12]

  return (
    <div className='tuner'>
      <Meter cents={centDifference} />
      <div className='tuner-info'>
        <h1> {note} <sub>{octave}</sub> and {centDifference} cents</h1>
        <h2 className='frequency'>{frequency} Hz</h2>
      </div>
    </div>
  );
}

export default Tuner;