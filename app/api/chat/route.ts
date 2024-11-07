// app/api/chat/route.ts
import { NextRequest } from "next/server";
import { Server } from "socket.io";

let io: Server;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for Socket.IO
  },
};

// This function will be called when a GET request is made to /api/chat
export async function GET(req: NextRequest) {
  // Check if the Socket.IO server is already initialized
  if (!globalThis.io) {
    // Create a new Socket.IO server
    const server = req.socket.server;
    io = new Server(server, {
      path: "/api/chat",
      cors: {
        origin: "http://localhost:3000", // Allow frontend on 3000
        methods: ["GET", "POST"],
      },
    });

    // Handle Socket.IO connections
    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Send welcome message
      socket.emit("receive_message", {
        text: "Welcome to the chat!",
        sender: "expert",
        timestamp: new Date(),
      });

      // Handle incoming messages
      socket.on("send_message", (message) => {
        console.log("Received message:", message);
        // Broadcast to all other clients
        socket.broadcast.emit("receive_message", message);
      });

      // Handle typing events
      socket.on("user_typing", () => {
        socket.broadcast.emit("expert_typing");
      });

      // Handle client disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    globalThis.io = io; // Store the initialized Socket.IO instance globally
    console.log("Socket.IO server initialized");
  } else {
    console.log("Socket.IO server already running");
  }

  // Return response when hit through GET
  return new Response("Socket.IO initialized", { status: 200 });
}
