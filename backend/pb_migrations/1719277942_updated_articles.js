/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b98ht9aiv45wv5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "za9x27lp",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b98ht9aiv45wv5")

  // remove
  collection.schema.removeField("za9x27lp")

  return dao.saveCollection(collection)
})
