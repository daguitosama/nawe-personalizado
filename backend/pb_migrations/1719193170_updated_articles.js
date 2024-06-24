/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b98ht9aiv45wv5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gjkqjvi3",
    "name": "option_colors",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7ot3lmiqqrkpjg4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9b98ht9aiv45wv5")

  // remove
  collection.schema.removeField("gjkqjvi3")

  return dao.saveCollection(collection)
})
