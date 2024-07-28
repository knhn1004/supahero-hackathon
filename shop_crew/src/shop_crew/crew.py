from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task

# Uncomment the following line to use an example of a custom tool
# from shop_crew.tools.custom_tool import MyCustomTool

# Check our tools documentations for more information on how to use them
# from crewai_tools import SerperDevTool

@CrewBase
class ShopCrewCrew():
	"""ShopCrew crew"""
	agents_config = 'config/agents.yaml'
	tasks_config = 'config/tasks.yaml'

	@agent
	def support_agent(self) -> Agent:
		return Agent(
			config=self.agents_config['support_agent'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)

	@agent
	def retrieval_agent(self) -> Agent:
		return Agent(
			config=self.agents_config['retrieval_agent'],
			# tools=[SerperDevTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)
	
	@task
	def question_answer_task(self) -> Task:
		return Task(
			config=self.tasks_config['question_answer_task'],
			agent=self.support_agent()
		)
	@task 
	def retrieval_task(self) -> Task:
		return Task(
			config=self.tasks_config['retrieval_task'],
			agent=self.retrieval_agent()
			)

	@crew
	def crew(self) -> Crew:
		"""Creates the ShopCrew crew"""
		return Crew(
			agents=self.agents, # Automatically created by the @agent decorator
			tasks=self.tasks, # Automatically created by the @task decorator
			process=Process.sequential,
			verbose=2,
			# process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
		)