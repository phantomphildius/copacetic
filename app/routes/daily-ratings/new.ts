import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from 'ember-data/store';

export default class DailyRatingsNew extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service public store: Store;

  public async model() {
    return this.store.createRecord('daily-rating');
  }
}
