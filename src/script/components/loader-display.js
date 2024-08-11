class LoaderDisplay extends HTMLElement {
  static get observedAttributes() {
    return ["caption", "width", "height", "border-width"];
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

  set height(value) {
    const hasChange = this.height != value;
    if (hasChange) {
      this.removeAttribute("height");
    }

    this.setAttribute("height", value);
  }

  get height() {
    const value = this.getAttribute("height");
    return value;
  }

  set width(value) {
    const hasChange = this.width != value;
    if (hasChange) {
      this.removeAttribute("width");
    }

    this.setAttribute("width", value);
  }

  get width() {
    const value = this.getAttribute("width");
    return value;
  }

  set borderWidth(value) {
    const hasChange = this.borderWidth != value;
    if (hasChange) {
      this.removeAttribute("border-width");
    }

    this.setAttribute("border-width", value);
  }

  get borderWidth() {
    const value = this.getAttribute("border-width");
    return value;
  }

  updateStyle() {
    this._style.textContent = `
      .container-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .loader {
        border: ${this.borderWidth ?? "16"}px solid #f3f3f3; 
        border-top: ${this.borderWidth ?? "16"}px solid #3498db;
        border-radius: 50%;
        width: ${this.width ?? "120"}px;
        height: ${this.height ?? "120"}px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  `;
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
        <div class="container-loader">
          <div class="loader"></div>
          ${this.caption ? `<h1>${this.caption}</h1>` : ""}
        </div>
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

customElements.define("loader-display", LoaderDisplay);
