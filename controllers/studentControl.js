const db = require('../db/queryStudents');

async function searchStudents(req, res) {
  const {name} = req.query
  try{
    const results = await db.searchStudentsQuery(name)
    res.json(results).status(200)
  }
  catch(err){
    res.status(500).json({message:'Internal Server Error'})
  }
}

module.exports = {

  searchStudents,
};
