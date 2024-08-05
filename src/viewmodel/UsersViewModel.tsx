
class Idle {
  readonly selectedId: number | null;
  readonly selectedName: string | null;
  readonly dialogShown: boolean;

  constructor(selectedId: number | null = null, selectedName: string | null = null, dialogShown = false) {
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

type UiState = Idle | Message

class UsersViewModel {
  private uiState: UiState;
  private setUiState: (arg: UiState) => void

  constructor(uiState: UiState, setUiState: (arg: UiState) => void) {
    this.uiState = uiState;
    this.setUiState = setUiState;
  }

  async selectUser(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setUiState(new Message("Loading"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setUiState(new Idle(1, "matus", false));
  }
}

export {UsersViewModel, Idle, Message};