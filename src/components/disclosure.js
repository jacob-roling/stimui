import { Controller } from "@hotwired/stimulus";
import { useID } from "./utils";

export default class Disclosure extends Controller {
  static targets = ["button", "panel"];
  static values = {
    requireFocus: { type: Boolean, default: true },
  };

  initialize() {
    this.abortController = new AbortController();
    this.id = useID();
  }

  connect() {
    this.abortController = new AbortController();
    this.buttonTarget.setAttribute("aria-controls", this.panelTarget.id);
    
    if (this.requireFocusValue) {
      this.element.addEventListener("focusout", this.focusout.bind(this), {
        signal: this.abortController.signal,
      });
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  keydown(event) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.toggle();
        break;
      case "Enter":
        event.preventDefault();
        this.toggle();
        break;
    }
  }

  /**
   * @param {FocusEvent} event
   */
  focusout(event) {
    if (event.relatedTarget && !this.element.contains(event.relatedTarget)) {
      this.close()
    }
  }

  toggle() {
    if (
      this.buttonTarget.hasAttribute("aria-expanded") &&
      this.buttonTarget.getAttribute("aria-expanded") !== "false"
    ) {
      return this.close();
    }

    this.open();
  }

  open() {
    this.buttonTarget.setAttribute("aria-expanded", "true");
    this.panelTarget.setAttribute("data-expanded", "true");
  }

  close() {
    this.buttonTarget.setAttribute("aria-expanded", "false");
    this.panelTarget.removeAttribute("data-expanded");
  }

  buttonTargetConnected(button) {
    button.addEventListener("click", this.toggle.bind(this), {
      signal: this.abortController.signal,
    });

    button.addEventListener("keydown", this.keydown.bind(this), {
      signal: this.abortController.signal,
    });
  }

  panelTargetConnected(panel) {
    if (!panel.hasAttribute("id")) {
      panel.setAttribute("id", this.id("panel"));
    }
  }

  disconnect() {
    this.abortController.abort();
  }
}
