from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)

# Load the T5 model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("SharanRP/VivaBot")
model = AutoModelForSeq2SeqLM.from_pretrained("SharanRP/VivaBot")

@app.route('/answer_question', methods=['POST'])
def answer_question():
    # Get the question from the request
    question = request.json['question']
    
    # Prepare the input for the model
    input_text = "answer:" + question
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    
    # Generate the answer
    output = model.generate(input_ids)
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    
    return jsonify({"question": question, "answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
