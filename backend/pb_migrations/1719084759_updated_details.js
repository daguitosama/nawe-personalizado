/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lzykfd2kngtib3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zav94ryh",
    "name": "for_page",
    "type": "text",
    "required": false,
    "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("0lzykfd2kngtib3")

  // remove
  collection.schema.removeField("zav94ryh")

  return dao.saveCollection(collection)
})
