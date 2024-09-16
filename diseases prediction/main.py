from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import requests
import json
from io import BytesIO

app = FastAPI()

# Load model and processor once
processor = AutoImageProcessor.from_pretrained("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")
model = AutoModelForImageClassification.from_pretrained("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")

class DefinitionRequest(BaseModel):
    word: str

@app.post("/classify/")
async def classify_plant_disease(file: UploadFile = File(...)):
    try:
        # Read image file
        image = Image.open(BytesIO(await file.read()))
        inputs = processor(image, return_tensors="pt")
        
        with torch.no_grad():
            logits = model(**inputs).logits
        
        predicted_label = logits.argmax(-1).item()
        label = model.config.id2label[predicted_label]
        
        return {"label": label}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/definition/")
async def fetch_definition(data: DefinitionRequest):
    try:
        word = data.word
        re = f"How to counter {word} "
        api_url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAiNvxZPylhs7AJUTvb2oVCQetwUWOpLv8'
        
        headers = {'Content-Type': 'application/json'}
        body = {"contents": [{"role": "user", "parts": [{"text": re}]}]}
        
        response = requests.post(api_url, headers=headers, data=json.dumps(body))
        response.raise_for_status()
        data = response.json()
        
        return {"definition": data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'No definition found.')}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

