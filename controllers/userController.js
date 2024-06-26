import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../models/Order";

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, dateBirth, phone, email, password } =
        req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          email,
          password: hashedPassword,
          firstName,
          lastName,
          dateBirth,
          phone,
        });
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate({
        path: "cart.product", // Đường dẫn tới trường cần populate
        select: "name images", // Chỉ định các trường cần lấy
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // User login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res
          .status(401)
          .json({ message: "Tài khoản hoặc mật khẩu không chính xác" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "365d", // Token sẽ hết hạn sau 365 ngày
        });
        const userToReturn = { ...user._doc, password: undefined };

        res.status(200).json({
          token,
          user: userToReturn, // Trả về thông tin người dùng cùng với token
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity, sizeInfo } = req.body; // Thêm sizeInfo vào payload yêu cầu
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa với cùng productId và size
      const existingProductIndex = user.cart.findIndex(
        (item) =>
          item.product.toString() === productId &&
          item.sizeInfo.size === sizeInfo.size
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại với cùng productId và size, chỉ cập nhật số lượng
        user.cart[existingProductIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại hoặc không tồn tại với size đó, thêm vào giỏ hàng
        user.cart.push({ product: productId, quantity, sizeInfo }); // Thêm sản phẩm mới với sizeInfo vào giỏ hàng
      }

      await user.save();
      res.status(200).json({
        message: "Đã thêm sản phẩm vào giỏ hàng thành công",
        cart: user.cart, // Trả về giỏ hàng cập nhật
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (req, res) => {
    try {
      const { userId, productId, size } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Lọc ra những sản phẩm khác sản phẩm cần xóa
      user.cart = user.cart.filter(
        (item) =>
          item.product.toString() !== productId || item.sizeInfo.size !== size
      );

      await user.save();
      res
        .status(200)
        .json({ message: "Đã xóa sản phẩm khỏi giỏ hàng thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // xóa số lượng sản phẩm khỏi giỏ hàng
  removeQuantityFromCart: async (req, res) => {
    try {
      const { userId, productId, size, quantity } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingProductIndex = user.cart.findIndex(
        (item) =>
          item.product.toString() === productId && item.sizeInfo.size === size
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm tồn tại, giảm số lượng
        user.cart[existingProductIndex].quantity -= quantity;

        // Nếu số lượng sản phẩm bằng hoặc nhỏ hơn 0, xóa sản phẩm khỏi giỏ hàng
        if (user.cart[existingProductIndex].quantity <= 0) {
          user.cart = user.cart.filter(
            (item) =>
              item.product.toString() !== productId ||
              item.sizeInfo.size !== size
          );
        }
      }

      await user.save();
      res
        .status(200)
        .json({ message: "Đã xóa số lượng sản phẩm khỏi giỏ hàng thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Thêm sản phẩm vào danh sách yêu thích
  addToFavorites: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
      const isProductInFavorites = user.favoriteProducts.includes(productId);

      if (!isProductInFavorites) {
        // Nếu sản phẩm chưa tồn tại, thêm vào danh sách yêu thích
        user.favoriteProducts.push(productId);
        await user.save();
      }

      res
        .status(200)
        .json({ message: "Product added to favorites successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // tạo đơn hàng
  createOrderFromCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId).populate("cart.product");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Tạo một đơn hàng mới từ giỏ hàng của người dùng
      const orderProducts = user.cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const newOrder = new Order({
        userId: userId,
        products: orderProducts,
      });

      await newOrder.save();

      // Xóa giỏ hàng sau khi tạo đơn hàng thành công
      user.cart = [];
      await user.save();

      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default userController;
