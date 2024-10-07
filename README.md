## Event App (Engineering Thesis)

The **Event App** was my engineering thesis project, developed to manage and streamline IT conferences. It was successfully used during one of the largest IT conferences in my region, showcasing its real-world application and scalability. The app allows to:

- Create, edit, and manage lectures and workshops.
- Sign up for event and receive news about it.
- Engage participants through rewards for active involvement.
- Generate customized/branded QR codes.
- Showcase sponsors and partners.
- Manage volunteers.

In this rewrite, I am modernizing the original version from the ground up. Once the web application is complete, I will begin redevelopment of the mobile application (scanning QR codes & drawing rewards) from scratch.

The original code is securely stored in private repositories.

For more details, feel free to ask during interviews.

**This project is currently a work in progress.**

## Demo

Explore the live demo of the Event App at [event.klisiu.me](https://event.klisiu.me).
Please note that most of the content requires an admin role for full access. If you'd like to see additional features, feel free to request access. Additionally, a YouTube project showcase will be available soon, or you can view the app during an interview.

## Screenshots

Screenshots coming soon.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `KINDE_CLIENT_ID`: Your Kinde application's client ID used for authentication.
- `KINDE_CLIENT_SECRET`: Your Kinde application's client secret used for authentication.
- `KINDE_ISSUER_URL`: The URL for your Kinde issuer, which handles the OpenID Connect (OIDC) authorization flow.
- `KINDE_SITE_URL`: The base URL of your application (usually `http://localhost:3000` for local development).
- `KINDE_POST_LOGOUT_REDIRECT_URL`: The URL to redirect users to after logging out of the application. Should end in `/success` to grab user data.
- `KINDE_POST_LOGIN_REDIRECT_URL`: The URL to redirect users to after a successful login.
- `DATABASE_URL`: The URL to connect to your PostgreSQL database (contains credentials, host, and port information).
- `UPLOADTHING_SECRET`: Your secret key for using the UploadThing API.
- `UPLOADTHING_APP_ID`: Your application ID for using the UploadThing API.
- `NEXT_PUBLIC_WEBSITE_URL`: The publicly accessible URL for your application.

## Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Run Locally

To get started with the project locally, follow these steps:

**Clone the repository:**

```bash
git clone https://github.com/klisiubb/event-app.git
```

**Navigate to the project directory:**

```bash
cd event-app
```

**Set up environment variables:**

Fill out the `.env` file with the necessary environment variables.

**Install dependencies:**

```bash
bun install
```

**Start the development server:**

```bash
bun dev
```

**Access the application:**

```bash
localhost:3000
```

> **Note:** Ensure you assign the admin role to your account in Kinde to access full features.

## Lessons Learned

Throughout this project, I gained valuable experience with new technologies, including Next.js 14, Zod, and React Hook Form. This was my first significant project built from the ground up, diverging from the typical approach of following a tutorial-based project. It presented numerous challenges commonly associated with large-scale applications, such as debugging and managing complexity.

Some of the key challenges I faced included:

- **Date Formatting:** Handling the start and finish dates for workshops and lectures.
- **Reward Algorithm:** Developing an effective algorithm for drawing rewards.
- **Time Management:** Working under pressure to ensure timely completion for university requirements.

These experiences have greatly enhanced my problem-solving skills and understanding of project management.

## Roadmap

- [ ] Finish project to restore the previous version state.
- [ ] Add quizzes for workshops.
- [ ] Build a statistics page for overall performance metrics.
- [ ] Enhance email and notification features.
- [ ] Implement a countdown timer for the start of events.
- [ ] Explore additional features and improvements.

## Authors

- [klisiubb](https://www.github.com/klisiubb)

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/).
