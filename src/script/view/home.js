import Utils from "../utils.js";
import Swal from "sweetalert2";
import NotesApi from "../data/remote/notes-api.js";
import anime from "animejs";

const home = () => {
  // delay function
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // intiate toast
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

  // display notes
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteInitiateDisplayElement =
    noteListContainerElement.querySelector(".initiate-display");
  const noteLoadingElement =
    noteListContainerElement.querySelector(".notes-loading");
  const noteArchiveEmptyElement = noteListContainerElement.querySelector(
    ".empty-notes-archive"
  );
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const displayResult = (notes, isArchive = false) => {
    const colors = ["#FFF9CF", "#D0E0FF", "#EDD5FF", "#D4F4D4", "#FFC3C4"];
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const noteItemElements = notes.map((note, index) => {
      const noteItemElement = document.createElement("note-item");

      noteItemElement.addEventListener("note-archived", () => {
        showNotes();
      });

      noteItemElement.addEventListener("note-unarchived", () => {
        showNotes(true);
      });
      noteItemElement.addEventListener("note-delete", () => {
        showNotes(true);
      });

      noteItemElement.note = note;
      noteItemElement.bgColor = colors[index % colors.length];

      if (isArchive) {
        noteItemElement.isArchive = true;
      }

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

  const showEmptyArchiveDislay = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteArchiveEmptyElement);
  };

  const showNotes = async (isArchive = false) => {
    showLoading();
    try {
      const [result, _] = await Promise.all([
        isArchive
          ? await NotesApi.getArchivedNotes()
          : await NotesApi.getNotes(),
        delay(2000),
      ]);

      if (result.length <= 0) {
        isArchive ? showEmptyArchiveDislay() : showInitiateDislay();
      } else {
        displayResult(result, isArchive);
        showNoteList();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
      isArchive ? showEmptyArchiveDislay() : showInitiateDislay();
    }
  };

  showNotes();
  // end display notes

  // modal input add note
  const modalAddNote = document.querySelector("modal-add-note").shadowRoot;
  const modal = modalAddNote.getElementById("modalAddNote");

  // button trigger open modal
  const openModalNoteBtn1 = document.getElementById("openModalNoteBtn1");
  const openModalNoteBtn2 = document.getElementById("openModalNoteBtn2");

  // Open modal
  openModalNoteBtn1.addEventListener("click", () => openModal());

  // Open modal
  openModalNoteBtn2.addEventListener("click", () => openModal());

  const openModal = () => {
    modal.style.display = "flex";
    anime({
      targets: modal,
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 800,
      easing: "easeOutQuad",
    });
    Utils.hideElement(modalLoading);
  };

  // button modal
  const closeModalBtn = modalAddNote.getElementById("closeModalBtn");
  const cancelBtn = modalAddNote.getElementById("cancelBtn");
  const saveBtn = modalAddNote.getElementById("saveBtn");

  // loading modal
  const modalLoading = modalAddNote.querySelector("loader-display");

  // Close modal
  const closeModal = () => {
    anime({
      targets: modal,
      opacity: [1, 0],
      scale: [1, 0.5],
      duration: 800,
      easing: "easeOutQuad",
      complete: function () {
        modal.style.display = "none";
        const errorMessages = modal.getElementsByClassName("error-message");
        Array.from(errorMessages).forEach((element) => {
          element.textContent = "";
        });
      },
    });
  };

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // form add note
  const form = modalAddNote.querySelector("form");
  const titleNoteInput = form.elements.title;
  const bodyNoteInput = form.elements.body;

  saveBtn.addEventListener("click", async () => {
    Utils.hideElement(saveBtn);
    Utils.showElement(modalLoading);

    const title = modalAddNote.getElementById("title").value;
    const body = modalAddNote.getElementById("body").value;
    if (title.trim() != "" && body.trim() != "")
      try {
        await Promise.all([
          NotesApi.createNote({
            title: title,
            body: body,
          }),
          delay(2000),
        ]);
        closeModal();
        showNotes();
        modalAddNote.getElementById("title").value = "";
        modalAddNote.getElementById("body").value = "";

        Toast.fire({
          icon: "success",
          title: "Success create note",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed create note",
        });
      }
    Utils.hideElement(modalLoading);
    Utils.showElement(saveBtn);
  });

  form.addEventListener("submit", (event) => event.preventDefault());

  // custom validation
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

  // handle menu active
  const menuItems = document.querySelectorAll(".menu li a");
  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      setActive(item);
    });
  });

  function setActive(element) {
    const items = document.querySelectorAll(".menu li");
    items.forEach((item) => item.classList.remove("active"));

    element.parentElement.classList.add("active");

    const contentName = element.getAttribute("data-content");
    if (contentName == "archive") {
      showNotes(true);
    } else {
      showNotes();
    }
  }
  // end handle menu active
};

export default home;
