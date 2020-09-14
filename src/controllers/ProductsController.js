import Product from '../models/Product';
import { Types } from 'mongoose';

// show all items

export const index = async (req, res) => {
	const products = await Product.find();
	
	res.status(200).json(products)
}

// save a item

export const store = async (req, res) => {

	// const { name, category, price, imgURL } = req.body

	const newProduct = new Product(req.body)

	const product = await newProduct.save();

	res.status(201).json({
		message: 'Producto creado correctamente',
		product
	})
}

// show a item by id

export const show = async (req, res) => {

	// Si la ID es invalida para mongo
	validateId(req.params.id, res)

	const item  = await Product.findById(req.params.id);

	return res.status(200).json(item);
}

// update a item by id

export const update = async (req, res) => {
	
	validateId(req.params.id, res)

	// el new true es para que mongo retorne el producto nuevo y no el anterior
	const updatedItem = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	res.status(201).json({
		message: 'Producto actualizado correctamente',
		product: updatedItem
	})
}

// remove a item by id

export const destroy = async (req, res) => {

	validateId(req.params.id, res)

	const deletedProduct = await Product.findByIdAndDelete(req.params.id);

	res.status(200).json({
		message: 'Producto eliminado correctamente',
		product: deletedProduct
	})
}

// methods utils

const validateId = (id, res) => {
	// Si la ID es invalida para mongo

	if(!Types.ObjectId.isValid(id))
		return res.status(404).json({
			message: "ID Invalida"
		})
}
