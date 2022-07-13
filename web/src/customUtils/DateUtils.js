//(String, String) => Int
/*
  Tekur inn two ISO Date strengi og
  skilar sekúndu mismun þeirra
*/
export const timeBetweenTwoDateStringsInSeconds = (
  oldDateString,
  newDateString
) => {
  const oldDate = new Date(oldDateString)
  const newDate = new Date(newDateString)
  return (newDate - oldDate) / 1e3
}

// console.log(
//   timeBetweenTwoDateStringsInSeconds(
//     new Date('2022-07-13T16:18:59.142Z'),
//     new Date()
//   )
// )
