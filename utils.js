export function getIsoString(date) {
    const formatter = new Intl.DateTimeFormat(`ru`, {
      year: `numeric`,
      month: `2-digit`,
      day:`2-digit`,
      hour: `2-digit`,
      minute: `2-digit`,
      second: `2-digit`,
      timeZoneName: `short`,
    }),
    parts = formatter.formatToParts();
  
    const partsObj = {};
    
    for(const part of parts) {
      if(part.type === `literal`) continue;
      partsObj[part.type] = part.value;
    }
  
    const {year, month, day, hour, minute, second, timeZoneName: timezone} = partsObj;
    const timezoneValue = timezone.slice((timezone.lastIndexOf(`T`) + 1));
    const timezoneSplitArr = timezoneValue.split(``);
    let timezoneFormatValue;
    if(timezoneSplitArr[2]) {
      timezoneFormatValue = `${timezoneValue}:00`;
    } else {
      timezoneSplitArr.splice(0, 2, timezoneSplitArr[0], `0`, timezoneSplitArr[1]);
      timezoneFormatValue = `${timezoneSplitArr.join(``)}:00`;
    }
  
    return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezoneFormatValue}`;
  }