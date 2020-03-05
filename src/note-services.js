const noteService = {
  insertNote(knex, newNote) {
    return knex
      .insert(newNote)
      .into("note")
      .returning("*")
      .then(data => {
        return data;
      });
  },
  getTitleById(knex, id) {
    return knex.from("note").select("*");
  }
};

module.exports = noteService;
