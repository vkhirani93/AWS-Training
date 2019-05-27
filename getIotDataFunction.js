var aws = require('aws-sdk');

exports.handler = function(events, context){
    console.log('-----------Get Iot Data Function ------------');

    var bucketName = events.Records[0].s3.bucket.name;
    var keyName = events.Records[0].s3.object.key;

    console.log('--------------- Bucket Name: ' + bucketName);
    console.log('---------------- Key Name: ' + keyName);

    var s3 = new aws.S3({region: 'us-east-1'});
    s3.getObject({Bucket: bucketName, Key: keyName}, 
        function(err, res){
            if(err){
                console.log('----- Received ' + err + ' error --------');
                console.log('----- This is an error related to ----' + err.stack);
            }
            else{
                console.log('File Content: ' + res.Body.toString());
                context.succeed(res.Body.toString());
            }
        }
    );
}