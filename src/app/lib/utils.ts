export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const convertTo12HourFormat = (time: string) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 || 12; // Convert 0 to 12

  // Format the time in 12-hour format
  const time12Hour = `${hours12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return time12Hour;
};

export const convertUTCtoLocalAnd12HourFormat = (
  utcTimeString: string,
  timezone?: string
) => {
  const date = new Date(utcTimeString); // Create Date object from UTC string
  const localTime = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });
  return localTime;
};

export const convertUTCtoLocalAnd24HourFormat = (
  utcTimeString: string,
  timezone?: string
) => {
  const date = new Date(utcTimeString); // Create Date object from UTC string
  const options: any = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  };
  const localTime = date.toLocaleTimeString("en-US", options);
  return localTime;
};

export const calculateDuration = (starting: string, ending: string) => {
  const startDate = new Date(starting);
  const endDate = new Date(ending);

  // Calculate the difference in milliseconds
  const durationMilliseconds: number = endDate.valueOf() - startDate.valueOf();

  // Convert milliseconds to minutes
  const durationMinutes = durationMilliseconds / (1000 * 60);

  return durationMinutes;
};

export const fullDateToSimple = (timezone?: string, fullDate?: string) => {
  let dateObj = fullDate ? new Date(fullDate) : new Date();

  if (timezone) {
    const options = { timeZone: timezone };
    dateObj.toLocaleString("en-US", options);
  }

  // Extracting year, month, and day from the date object
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const getOneDayAhead = (timezone?: string, fullDate?: string) => {
  let dateObj = fullDate ? new Date(fullDate) : new Date();

  if (timezone) {
    const options = { timeZone: timezone };
    dateObj.toLocaleString("en-US", options);
  }

  // Add one day (in milliseconds) to the current date
  dateObj.setDate(dateObj.getDate() + 1);

  // Extract components and format them with leading zeros if needed
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const parseTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes; // Convert time to minutes since midnight
};

export const detectOverlappingTimeSlots = (timeSlots: any[]) => {
  // Sort the time slots by their start time
  timeSlots.sort(
    (a, b) => parseTime(a.startingLocal) - parseTime(b.startingLocal)
  );

  let groupedTimeSlots = [];

  let currentGroup = [];

  // Iterate through the sorted time slots
  for (let i = 0; i < timeSlots.length; i++) {
    let currentSlot = timeSlots[i];

    if (currentGroup.length === 0) {
      currentGroup.push(currentSlot);
    } else {
      let lastSlot = currentGroup[currentGroup.length - 1];

      // Check for overlap with the last slot in the current group
      if (
        parseTime(currentSlot.startingLocal) < parseTime(lastSlot.endingLocal)
      ) {
        // Overlap detected, add to current group
        currentGroup.push(currentSlot);
      } else {
        // No overlap, close the current group and start a new one
        groupedTimeSlots.push(currentGroup);
        currentGroup = [currentSlot];
      }
    }
  }

  // Add the last group to groupedTimeSlots
  if (currentGroup.length > 0) {
    groupedTimeSlots.push(currentGroup);
  }

  return groupedTimeSlots;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getSlotColor = (eventObject: AttendanceResponseObject) => {
  if (eventObject.status.toLowerCase().includes("cancelled")) {
    return "#DD6262";
  } else if (eventObject.eventtype === "INTERVIEW") {
    return "#40B4EC";
  } else if (eventObject.eventtype === "TECH-PREP") {
    return "#CDCDCD";
  } else if (eventObject.eventtype === "CODING-CHALLENGE") {
    return "#806D9C";
  } else {
    return "#FFB23F";
  }
};
