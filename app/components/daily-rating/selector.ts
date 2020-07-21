import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

enum ratingQuestionOptions {
  'yes' = 1,
  'no' = 0,
}
export type ratingQuestionOption = 'yes' | 'no';
interface SelectorArgs {
  ratingSetter: (value: string) => void;
}

export default class Selector extends Component<
  SelectorArgs
> {
  public options: ratingQuestionOption[] = ['yes', 'no'];
  @tracked public selectedValue: ratingQuestionOption;

  @action
  public chooseValue(value: ratingQuestionOption): void {
    this.args.ratingSetter(value);
  }
}
