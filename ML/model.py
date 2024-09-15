from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

# Load the model and processor once (not reloading each time)
processor = AutoImageProcessor.from_pretrained("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")
model = AutoModelForImageClassification.from_pretrained("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")

def classify_plant_disease(image):
    """
    This function accepts an image, processes the image,
    and returns the predicted plant disease label.
    """
    
    # Preprocess the image
    inputs = processor(image, return_tensors="pt")

    # Perform inference (disable gradient calculation)
    with torch.no_grad():
        logits = model(**inputs).logits

    # Get the predicted label
    predicted_label = logits.argmax(-1).item()

    # Return the label mapped from the predicted index
    return model.config.id2label[predicted_label]