import { HDate, HebrewCalendar, RoshHashanaEvent } from '@hebcal/core';
const modes = [
  {
    gMonth: 13,
    mode: 'SHE1',
  },
  {
    gMonth: 14,
    mode: 'SHE1',
  },
  {
    gMonth: 3,
    mode: 'IT',
  },
  {
    gMonth: 4,
    mode: 'IT',
  },
  {
    gMonth: 5,
    mode: 'IT',
  },
  {
    gMonth: 6,
    mode: 'IT',
  },
  {
    gMonth: 7,
    mode: 'IT',
  },
  {
    gMonth: 8,
    mode: 'IT||HE',
  },
  {
    gMonth: 9,
    mode: 'HE',
  },
  {
    gMonth: 10,
    mode: 'HE||SHE2',
  },
  {
    gMonth: 11,
    mode: 'SHE2',
  },
  {
    gMonth: 12,
    mode: 'SHE2',
  },
];
function dateAfterRoshHashana(date) {
  const hCal = HebrewCalendar.calendar({
    year: date.getFullYear(),
    isHebrewYear: false,
  });
  const roshHashana = hCal.find(e => e instanceof RoshHashanaEvent).date;
  /* Return true if date is Rosh Hashana or After Rosh Hashana, False if it is before Rosh Hashana */
  return new Date(date.toDateString()) >= new Date(roshHashana.greg().toDateString());
}
function getMonthIndex(month) {
  if (month === 0) return 13;
  if (month === 1) return 14;
  return month + 1;
}
function getMode(monthIndex) {
  return modes.find(e => e.gMonth === monthIndex).mode;
}
function getRoshHashana(gYear) {
  const hCal = HebrewCalendar.calendar({
    year: gYear,
    isHebrewYear: false,
  });
  return hCal.find(e => e instanceof RoshHashanaEvent).date;
}
function getIT(gYear) {
  const hCal = HebrewCalendar.calendar({
    year: gYear,
    isHebrewYear: false,
  });
  return getRoshHashana(gYear).greg().getDate() + 9;
}
function getHE(gYear) {
  return getIT(gYear) + 29;
}
function getSHE1(gYear) {
  let EX = 10;
  if (gYear % 4 === 0) EX += 1;
  if (!HDate.isLeapYear(getRoshHashana(gYear).getFullYear() - 1)) EX += 30;
  return getIT(gYear) + EX;
}
function getSHE2(gYear) {
  return getSHE1(gYear + 1);
}
function getModeValue(gYear, mode,afterRoshHashanah = false) {
  switch (mode) {
    case 'IT':
      return getIT(gYear);
    case 'HE':
      return getHE(gYear);
    case 'SHE1':
      return getSHE1(gYear);
    case 'SHE2':
      return getSHE2(gYear);
    case 'HE||SHE2':
      return Math.max(getHE(gYear), getSHE2(gYear));
    case 'IT||HE':
          {
             return  afterRoshHashanah ? getHE(gYear) : getIT(gYear)
          }
  }
}
function getModeValueFromDate(date) {
    const gYear = date.getFullYear()
    const mode = getMode(getMonthIndex(date.getMonth()))
    const afterRoshHashana = dateAfterRoshHashana(date)
    return getModeValue(gYear,mode,afterRoshHashana)
    
}
function romanToHebrew(date) {
const arr = [date.getDate()]
  let height = arr.reduce(curr, acc => curr +acc, 0) + getMonthIndex(date.getMonth());
let modeValue = getModeValueFromDate(date)

    while ((height - modeValue) < 1){
        
        height = date.getDate() 
    }
    return 
}
let res = romanToHebrew(new Date('2022-12-27'));
console.log(res);
