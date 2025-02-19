export function date8ToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
  const day = String(date.getDate()).padStart(2, '0');      // Pad day with leading zero
  return `${year}${month}${day}`;
}

export function stringToDate8(dateString?: string): Date | undefined {
  // Validate the input string format (YYYYMMDD)
  if (!dateString || !/^\d{8}$/.test(dateString)) {
    console.error("Invalid date string format. Expected YYYYMMDD.");
    return undefined;
  }

  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1; // Months are 0-indexed
  const day = parseInt(dateString.substring(6, 8));

  return new Date(year, month, day);
}
