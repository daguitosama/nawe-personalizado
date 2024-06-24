/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6forskfd",
    "name": "main_image_desktop",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yjk0avxv",
    "name": "main_image_mobile",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // remove
  collection.schema.removeField("6forskfd")

  // remove
  collection.schema.removeField("yjk0avxv")

  return dao.saveCollection(collection)
})
