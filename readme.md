# Plugma #

Luma and my university wont give me the data for me to run a community aggregate plugin, so I recreated it to enable my plugin idea

Its time our event hosting platforms let us perform analytics across events to grow our communities.

## Stack ##

Frontend:
NextJS
TailwindCSS
Framer

BE:
ExpressJS
Prisma ORM
fastAPI microService
OpenAI LLM Calls


### Reasoning ###

NextJS : I'm comfortable with this so its more from a comfort perspective alongside not having to worry about dynamic routing 

TailwindCSS : Used for Shadcn components and love the way I can write inline CSS

Framer : Cool animations (I'm not a design person so I need to work on this)

ExpressJS : Mainly for speed in doing concurrent events (most of the time people are creating events or joining them, the event analytics is for the hosters)

fastAPI : run my ML computations in a python microservice since python has more developed access to models such as XGBoosting for tabular data and I'll leverage it to do my LLM calls
