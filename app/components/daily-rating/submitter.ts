import Component from '@glimmer/component';

interface SubmitterArgs {
  isFinal: boolean;
  updateRating: () => void;
}

export default class Submitter extends Component<SubmitterArgs> {
  public get buttonText(): string {
    return this.args.isFinal ? 'Save Rating' : 'Next Question';
  }
}
