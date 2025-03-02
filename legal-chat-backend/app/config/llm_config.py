from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

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