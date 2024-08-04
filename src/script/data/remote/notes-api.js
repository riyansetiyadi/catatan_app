const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  //   static async searchClub(query) {
  //     const response = await fetch(`${BASE_URL}/teams/search?t=${query}`);

  //     if (!(response.status >= 200 && response.status < 300)) {
  //       throw new Error(`Something went wrong`);
  //     }

  //     const responseJson = await response.json();
  //     const { teams: clubs } = responseJson;

  //     if (clubs.length <= 0) {
  //       throw new Error(`\`${query}\` is not found`);
  //     }

  //     return clubs;
  //   }

  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }

    const responseJson = await response.json();
    const { data: notes } = responseJson;

    if (notes.length <= 0) {
      throw new Error(`Empty notes`);
    }

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
}

export default NotesApi;
