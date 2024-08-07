import CurrentConfig from "../model/Config";
import { AdminActionsRepo } from "../repo/AdminActionsRepo";
import { UsersError, UserResponse } from "../repo/AdminActionsRepo";

class ViewModelUser {
  readonly id: number;
  readonly username: string;
  readonly credit: number;

  constructor(id: number, username: string, credit: number) {
    this.id = id;
    this.username = username;
    this.credit = credit;
  }
}

class Idle {
  readonly users: ViewModelUser[];
  readonly selectedId: number | null;
  readonly selectedName: string | null;
  readonly dialogShown: boolean;

  constructor(users: ViewModelUser[] = [], selectedId: number | null = null, selectedName: string | null = null, dialogShown = false) {
    this.users = users;
    this.selectedId = selectedId;
    this.selectedName = selectedName;
    this.dialogShown = dialogShown;
  }
}

class Message {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}

export type UiState = Idle | Message

class UsersViewModel {
  private _uiState: UiState = new Idle();
  get uiState(): UiState {
    return this._uiState;
  }
  set uiState(value: UiState) {
    this._uiState = value;
    if (value != undefined) {
      this.setUiState(value);
    }
    console.debug(value);
  }
  private setUiState: (arg0: UiState) => void;

  constructor(uiState: UiState, setUiState: (arg0: UiState) => void) {
    this._uiState = uiState;
    this.setUiState = setUiState;
  }

  async fetchData(): Promise<void> {
    this.uiState = new Message("Loading...");
    await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
    const users = await AdminActionsRepo.users();
    console.debug('Fetched Data:', users);
    if ('error' in users) {
      const usersError = users as UsersError;
      this.uiState = new Message(usersError.error);
      await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
      this.uiState = new Idle();
    }
    else {
      const newState = new Idle();
      this.uiState = { ...newState, users: users };
    }
  }

  async selectUser(id: number): Promise<void> {
    const currState = this.uiState as Idle;
    const selectedUser = currState.users.find(user => user.id === id)
    if (selectedUser == undefined) {
      console.error("Internal error");
    }
    else {
      if (currState.selectedId == selectedUser.id) {
        this.uiState = { ...currState, selectedId: null, selectedName: null, dialogShown: false };
      }
      else {
        this.uiState = { ...currState, selectedId: id, selectedName: selectedUser.username, dialogShown: false };
      }
    }
  }

  async showDialog(): Promise<void> {
    const currState = this.uiState as Idle;
    this.uiState = { ...currState, dialogShown: true };
  }

  async hideDialog(): Promise<void> {
    const currState = this.uiState as Idle;
    this.uiState = { ...currState, dialogShown: false };
  }

  async changeCredit(credit: number): Promise<void> {
    const currState = this.uiState as Idle;
    if (currState.selectedId == null) {
      return;
    }
    this.uiState = new Message("Loading...");
    await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
    const result = await AdminActionsRepo.changeCredit(currState.selectedId, credit);
    if ('error' in result) {
      this.uiState = new Message(result.error);
      await new Promise(resolve => setTimeout(resolve, CurrentConfig.ToastLengthShort));
      this.uiState = currState;
    }
    else {
      const [previous, current] = [result.previous_credit, result.current_credit];
      this.uiState = currState;
    }
  }
}

export {
  UsersViewModel, Idle, Message, ViewModelUser
};