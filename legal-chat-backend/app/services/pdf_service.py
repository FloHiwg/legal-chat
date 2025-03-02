from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from datetime import datetime
import os

class PDFService:
    @staticmethod
    def create_letter(sender_address: str, receiver_address: str, subject: str, content: str) -> str:
        filename = f"letter_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join('generated_letters', filename)
        
        # Ensure directory exists
        os.makedirs('generated_letters', exist_ok=True)
        
        c = canvas.Canvas(filepath, pagesize=letter)
        y = 750  # Starting y position
        
        # Add date
        c.drawString(50, y, datetime.now().strftime("%B %d, %Y"))
        y -= 30
        
        # Add sender address
        for line in sender_address.split('\n'):
            c.drawString(50, y, line.strip())
            y -= 15
        
        y -= 30
        
        # Add receiver address
        for line in receiver_address.split('\n'):
            c.drawString(50, y, line.strip())
            y -= 15
        
        y -= 30
        
        # Add subject
        c.drawString(50, y, f"Subject: {subject}")
        y -= 30
        
        # Add content with word wrapping
        text_object = c.beginText(50, y)
        for line in content.split('\n'):
            text_object.textLine(line.strip())
        c.drawText(text_object)
        
        c.save()
        return filepath 