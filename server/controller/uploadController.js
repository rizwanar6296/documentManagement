const path = require("path");
const Upload = require("../model/upload.model");
const WordExtractor = require("word-extractor");

module.exports = {
  upload: async (req, res) => {
    const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);
    const extractor = new WordExtractor();
    const extractedText = await extractor.extract(filePath);
    const saveExtractedText = new Upload({
      fileName: req.file.filename,
      orginalName: req.file.originalname,
      text: extractedText._body,
    });
    const savedExtract = await saveExtractedText.save();
    res.send(savedExtract);
  },
  getAllDocuments: async (req, res) => {
    const documents = await Upload.find();
    res.json(documents);
  },
  downloadDocument: async (req, res) => {
    const { docId } = req.params;
    const document = await Upload.findById(docId);
    const filePath = path.join(__dirname, `../uploads/${document.fileName}`);
    res.download(filePath);
  },
  search: async (req, res) => {
    const { searchKey } = req.params;
    const regex = new RegExp(searchKey, "i");
    const documents = await Upload.find({ text: { $regex: regex } });
    res.json(documents);
  },
};
