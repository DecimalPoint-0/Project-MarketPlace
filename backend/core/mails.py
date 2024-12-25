from django.core.mail import send_mail, EmailMessage
from django.conf import settings


def send_email_with_attachment(project, recipient):
    """Function for sending mail with a Word document attachment"""

    subject = "Your Project"
    message = f"Dear Customer,\n\nThe project '{project.title}' is attached below as a Word document."
    from_email = settings.EMAIL_FROM_ADDRESS
    recipient_list = [recipient]

    email = EmailMessage(subject, message, from_email, recipient_list)

    try:
        # Check and read the file
        if hasattr(project, "project_content") and project.project_content:
            project_file = project.project_content
            project_content = project_file.read()
            file_name = f"{project.title}.docx"

            email.attach(
                file_name, 
                project_content, 
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
        else:
            raise ValueError("Project does not contain valid project content.")

        # Send the email
        email.send(fail_silently=False)
        return {"status": 200, "message": "Email with Word document sent successfully."}

    except Exception as e:
        return {"status": 500, "error": "Failed to send email with attachment", "details": str(e)}
