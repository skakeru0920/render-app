# Deployment Sprint

## Introduction

You have created a communal image editor. Users can click on pixels to toggle them between black and white and also see the edits that other people have made in real time. However, you've created this web app locally on your machine. You have a *very* simple prototype working, but it's time to send your prototype to potential investors. Obviously you can't ask the investors to run your server locally on their own machines. You'd have to explain to them how to set up Node and Postgres! That won't do at all, no, no. We need to release our web app online where it is publicly accessible via a convenient URL.

## Objectives

In this task, students will...

- Become familiar with deploying a project on Render
- Understanding how configuration (database, ports, etc) work in a real production environment
- How to include migrations and other setup as part of their deployment process.

### Basic Requirements

- [ ] First, verify that the program works.
  - [ ] After cloning this repo, install the dependencies using `npm install`.
  - [ ] This next part will require Postgres to be running locally on your machine. Please be sure to have a Postgres instance running and create a database called `ccpixels`.
    > **Reminder**: The `psql` query to create a database is `CREATE DATABASE ccpixels;`.
  - [ ] Run the migrations to get the database into a current state. This command can be found in the `scripts` section of `package.json`.
    - The most common errors at this stage are database connection errors. If you are unable to run the migrations, make sure your Postgres is running and that the Postgres username and password match the configuration in `src/db/knexfile.js`.
  - [ ] Run the seed data. The command for this can also be found in the `scripts` section of `package.json`.
  - [ ] Launch the app using `node src/index.js` and visit it in your browser using `localhost` (the port can be found in `server.js`). What image do you see after running the seed data? If there is no image already displayed, then the seed data did not work. Play with the image editor for a while to see how the app should work and behave.
- [ ] Set up a Render account:
  - [ ] Go to [render.com](https://render.com) and follow the current instructions to set up an account. You do not need sign up for any plan that costs money to do this.
    - Make sure to connect your Github account and grant access to your repositories.
- [ ] Create a new web service:
  - [ ] Go to the [Render dashboard](https://dashboard.render.com).
  - [ ] Click the "New" button.
  - [ ] Select "Web Service".
  - [ ] Connect a Github repository and choose this repository from the list.
    - If you don't see this repository as an option, configure your account to grant Github repository permissions to Render.
  - [ ] For "Name" enter a unique name.
  - [ ] Leave the root directory empty (defaults to root of this project).
  - [ ] For the "Environment" choose "Node".
  - [ ] For the "Region" choose the closest to your geographic location.
  - [ ] For the "Branch" enter `master`.
  - [ ] For the "Build Command" enter `npm run build`.
  - [ ] For the "Start Command" enter `npm start`.
    - This is the script that will run the server.
  - [ ] Make sure the "Free" plan is selected. This plan will be valid for 90 days.
  - [ ] Click the "Create Web Service" button.
  - [ ] Before we deploy our application, we need to add `build` and `start` scripts to `package.json`
  - [ ] Add `start` and `build` to the `package.json` "scripts":
    ```json
      "scripts" {
          "build": "npm install",
          "start": "node ./src/index.js",
    ```

Now we need to set up the database.
- [ ] Create a Database:
  - [ ] Go to the dashboard and click "New", but this time select "PostgreSQL".
  - [ ] Give it a unique name (e.g. PixelsPostgres).
  - [ ] For the database field enter `ccpixels`.
  - [ ] For the "User" field, enter a user name that you will remember.
  - [ ] For the "Region" field, choose a region that is closest to you.
  - [ ] Set the "PostgreSQL version" to 14.
  - [ ] Ignore the other settings for now.
  - [ ] Make sure that the "Free" plan is selected.
  - [ ] Click the "Create Database" button.
  - [ ] Go back to the dashboard and wait for the database status to change to "Available".

You now have a node server and database deployed, but now you need to connect them.
To do this we will have to set an environment variable to tell our web service how to connect to the database.

- [ ] Add the DATABASE_URL environment variable to your Render web service.
  - [ ] From the dashboard, click on the PostgreSQL database that you created.
  - [ ] From the "Info" tab "Connections" sections, copy the "Internal Database URL".
  - [ ] Go back to the Render dashboard and click on the Node web service you created.
  - [ ] Click on the "Environment" tab.
  - [ ] Click on "Add Environment Variable"
  - [ ] For the "Key" enter "DATABASE_URL"
  - [ ] For the "Value" paste the "Internal Database URL" copied earlier
  - [ ] Click "Save Changes"

- [ ] Get ready to deploy!
  - [ ] The port number we use in our source code was not very standard and will not work in production. Render will choose a port number for you. How do you access and use the Render-provided port number? Hint: Look into Node's `process.env` documentation.
  - [ ] You'll notice there is only one configuration for `src/db/knexfile.js`. This is bad! The knexfile should return different configurations depending on whether you are running in production. Where does this the database connection information come from? How do you set the knexfile to use this information?
  - [ ] The migrations script should be run when the release is ready to be deployed. How do you add this functionality? Hint: You probably want to run the migrations scripts during the build process.
  - [ ] Commit all changes to your branch if you haven't already done so!
- [ ] Push code to the remote repository:
    `git push origin master`
- [ ] Click on the URL at the top of the web service page to see the deployed app (it looks like `<your app name>.onrender.com`).
  - If all went well, it should work. Good job!
    > Oh no! It didn't work! (Or maybe it did). There's plenty of mistakes that can be made. Whether or not it works, it's good to know what all your options are.
      - If the code did not deploy, check to see if there are any errors in the command line output of the git push.
      - Check the `Logs` section of the web service and read the error messages.
      - The most common cause of errors is the database not connecting properly. If there is an error in your knex config, it will show up here when it attempts to run the migrations.
      - If your database is working and there's an error in the frontend, the error will appear in the developer console in your browser.
      - If there is an issue in the backend, it becomes harder because you can no longer put a breakpoint on your code in VS Code's debugger. For this, you'll need to use logs.
  - [ ] Now that everything is working, it's time to release a new version. Change the font of the frontend since Comic Sans is too serious (after all, "Comic Sans" is Latin for "not funny"). Commit your code to your branch and then Re-deploy this to Render following the steps from before.


**IMPORTANT** The free-tier plan for Render has limitations on usage. Make sure you suspend the web service and database you created for this sprint when you are finished.

### Advanced Requirements

The investors visited your Render-deployed app and loved it. However, they want to see some more features implemented before fully investing. Use this as practice for re-deploying on Render or changing the SQL schema using migrations.

> The real exercise here is getting comfortable with deploying. These are merely suggested features. Especially try to do things that would cause the SQL schema to change.

- [ ] Add 16 colors to choose from instead of using only black and white. The schema for the pixels is currently a boolean. This will have to change to a number!
- [ ] Buttons are very 2021. We want to look toward the future! And the future is filled with DOM Canvas. The investors want you to replace the button grid with a canvas that the user can click directly on.
- [ ] Limit the number of pixel changes a user can make per IP to one pixel change per minute. This should be enforced by the server, not the client. This would prevent the user, for example, opening multiple tabs to edit the image. Probably the best way to do this is to create a new table that logs the user's IP and the time that they made the change.

Additional Render features to explore:
- [ ] How do you connect to the production database from the command line? This may be helpful to determine if a migration is failing or to check data.
- [ ] Suppose your communal pixel editing app is becoming too overwhelmed from all the traffic. How do you allocate more resources from Render so that it can scale?
