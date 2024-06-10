export default ({ app }, inject) => {
  inject('dateToISOFormat', (dateString) => {
    // Parse the date string to obtain a Date object
    const dateParts = dateString.split(/[^0-9]/);
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed
    const day = parseInt(dateParts[0], 10);
    const hours = parseInt(dateParts[3], 10);
    const minutes = parseInt(dateParts[4], 10);
    const seconds = parseInt(dateParts[5], 10);

    // Create the Date object
    const date = new Date(year, month, day, hours, minutes, seconds);

    // Convert the date to ISO format
    const ISODate = date.toISOString();
    
    // Return the date in ISO format
    return ISODate;
  });
};