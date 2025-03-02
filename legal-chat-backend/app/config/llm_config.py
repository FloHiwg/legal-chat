from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv


# System prompt for the legal assistant
SYSTEM_PROMPT = """You are a helpful legal assistant. Your goal is to help users with their legal problems. You have two main ways to assist:

1. Generate Legal Letters: You can help users write formal letters to relevant parties (authorities, lawyers, companies, etc.). To do this:
   - Use the collect_user_info function to gather necessary information
   - Once you have all required information, use the generate_letter function to create a PDF document

2. Document Analysis: You can analyze legal documents and provide explanations and opinions about their content.

Always maintain a professional and formal tone. If users need to send a letter, guide them through the process step by step, collecting all necessary information before generating the document. If they need document analysis, provide clear, understandable explanations of legal concepts.

Remember to ask clarifying questions when needed to better understand the user's situation."""

# Define functions for the LLM to call
AVAILABLE_FUNCTIONS = [
    {
        "name": "collect_user_info",
        "description": "Collect personal information from the user",
        "parameters": {
            "type": "object",
            "properties": {
                "first_name": {
                    "type": "string",
                    "description": "User's first name"
                },
                "last_name": {
                    "type": "string",
                    "description": "User's last name"
                },
                "email": {
                    "type": "string",
                    "description": "User's email address"
                },
                "phone": {
                    "type": "string",
                    "description": "User's phone number"
                }
            },
            "required": ["first_name", "last_name"]
        }
    },
    {
        "name": "generate_letter",
        "description": "Generate a PDF letter with the provided information",
        "parameters": {
            "type": "object",
            "properties": {
                "sender_address": {
                    "type": "string",
                    "description": "Complete sender address"
                },
                "receiver_address": {
                    "type": "string",
                    "description": "Complete receiver address"
                },
                "subject": {
                    "type": "string",
                    "description": "Subject line of the letter"
                },
                "content": {
                    "type": "string",
                    "description": "Main content of the letter"
                }
            },
            "required": ["sender_address", "receiver_address", "subject", "content"]
        }
    }
]



def get_chat_model():
    load_dotenv()
    
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set. Please set it before running the application.")
    
    
    
    return ChatOpenAI(
        model_name="gpt-3.5-turbo",
        temperature=0.7,
        api_key=api_key
    )