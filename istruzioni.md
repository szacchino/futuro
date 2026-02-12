mkdir progetto
cd progetto

python -m venv .venv

source .venv/bin/activate (linux/macos)
.venv/Scripts/activate.bat (windows)

deactivate (linux/macos/windows) si disattiva il virtual environment

----

Dependencies

Dopo aver attivato il venv

pip freeze 

pip freeze > requirements.txt (linux/macos)

pip install -r requirements.txt per reinstallare tutte le dependencies

pip install python-dotenv pyTelegramBotAPI

pip install langchain langchain-google-genai langchain-mistralai langchain-cerebras langchain-core langchain-openai
