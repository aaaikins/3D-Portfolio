export const myProjects = [
  {
    id: 1,
    title: "AI-Powered PDF Assistant",
    description:
      "A SaaS application enabling users to upload, view, and chat with PDF documents using Next.js with TypeScript.",
    subDescription: [
      "Built Retrieval-Augmented Generation (RAG) pipeline using LangChain, Pinecone vector database and OpenAI API for accurate document answers.",
      "Integrated AWS S3 for file storage and DynamoDB for user/file management to deliver a scalable, low-latency experience.",
      "Implemented Clerk authentication, Stripe subscriptions, and real-time streaming of AI responses using Server-Sent Events.",
      "Delivered a complete SaaS solution with payment processing and user management.",
    ],
    href: "https://chat-with-pdf-blond.vercel.app",
    logo: "",
    image: "/assets/projects/elearning.jpg",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/javascript.svg",
      },
      {
        id: 3,
        name: "AWS",
        path: "/assets/logos/microsoft.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "AI Resume Analyzer",
    description:
      "An AI resume scoring tool using Amazon Comprehend and AWS serverless stack for automated resume evaluation.",
    subDescription: [
      "Built using Amazon Comprehend for natural language processing and sentiment analysis of resume content.",
      "Implemented AWS serverless architecture with S3 for storage, Lambda for processing, and API Gateway for endpoints.",
      "Automated CI/CD pipeline using AWS Amplify for seamless deployment and updates.",
      "Integrated Clerk authentication with dynamic React data visualizations for user insights.",
    ],
    href: "https://main.dws2b1a2xvqhb.amplifyapp.com",
    logo: "",
    image: "/assets/projects/auth-system.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "AWS",
        path: "/assets/logos/microsoft.svg",
      },
      {
        id: 3,
        name: "JavaScript",
        path: "/assets/logos/javascript.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 3,
    title: "TrackFunds",
    description:
      "A responsive transaction tracker with full CRUD operations built using the MERN stack.",
    subDescription: [
      "Created using MongoDB for data storage, Express.js for backend API, React for frontend, and Node.js for server runtime.",
      "Implemented complete CRUD operations for transaction management with intuitive user interface.",
      "Added real-time updates and schema validation to ensure secure and reliable financial data storage.",
      "Built responsive design with modern UI components for optimal user experience across devices.",
    ],
    href: "https://github.com/aaaikins/track-funds",
    logo: "",
    image: "/assets/projects/accessories.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "Node.js",
        path: "/assets/logos/javascript.svg",
      },
      {
        id: 3,
        name: "MongoDB",
        path: "/assets/logos/git.svg",
      },
      {
        id: 4,
        name: "Express.js",
        path: "/assets/logos/javascript.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/aaaikins",
    icon: "/assets/socials/github.svg",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/aikins-acheampong",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Website",
    href: "https://aikinsacheampong.com",
    icon: "/assets/socials/github.svg", // Using GitHub icon as placeholder for website
  },
];

export const experiences = [
  {
    title: "Software Engineer",
    job: "Veritas Foundation Inc.",
    date: "June 2025 – Present",
    contents: [
      "Led development of the organization's official website using Next.js and TypeScript and deployed on AWS Amplify.",
      "Designed a scalable RESTful API with Express.js and hosted on AWS Lambda together with Amazon API Gateway.",
      "Integrated an AI-powered chatbot using Amazon Bedrock, automating common inquiries and improving response times and user engagement.",
    ],
  },
  {
    title: "AI Engineer Intern",
    job: "SureStart AI",
    date: "June 2024 – August 2024",
    contents: [
      "Led a 3-person team to design Passport Pal, an AI travel assistant, utilizing OpenAI API, React.js, and FastAPI.",
      "Engineered a real-time notification system using AWS SNS to send personalized and timely travel reminders.",
      "Implemented user authentication with Clerk, deployed frontend on Amazon Amplify, hosted serverless backend on AWS Lambda.",
    ],
  },
  {
    title: "Teaching Assistant",
    job: "Colby College, CS152",
    date: "February 2024 – December 2024",
    contents: [
      "Assisted 50+ students in programming concepts in Python, leading to a 30% improvement in project scores during the Spring 2024 semester compared to previous semesters.",
      "Provided hands-on technical support during computer lab sessions, debugging code and resolving software issues to enhance learning efficiency.",
    ],
  },
];
export const reviews = [
  {
    name: "Professor Sarah Johnson",
    username: "@prof_sarah",
    body: "Aikins consistently demonstrates exceptional problem-solving skills and technical expertise in computer science fundamentals.",
    img: "https://robohash.org/prof_sarah",
  },
  {
    name: "Team Lead - SureStart AI",
    username: "@surestart_lead",
    body: "Aikins showed remarkable leadership skills while developing Passport Pal. His technical knowledge and teamwork were outstanding.",
    img: "https://robohash.org/surestart",
  },
  {
    name: "Fellow CS Student",
    username: "@cs_peer",
    body: "Working with Aikins on projects has been amazing. He brings innovative solutions and helps everyone understand complex concepts.",
    img: "https://robohash.org/cs_peer",
  },
  {
    name: "Study Group Member",
    username: "@study_buddy",
    body: "Aikins has this incredible ability to break down difficult algorithms and make them easy to understand. A natural teacher!",
    img: "https://robohash.org/study_buddy",
  },
  {
    name: "Project Collaborator",
    username: "@collab_mate",
    body: "His expertise in AWS and AI technologies helped our team deliver a high-quality project on time. Highly recommend!",
    img: "https://robohash.org/collab",
  },
  {
    name: "Hackathon Partner",
    username: "@hack_partner",
    body: "Aikins' knowledge of full-stack development and cloud services was instrumental in winning our hackathon.",
    img: "https://robohash.org/hackathon",
  },
];
