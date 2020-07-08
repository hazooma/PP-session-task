"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.showItems = void 0;
const Item_1 = require("../model/Item");
const showItems = (req, res) => {
    const itemId = +req.query.id;
    return res
        .status(200)
        .send(itemId ? [Item_1.ITEMS.find((item) => item.id === itemId)] : Item_1.ITEMS);
};
exports.showItems = showItems;
const updateItem = (req, res) => {
    const itemId = +req.params.id;
    const itemName = req.body.itemName;
    const newItem = Item_1.ITEMS.find((item) => item.id === itemId);
    if (!newItem) {
        return res.status(404).json({
            status: "Fail",
            message: "No Item Found ! ",
            data: null,
        });
    }
    newItem.name = itemName;
    return res.status(200).send(newItem);
};
exports.updateItem = updateItem;
//# sourceMappingURL=itemController.js.map