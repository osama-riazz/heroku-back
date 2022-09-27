const express = require('express')
const app = express();
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors');
const teacherRoute = require('./routes/teacher')
const multer = require('multer')
const ImageModal = require('./model/ImageModal')
const path = require('path');
const CompletedModal = require('./model/CompletedModal');

const PORT = 3001 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/teacher', teacherRoute)



const Storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({
  storage: Storage,
})
const completed = multer.diskStorage({
  destination: 'completed',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const compl = multer({
  storage: completed,
})
//-----------------------
// get incomplete images
//-----------------------
app.get('/image', async (req, res) => {

  try {
    const getImages = await ImageModal.find();
    res.json(getImages)

  }
  catch (err) {
    res.send(err.message)
  }
  
})

app.get("/images/:image", (req, res) => {
  var { image } = req.params;
  res.sendFile(path.join(__dirname, `./images/${image}`));
});

//---------------------
//get completed images
//---------------------

app.get('/complete', async (req, res) => {

  try {
    const getImages = await CompletedModal.find();
    res.json(getImages)

  }
  catch (err) {
    res.send(err.message)
  }
  
})

app.get("/complete/:image", (req, res) => {
  var { image } = req.params;
  res.sendFile(path.join(__dirname, `./completed/${image}`));
});


//----------------
//progress images
//----------------

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file.path)
  const saveImage = ImageModal({
    name: req.file.originalname,
    description: req.body.description,
   
  });
  saveImage
    .save()
    .then((res) => {
      console.log("saved successfully");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send({ msg: "saved", saveImage })
});

//------------
//completed   |
//------------

app.post("/completed", compl.single("completed-image"), (req, res) => {
 
  const saveImage = CompletedModal({
    name: req.file.originalname,
    description: req.body.description,
   
  });
  saveImage
    .save()
    .then((res) => {
      console.log("saved successfully");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send({ msg: "saved", saveImage })
});

// -------------------
// delete progress    
// ---------------------
app.delete('/progress/:id', async (req, res) => {
  const articleID = req.params.id.toString().trim(); 
  try {
      const deletedImage = await ImageModal.findByIdAndDelete(articleID)
      res.send("deleted Successfully")
  }
  catch (err) {
      console.log(err)
  }


})
// -------------------
// delete completed    
// ---------------------

app.delete('/completed/:id', async (req, res) => {
  const articleID = req.params.id.toString().trim(); 
  try {
      const deletedImage = await CompletedModal.findByIdAndDelete(articleID)
      res.send("deleted successfully")
  }
  catch (err) {
      console.log(err)
  }


})




mongoose.connect('mongodb://localhost:27017/osama', () => {
  console.log('Connected to DB!!')
})


app.listen(PORT, console.log('API is running on port :' + PORT));


