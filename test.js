const _now = '08:00';
const _duration = '120';

function estimateEndTime(startTime, duration) {
  if (typeof (duration) === 'string') { duration = parseInt(duration, 10); }
  const hhmmArray = startTime.split(':');
  const hh = parseInt(hhmmArray[0], 10);
  const mm = parseInt(hhmmArray[1], 10);
  const minutes = hh * 60 + mm + duration;
  const endMinutes = (minutes % 60 === 0 ? minutes : 60 * Math.ceil(minutes / 60));

  const integerEndHh = endMinutes / 60;
  const integerEndMm = endMinutes % 60;

  function fillZeroAheadDigit(digit) {
    if (digit >= 10) return `${digit}`;

    return `0${digit}`;
  }

  return `${fillZeroAheadDigit(integerEndHh)}:${fillZeroAheadDigit(integerEndMm)}`;
}

console.log(estimateEndTime(_now, _duration));

