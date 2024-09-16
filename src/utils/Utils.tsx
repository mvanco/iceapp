export function printDate(date: any): string {
  const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
  const calcDate = `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${calcDate} ${time}`;
}


export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}