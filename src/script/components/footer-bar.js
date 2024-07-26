class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _year = null;

  static get observedAttributes() {
    return ["year"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        background-color: cornflowerblue;

        color: beige;
      }

      .container-footer {
        padding-block: 16px;
      }

      .main-footer {
        padding: 8px 16px;
        text-align: center;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  set year(value) {
    this._year = value;
  }

  get year() {
    return this._year;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `    
    <footer>  
      <div class="container-footer">
        <div class="main-footer">Catatan &copy; ${this.year}</div>
      </div>
    </footer>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "year":
        this.year = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("footer-bar", FooterBar);
