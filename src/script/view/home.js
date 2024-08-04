import Utils from "../utils.js";
import Notes from "../data/local/notes.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteInitiateDisplayElement =
    noteListContainerElement.querySelector(".initiate-display");
  const noteLoadingElement =
    noteListContainerElement.querySelector(".notes-loading");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const displayResult = (notes) => {
    const colors = ["#FFF9CF", "#D0E0FF", "#EDD5FF", "#D4F4D4", "#FFC3C4"];
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const noteItemElements = notes.map((note, index) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.bgColor = colors[index % colors.length];

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showInitiateDislay = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteInitiateDisplayElement);
  };

  const showNotes = async () => {
    showLoading();

    try {
      const result = await NotesApi.getNotes();
      displayResult(result);

      showNoteList();
    } catch (error) {
      showInitiateDislay();
    }
  };

  showNotes();

  // modal input
  const openModalNoteBtn1 = document.getElementById("openModalNoteBtn1");
  const openModalNoteBtn2 = document.getElementById("openModalNoteBtn2");

  const modalAddNote = document.querySelector("modal-add-note").shadowRoot;
  const modal = modalAddNote.getElementById("modalAddNote");
  const closeModalBtn = modalAddNote.getElementById("closeModalBtn");
  const cancelBtn = modalAddNote.getElementById("cancelBtn");
  const saveBtn = modalAddNote.getElementById("saveBtn");

  // Open modal
  openModalNoteBtn1.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Open modal
  openModalNoteBtn2.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  const closeModal = () => {
    modal.style.display = "none";

    const errorMessages = modal.getElementsByClassName("error-message");
    Array.from(errorMessages).forEach((element) => {
      element.textContent = "";
    });
  };

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  saveBtn.addEventListener("click", async () => {
    const title = modalAddNote.getElementById("title").value;
    const body = modalAddNote.getElementById("body").value;
    try {
      await NotesApi.createNote({
        title: title,
        body: body,
      });

      closeModal();
      showNotes();
      modalAddNote.getElementById("title").value = "";
      modalAddNote.getElementById("body").value = "";
    } catch (error) {
      alert(error);
    }
  });

  const form = modalAddNote.querySelector("form");
  const titleNoteInput = form.elements.title;
  const bodyNoteInput = form.elements.body;

  form.addEventListener("submit", (event) => event.preventDefault());

  const customValidationTitleNoteHandler = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Title wajib diisi.");
      return;
    }
  };

  const customValidationBodyNoteHandler = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Body wajib diisi.");
      return;
    }
  };

  titleNoteInput.addEventListener("change", customValidationTitleNoteHandler);
  titleNoteInput.addEventListener("invalid", customValidationTitleNoteHandler);

  bodyNoteInput.addEventListener("change", customValidationBodyNoteHandler);
  bodyNoteInput.addEventListener("invalid", customValidationBodyNoteHandler);

  titleNoteInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? modalAddNote.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.textContent = errorMessage;
    } else {
      connectedValidationEl.textContent = "";
    }
  });

  bodyNoteInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? modalAddNote.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.textContent = errorMessage;
    } else {
      connectedValidationEl.textContent = "";
    }
  });
  // end modal input
};

export default home;
