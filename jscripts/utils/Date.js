export function formatDateToDayMonth(dateInput) {
  const date = new Date(dateInput);

  const day = date.getDate();
  const monthName = date.toLocaleDateString('en-GB', { month: 'long' });

  return `${day} ${monthName}`;
}

export function formatToDayMonthDate(dateInput) {
  const date = new Date(dateInput);

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();

  return `${dayName}, ${monthName} ${day}`;
}
