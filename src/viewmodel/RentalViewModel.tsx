import CurrentConfig from "../model/Config";
import { AdminActionsRepo, Rentals, AddRental, DeleteRental } from "../repo/AdminActionsRepo";

export class RentalViewModel {
  private _uiState: RentalViewModel.UiState = new RentalViewModel.Idle();
  get uiState(): RentalViewModel.UiState {
    return this._uiState;
  }
  set uiState(value: RentalViewModel.UiState) {
    this._uiState = value;
    if (value != undefined) {
      this.setUiState(value);
    }
    console.debug(value);
  }
  private setUiState: (arg0: RentalViewModel.UiState) => void;

  constructor(uiState: RentalViewModel.UiState, setUiState: (arg0: RentalViewModel.UiState) => void) {
    this._uiState = uiState;
    this.setUiState = setUiState;
  }

  async fetchData(): Promise<void> {
    this.uiState = new RentalViewModel.Message("Načítám...");
    await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
    const rentals = await AdminActionsRepo.rentals();
    console.debug('Fetched Data:', rentals);
    if ('error' in rentals) {
      const rentalsError = rentals as Rentals.Error;
      this.uiState = new RentalViewModel.Message(rentalsError.error);
      await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
      this.uiState = new RentalViewModel.Idle();
    }
    else {
      const terms = rentals.map(rental => new RentalViewModel.Term(
        rental.id,
        rental.start,
        rental.duration,
        rental.price,
        rental.minCapacity,
        rental.maxCapacity,
        rental.registered,
        rental.confirmed
      ))
      this.uiState = new RentalViewModel.Idle(terms);
    }
  }

  async selectTerm(id: number): Promise<void> {
    const currState = this.uiState as RentalViewModel.Idle;
    if (currState === undefined) {
      console.error('Internal error');
      return;
    }
    if (currState.selectedId != id) {
      this.uiState = new RentalViewModel.Idle(currState.rentals, id, currState.dialogShown);
    }
    else {
      this.uiState = new RentalViewModel.Idle(currState.rentals, null, currState.dialogShown);
    }
  }

  async showDialog(type: RentalViewModel.DialogType): Promise<void> {
    const currState = this.uiState as RentalViewModel.Idle;
    switch (type) {
      case RentalViewModel.DialogType.None:
        if (this.uiState instanceof RentalViewModel.Idle) {
          console.error('Internal error');
          return;
        }
        this.uiState = new RentalViewModel.Idle(currState.rentals, currState.selectedId, RentalViewModel.DialogType.None);
        break;
      case RentalViewModel.DialogType.AddRental:
        if (!(this.uiState instanceof RentalViewModel.Idle)) {
          console.error('Internal error');
          return;
        }
        this.uiState = {...this.uiState, dialogShown: RentalViewModel.DialogType.AddRental}
        break;
      case RentalViewModel.DialogType.DeleteRental:
        if (this.uiState instanceof RentalViewModel.Idle && this.uiState.selectedId === null) {
          console.error('Internal error');
          return;
        }
        if (!(this.uiState instanceof RentalViewModel.Idle)) {
          console.error('Internal error');
          return;
        }
        this.uiState = {...this.uiState, dialogShown: RentalViewModel.DialogType.DeleteRental}
        break;
    }
  }

  async addRental(
    start: string,
    duration: number,
    price: number,
    minCapacity: number,
    maxCapacity: number
  ): Promise<void> {
    this.uiState = new RentalViewModel.Message("Načítám...");
    await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
    const rentals = await AdminActionsRepo.addRental(start, duration, price, minCapacity, maxCapacity);
    this.fetchData();
  }

  async deleteRental() {
    const prevState = this.uiState as RentalViewModel.Idle;
    if (prevState.selectedId == null) {
      return;
    }
    this.uiState = new RentalViewModel.Message("Načítám...");
    await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
    await AdminActionsRepo.deleteRental(prevState.selectedId);
    this.fetchData();
  }
}

export namespace RentalViewModel {

  export class Term {
    readonly id: number;
    readonly start: string;
    readonly duration: number;
    readonly price: number;
    readonly maxCapacity: number;
    readonly minCapacity: number;
    readonly registered: number;
    readonly confirmed: number;

    constructor(
      id: number,
      start: string,
      duration: number,
      price: number,
      minCapacity: number,
      maxCapacity: number,
      registered: number = 0,
      confirmed: number = 0
    ) {
      this.id = id;
      this.start = start;
      this.duration = duration;
      this.price = price;
      this.minCapacity = minCapacity;
      this.maxCapacity = maxCapacity;
      this.registered = registered;
      this.confirmed = confirmed;
    }
  }

  export enum DialogType {
    None = 0,
    AddRental = 1,
    DeleteRental = 2
  }

  /**
   * Additional constraints: when dialogShown is DialogType.DeleteRental, selectedId cant be null
   */
  export class Idle {

    readonly rentals: Term[] = [];
    readonly selectedId: number | null;
    readonly dialogShown: DialogType

    constructor(
      rentals: Term[] = [],
      selectedId: number | null = null,
      dialogShown: DialogType = DialogType.None
    ) {
      this.rentals = rentals;
      this.selectedId = selectedId;
      this.dialogShown = dialogShown;
    }
  }

  export class Message {
    readonly text: string;
  
    constructor(text: string) {
      this.text = text;
    }
  }

  export type UiState =  Idle | Message
}