import FragranceNote from "../models/FragranceNote";

const fragranceNoteController = {
	// Tạo ghi chú hương mới
	createFragranceNote: async (req, res) => {
		try {
			const { name } = req.body;
			const image = req.file.path;
			const fragranceNote = new FragranceNote({ name, image });
			await fragranceNote.save();
			res.status(200).json(fragranceNote);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	// Lấy tất cả các ghi chú hương
	getAllFragranceNotes: async (req, res) => {
		try {
			const fragranceNotes = await FragranceNote.find();
			res.status(200).json(fragranceNotes);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// Lấy ghi chú hương bằng ID
	getFragranceNoteById: async (req, res) => {
		try {
			const fragranceNote = await FragranceNote.findById(req.params.id);
			if (!fragranceNote) {
				return res.status(404).json({ message: "Fragrance note not found" });
			}
			res.status(200).json(fragranceNote);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// Cập nhật ghi chú hương
	updateFragranceNote: async (req, res) => {
		const { name } = req.body;
		try {
			let updatedFragranceNote;
			if (req.file) {
				const image = req.file.path;
				updatedFragranceNote = await FragranceNote.findByIdAndUpdate(
					req.params.id,
					{ name, image },
					{ new: true }
				);
			} else {
				updatedFragranceNote = await FragranceNote.findByIdAndUpdate(
					req.params.id,
					{ name },
					{ new: true }
				);
			}
			if (!updatedFragranceNote) {
				return res.status(404).json({ message: "Fragrance note not found" });
			}
			res.status(200).json(updatedFragranceNote);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	// Xóa ghi chú hương
	deleteFragranceNote: async (req, res) => {
		try {
			const fragranceNote = await FragranceNote.findByIdAndDelete(
				req.params.id
			);
			if (!fragranceNote) {
				return res.status(404).json({ message: "Fragrance note not found" });
			}
			res.status(200).json({ message: "Fragrance note deleted successfully" });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
};

export default fragranceNoteController;
