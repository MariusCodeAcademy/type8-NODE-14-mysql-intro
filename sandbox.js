// destructurizacija

const nrArr = [{ id: 5 }, { last: 45 }, 'hello'];

// const rez = nrArr[0];
// const rez1 = nrArr[1];

const [rez, rez1] = nrArr;

console.log('rez ===', rez);
