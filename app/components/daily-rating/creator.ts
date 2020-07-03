import { action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import DailyRating, { dailyRatingQuestionsMap } from 'copacetic/models/daily-rating';
import Router from 'copacetic/router';
import _shuffle from 'lodash/shuffle';

interface CreatorArgs {
  dailyRating: DailyRating;
}

const { keys } = Object;

export default class Creator extends Component<
  CreatorArgs
> {
  @service private router: Router;
  // make this be an array of questionKeys type
  private questionsOrder: string[] = _shuffle(keys(dailyRatingQuestionsMap));
  @tracked private questionIndex = 0;
  @equal('questionIndex', 4) private isFinalQuestion: boolean;

  private get currentQuestionKey(): string {
    const { questionIndex, questionsOrder } = this;
    return questionsOrder[questionIndex];
  }

  public get currentQuestion(): string {
    return dailyRatingQuestionsMap[this.currentQuestionKey];
  }

  @action
  public setQuestionValue(answer: string): void {
    const { currentQuestionKey } = this;
    this.args.dailyRating[currentQuestionKey] = this.deriveRatingValueFromAnswer(answer);
  }

  @action
  public saveQuestionValue(): void {
    if (this.isFinalQuestion) {
      this.args.dailyRating.save();
      this.router.transitionTo('daily-ratings');
    } else {
      this.questionIndex += 1;
    }
  }

  private deriveRatingValueFromAnswer(questionAnswer: string): number {
    return questionAnswer === 'no' ? 0 : 1;
  }
}
