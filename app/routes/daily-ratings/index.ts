import EmObject from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from 'ember-data/store';

export default class DailyRatingsIndex extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service public store: Store;

  public async model() {
    return EmObject.create();
  }
}
