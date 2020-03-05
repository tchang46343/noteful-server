const folderService = {
  insertFolder(knex, folders) {
    return knex
      .insert(folders)
      .into("name")
      .returning("*")
      .then(data => {
        return data[0];
      });
  },
  getTitleById(knex, id) {
    return knex.from("folders").select("*");
  }
};

module.exports = folderService;
