const express = require("express");
const { upload, getAllDocuments, downloadDocument, search } = require("../controller/uploadController");
const fileUpload = require("../middleware/multer");
const router = express.Router();

//uploading the doc file
router.post("/upload",fileUpload.single('docxFile'),upload );

//fetching all the documents
router.get('/getAlldocuments',getAllDocuments)

//download the document
router.get('/downloadDocument/:docId',downloadDocument)

//searching the document with the search key
router.get('/search/:searchKey',search)

module.exports = router;
