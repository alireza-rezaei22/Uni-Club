import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import chatModel from './src/model/chat.js';
import connectToDB from './src/configs/DB.js';
import productModel from './src/model/product.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie'

await connectToDB()

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: [process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on('connection', async (socket) => {
    console.log(' user connected:', socket.id);

    const cookies = cookie.parse(socket.handshake.headers.cookie || '')
    const token = cookies.token
    const userData = jwt.verify(token, process.env.ACCESSTOKEN_SECRETKEY)
    const { id } = socket.handshake.query;
    let productId = null
    let chatId = null
    let product = null
    if (id.includes('-')) {
      chatId = id
      productId = id.split('-')[0]
      product = await productModel.findById(productId).select('_id image title ownerId price').populate({ path: 'ownerId', select: 'name' }).lean()
      
    } else {
      productId = id
      product = await productModel.findById(id).select('_id image title ownerId price').populate({path: 'ownerId', select: 'name'}).lean()
      chatId = productId + '-' + userData.id + '-' + product.ownerId._id

    }
    
    const chat = await chatModel.findOne({ chatId }).lean()

    if (chat) {
      socket.join(chatId);
      socket.emit('init-data', {
        chatId: chat.chatId,
        product,
        participants: chat?.participants || [],
        messages: chat?.messages || []
      })
    } else {
      socket.join(chatId);
      socket.emit('init-data', {
        chatId,
        product,
        participants: [],
        messages: []
      })
    }

    socket.on('send-message', async (data) => {
      console.log('user sended: ', data);
      const { chatId, newMessage } = data
      const productId = chatId.split('-')[0]

      const chat = await chatModel.findOne({ chatId }).lean()
      const product = await productModel.findById(productId).select('_id image title ownerId').lean()

      if (chat) {
        const newMessages = await chatModel.findOneAndUpdate(
          { chatId },
          {
            $push: {
              messages: {
                senderId: userData.id,
                text: newMessage,
                createdAt: new Date()
              }
            }
          },
          { new: true })
        console.log(newMessages);
        io.to(chatId).emit('new-message', { senderId: userData.id, text: newMessage, createdAt: new Date() });
      } else {
        const res = await chatModel.create({
          chatId,
          productId,
          participants: [
            userData.id,
            product.ownerId._id
          ],
          messages: [{
            senderId: userData.id,
            text: newMessage,
            createdAt: new Date()
          }]
        })
        if (res.ok) {

          io.to(chatId).emit('new-message', res);
        }
      }

    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> server run on http://localhost:${port}`);
  });
});