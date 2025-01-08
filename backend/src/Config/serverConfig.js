import dotenv from 'dotenv';
import RateLimiter from './rateLimiter.js'

dotenv.config();

export default {
  PORT: process.env.PORT,
  RateLimiter: RateLimiter,
  BaseUrl: process.env.BASE_URL,
  LangflowID: process.env.LANGFLOW_ID,
  FlowID: process.env.FLOW_ID,
  AppToken: process.env.APPLICATION_TOKEN,
};