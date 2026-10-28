from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException

app = FastAPI()

class ContactForm(BaseModel):
    id: int
    name: str
    email: str
    message: str = Field(min_length=1)

contact_forms = [
    ContactForm(
        id=1,
        name="Alex",
        email="alex@gmail.com",
        message="Ts is tuff"
    ),
    ContactForm(
        id=2,
        name="Jordan",
        email="jordan@gmail.com",
        message="Nice portoflio"
    )
]

@app.get("/contact-forms")
def get_contact_forms():
    return contact_forms

@app.get("/contact-forms/{contact_id}")
def get_contact_form_by_id(contact_id: int):
    for form in contact_forms:
        if form.id == contact_id:
            return form

    raise HTTPException(status_code=404, detail="Contact form not found")

@app.post("/contact-forms", status_code=201)
def create_contact_form(new_form: ContactForm):
    for form in contact_forms:
        if form.id == new_form.id:
            raise HTTPException(
                status_code=409,
                detail="A contact form with this ID already exists"
            )

    contact_forms.append(new_form)
    return new_form

@app.get("/")
def main():
    return {"message": "Hello World"}
