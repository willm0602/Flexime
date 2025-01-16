
export default class Togglable<T> {
  val: T;
  on: boolean

  constructor(val: T, on: boolean = true) {
    this.val = val;
    this.on = on;
  }

  get(): T | undefined {
    if (this.on) {
      return this.val;
    }
  }

  toggle(): void {
    this.on = !this.on;
  }

  setVal(val: T) {
    this.val = val;
  }

  getOr(onOff: CallableFunction): T | undefined {
    if (this.on) {
      return this.val;
    }

    onOff(this.val);
  }
}

export class TogglableList<T> extends Togglable<Togglable<T>[]> {
  constructor(vals: T[]) {
    const individualToggles = vals.map((val) => {
      return new Togglable(val);
    });
    super(individualToggles);
  }
}

