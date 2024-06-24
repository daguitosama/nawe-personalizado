/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4ytsifttbwdj2na",
    "created": "2024-06-24 01:53:25.438Z",
    "updated": "2024-06-24 01:53:25.438Z",
    "name": "artciles_group_grid",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "i3vf4cu9",
        "name": "article_groups",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "blfizz9ybmxhbr0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "nmlhigmt",
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
  const collection = dao.findCollectionByNameOrId("4ytsifttbwdj2na");

  return dao.deleteCollection(collection);
})
