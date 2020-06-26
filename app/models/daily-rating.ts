import attr from "ember-data/attr";
import Model from "ember-data/model";

export type RatingKey =
  | 'developing'
  | 'goals'
  | 'happy'
  | 'planning'
  | 'shipping';
type QuestionMap = {
  [K in RatingKey]: string;
};
interface DailyRatingQuestions extends QuestionMap {
  [index: string]: string;
}

export const dailyRatingQuestionsMap: DailyRatingQuestions = {
  developing: 'Are people developing in the right ways?',
  goals: 'Are people safe and meeting their goals?',
  happy: 'Are pepole happy?',
  planning: 'Are we planning right?',
  shipping: 'Are we shipping and executing?',
};

export default class DailyRating extends Model.extend({}) {
  @attr("number", { defaultValue: 0 }) happy!: number;
  @attr("number", { defaultValue: 0 }) planning!: number;
  @attr("number", { defaultValue: 0 }) goals!: number;
  @attr("number", { defaultValue: 0 }) shipping!: number;
  @attr("number", { defaultValue: 0 }) developing!: number;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "daily-rating": DailyRating;
  }
}
