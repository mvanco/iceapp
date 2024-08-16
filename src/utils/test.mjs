import moment from 'moment';

function convertToISODateTime(input) {
  // Parse the input date-time string and format it to ISO format
  return moment(input, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm');
}

// Example usage
const input = "2024-08-15 12:34:56";
const output = convertToISODateTime(input);
console.log(output);  // Output: "2024-08-15T12:34"