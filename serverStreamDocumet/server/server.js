const mongoose = require("mongoose")
const { find } = require("./Document")
const Document = require("./Document")

mongoose.connect("mongodb://192.168.1.136:27017/documentTest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require("socket.io")(3333, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {

  socket.on("initial_data", async () => {
    Document.find().then(docs => {
      console.log(docs)
      socket.emit("initial_data", docs);
    });
  })

  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
