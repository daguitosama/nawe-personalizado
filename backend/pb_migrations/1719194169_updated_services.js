/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7lxqvboq",
    "name": "article_group_grid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4ytsifttbwdj2na",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // remove
  collection.schema.removeField("7lxqvboq")

  return dao.saveCollection(collection)
})
