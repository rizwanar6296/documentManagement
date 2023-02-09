const path = require("path");
const Upload = require("../model/upload.model");
const WordExtractor = require("word-extractor");

module.exports = {
  upload: async (req, res) => {
    try {
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
    } catch (error) {
      console.log("error while uploading");
    }
  },
  getAllDocuments: async (req, res) => {
    try {
      const documents = await Upload.find();
      res.json(documents);
    } catch (error) {
      console.log("error while getting all documents");
    }
  },
  downloadDocument: async (req, res) => {
    try {
      const { docId } = req.params;
      const document = await Upload.findById(docId);
      const filePath = path.join(__dirname, `../uploads/${document.fileName}`);
      res.download(filePath);
    } catch (error) {
      console.log("error while downloading the file");
    }
  },
  search: async (req, res) => {
    try {
      const { searchKey } = req.params;
      const regex = new RegExp(searchKey, "i");
      const documents = await Upload.find({ text: { $regex: regex } });
      res.json(documents);
    } catch (error) {
      console.log('error while searching')
    }
  },
};
