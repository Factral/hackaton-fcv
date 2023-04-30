require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const server = http.createServer()
try {

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('conectado a la base de datos')
}catch (error) {
  console.log(error)
}

const mensajeSchema = new mongoose.Schema({
  userName: String,
  userId: String,
  destinatario: String,
  mensaje: String,
  fecha: String,
  hora: String
});

const conversationSchema = new mongoose.Schema({
  usuario: String,
  destinatario: String,
  mensajes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mensaje'
  }],
  fecha: Date,
})

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

const Conversation = mongoose.model('Conversation', conversationSchema);

const io = require('socket.io')(server, {
  cors: { origin:'*'}
})

io.on('connection', (socket) => {
  console.log('se ha conectado un cliente')

  socket.on('mensaje', async (data) => {
    // Creo el mensaje en la db
    console.log('llego el mensaje')
    try {
      const mensaje = new Mensaje(data)
      socket.emit('mensaje', mensaje._id)
      const mensajeGuardado = await mensaje.save()
      // Busco la conversacion en la db
      const conversation = await Conversation.findOne({
        $or: [
          { usuario: data.userId, destinatario: data.destinatario },
          { usuario: data.destinatario, destinatario: data.userId },
        ]});

      if(conversation == null) {
        // si no existe la conversacion, la creo
        const newConversation = new Conversation({
          usuario: data.userId,
          destinatario: data.destinatario,
          mensajes: [],
          fecha: new Date(),
        });
        newConversation.mensajes = newConversation.mensajes.concat(mensajeGuardado._id);
        await newConversation.save();
        return
      }
      // si existe la conversacion, agrego el mensaje
      conversation.mensajes = conversation.mensajes.concat(mensajeGuardado._id)
      await conversation.save()
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('obtener_conversacion', async (data) => {
    try {
      const conversation = await Conversation.findOne({
          $or: [
            { usuario: data.userId, destinatario: data.destinatario },
            { usuario: data.destinatario, destinatario: data.userId },
          ]}).populate('mensajes')
      socket.emit("obtener_conversacion", conversation);
      console.log('llego la conversacion')
    } catch (error) {
      console.log(error)
    }
  })
})
server.listen(3000, () => {
  console.log('servidor escuchando en el puerto http://localhost:3000')
})