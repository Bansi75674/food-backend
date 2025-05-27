import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req,res) => {

let image_filename = `${req.file.filename}`;

const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
try {
    await food.save();
    res.json({success:true,message:"Food Added"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
}
}

// all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Remove"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const editFood = async (req, res) => {
    try {
        const foodId = req.body.id;
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        };

        // If a new image is uploaded
        if (req.file) {
            const food = await foodModel.findById(foodId);
            if (food.image) {
                // Remove the old image from uploads folder
                fs.unlink(`uploads/${food.image}`, () => {});
            }
            updatedData.image = req.file.filename;
        }

        await foodModel.findByIdAndUpdate(foodId, updatedData);
        res.json({ success: true, message: "Food Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
};


export {addFood,listFood,removeFood, editFood }