import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.within = el;
    this.noscroll = false;
    this.wrapAround = false;
  }
}