/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfizz9ybmxhbr0")

  collection.name = "articles_group"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfizz9ybmxhbr0")

  collection.name = "article_groups"

  return dao.saveCollection(collection)
})
