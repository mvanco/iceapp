import Interest from "../model/Interest";

export function printTerm(term: Interest, short: boolean = false): string {
  const date = term.start;
  const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
  const calcDate = `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  if (short) {
    return `${calcDate} ${time}, ${term.duration}m`;
  } else {
    return `${calcDate} ${time}, ${term.price}Kč / ${term.duration}m`;
  }
}