import asyncio
from langchain_mcp_adapters.client import MultiServerMCPClient  
from langchain.agents import create_agent
import langchain
from langchain.chat_models import init_chat_model

from dotenv import dotenv_values

config = dotenv_values(".env")

print(config)



# response= llm.invoke("Chi è mira murati e perché è importante")

async def main():
    llm = init_chat_model(config['MODEL']
                      , temperature=config['TEMPERATURE']
                      , api_key=config['CK']
                      , verbose=True
                      , base_url="https://api.cerebras.ai/v1/")
    
    client = MultiServerMCPClient(  
        {
            "VGTool": {
                "transport": "sse",  
                "url": "https://glowing-space-succotash-jj6g5xg6xrw5c5wpv-8000.app.github.dev/sse",
            }
        }
    )

    tools = await client.get_tools()
    print(tools)  
    agent = create_agent(
        model=llm,
        tools=tools  
    )

    while(True):
        domanda = input("Inserire una domanda: ")
        istruzioni = {"messages": [{"role": "user", "content": domanda}]}
        
        risposta = await agent.ainvoke(istruzioni)
        print(risposta["messages"][-1].content)

if __name__ == "__main__":
    asyncio.run(main())