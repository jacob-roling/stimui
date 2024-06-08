import Disclosure from "./controllers/disclosure";
import Checkbox from "./controllers/checkbox";
import Toast from "./controllers/toast";
import Popover from "./controllers/popover";
import Focus from "./controllers/focus";
import Tabs from "./controllers/tabs";

/**
 * @function registerComponents
 * @param {import("@hotwired/stimulus").Application} stimulusApplication
 * @returns {void}
 */
export function registerComponents(stimulusApplication) {
  stimulusApplication.register("disclosure", Disclosure);
  stimulusApplication.register("checkbox", Checkbox);
  stimulusApplication.register("toast", Toast);
  stimulusApplication.register("popover", Popover);
  stimulusApplication.register("focus", Focus);
  stimulusApplication.register("tabs", Tabs);
}
