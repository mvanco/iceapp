import Interest from "../model/Interest";
import User from "../model/User";
import { ViewModelUser } from "../viewmodel/UsersViewModel";

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

export function printUser(user: ViewModelUser): string {
  return `${user.username}   ${user.credit}Kč`;
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}