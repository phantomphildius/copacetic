import { collect, sum } from "@ember/object/computed";
import attr from "ember-data/attr";
import Model from "ember-data/model";
import moment from 'moment';

export type RatingKey =
  | "developing"
  | "goals"
  | "happy"
  | "planning"
  | "shipping";
type QuestionMap = {
  [K in RatingKey]: string;
};
interface DailyRatingQuestions extends QuestionMap {
  [index: string]: string;
}

export const dailyRatingQuestionsMap: DailyRatingQuestions = {
  developing: "Are people developing in the right ways?",
  goals: "Are people safe and meeting their goals?",
  happy: "Are pepole happy?",
  planning: "Are we planning right?",
  shipping: "Are we shipping and executing?",
};

export default class DailyRating extends Model {
  @attr("number", { defaultValue: 0 }) public happy!: number;
  @attr("number", { defaultValue: 0 }) public planning!: number;
  @attr("number", { defaultValue: 0 }) public goals!: number;
  @attr("number", { defaultValue: 0 }) public shipping!: number;
  @attr("number", { defaultValue: 0 }) public developing!: number;

  @attr("date") public day!: Date;

  @attr("string") public rev: string;

  @sum("scoreProps") public totalScore: number;
  @collect("happy", "planning", "goals", "shipping", "developing") private scoreProps: number[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "daily-rating": DailyRating;
  }
}
