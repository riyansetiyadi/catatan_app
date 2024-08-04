class ModalAddNote extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
      }

      .modal-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
        overflow: hidden;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #ddd;
      }

      .modal-header .title {
        font-size: 20px;
      }

      .modal-header .close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }

      .modal-body {
        padding: 20px;
      }

      .modal-body label {
        display: block;
        margin-bottom: 5px;
      }

      .modal-body input[type="text"],
      .modal-body textarea {
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .modal-body textarea {
        height: 100px;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        border-top: 1px solid #ddd;
      }

      .modal-footer button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }

      .modal-footer .cancel-btn {
        background-color: #ccc;
        margin-right: 10px;
      }

      .modal-footer .save-btn {
        background-color: #4caf50;
        color: white;
      }

      .error-message {
        color: red;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `  
      <form>    
        <div class="modal" id="modalAddNote">
          <div class="modal-content">
            <div class="modal-header">
              <div class="title">Create New Note</div>
              <button class="close-btn" id="closeModalBtn" formnovalidate>&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" id="title" name="title" required aria-describedby="title-error-message" />
                  <span id="title-error-message" class="error-message"></span>
                </div>
                <div class="form-group">
                  <label for="body">Body</label>
                  <textarea id="body" name="body" required aria-describedby="body-error-message"></textarea>
                  <span id="body-error-message" class="error-message"></span>
                </div>
            </div>
            <div class="modal-footer">
              <button class="cancel-btn" id="cancelBtn" formnovalidate>Cancel</button>
              <button class="save-btn" id="saveBtn">Save</button>
            </div>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define("modal-add-note", ModalAddNote);
