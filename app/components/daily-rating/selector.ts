import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface SelectorArgs {
  ratingSetter: (value: number) => void;
}

export default class Selector extends Component<
  SelectorArgs
> {
  public options: number[];
  @tracked public selectedValue: number;

  constructor(owner: unknown, args: SelectorArgs) {
    super(owner, args);
    this.options = [1, 2, 3, 4, 5];
    this.selectedValue = 0;
  }

  @action
  public chooseValue(value: number): void {
    this.selectedValue = value;
    this.args.ratingSetter(value);
  }
}
