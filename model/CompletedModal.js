const mongoose = require('mongoose')
const CompletedSchema = mongoose.Schema({
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
module.exports = CompletedModal = mongoose.model('CompletedModal', CompletedSchema)