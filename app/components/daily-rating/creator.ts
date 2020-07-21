import { action } from "@ember/object";
import { equal } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import DailyRating, {
  dailyRatingQuestionsMap,
} from "copacetic/models/daily-rating";
import Router from "copacetic/router";
import _shuffle from "lodash/shuffle";
import { ratingQuestionOption } from "./selector";

interface CreatorArgs {
  dailyRating: DailyRating;
}

const { keys } = Object;

export default class Creator extends Component<CreatorArgs> {
  @equal("questionIndex", 4) public isFinalQuestion: boolean;
  @service private router: Router;
  @tracked private questionIndex = 0;
  // make this be an array of questionKeys type
  private questionsOrder: string[] = _shuffle(keys(dailyRatingQuestionsMap));

  private get currentQuestionKey(): string {
    const { questionIndex, questionsOrder } = this;
    return questionsOrder[questionIndex];
  }

  public get currentQuestion(): string {
    return dailyRatingQuestionsMap[this.currentQuestionKey];
  }

  // https://www.typescriptlang.org/docs/handbook/enums.html
  @action
  public answerQuestion(answer: ratingQuestionOption): void {
    const { currentQuestionKey, isFinalQuestion } = this;
    this.args.dailyRating[
      currentQuestionKey
    ] = this.deriveRatingValueFromAnswer(answer);

    if (!isFinalQuestion) {
      this.incrementQuestion();
    }
  }

  @action
  public saveQuestionValue(): void {
    this.args.dailyRating.save();
    this.router.transitionTo("daily-ratings");
  }

  private incrementQuestion(): void {
    this.questionIndex++;
  }

  private deriveRatingValueFromAnswer(
    questionAnswer: ratingQuestionOption
  ): number {
    return questionAnswer === "no" ? 0 : 1;
  }
}
