from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class ChatMessage:
    role: str
    content: str

@dataclass
class ChatHistory:
    messages: List[ChatMessage] = field(default_factory=list)
    user_info: Dict = field(default_factory=dict)

    def add_message(self, role: str, content: str):
        self.messages.append(ChatMessage(role=role, content=content))

    def clear(self):
        self.messages.clear() 