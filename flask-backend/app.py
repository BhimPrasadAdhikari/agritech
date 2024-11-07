from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Load your TorchScript model
model = torch.jit.load('model_scripted.pt')
model.eval()

# Image transformations (match your training setup)
transform = transforms.Compose([
    transforms.Resize(128),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    img_file = request.files['image']
    img = Image.open(img_file)
    img = transform(img).unsqueeze(0)  # Add batch dimension

    # Run the model for inference
    with torch.no_grad():
        output = model(img)
        _, predicted = torch.max(output, 1)

    # Replace with your class names
    class_names = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot', 'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot', 'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus', 'Tomato_healthy']
    predicted_class = class_names[predicted.item()]

    return jsonify({"predicted_class": predicted_class})
CORS(app)  # Allow all domains, or specify the domain of your Next.js app
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Make sure Flask runs on port 5000
