import Product from "../models/Products";
import Collection from "../models/Collection";
import Category from "../models/Category";
import slugify from "slugify";
const productController = {
  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const { name } = req.body;
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });
      // Xử lý đường dẫn hình ảnh từ tệp đã tải lên
      const imagesPaths = req.files.map((file) => file.path);

      // Tạo sản phẩm mới với thông tin từ req.body và đường dẫn hình ảnh
      const productData = {
        ...req.body,
        images: imagesPaths,
        slug: slug,
      };
      const product = await Product.create(productData);

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      // Đọc các giá trị page và limit từ query string. Nếu không có, mặc định là trang 1 và giới hạn 10 sản phẩm mỗi trang.
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Tính số bản ghi cần bỏ qua
      const skip = (page - 1) * limit;

      // Truy vấn tìm tất cả sản phẩm với phân trang
      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .populate("category", "name")
        .populate("brand", "name")
        .sort({ createdAt: -1 });

      // Để phân trang tốt hơn, bạn cũng có thể muốn trả về tổng số bản ghi
      const total = await Product.countDocuments();

      // Tính tổng số trang
      const totalPages = Math.ceil(total / limit);

      // Trả về dữ liệu sản phẩm cùng với thông tin phân trang
      res.status(200).json({
        totalPages,
        page,
        limit,
        total,
        data: products,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Lấy sản phẩm bằng ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("topNotes")
        .populate("middleNotes")
        .populate("baseNotes");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getProductBySlug: async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug })
        .populate("brand", "name")
        .populate("topNotes", "name image")
        .populate("middleNotes", "name image")
        .populate("baseNotes", "name image");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const { name } = req.body;
      let updateData = { ...req.body }; // Copy tất cả dữ liệu từ body request vào updateData
      if (name) {
        updateData.slug = slugify(name, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData, // Sử dụng updateData đã được bổ sung trường slug
        { new: true } // Các tùy chọn để trả về đối tượng đã được cập nhật
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getNewProducts: async (req, res) => {
    try {
      // Read page and limit values from the query string. Default to page 1 and limit 10 if not provided.
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate the number of records to skip
      const skip = (page - 1) * limit;

      // Query to find all new products with pagination
      const products = await Product.find({ new: true })
        .skip(skip)
        .limit(limit)
        .populate("category", "name")
        .populate("brand", "name")
        .sort({ createdAt: -1 });

      // To better manage pagination, you might also want to return the total number of records
      const total = await Product.countDocuments({ new: true });

      // Calculate the total number of pages
      const totalPages = Math.ceil(total / limit);

      // Return product data along with pagination information
      res.status(200).json({
        totalPages,
        page,
        limit,
        total,
        data: products,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getBestSelling: async (req, res) => {
    try {
      // Read page and limit values from the query string. Default to page 1 and limit 10 if not provided.
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate the number of records to skip
      const skip = (page - 1) * limit;

      // Query to find all new products with pagination
      const products = await Product.find({ bestSelling: true })
        .skip(skip)
        .limit(limit)
        .populate("category", "name")
        .populate("brand", "name")
        .sort({ createdAt: -1 });

      // To better manage pagination, you might also want to return the total number of records
      const total = await Product.countDocuments({ bestSelling: true });

      // Calculate the total number of pages
      const totalPages = Math.ceil(total / limit);

      // Return product data along with pagination information
      res.status(200).json({
        totalPages,
        page,
        limit,
        total,
        data: products,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getProductByCollection: async (req, res) => {
    try {
      const { slug } = req.params; // Lấy slug từ đường dẫn
      const { page = 1, limit = 10 } = req.query; // Lấy giá trị phân trang từ query, mặc định là trang 1 và giới hạn 10

      // Tìm collection dựa trên slug
      const collection = await Collection.findOne({ slug: slug });
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      // Tính số bản ghi cần bỏ qua
      const skip = (page - 1) * limit;

      // Truy vấn tìm tất cả sản phẩm thuộc collection đó với phân trang
      const products = await Product.find({ collectionProduct: collection._id })
        .skip(skip)
        .limit(Number(limit))
        .populate("category", "name")
        .populate("brand", "name")
        .sort({ createdAt: -1 });

      // Để phân trang tốt hơn, bạn cũng có thể muốn trả về tổng số bản ghi
      const total = await Product.countDocuments({
        collectionProduct: collection._id,
      });

      // Tính tổng số trang
      const totalPages = Math.ceil(total / limit);

      // Trả về dữ liệu sản phẩm cùng với thông tin phân trang
      res.status(200).json({
        totalPages,
        page,
        limit,
        total,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductsByCategory: async (req, res) => {
    const { slug } = req.params; // Lấy slug của danh mục từ URL
    const page = parseInt(req.query.page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const limit = parseInt(req.query.limit) || 10; // Mặc định 10 items mỗi trang

    try {
      // Tìm danh mục bằng slug
      const category = await Category.findOne({ slug: slug });
      if (!category) {
        return res.status(404).send({ message: "Category not found." });
      }

      // Truy vấn các sản phẩm với các tùy chọn phân trang và sắp xếp
      const products = await Product.find({ category: category._id })
        .sort({ createdAt: -1 }) // Sắp xếp sản phẩm theo thứ tự mới nhất
        .skip((page - 1) * limit) // Bỏ qua các sản phẩm của các trang trước
        .limit(limit) // Giới hạn số lượng sản phẩm trả về
        .exec();

      // Đếm tổng số sản phẩm để hỗ trợ phân trang
      const count = await Product.countDocuments({ category: category._id });

      res.status(200).send({
        products,
        page,
        totalPages: Math.ceil(count / limit),
        totalProducts: count,
      });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving products.", error });
    }
  },
};

export default productController;
