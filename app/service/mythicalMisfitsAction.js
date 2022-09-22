const misfitsTableClient = require('./misfitsTableClient.js');

const healthCheck = async (req, res) => {
  res
    .status(201)
    .json({ message: 'Nothing here, used for health check. Try /misfits instead.'});
};

const getMisfits =  (req, res, next) => { 

  function scan(){
    let filterCategory = req.query['filter']
    if (filterCategory){
      let filterValue = req.query['value']
      const queryParam = {
        'filter': filterCategory,
        'value': filterValue
      }
      // a filter query string was found, query only for those mysfits.
      return misfitsTableClient.getFilteredMisfits(queryParam)
    }
    else{
      //  no filter was found, retrieve all mysfits.
      return misfitsTableClient.getAllMisfits()
    }
  }
  let scanPromise = new Promise (function (resolve,reject){
    let scanResults = scan()
    if(scanResults){
      resolve(scanResults)
    }else{
      reject("Error! Failed in calling the scanning functions ")
    }
  })
  return scanPromise.then(
  
    (results)=>{
      // res.setHeader('content-type', 'application/json');
      res.status(200).json({    
        results: results.map((list) => ({
        mysfitId: list.mysfitId,
        name: list.name,
        species: list.species,
        description: list.description,
        age: list.age,
        goodevil: list.goodevil,
        lawchaos: list.lawchaos,
        thumbImageUri: list.thumbImageUri,
        profileImageUri: list.profileImageUri,
        likes: list.likes,
        adopted: list.adopted,
      })),
    })
      res.send(results);
      return results
    }
  ).catch(
    (err)=>{
      next(err);
    }
  )  
}
exports.healthCheck = healthCheck;
exports.getMisfits = getMisfits;
