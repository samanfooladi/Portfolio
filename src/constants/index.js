export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Work",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

// Add your client reviews here. While this list is empty, the Clients
// section shows a "No reviews set" box instead.
// Copy this template for each review (img path is relative to /public):
// {
//     id: 1,
//     name: 'Client Name',
//     position: 'Role at Company',
//     img: 'assets/review1.png',
//     review: 'What the client said about working with you.',
// },
export const clientReviews = [];

export const myProjects = [
  {
    title: "Quera Bootcamp - E-Commerce Store",
    desc: "An e-commerce web application built as the final group project of the Quera Bootcamp. Users can browse products, view product details and sign in with role-based access, while admins manage products and categories from a dedicated admin panel.",
    subdesc:
      "Built with React, TypeScript and Vite, using React Context for state, Axios for API calls, React Router, Swiper and Tailwind CSS with DaisyUI, including dark and light modes.",
    href: "https://github.com/reihaebra/QBC10-Group5-6-project2",
    // Placeholder media until the project's own video and logo are added
    texture: "/textures/project/project1.mp4",
    logo: "/assets/eccomerce-icon.png",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
        ? [5, 4, 0]
        : isTablet
          ? [5, 4, 0]
          : [12, 3, 0],
    ringPosition: isSmall
      ? [-3, 5.5, 0]
      : isMobile
        ? [-4.5, 5.5, 0]
        : isTablet
          ? [-5, 5.5, 0]
          : [-11, 7.5, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: "Framer",
    pos: "Lead Web Developer",
    duration: "2022 - Present",
    title:
      "Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
    icon: "/assets/framer.svg",
    animation: "victory",
  },
  {
    id: 2,
    name: "Figma",
    pos: "Web Developer",
    duration: "2020 - 2022",
    title:
      "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
    icon: "/assets/figma.svg",
    animation: "clapping",
  },
  {
    id: 3,
    name: "Notion",
    pos: "Junior Web Developer",
    duration: "2019 - 2020",
    title:
      "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
    icon: "/assets/notion.svg",
    animation: "salute",
  },
];
