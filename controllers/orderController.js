import Order from "../models/Order";
import crypto from "crypto";
import User from "../models/User";

const generateOrderCode = () => {
  return "SIGMA" + crypto.randomBytes(3).toString("hex").toUpperCase();
};

const orderController = {
  createOrder: async (req, res) => {
    const { userId, products, total } = req.body;
    try {
      const newOrder = new Order({
        code: generateOrderCode(),
        userId,
        products,
        total,
        status: "Chờ thanh toán", // Mặc định trạng thái
      });

      // Lưu đơn hàng mới
      const savedOrder = await newOrder.save();

      // Tìm người dùng và cập nhật giỏ hàng của họ
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Loại bỏ các sản phẩm trong đơn hàng khỏi giỏ hàng
      const productIdsInOrder = products.map((p) => p.product.toString());
      user.cart = user.cart.filter(
        (item) => !productIdsInOrder.includes(item.product.toString())
      );
      // Lưu cập nhật giỏ hàng
      await user.save();

      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy số trang từ query, mặc định là 1
    const limit = parseInt(req.query.limit) || 10; // Lấy giới hạn số lượng từ query, mặc định là 10 mục mỗi trang
    const skip = (page - 1) * limit; // Tính số lượng bỏ qua để "nhảy" đến đầu trang cần lấy

    try {
      const total = await Order.countDocuments(); // Đếm tổng số đơn hàng
      const orders = await Order.find()
        .populate("userId")
        .populate("products.product")
        .skip(skip) // Bỏ qua số lượng đã tính để phân trang
        .limit(limit) // Giới hạn số lượng trả về trong một trang
        .exec(); // Thực thi truy vấn

      res.status(200).json({
        totalPages: Math.ceil(total / limit), // Tính tổng số trang
        currentPage: page,
        limit,
        totalItems: total,
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrder: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = status;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrdersByUser: async (req, res) => {
    const { userId } = req.params; // Lấy userId từ params
    const { status, page = 1, limit = 10 } = req.query; // Lấy status, page và limit từ query
    const queryOptions = {
      userId: userId,
    };
    if (status) {
      queryOptions.status = status; // Thêm điều kiện lọc theo status nếu có
    }

    const skip = (page - 1) * limit;

    try {
      const total = await Order.countDocuments(queryOptions); // Đếm tổng số đơn hàng theo điều kiện
      const orders = await Order.find(queryOptions)
        .populate("userId")
        .populate("products.product")
        .skip(skip)
        .limit(limit)
        .exec();

      res.status(200).json({
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        limit,
        totalItems: total,
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrderDetails: async (req, res) => {
    const { id } = req.params;
    const { fullName, email, phone, address, province, district, ward } =
      req.body;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Cập nhật thông tin
      order.fullName = fullName;
      order.email = email;
      order.phone = phone;
      order.address = address;
      order.province = province;
      order.district = district;
      order.ward = ward;

      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderById: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findById(id)
        .populate("userId") // Giả sử bạn muốn thông tin chi tiết về người dùng
        .populate({
          path: "products.product",
          model: "Product",
        }); // Giả sử bạn muốn thông tin chi tiết về sản phẩm

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default orderController;
