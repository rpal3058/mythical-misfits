// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
AWS.config.update({region: 'ap-south-1'});
/* Create DynamoDB service object for local development */
var misfitsDB = new AWS.DynamoDB({ endpoint: 'http://dynamodb-local:8000' });

/* Create DynamoDB service object for local development */
// var misfitsDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const getMysfitsJson = async (list) =>{
    // console.log(list[0]["Items"])
    //  loop through the returned mysfits and add their attributes to a new dict
    //  that matches the JSON response structure expected by the frontend.
    var misfitList = []
    list["Items"].forEach((item) => {
        var misfit = {}
        misfit["mysfitId"] = item.MysfitId.S
        misfit["name"] = item.Name.S
        misfit["species"] = item.Species.S
        misfit["description"] = item.Description.S
        misfit["age"] = item.Age.N
        misfit["goodevil"] = item.GoodEvil.S
        misfit["lawchaos"] = item.LawChaos.S
        misfit["thumbImageUri"] = item.ThumbImageUri.S
        misfit["profileImageUri"] = item.ProfileImageUri.S
        misfit["likes"] = item.Likes.N
        misfit["adopted"] = item.Adopted.BOOL
  
        // Append the object to the list
        misfitList.push(misfit);
    })
    return misfitList
}

const getAllMisfits = async ()=> { 
    const params = {
        TableName: 'MythicalMisfitsTable',
    };

    let scanPromise = new Promise(function (resolve,reject){
        let scanResults = misfitsDB.scan(params).promise()
        if(scanResults){
            resolve(scanResults);
        }else{
            reject ("Error: Couldnt scan all the parameters. Check the connection with Dynamo DB");    
        }
    })

    //there are 2 returns because the return in .then() passes the outpur to resolve() 
    //and then resolve function passes it to the Caller of getAllMisfits
    return scanPromise.then(
        function (results){
            let jsonResult = getMysfitsJson(results)
            return(jsonResult)
        }
    ).catch(
        function (err){
            console.log(err)
        }
    )    
}

const getFilteredMisfits = (queryParam) => { 
    var filter = queryParam['filter'] 
    var value = queryParam['value']
    let params = {
        TableName: "MythicalMisfitsTable",
        FilterExpression: `${filter} = :a`,
        ExpressionAttributeValues: {
            ":a": {'S':`${value}`}
        },
    };
    let scanPromise = new Promise(function (resolve,reject){
        let scanResults = misfitsDB.scan(params).promise()
        if(scanResults){
            resolve(scanResults);
        }else{
            reject ("Error: Couldnt scan the filtered parameters. Check the connection with Dynamo DB");    
        }
    })

    //there are 2 returns because the return in .then() passes the outpur to resolve() 
    //and then resolve function passes it to the Caller of getFilteredMisfits
    return scanPromise.then(
        function (results){
            let jsonResult = getMysfitsJson(results)
            return(jsonResult)
        }
    ).catch(
        function (err){
            console.log(err)
        }
    )
}


exports.getAllMisfits = getAllMisfits;
exports.getFilteredMisfits = getFilteredMisfits