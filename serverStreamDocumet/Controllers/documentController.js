
var Document = require('../server/Document');

module.exports = {

    index:

        async function (req, res) {

            const docs = await Document.find()

            return (res.status(200).json(docs))
        },

    show:

        async function (req, res) {

            const doc = await Document.findById(req.params.id)

            return (res.status(200).json(doc))
        },


    upload:

        async function (req, res) {
        
            console.log(req.body)

            Document.findOne({ _id: req.params.id }, (err, document) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Documento nã encontrado!',
                    })
                }

                console.log(document)
                
                document.data = req.body.data.data.data
                document
                    .save()
                    .then(() => {
                        return res.status(200).json(document)
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Movie not updated!',
                        })
                    })
 
            })
        }

};