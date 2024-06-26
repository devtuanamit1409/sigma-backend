import News from "../models/News";
import slugify from "slugify";

const newController = {
  createNews: async (req, res) => {
    try {
      const { title, describe, content, author } = req.body;
      const image = req.file ? req.file.path : "";
      const slug = slugify(title, { lower: true, strict: true });
      const news = await News.create({
        title,
        image,
        describe,
        content,
        author,
        slug,
      });
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getNews: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalNews = await News.countDocuments();
      const news = await News.find().skip(skip).limit(limit);

      res.json({
        page,
        limit,
        totalNews,
        totalPages: Math.ceil(totalNews / limit),
        news,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getNewsById: async (req, res) => {
    try {
      const news = await News.findById(req.params.id);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateNews: async (req, res) => {
    try {
      const news = await News.findById(req.params.id);
      if (news) {
        news.title = req.body.title || news.title;
        news.slug = req.body.title
          ? slugify(req.body.title, { lower: true, strict: true })
          : news.slug;

        // Cập nhật trường image chỉ khi có file mới được tải lên
        if (req.file) {
          news.image = req.file.path; // Lưu đường dẫn mới của file ảnh
        }

        news.describe = req.body.describe || news.describe;
        news.content = req.body.content || news.content;
        news.author = req.body.author || news.author;

        const updatedNews = await news.save();
        res.json(updatedNews);
      } else {
        res.status(404).json({ message: "News not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteNews: async (req, res) => {
    try {
      const result = await News.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({ message: "News removed" });
      } else {
        res.status(404).json({ message: "News not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default newController;
