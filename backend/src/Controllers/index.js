// controllers go here

import { chatService } from "../Services/index.js";

class ChatController{
    async getChat(req,res){
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt message is required." });
        }

        try {
        const chatbotResponse = await chatService(prompt);
        return res.status(200).json(chatbotResponse);
        } catch (error) {
            console.log("Error in controller layer.",error)
            res.status(500).json({ error: "Error running chatbot flow." });
        }
    }
}

export default ChatController;