/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lzykfd2kngtib3")

  collection.name = "details"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lzykfd2kngtib3")

  collection.name = "Details"

  return dao.saveCollection(collection)
})
