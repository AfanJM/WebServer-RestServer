
import server from './models/server.js'


const Server = new server()

//-- llamamos el metodo para escuchar al server
Server.listen()