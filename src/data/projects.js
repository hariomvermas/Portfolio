// TODO: Fill githubUrl and liveUrl for each project when available.
// Hide buttons whose URL is an empty string (handled in the component).

const projects = [
  {
    id: 'paid-media-locker',
    title: 'Paid Media Locker',
    description:
      'Secure media-sharing platform where creators upload premium content, manage media and control user access.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'React Native', 'REST APIs'],
    highlights: ['CRUD operations', 'File upload', 'Authentication', 'RESTful APIs'],
    githubUrl: 'https://github.com/hariomvermas/Paid-Media-Locker', // TODO: add GitHub repo URL
    liveUrl: '',  // TODO: add live demo URL if available
  },
  {
    id: 'student-performance-prediction',
    title: 'Student Performance Prediction',
    description:
      'ML web app predicting academic performance and showing personalized strengths and improvement areas.',
    tech: ['Python', 'Flask', 'Linear Regression', 'HTML', 'CSS', 'JavaScript'],
    highlights: ['Machine learning', 'Personalized insights'],
    githubUrl: '', // TODO: add GitHub repo URL
    liveUrl: '',  // TODO: add live demo URL if available
  },
  {
    id: 'quick-quiz',
    title: 'Quick Quiz',
    description:
      'One-question-at-a-time quiz with automatic scoring and results; MySQL stores questions and scores.',
    tech: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    highlights: ['Automatic scoring', 'MySQL-backed questions'],
    githubUrl: '', // TODO: add GitHub repo URL
    liveUrl: '',  // TODO: add live demo URL if available
  },
  {
    id: 'weather-web-app',
    title: 'Weather Web App',
    description: 'Responsive weather application built during IBM-NASSCOM PBEL 3.0 internship.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Built during IBM-NASSCOM PBEL 3.0'],
    githubUrl: 'https://github.com/hariomvermas/Weather-App', // TODO: add GitHub repo URL
    liveUrl: 'https://weather-app-hariom10.vercel.app/',  // TODO: add live demo URL if available
  },
]

export default projects
