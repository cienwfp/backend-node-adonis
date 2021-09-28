
var Document = require('../server/Document');

module.exports = {

    index:

        async function (req, res) {

            res.header("Access-Control-Allow-Origin", "*");

            const docs = await Document.find()

            return (res.status(200).json(docs))
        },

    show:

        async function (req, res)  {
            
            res.header("Access-Control-Allow-Origin", "*");

            const doc = await Document.findById(req.params.id)

            return (res.status(200).json(doc))
        },


};