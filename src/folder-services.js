const folderService = {
  insertFolder(knex, folders) {
    return knex
      .insert(folders)
      .into("title")
      .returning("*")
      .then(([folders]) => folders);
  },
  getTitleById(knex, id) {
    return knex.from("folders").select("*");
  }
};

module.exports = folderService;
