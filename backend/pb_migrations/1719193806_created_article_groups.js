/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "blfizz9ybmxhbr0",
    "created": "2024-06-24 01:50:06.228Z",
    "updated": "2024-06-24 01:50:06.228Z",
    "name": "article_groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mxaetkol",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wxb8o5dm",
        "name": "for_page",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("blfizz9ybmxhbr0");

  return dao.deleteCollection(collection);
})
