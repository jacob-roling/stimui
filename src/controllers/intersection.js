import { Controller } from "@hotwired/stimulus";

export class Intersection extends Controller {
  static targets = ["observe"];

  static values = {
    rootMargin: { type: String, default: "0px" },
    threshold: { type: Number, default: 0 },
    once: { type: Boolean, default: true },
  };

  initialize() {
    this.observer = new IntersectionObserver(this.callback.bind(this), {
      rootMargin: this.rootMarginValue,
      threshold: this.thresholdValue,
    });
  }

  /**
   * @param {IntersectionObserverEntry[]} entries
   */
  callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.dispatch("intersecting", {
          detail: true,
        });
        entry.target.setAttribute("data-intersecting", "true");
        if (this.onceValue) {
          this.observer.unobserve(entry.target);
        }
      } else {
        entry.target.removeAttribute("data-intersecting");
        this.dispatch("intersecting", {
          detail: false,
        });
      }
    });
  }

  /**
   * @param {Element} entry
   */
  observeTargetConnected(entry) {
    this.observer.observe(entry);
  }

  /**
   * @param {Element} entry
   */
  observeTargetDisconnected(entry) {
    this.observer.unobserve(entry);
  }
}
