#!/usr/bin/env python
import sys
from shop_crew.crew import ShopCrewCrew
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# This main file is intended to be a way for your to run your
# crew locally, so refrain from adding necessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

app = FastAPI()


class InputModel(BaseModel):
    topic: str


@app.post('/run')
async def run(inputs: InputModel):
    """
    Run the crew.
    """
    try:
        result = ShopCrewCrew().crew().kickoff(inputs=inputs.dict())
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        "topic": "AI LLMs"
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
