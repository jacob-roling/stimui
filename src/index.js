import Disclosure from "./components/disclosure";
import Checkbox from "./components/checkbox";
import Toast from "./components/toast";
import Tooltip from "./components/tooltip";

/**
 * @function registerComponents
 * @param {import("@hotwired/stimulus").Application} stimulusApplication
 * @returns {void}
 */
export function registerComponents(stimulusApplication) {
  stimulusApplication.register("disclosure", Disclosure);
  stimulusApplication.register("checkbox", Checkbox);
  stimulusApplication.register("toast", Toast);
  stimulusApplication.register("tooltip", Tooltip);
}
