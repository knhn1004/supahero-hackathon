#!/usr/bin/env python
import json
import sys
from shop_crew.crew import ShopCrewCrew
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# This main file is intended to be a way for your to run your
# crew locally, so refrain from adding necessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

app = FastAPI()


class InputModel(BaseModel):
    topic: str


@app.post('/run')
# async def run(inputs: InputModel):
async def run(req: Request):
    """
    Run the crew.
    """
    body = await req.json()
    try:
        return {"result": ""}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/products')
async def products(req: Request):
    body = await req.json()
    _id = body['message']['toolCalls'][0]['id']
    return {
        'results': [{
            'toolCallId': _id,
            'result': '''[
        {
            "product": "Vissles V84:  Wireless Mechanical Keyboard | Hot-Swappable",
            "product_desc": "75% Compact yet Versatile If you opt for a 75% layout, you can't pass up on Vissles-V84, a compact wireless mechanical keyboard that retains the F key row at the top. Pre-installed VS mechanical switches, with the unique white...",
            "product_price": "$89.99"
        },
        {
            "product": "Vissles LP85: Ultra-Thin 75% Optical-Mechanical Keyboard",
            "product_desc": "Vissles LP85丨The World’s Thinnest Optical-Mechanical Keyboard Confidently type on a keyboard crafted for speed, precision, and comfort. The Future Key Player Let’s enter a new dimension with Vissles LP85, a 75% all-new slim-line low profile keyboard with an anodized...",
            "product_price": "$175.00"
        },
        {
            "product": "Vissles V1: 84 Keys Wireless Mechanical Keyboard with Stylish RGB ( Non-hot-swappable version)",
            "product_desc": "The fastest typists in the world use mechanical key switches. Vissles V1 mechanical keyboard features different switch types, compact layout and adjustable keyboard height for an ultra-precise and satisfying typing experience. ✔️75% layout, tenkeyless compact wireless mechanical keyboard for Windows, Mac, Chrome OS, Android,...",
            "product_price": "$59.99"
        }
    ]
   '''
        }]}


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        "topic": "keyboard company"
    }
    try:
        ShopCrewCrew().crew().train(
            n_iterations=int(sys.argv[1]), inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")


def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        ShopCrewCrew().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5001)
