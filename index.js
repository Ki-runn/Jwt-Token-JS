var express=require('express');
var jwt=require('jsonwebtoken');
const app =express();

app.post('/api/login',function(req,res){
    const user ={id :3};
    const token=jwt.sign({user},'my_secret_key')
    res.json({
        token:token
    });
});
app.get('/api',function(req,res){
    res.json({
        text:'my api'
    });
});
app.get('/api/protected',ensureToken,function(req,res){
    jwt.verify(req.token,'my_secret_key',function(err,data){
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                text:'my protected api',
                data:data
            });
        }
    })

});

function ensureToken(req,res,next){
    const bearerheader=req.headers["authorization"];
    if(typeof bearerheader !== 'undefined'){
        const bearer = bearerheader.split(" ");
        const bearertoken = bearer[1];
        req.token = bearertoken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}
app.listen(3000,function(){
    console.log("app listening on port 3000");
});