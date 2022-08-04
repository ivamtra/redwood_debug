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

// String -> String

/*
 Tekur inn ISO Date streng og skilar
 tíma og dagsetningu strengi á íslensku formi
*/
export const getTimeAndDateIS = (createdAt) => {
  return [
    new Date(createdAt)
      .toLocaleTimeString('en-GB', { timeZone: 'UTC' })
      .substring(0, 5),
    new Date(createdAt).toLocaleDateString('en-GB', { timeZone: 'UTC' }),
  ]
}
