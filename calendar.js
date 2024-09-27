const YEAR = 2024,
      CALENDAR_MONTHS = [...Array(12)].map((_, i) => `${i + 1}`),
      MONTH_ARG_INDEX = 3,
      CALENDAR_WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      CALENDAR_SIDE_CHARACTER_COUNT = CALENDAR_WEEK_DAYS.join(" ").length,
      SPACE_PER_ONE_DAY = "  ",
      SPACE_BETWEEN_DAY = " ";
      
let month = process.argv[MONTH_ARG_INDEX], 
    monthFirstDate, 
    monthLastDate,
    monthFirstDateWeekDayIndex,
    englishMonth,
    monthYearCharacterCount,
    spaceForPuttingMonthYear,
    monthLastDateValue,
    monthDays,
    firstWeek,
    otherWeeks; 

if (month && !CALENDAR_MONTHS.includes(month)) {
  return console.log("不正な月が指定されました");
};

const getMonth = () => {
  if (month) {
    return month;
  } else {
    const nowDate = new Date();
    month = new Date(nowDate).getMonth() + 1;
  }
}

const getMonthFirstAndLastDate = () => {
  monthFirstDate = new Date(YEAR, month - 1, 1)
  monthLastDate = new Date(YEAR, month, 0)
}

const getMonthFirstDateWeekDayIndex = () => {
  monthFirstDateWeekDayIndex = monthFirstDate.getDay();
}

const makeCalendarElement = () => {
  englishMonth = new Intl.DateTimeFormat('en', { month: 'long'})
                         .format(new Date(monthFirstDate));
  monthYearCharacterCount = `${englishMonth} 2024`.length;
  spaceForPuttingMonthYear = " ".repeat((CALENDAR_SIDE_CHARACTER_COUNT - monthYearCharacterCount) / 2);
}

const getMonthLastDateValue = () => {
  monthLastDateValue = monthLastDate.getDate();
}

const getMonthDays = () => {
  monthDays = [...Array(monthLastDateValue)].map((_, i) => `${i + 1}`.padStart(2, " "))
}

const putCalendarElement = () => {
  console.log(`${spaceForPuttingMonthYear + englishMonth} 2024`);
  console.log(CALENDAR_WEEK_DAYS.join(" "));
}

const putWeeks = () => {
  const sliceFirstWeekEndPoint = 7 - monthFirstDateWeekDayIndex
  spaceForPuttingFirstWeek = (SPACE_PER_ONE_DAY + SPACE_BETWEEN_DAY).repeat(monthFirstDateWeekDayIndex);
  firstWeek = monthDays.slice(0, sliceFirstWeekEndPoint);
  otherWeeks = monthDays.slice(sliceFirstWeekEndPoint, monthDays.length + 1);
  
  console.log(spaceForPuttingFirstWeek + firstWeek.join(" "));
  
  for (let i = sliceFirstWeekEndPoint + 1; i <= monthLastDateValue; i++) {
    console.log(...otherWeeks.splice(0, 7));
    if(otherWeeks.length == 0) break;
  }
}


getMonth();
getMonthFirstAndLastDate();
getMonthFirstDateWeekDayIndex();
makeCalendarElement();
getMonthLastDateValue();
getMonthDays();
putCalendarElement();
putWeeks();