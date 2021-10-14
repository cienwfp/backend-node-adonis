
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

            console.log(req.body.data)

             Document.findOne({ _id: req.body.data._id }, (err, document) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Documento não encontrado!',
                    })
                }

                console.log(document)

                const upDocument = { $set: req.body.data}
                Document
                    .updateOne(document, upDocument)
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
        },

    new:

        async function (req, res) {

            console.log(req.body.data)

            Document
                .create({_id: req.params.id, ...req.body.data})
                .then(() => {
                    return res.status(200).json({message: "Document created"})
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Movie not updated!',
                    })
                })

        },


};