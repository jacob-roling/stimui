import { Controller } from "@hotwired/stimulus";
import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  offset,
} from "@floating-ui/dom";

export default class Tooltip extends Controller {
  static targets = ["tooltip"];
  static values = {
    placement: { type: String, default: "bottom" },
  };

  /**
   * @param {HTMLElement} tooltip
   */
  tooltipTargetConnected(tooltip) {
    const tooltipStyle = getComputedStyle(tooltip);

    const offsetValue = parseInt(
      tooltipStyle.getPropertyValue("--tooltip-offset")
    );

    console.log(offsetValue);

    const paddingValue = parseInt(
      tooltipStyle.getPropertyValue("--tooltip-padding")
    );

    this.cleanup = autoUpdate(this.element, tooltip, () => {
      computePosition(this.element, tooltip, {
        placement: this.placementValue,
        middleware: [
          offset(offsetValue),
          flip({ padding: paddingValue }),
          shift({ padding: paddingValue }),
        ],
      }).then(({ x, y }) => {
        Object.assign(tooltip.style, {
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
