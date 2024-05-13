export const calcTime = (s) => {
  let time = {
    minutes: "00",
    seconds: "00",
  };

  if (s > 0) {
    let mins = Math.floor(s / 60).toString();
    let secs = Math.floor(s % 60).toString();
    if (mins.length === 1) mins = "0" + mins;
    if (secs.length === 1) secs = "0" + secs;
    time = {
      minutes: mins,
      seconds: secs,
    };
  }
  return time;
};
