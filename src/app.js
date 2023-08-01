
import server from './models/server.js'

//instanciamos la clase server para usarla
const Server = new server()

//-- llamamos el metodo para escuchar al server
Server.listen()
