# NBA-Stats

NBS Stats is a dashboard with metrics from teams and players from NBA 2019 [Birdie web dev intern challenge]

## Installation and execution instructions

1. Download the project repository, that can be done by running:

   > `git clone https://github.com/FbFDestro/NBA-Stats.git`

2. [Download and install Docker](https://docs.docker.com/get-docker/)

3. Set environment variable

   > Add a file called `.env` on the main folder

   This file must contain

   ```
   BD_API={URL OF DATABASE API THAT ALLOWS QUERIES}
   ```

4. Run the following Docker command

   > docker-compose up -d --build

   To stop it from running use

   > docker-compose down
