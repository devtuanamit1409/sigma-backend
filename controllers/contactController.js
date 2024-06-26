import Contact from "../models/Contact";

const contactController = {
  // Create a new contact
  create: async (req, res) => {
    try {
      const { firstName, lastName, phone, birthDate, email, title, content } =
        req.body;

      const image = req.file ? req.file.path : null;

      const newContact = new Contact({
        firstName,
        lastName,
        phone,
        birthDate,
        email,
        title,
        content,
        image,
      });

      await newContact.save();

      res.json({ message: "Contact created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all contacts with pagination
  getContacts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalContacts = await Contact.countDocuments();
      const contacts = await Contact.find().skip(skip).limit(limit);

      res.json({
        page,
        limit,
        totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
        contacts,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get a contact by id
  getContact: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default contactController;
