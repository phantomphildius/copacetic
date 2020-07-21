import { Adapter } from "ember-pouch";
import PouchDB from "ember-pouch/pouchdb";
import auth from "pouchdb-authentication";

PouchDB.plugin(auth);

const remote = new PouchDB("http://localhost:5984/copacetic");
const db = new PouchDB("copacetic");

remote.logIn("admin", process.env.POUCH_CREDS, function (err, response) {
  if (err) {
    if (err.name === "unauthorized" || err.name === "forbidden") {
      console.log(response);
    } else {
      db.sync(remote, { live: true, retry: true });
    }
  }
});

export default class ApplicationAdapter extends Adapter {
  public db = db;
}
