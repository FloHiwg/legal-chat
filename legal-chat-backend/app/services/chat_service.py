from app.config.llm_config import get_chat_model, AVAILABLE_FUNCTIONS
from app.models.chat_models import ChatHistory
from app.services.pdf_service import PDFService
from langchain.schema import HumanMessage, AIMessage
import json

class ChatService:
    def __init__(self):
        self.chat_model = get_chat_model()
        self.chat_history = ChatHistory()
        self.pdf_service = PDFService()

    def process_message(self, user_message: str) -> dict:
        # Add user message to history
        self.chat_history.add_message('user', user_message)

        # Convert chat history to LangChain format
        messages = self._convert_to_langchain_messages()

        # Get response from ChatOpenAI with function calling
        response = self.chat_model.invoke(messages, functions=AVAILABLE_FUNCTIONS)
        
        # Handle function calls if present
        if response.additional_kwargs.get('function_call'):
            ai_response = self._handle_function_call(response.additional_kwargs['function_call'])
        else:
            ai_response = response.content

        # Store the AI response
        self.chat_history.add_message('assistant', ai_response)

        return {
            'response': ai_response,
            'history': [{'role': msg.role, 'content': msg.content} 
                       for msg in self.chat_history.messages],
            'user_info': self.chat_history.user_info
        }

    def _convert_to_langchain_messages(self):
        return [
            HumanMessage(content=msg.content) if msg.role == 'user'
            else AIMessage(content=msg.content)
            for msg in self.chat_history.messages
        ]

    def _handle_function_call(self, function_call):
        name = function_call['name']
        args = json.loads(function_call['arguments'])

        if name == 'collect_user_info':
            self.chat_history.user_info.update(args)
            return f"Thank you! I've collected your information: {json.dumps(self.chat_history.user_info, indent=2)}"
        
        elif name == 'generate_letter':
            filepath = self.pdf_service.create_letter(
                args['sender_address'],
                args['receiver_address'],
                args['subject'],
                args['content']
            )
            return f"I've generated your letter! You can find it at: {filepath}"

    def get_history(self):
        return {
            'history': [{'role': msg.role, 'content': msg.content} 
                       for msg in self.chat_history.messages]
        }

    def clear_history(self):
        self.chat_history.clear()
        return {'message': 'Chat history cleared'} 