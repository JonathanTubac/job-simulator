import * as model from '../models/product.model.js';

export const getAll = async (req, res) => {
    try {
        const data = await model.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.getById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name, category, brand, stock, price, available } = req.body;
        const data = await model.create({ name, category, brand, stock, price, available });
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, brand, stock, price, available } = req.body;
        const data = await model.update(id, { name, category, brand, stock, price, available });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.remove(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const patch = async (req, res) => {
    try {
        const { id } = req.params;
        const fields = req.body;
        const data = await model.patch(id, fields);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
