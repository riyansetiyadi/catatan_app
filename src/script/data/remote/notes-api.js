const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;

    return notes;
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;

    return notes;
  }

  static async createNote(note) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;

    if (notes.length <= 0) {
      throw new Error(`Something went wrong`);
    }

    return notes;
  }

  static async archiveNote(id) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();

    if (responseJson.status != "success") {
      throw new Error(`Something went wrong`);
    }

    return responseJson.message;
  }

  static async unarchiveNote(id) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();

    if (responseJson.status != "success") {
      throw new Error(`Something went wrong`);
    }

    return responseJson.message;
  }

  static async deleteNote(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${BASE_URL}/notes/${id}`, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();

    if (responseJson.status != "success") {
      throw new Error(`Something went wrong`);
    }

    return responseJson.message;
  }
}

export default NotesApi;
