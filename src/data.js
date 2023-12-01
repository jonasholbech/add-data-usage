const totalTimeRun = 20 * 10; //Sekunder
//https://stinna.dk/aftensmad/taerte-med-karamelliserede-loeg.html
const raw = [
  [0, 0, 0, 0],
  [20, 1.22, 122, 6.2],
  [20, 1.22, 243, 9.7],
  [71, 4.11, 244, 9.8],
  [71, 4.11, 244, 9.8],
  [71, 4.11, 252, 10.0],
  [72, 4.25, 253, 10.0],
  [72, 4.25, 269, 10.3],
  [72, 4.25, 270, 10.3],
  [72, 4.25, 286, 10.7],
  [72, 4.25, 287, 10.7],
  [72, 4.25, 325, 11.5],
  [72, 4.25, 329, 11.5],
  [72, 4.25, 367, 12.4],
  [72, 4.25, 371, 12.4],
  [72, 4.25, 409, 13.2],
  [72, 4.25, 413, 13.2],
  [72, 4.25, 451, 14.1],
  [72, 4.25, 476, 14.6],
  [72, 4.25, 481, 14.6],
];
const parsed = {};
const highestRequests = raw.at(-1)[2];
const highestSize = raw.at(-1)[3];

raw.forEach((row, index) => {
  const [r1, s1, r2, s2] = row;

  parsed[index * 10] = {
    noadds: {
      requests: r1,
      transferred: s1,
    },
    adds: {
      requests: r2,
      transferred: s2,
    },
  };
});
export { raw, parsed, highestRequests, highestSize, totalTimeRun };
