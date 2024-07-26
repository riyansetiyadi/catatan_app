class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `      
      .list.list-column {
        display: grid;
        justify-items: center;

        gap: 16px;
      }

      .list.list-column {
        grid-template-columns: repeat(4, 1fr);
      }
      
      @media screen and (max-width: 1200px) {
        .list.list-column {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media screen and (max-width: 992px) {
        .list.list-column {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media screen and (max-width: 768px) {
        .list.list-column {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media screen and (max-width: 576px) {
        .list.list-column {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      @media screen and (max-width: 320px) {
        .list.list-column {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div id="noteList">
        <div class="list list-column">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("note-list", NoteList);
