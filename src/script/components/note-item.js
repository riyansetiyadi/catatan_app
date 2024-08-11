import NotesApi from "../data/remote/notes-api.js";
import Utils from "../utils.js";
import Swal from "sweetalert2";

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
  _isArchive = false;

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

  set isArchive(value) {
    this._isArchive = value;

    // Render ulang
    this.render();
  }

  get isArchive() {
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

      .btn-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        font-size: 16px;
        color: #fff;
        background-color: #dc3545;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .btn-delete {
        background-color: #dc3545;
      }
      
      .btn-delete:hover {
        background-color: #c82333;
      }

      .btn-archive {
        background-color: #007bff;
      }
      
      .btn-archive:hover {
        background-color: #0056b3;
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
          <div>
            <button class="btn-action btn-archive" id="btn-archive">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>
            <button class="btn-action btn-archive" id="btn-unarchive">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
              </svg>
            </button>
            <button class="btn-action btn-delete" id="btn-delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>
        </div>
    `;
    const btnArchive = this._shadowRoot.querySelector("#btn-archive");
    const btnUnarchive = this._shadowRoot.querySelector("#btn-unarchive");
    const btnDelete = this._shadowRoot.querySelector("#btn-delete");

    btnArchive.addEventListener("click", () =>
      this.handleClickArchive(this._note.id)
    );

    btnUnarchive.addEventListener("click", () =>
      this.handleClickUnarchive(this._note.id)
    );

    btnDelete.addEventListener("click", () =>
      this.handleClickDelete(this._note.id)
    );

    if (this._isArchive) {
      Utils.hideElement(btnArchive);
    } else {
      Utils.hideElement(btnUnarchive);
      Utils.hideElement(btnDelete);
    }
  }

  handleClickArchive(id) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Swal.fire({
      title: "Are you sure to archive this note?",
      text: "You can see note in the archive menu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const message = await NotesApi.archiveNote(id);
          this.dispatchEvent(
            new CustomEvent("note-archived", {
              detail: { id },
              bubbles: true,
              composed: true,
            })
          );
          Toast.fire({
            title: message,
            icon: "success",
          });
        } catch (error) {
          Toast.fire({
            title: error.message,
            icon: "error",
          });
        }
      }
    });
  }

  handleClickUnarchive(id) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Swal.fire({
      title: "Are you sure to unarchive?",
      text: "You can see note in the all menu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unarchive it!",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const message = await NotesApi.unarchiveNote(id);
          this.dispatchEvent(
            new CustomEvent("note-unarchived", {
              detail: { id },
              bubbles: true,
              composed: true,
            })
          );
          Toast.fire({
            title: message,
            icon: "success",
          });
        } catch (error) {
          Toast.fire({
            title: error.message,
            icon: "error",
          });
        }
      }
    });
  }

  handleClickDelete(id) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const message = await NotesApi.deleteNote(id);
          this.dispatchEvent(
            new CustomEvent("note-delete", {
              detail: { id },
              bubbles: true,
              composed: true,
            })
          );

          Toast.fire({
            title: message,
            icon: "success",
          });
        } catch (error) {
          Toast.fire({
            title: error.message,
            icon: "error",
          });
        }
      }
    });
  }
}

customElements.define("note-item", NoteItem);
