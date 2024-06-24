/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tcpxwr5h",
    "name": "main_image_desktop_alt_text",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6kpcpylr",
    "name": "main_image_mobile_alt_text",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // remove
  collection.schema.removeField("tcpxwr5h")

  // remove
  collection.schema.removeField("6kpcpylr")

  return dao.saveCollection(collection)
})
