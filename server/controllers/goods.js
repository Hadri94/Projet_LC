// Import function from Goods Model
import { getGoods, getGoodsById, insertGoods, updateGoodsById, deleteGoodsById, getGoodsBySellerId } from "../models/goodsModel.js";

// Get All Goods
export const showGoods = (req, res) => {
    getGoods((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single Goods
export const showGoodsById = (req, res) => {
    getGoodsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Goods by seller
export const showGoodsBySellerId = (req, res) => {
    getGoodsBySellerId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Goods
export const createGoods = (req, res) => {
    const data = req.body;
    insertGoods(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Goods
export const updateGoods = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateGoodsById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Goods
export const deleteGoods = (req, res) => {
    const id = req.params.id;
    deleteGoodsById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
