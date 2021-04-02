'use strict';

const Item = require('./item-model.js');
const DataModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    //add a save to db and await cuz of async
    await item.save();
    //change this status to 200
    res.status(200).json(item);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({});
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  //should be params
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).json(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  //do this
  const index = parseInt(req.params.index);
  // check to make sure this is what they're sending actually
  const items = req.query.item;

  await Item.findOne({_id:id}, (err, entry) => {
    const newItemArr = entry.items.filter((item, i) => {
      return i !== index;
    })
    entry.items = newItemArr;
    entry.save();
    response.status(200).send('successfully deleted!');
  })
}

Data.updateOneItem = async(req, res) => {
  //should be params
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
