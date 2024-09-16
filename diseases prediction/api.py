import uvicorn
from fastapi import FastAPI,UploadFile,File
from fastapi.responses import JSONResponse
from PIL import Image
import io
from model import classify_plant_disease
from gemini_api import fetch_definition_data

app=FastAPI()

@app.post("/classify_and_suggest/")
async def classify_and_suggest(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Classify plant disease
        predicted_disease = classify_plant_disease(image)

        # Fetch suggestions from Gemini on how to counter the disease
        suggestions = fetch_definition_data(predicted_disease)

        return JSONResponse(content={
            "predicted_disease": predicted_disease,
            "suggestions": suggestions
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Run the FastAPI app using uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)