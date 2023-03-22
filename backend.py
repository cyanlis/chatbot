from flask import Flask, render_template, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# 创建Flask应用程序
app = Flask(__name__)

# 加载模型和分词器
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# 首页路由
@app.route('/')
def index():
    return render_template('index.html')

# 发送消息API路由
@app.route('/api/send_message', methods=['POST'])
def send_message():
    # 解析请求数据
    data = request.get_json()
    message = data['message']

    # 生成回复消息
    reply = generate_reply(message)

    # 返回响应结果
    return jsonify({'message': reply, 'avatar': '/static/images/avatar2.jpg'})

# 生成回复消息的函数
def generate_reply(input_text):
    max_length = 50  # 设置生成文本的最大长度
    generated_text = generate_text(input_text, max_length)  # 使用GPT-2模型生成文本
    return generated_text

# 定义生成文本的函数
def generate_text(input_text, max_length=50):
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    output = model.generate(input_ids, max_length=max_length, pad_token_id=tokenizer.eos_token_id)
    output_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return output_text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
