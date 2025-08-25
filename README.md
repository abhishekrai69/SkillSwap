Assignment Title: 
"SkillSwap – A Peer-to-Peer Micro-Learning Platform" 
Project Brief: 
You need to build the frontend of a MERN app using React where users can exchange their 
skills in micro-learning sessions. For example, someone who knows "Guitar basics" can offer a 
30-minute session, and in return, they can take a "Photography crash course" from another 
user. 
The platform works as a barter system: 
● No money, only skill credits. 
● A user earns credits by teaching and spends credits by learning. 
The app should be scalable, cleanly designed, and easy to extend later. 
Core Requirements: 
1. User Authentication (basic) 
● Sign Up / Login form (React only; mock backend or simple API). 
● User profile: name, email, skill tags. 
2. Dashboard 
● Show available micro-sessions posted by other users. 
● Each session card: skill name, duration, credit cost, tutor name. 
● Search + filter by skill tags. 
3. Post a Session 
● Form to create a new session: 
○ Skill title 
○ Short description 
○ Duration 
○ Credit cost (1–5 credits) 
● Session should appear in dashboard instantly (use state or API call). 
4. Credit System (Frontend Mock) 
● Every new user starts with 5 credits. 
● If user books a session, subtract credits locally. 
● If user hosts a session and another user books it, add credits locally. 
5. Chat Preview (optional but recommended) 
● When user clicks "Book Session", open a modal with a chat preview (static or mock). 
● This will simulate confirming details before exchanging contact info. 
6. UI & UX Requirements 
● Use React with Hooks (no class components). 
● Use React Router for pages (Login, Dashboard, Profile). 
● Clean folder structure (/components, /pages, /services). 
● Use Tailwind CSS or Material UI. 
● Responsive design (works on desktop + mobile). 
7. Optional Bonus Features (for extra credit) 
● Use a mock backend with Express + MongoDB or json-server to store users and 
sessions. 
● Implement a global state using Redux Toolkit or Context API to store user credits and 
session list. 
● Add notifications or toasts on booking / posting sessions. 
● Add JWT authentication (basic) if you do backend. 
