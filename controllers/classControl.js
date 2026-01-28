const db = require('../db/Pool')

async function getClasses(req,res) {
  try{
    const classes  = await db.getAllClasses()
    res.json(classes)
  }
  catch{
    res.status(500).json({message:"Internal server error"})
  }
}

module.exports = {
  getClasses
}