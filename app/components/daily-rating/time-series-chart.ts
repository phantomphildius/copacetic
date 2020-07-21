import { map, mapBy, sort } from "@ember/object/computed";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking"
import c3 from "c3";
import moment from "moment";

import DailyRating from "copacetic/models/daily-rating";

interface TimeSeriesChartArgs {
  dailyRatings: DailyRating[];
}

export default class TimeSeriesChart extends Component<TimeSeriesChartArgs> {
  constructor(owner: unknown, args: TimeSeriesChartArgs) {
    super(owner, args);
  }
  @tracked private 'args.dailyRatings': DailyRating[]
  // @sort("args.dailyRatings", function (
  //   { day: dayA }: DailyRating,
  //   { day: dayB }: DailyRating
  // ) {
  //   if (moment(dayA) > moment(dayB)) {
  //     return 1;
  //   } else if (moment(dayA) < moment(dayB)) {
  //     return -1;
  //   }
  //   return 0;
  // })
  // private sortedDailyRatings: DailyRating[];
  // @map("sortedDailyRatings", function ({ day }: DailyRating) {
  //   return moment(day).format("L");
  // })
  // private xValues: string[];
  // @mapBy("sortedDailyRatings", "totalScore") private yValues: number[];

  public drawChart() {
    if (this['args.dailyRatings']) {

    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ["data1", 2, 3, 4, 5, 6, 7],
          ["data2", 1, 2, 3, 4, 5, 6],
        ],
        type: "bar",
      },
    });
    }
  }
}
