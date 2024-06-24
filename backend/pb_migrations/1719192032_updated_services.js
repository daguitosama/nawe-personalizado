/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pniyvbxl",
    "name": "body_copy",
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
  const collection = dao.findCollectionByNameOrId("gcrgzcgfhbrhi54")

  // remove
  collection.schema.removeField("pniyvbxl")

  return dao.saveCollection(collection)
})
