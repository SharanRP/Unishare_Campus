from flask import Flask, request, jsonify
from transformers import AutoTokenizer, pipeline

app = Flask(__name__)

@app.route('/generate_text', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt', '')

    instruction = f"### Instruction:\n{prompt}\n\n### Response:\n"

    tokenizer = AutoTokenizer.from_pretrained("NousResearch/Llama-2-7b-hf")
    pipe = pipeline(task="text-generation", model="mayank200456789/results", tokenizer=tokenizer, max_length=128)
    result = pipe(instruction)
    generated_text = result[0]['generated_text']

    instruction_start = generated_text.find('### Instruction:')
    if instruction_start != -1:
        instruction_end = generated_text[instruction_start + len('### Instruction:'):].find('###')
        if instruction_end != -1:
            first_instruction = generated_text[instruction_start + len('### Instruction:'):instruction_start + len('### Instruction:') + instruction_end].strip()

            response_start = generated_text[instruction_start + instruction_end:].find('### Response:')
            if response_start != -1:
                response_end = generated_text[instruction_start + instruction_end + response_start + len('### Response:'):].find('###')
                if response_end != -1:
                    first_response = generated_text[instruction_start + instruction_end + response_start + len('### Response:'):instruction_start + instruction_end + response_start + len('### Response:') + response_end].strip()

                    return jsonify({"first_instruction": first_instruction, "first_response": first_response})

    return jsonify({"error": "Error occurred while processing the request."}), 500

if __name__ == '_main_':
    app.run(debug=True)
