import { Controller } from "@hotwired/stimulus";
import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  offset,
} from "@floating-ui/dom";

export default class extends Controller {
  static targets = ["anchor", "popover"];

  static values = {
    placement: { type: String, default: "bottom" },
  };

  connect() {
    const popoverStyle = getComputedStyle(popover);

    const offsetValue = parseInt(
      popoverStyle.getPropertyValue("--popover-offset")
    );

    const paddingValue = parseInt(
      popoverStyle.getPropertyValue("--popover-padding")
    );

    this.cleanup = autoUpdate(this.anchorTarget, this.popoverTarget, () => {
      computePosition(this.anchorTarget, this.popoverTarget, {
        placement: this.placementValue,
        middleware: [
          offset(offsetValue),
          flip({ padding: paddingValue }),
          shift({ padding: paddingValue }),
        ],
      }).then(({ x, y }) => {
        Object.assign(this.popoverTarget.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });
  }

  disconnect() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
