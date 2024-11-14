import { Socket } from "socket.io";
import { io } from "../../app";


export const handelSocketConnection = (client:Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`);
    client.on("disconnect",()=>{
        console.log("bye");
    })
    client.on("newLaunche",()=>{
        console.log("[NEW VOTE] has accured in the system")
        io.emit("newLaunchHasOccurred")
    })
}