import Collection from "../models/Collection";
import slugify from "slugify";
const collectionController = {
  createCollection: async (req, res) => {
    try {
      const { name, description } = req.body;
      const files = req.files;
      let image, banner;

      // Đảm bảo các trường được xử lý đúng
      if (files["image"] && files["image"][0]) {
        image = files["image"][0].path;
      }

      if (files["banner"] && files["banner"][0]) {
        banner = files["banner"][0].path;
      }

      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });

      const collection = new Collection({
        name,
        slug,
        image,
        description,
        banner,
      });

      await collection.save();
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllCollections: async (req, res) => {
    try {
      const collections = await Collection.find();
      res.status(200).json(collections);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getCollectionById: async (req, res) => {
    try {
      const collection = await Collection.findById(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.status(200).json(collection);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateCollection: async (req, res) => {
    try {
      const { name, description } = req.body;
      const files = req.files;
      let updateData = {
        name,
        description,
      };

      // Xử lý file image nếu có
      if (files["image"] && files["image"][0]) {
        updateData.image = files["image"][0].path;
      }

      // Xử lý file banner nếu có
      if (files["banner"] && files["banner"][0]) {
        updateData.banner = files["banner"][0].path;
      }

      if (name) {
        updateData.slug = slugify(name, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        });
      }

      const updatedCollection = await Collection.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedCollection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      res.status(200).json(updatedCollection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCollection: async (req, res) => {
    try {
      const collection = await Collection.findByIdAndDelete(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.status(200).json({ message: "Collection deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default collectionController;
