from pydantic import BaseModel

# (Optional) Define response schema for classify_and_suggest
class DiseasePredictionResponse(BaseModel):
    predicted_disease: str
    suggestions: str