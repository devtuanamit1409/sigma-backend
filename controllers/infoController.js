import Info from "../models/Info";

const infoController = {
  getInfo: async (req, res) => {
    try {
      const info = await Info.findOne();
      if (!info) {
        return res.status(404).json({ message: "Info not found" });
      }
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật thông tin
  updateInfo: async (req, res) => {
    try {
      const { title, subTitle, description, subDescription } = req.body;
      const firstBanner = req.files["firstBanner"]
        ? req.files["firstBanner"][0].path
        : undefined;
      const secondBanner = req.files["secondBanner"]
        ? req.files["secondBanner"][0].path
        : undefined;

      let info = await Info.findOne();
      if (!info) {
        info = new Info();
      }
      info.title = title ?? info.title;
      info.subTitle = subTitle ?? info.subTitle;
      info.description = description ?? info.description;
      info.subDescription = subDescription ?? info.subDescription;
      if (firstBanner) {
        info.firstBanner = firstBanner;
      }
      if (secondBanner) {
        info.secondBanner = secondBanner;
      }

      const updatedInfo = await info.save();
      res.json(updatedInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default infoController;
