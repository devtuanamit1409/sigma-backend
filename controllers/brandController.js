import Brand from "../models/Brand";
import slugify from "slugify";
const brandController = {
  // Tạo thương hiệu mới
  createBrand: async (req, res) => {
    try {
      const { name } = req.body;
      // Tạo slug từ name
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });

      // Tạo đối tượng brand mới với name và slug
      const brand = new Brand({ name, slug });
      await brand.save();

      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Lấy tất cả các thương hiệu
  getAllBrands: async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Lấy thương hiệu bằng ID
  getBrandById: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json(brand);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Cập nhật thương hiệu
  updateBrand: async (req, res) => {
    try {
      const { name } = req.body;

      // Tạo một object update với thông tin mới
      const update = { ...req.body };

      // Nếu tên mới được cung cấp, tạo slug mới từ tên này
      if (name) {
        update.slug = slugify(name, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        });
      }

      // Tìm và cập nhật brand bằng id với thông tin mới, trả về document đã cập nhật
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      );

      if (!updatedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }

      res.status(200).json(updatedBrand);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Xóa thương hiệu
  deleteBrand: async (req, res) => {
    try {
      const brand = await Brand.findByIdAndDelete(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default brandController;
