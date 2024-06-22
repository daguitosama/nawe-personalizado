/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0lzykfd2kngtib3",
    "created": "2024-06-22 14:51:54.993Z",
    "updated": "2024-06-22 14:51:54.993Z",
    "name": "Details",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xw4k8mzd",
        "name": "Summary",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "od9zu1o3",
        "name": "Content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
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
  const collection = dao.findCollectionByNameOrId("0lzykfd2kngtib3");

  return dao.deleteCollection(collection);
})
