import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    loaded: String,
    importMapId: String,
  };

  connect() {
    this.updateImportMap();
  }

  importMapIdValueChanged() {
    this.updateImportMap();
  }

  updateImportMap() {
    if (this.hasImportMapIdValue) {
      this.importMap = JSON.parse(
        document.getElementById(this.importMapIdValue).innerHTML
      );
    }
  }

  load({ target }) {
    Object.entries(this.importMap.imports)
      .filter(
        ([identifier]) =>
          !this.loadedValue.includes(identifier) &&
          target.dataset.controller.includes(identifier) &&
          identifier !== "lazy"
      )
      .forEach(this.#load.bind(this));
  }

  #load([identifier, moduleName]) {
    import(moduleName).then(({ default: Controller }) => {
      Stimulus.register(identifier, Controller);
      if (this.loadedValue.length > 0) {
        this.loadedValue += " " + identifier;
      } else {
        this.loadedValue = identifier;
      }
    });
  }
}
