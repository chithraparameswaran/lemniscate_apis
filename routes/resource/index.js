const methods = require('../../methods');
const express = require('express');
const router = express.Router();
const pouchmethods = require('../../config/pouch');

router.get('/', function(req,res){
    res.status(200).json({
        message : "Success"
    });
})

router.get('/analyze',async function(req, res){
    var dataSet = [
        {id:1, value : "Very Best camera and chat app🔥👍👍"},
        {id:2, value : "All is Good but the export pic is not working properly. When I export an pic in Instagram it will automatically pop out the pixels. Ty bye"},
        {id:3, value : "One of the best texting a call apps out there"},
        {id:4, value : "Constantly just crashes my phone the moment I click on the app can't even get past the first screen completely freezes my phone bug has been happening since last update"},
        {id:5, value : "Broken joke of an app. Nothing else to it"}
    ]
    var reviewInsight = [];
    var index = 0;
        for(index=0;index < dataSet.length; index++) {
            var data = dataSet[index];
            await methods.resourcemethods.analyzeSyntax(data).then((result) => {
                pouchmethods.addDocument({"_id":data.value,"insights":result});
                reviewInsight.push(result)
            }).catch((err)=> console.log(err))
        }
    res.send(reviewInsight);

})

router.get('/search',function(req, res){
    console.log(req.params.tagName)
    var documentList = pouchmethods.retrieveTags(req.params.tagName);
    res.send(documentList);

})
module.exports = router;