/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kafsp9v1",
    "name": "details",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0lzykfd2kngtib3",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kafsp9v1",
    "name": "Details",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0lzykfd2kngtib3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
