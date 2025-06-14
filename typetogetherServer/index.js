import { Server } from "socket.io";
import { Connection } from "./database/db.js";
import { getDocument, updateDocument } from "./controller/docController.js";


const PORT = 7000;

Connection();

const io = new Server(PORT, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        methods: ["GET", "POST"],
    }
});

io.on("connection", socket => {
    console.log("New client connected:", socket.id);

    socket.on("get-document", async (documentId) => {
        if (!documentId) return;

        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document.data);

        socket.removeAllListeners("send-changes");
        socket.removeAllListeners("save-document");

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });

        socket.on("save-document", async (data) => {
            await updateDocument(documentId, data);
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});


