import User from "../models/User.js";

const authMiddleware = {
	requireAdmin: async (req, res, next) => {
		try {
			// Giả định req.user chứa ID của người dùng đã đăng nhập
			const user = await User.findById(req.user._id);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Kiểm tra nếu người dùng không phải là admin
			if (!user.isAdmin) {
				return res.status(403).json({ message: "Access denied, admin only" });
			}
			next();
		} catch (error) {
			console.error("Authentication error", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	requireSelf: async (req, res, next) => {
		try {
			const user = await User.findById(req.user._id);
			const userIdToAccess = req.params.userId; // Giả định ID người dùng cần truy cập được truyền qua params

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Kiểm tra nếu ID người dùng không trùng khớp
			if (user._id.toString() !== userIdToAccess) {
				return res
					.status(403)
					.json({ message: "Access denied, can only access your own data" });
			}

			next();
		} catch (error) {
			console.error("Authentication error", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
};

export default authMiddleware;
