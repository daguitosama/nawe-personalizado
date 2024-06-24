/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfizz9ybmxhbr0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pljyu8ln",
    "name": "articles",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9b98ht9aiv45wv5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfizz9ybmxhbr0")

  // remove
  collection.schema.removeField("pljyu8ln")

  return dao.saveCollection(collection)
})
