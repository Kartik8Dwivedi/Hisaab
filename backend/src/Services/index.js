import Config from "../Config/serverConfig.js";
import axios from "axios";

export async function chatService(prompt) {
  const apiUrl = `${Config.BaseUrl}/lf/${Config.LangflowID}/api/v1/run/${Config.FlowID}`;

  const payload = {
    input_value: prompt,
    output_type: "chat",
    input_type: "chat",
  };

  const headers = {
    Authorization: `Bearer ${Config.AppToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, payload, { headers });
    const data =  response.data.outputs[0].outputs[0].results.message.data.text;
    const obj = {
        prompt,
        chatbotResponse: data
    }
    return obj;
  } catch (error) {
    console.log("Error in service layer.", error);
    throw error;
  }
}
