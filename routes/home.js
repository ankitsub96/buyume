const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
require("../models/inventory");
const Inventory = mongoose.model("Inventory");
const { sendError, sendSuccess } = require("../utils/utility");

router.use((req, res, next) => {
  //commonly used to authenticate and restrict access, usign, for ex, a jwt token and role-based resource access restrictions
  return next();
});

router.post("/", async (req, res, next) => {
  try { 
    // throw new Error("sadfad");
    let { payload } = req.body;
    console.log({ "req.body": req.body });
    if (!(payload && Array.isArray(payload))) {
      console.log(
        "invalid parameters, as an attribute payload of type array is required."
      );
      return sendError({
        res,
        code: 400,
        message:
          "invalid parameters, as an attribute payload of type array is required.",
        data: {},
      });
    }
    let errIndex = -1,
      message = "";
    for (let ind in payload) {
      let obj = payload[ind];
      if (!("productId" in obj && typeof (obj["productId"] == "string"))) {
        errIndex = ind;
        message = "Missing/improper productId";
        break;
      } else if (!("quantity" in obj && typeof (obj["quantity"] == "number"))) {
        errIndex = ind;
        message = "Missing/improper quantity";
        break;
      } else if (
        !(
          "operation" in obj &&
          Object.values(Inventory.OPERATION_TYPES).indexOf(obj["quantity"]) ==
            -1
        )
      ) {
        errIndex = ind;
        message = "Missing/improper operation";
        break;
      }
    }
    if (errIndex != -1) {
      console.log({ message });
      return sendError({ res, code: 400, message, data: { errIndex } });
    }
    // sample payload= [{productId:123,quantity:10,operation:”add”},
    //   {productId:143,quantity:14,operation:”add”},
    //   {productId:193,quantity:17,operation:”subtract”}]
    let results = [];
    for (let ind in payload) {
      //can be converted to promise.all
      let obj = payload[ind];
      let { productId, quantity, operation } = obj;
      if (operation == Inventory.OPERATION_TYPES.ADD) {
        let record = await Inventory.findOneAndUpdate(
          { productId, act: true },
          {
            $inc: {
              quantity,
            },
          },
          {
            new: true,
            upsert: true,
            projection: {
              act: 0,
            },
          }
        );
        results.push(record);
      } else if (operation == Inventory.OPERATION_TYPES.SUBTRACT) {
        let record = await Inventory.findOneAndUpdate(
          { productId, act: true },
          {
            $inc: {
              quantity: -1 * quantity,
            },
          },
          {
            new: true,
            upsert: true,
            projection: {
              act: 0,
            },
          }
        );
        results.push(record);
      }
    }
    console.log({ results });
    return sendSuccess({
      res,
      code: 200,
      message: "Success",
      data: { results },
    });
  } catch (err) {
    console.log({ err });
    return sendError({
      res,
      code: 500,
      message: "Server Error. Please try again later",
      data: {},
    });
  }
});
// export default router
module.exports = router;
