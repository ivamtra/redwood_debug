// Old Date
// ISO String 2022-07-09T22:10:44.815Z

// New Date
// ISO String 2022-07-13T22:11:44.815Z

const newDate = '2022-07-13T22:11:44.815Z'
const oldDate = '2022-07-09T22:10:44.815Z'

//(String, String) => Boolean
const dateIsOlderThanHour = (oldDateString, newDateString) => {
  //Ath. dagsetningu
  const oldDate = parseInt(oldDateString.substring(8, 10))
  const newDate = parseInt(newDateString.substring(8, 10))
  console.log(oldDate)
  console.log(newDate)
  if (newDate > oldDate) {
    return true
  }
  // Sami dagur, athuga klst mun
  else {
    // Fá klukkuna HH::MM:SS
    const oldTime = oldDateString.subString()
  }
}

dateIsOlderThanHour(oldDate, newDate)
