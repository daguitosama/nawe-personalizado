/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7ot3lmiqqrkpjg4",
    "created": "2024-06-24 01:38:16.854Z",
    "updated": "2024-06-24 01:38:16.854Z",
    "name": "article_colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ozosswgc",
        "name": "name",
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
        "id": "1kkjga57",
        "name": "color_code",
        "type": "text",
        "required": true,
        "presentable": false,
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
  const collection = dao.findCollectionByNameOrId("7ot3lmiqqrkpjg4");

  return dao.deleteCollection(collection);
})
