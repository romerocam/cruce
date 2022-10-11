# BookingsApp

![BookingsApp](https://raw.githubusercontent.com/romerocam/cruce/main/public/calendar.png)

**BookingsApp** is an online booking app.

## Description
As a ***user*** you will be able to book appointments by selecting a branch, month and day. The days that have available slots will be colored with a greenish hue. The more slots available, the darker the green color will be. If the day is not colored, it means there are no available slots. The user will be able to modify appointments, cancel them and see their appointment history.<br/>
As an ***operator*** you will be able to view all the appointments of the branch you manage and confirm attendance.<br/>
As an ***administrator*** you will be able to create branches, view or edit their details, view the list of users, edit their roles (admin, branch operator or customer) or update their details.<br/> 

## Technologies
Next.js framework<br/>
⚙️ **- Back-end:** Node.js, MongoDB, Mongoose, JWT, Bcrypt, NextAuth, Nodemailer, Async-lock.<br/>
🖱 **- Front-end:** Axios, Chakra UI, React-Calendar.<br/>
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

1st Demo:

Slides:
https://docs.google.com/presentation/d/1fWzp9rk5tPLJDtWdbR3CKvPkMN4fWWax-5qFOEfuVgM/edit#slide=id.g139136a9c4a_2_11

Figma:
https://www.figma.com/file/lyvFpl19wEr799SVFa3zmS/Reserva-de-turnos?node-id=0%3A1

Schema Design:
https://lucid.app/lucidchart/09e2d921-8cad-457b-b27f-c2a0ae29b244/edit?beaconFlowId=AE10BEB72201367D&page=0_0&invitationId=inv_dc3d7a47-0ded-4e9e-9826-5c5df12010bc#

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
