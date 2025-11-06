import Category from "../models/categoryModel.js";
import slugify from 'slugify';

// CRUD in category route
//create a category
const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryImage } = req.body;

    if (!categoryName || !categoryImage) {
      return res.status(400).json({
        message: "Please enter category name and image url",
        status: false,
      });
    }

    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists",
        status: false,
      });
    }

    const category = new Category({
      categoryName,
      categoryImage,
      slug: slugify(categoryName),
    });

    await category.save();

    return res.status(201).json({
      message: "Category Saved Successfully",
      status: true,
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error in creating category",
      error: error.message,
    });
  }
};

//Read the category
const getAllCategory=async (req,res)=>{
  try {
    const categories=await Category.find();
    if(!categories || categories.length==0){
      return res.send({
        status:false,
        message:"category not found / Empty"
      })
    }
    res.send({
      status:true,
      message:"All category are here",
      categories
    })
    
  } catch (error) {
    console.log(error);
    
  }
}

// Update category
const updateCategory=async (req,res)=>{
  try {
    const {id}=req.params;
    const {categoryName, categoryImage}=req.body;
    const category= await Category.findByIdAndUpdate(id,{categoryName:slugify(categoryName), categoryImage},{new:true});
    res.send({
      status:true,
      message:"Category Updated Successfully",
      category
    })
  } catch (error) {
    console.log(error);
    res.send({
      status:false,
      message:"Error in updating the category",
      error
    })
  }
}

//delete Category
const deleteCategory=async(req,res)=>{
  try {
    const { id } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.send({
      status:false,
      message:"Error to delete this category",
    })
  }
}
export { createCategory, getAllCategory, updateCategory, deleteCategory }