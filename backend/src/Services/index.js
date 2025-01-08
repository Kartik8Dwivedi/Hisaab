import Config from "../Config/serverConfig.js";

export async function chatService(prompt) {
  const apiUrl = `${Config.BaseUrl}/lf/${Config.LangflowID}/api/v1/run/${Config.FlowID}`;
  
  const payload = {
    input_value: message,
    output_type: "chat",
    input_type: "chat",
  };

  const headers = {
    Authorization: `Bearer ${Config.AppToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("Error running flow:", error.response?.data || error.message);
    throw error;
  }
}
