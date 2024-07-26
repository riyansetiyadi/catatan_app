class QueryWaiting extends HTMLElement {
  static get observedAttributes() {
    return ["caption"];
  }

  constructor() {
    super();

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  set caption(value) {
    const hasChange = this.caption != value;
    if (hasChange) {
      this.removeAttribute("caption");
    }

    this.setAttribute("caption", value);
  }

  get caption() {
    const value = this.getAttribute("caption");
    return value;
  }

  updateStyle() {
    this._style.textContent = ``;
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
        <h1>${this.caption}</h1>
      `;
  }

  emptyContent() {
    this.innerHTML = "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Render konten ulang
    this.render();
  }
}

customElements.define("caption-display", QueryWaiting);
