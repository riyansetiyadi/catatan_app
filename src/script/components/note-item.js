import Utils from "../utils.js";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
  };
  _bgColor = "#FFF9CF";

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    // Render ulang
    this.render();
  }

  get note() {
    return this._note;
  }

  set bgColor(value) {
    this._bgColor = value;

    // Render ulang
    this.render();
  }

  get bgColor() {
    return this._bgColor;
  }

  _updateStyle() {
    this._style.textContent = `
      .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 26px 34px;
        max-width: 300px;
        width: fill-available;
        width: -webkit-fill-available;
        height: 100%;
        box-sizing: border-box;
        color: #333;
        overflow: hidden;
      }

      .card .note-info__title h2 {
        font-weight: lighter;
      }

      .card .note-info__description p {
        display: -webkit-box;
        margin-top: 10px;

        overflow: hidden;

        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      .card .date {
        font-size: 12px;
        color: #666;
        margin-top: 20px;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card" style="background-color: ${this._bgColor};">
          <div>
            <div class="note-info__title">
              <h2>${this._note.title}</h2>
            </div>
            <div class="note-info__description">
              <p>${this._note.body}</p>
            </div>
          </div>
          <p class="date">${Utils.formattedDate(this._note.createdAt)}</p>
        </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
