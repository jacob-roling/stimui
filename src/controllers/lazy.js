import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    loaded: String,
  };

  connect() {
    this.dispatch("connect");
  }

  load({ params }) {
    if (!Object.hasOwn(params, "map")) {
      return console.error(
        "lazy#load requires 'map' to be defined. Set data-lazy-map-param on: ",
        this.element
      );
    }

    const importMap =
      typeof params.map == "string"
        ? JSON.parse(document.getElementById(params.map).innerHTML)
        : params.map;

    Object.entries(importMap.imports)
      .filter(
        ([identifier]) =>
          !this.loadedValue.includes(identifier) &&
          this.element.dataset.controller.includes(identifier) &&
          identifier !== "lazy"
      )
      .forEach(this.#load.bind(this));
  }

  #load([identifier, moduleName]) {
    import(moduleName).then(({ default: Controller }) => {
      Stimulus.register(identifier, Controller);
      if (this.loadedValue.length > 0) {
        this.loadedValue = this.loadedValue + " " + identifier;
      } else {
        this.loadedValue = identifier;
      }
    });
  }
}
