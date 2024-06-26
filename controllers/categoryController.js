import Category from "../models/Category";
import slugify from "slugify";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, homeView } = req.body;
      // Tạo slug từ name
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });

      // Tạo đối tượng category mới với name và slug
      const category = new Category({ name, homeView, slug });
      await category.save();

      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      // Kiểm tra xem tên có trong request và tạo slug mới nếu cần
      const update = { ...req.body };
      if (name) {
        update.slug = slugify(name, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
export default categoryController;
