# BookingsApp

![BookingsApp](https://raw.githubusercontent.com/romerocam/cruce/main/public/calendar.png)

## Description
This project was developed in one month as part of an internship assignment mentored by [#Plataforma5](https://www.plataforma5.la/) and [#CRUCE](https://www.e-cruce.com/). It was a very defying challenge because we had to develop it using Next.js, MongoDB and Chakra UI, all technologies that we had not studied in the first part of the bootcamp, so we had to make a deep research through the documentation before starting to code.<br/><br/>
**BookingsApp** is an online booking app.<br/><br/>
- As a ***user*** you will be able to book appointments by selecting a branch, month and day. The days that have available slots will be colored with a greenish hue. The more slots available, the darker the green color will be. If the day is not colored, it means there are no available slots. The user will be able to modify appointments, cancel them and see their appointment history.<br/><br/>
- As an ***operator*** you will be able to view all the appointments of the branch you manage and confirm attendance.<br/><br/>
- As an ***administrator*** you will be able to create branches, view or edit their details, view the list of users, edit their roles (admin, branch operator or customer) or update their details.<br/> 

## Technologies
***Next.js framework***.<br/>
⚙️ **Back-end:** Node.js, MongoDB, Mongoose, JWT, Bcrypt, NextAuth, Nodemailer, Async-lock.<br/>
🖱 **Front-end:** Axios, Chakra UI, React-Calendar.<br/>
Project management: Trello, Figma.<br/>

## ToDos
- Fix mongo caché issue that allows 2 users to book the same slot if they both have the calendar already rendered in their browsers (this is only happening in deployed version but in localhost it works correctly).
- Improve styles.
- Add data visualization panels.
- Apply next.js features in all cases where we used plain react.js. 
- Refactor the code.


## Contributors
- [Cristian Alvarez](https://github.com/Cris-Alvarez09)
- [Juan Camilo Romero](https://github.com/romerocam)
- [Matias Abossio](https://github.com/Agrossio)
- [Natalia Bebebino](https://github.com/NataliaBebebino)
- [Stanislava Berberova](https://github.com/sberberova)

## Getting Started
# Set up:
First clone the repository to your local machine and run ```npm install``` to install the dependencies.

# Run app:
Execute ```npm run dev``` and open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

# Log in as an Admin or Operator:
Find below the accesses for admin and operator demo users to try all the features: <br/>
Admin:<br/>
email: admin@mail.com<br/>
password: 123123123<br/><br/>

Operator:<br/>
email: operator@mail.com<br/>
password: 123123123<br/>
