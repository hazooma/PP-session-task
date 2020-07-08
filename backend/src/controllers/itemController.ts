import { Request, Response } from "express";

import { ITEMS } from "../model/Item";

const showItems = (req: Request, res: Response) => {
  const itemId = +req.query.id;
  return res
    .status(200)
    .send(itemId ? [ITEMS.find((item) => item.id === itemId)] : ITEMS);
};

const updateItem = (req: Request, res: Response) => {
  const itemId: number = +req.params.id;
  const itemName = req.body.itemName;
  const newItem = ITEMS.find((item) => item.id === itemId);
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

export { showItems, updateItem };
