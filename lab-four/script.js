// Part 1
// "use strict";
// let i = 25;
// while (i >= 0) {
//   console.log("i = " + i);
//   i = i - 5;
// }

// Part 2A (wrong)
// function BUGGYgoOff(i) {
//   // Create a promise to print i in 5 seconds
//   let p = new Promise((res) => {
//     setTimeout(() => {
//       console.log(i);
//       res(i);
//     }, 5000);
//   });

//   i = i - 5;

//   // When the promise is fulfilled, do it again for i-5
//   if (i > 0) {
//     p.then((i) => BUGGYgoOff(i));
//   }
// }

// BUGGYgoOff(25);

// Part 2A (right)
function goOff(i) {
  let p = new Promise((res) => {
    setTimeout(() => {
      console.log(i);
      res(i);
    }, 5000);
  });

  if (i >= 5) {
    p.then((i) => goOff(i - 5));
  }
}
goOff(25);
