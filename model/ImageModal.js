const mongoose = require('mongoose')
const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
  uploadTime: {
    type: Date,
    default: Date.now,
  },

})
module.exports = ImageModal = mongoose.model('imageModal', ImageSchema)