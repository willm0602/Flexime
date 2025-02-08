import Resume from '@/lib/jsonResume';

const sampleResumes: Resume[] = [
    {
      "basics": {
        "name": "John Doe",
        "label": "Software Engineer",
        "email": "johndoe@example.com",
        "phone": "123-456-7890",
        "url": "https://johndoe.dev",
        "summary": "Passionate full-stack developer with experience in React and Node.js.",
        "location": {
          "address": "123 Main St",
          "postalCode": "12345",
          "city": "San Francisco",
          "countryCode": "US",
          "region": "California"
        },
        "profiles": [
          {
            "network": "GitHub",
            "username": "johndoe",
            "url": "https://github.com/johndoe"
          }
        ]
      },
      "work": [
        {
          "name": "Tech Corp",
          "position": "Frontend Developer",
          "startDate": "2022-06-01",
          "endDate": "2024-01-01",
          "summary": "Developed and maintained the company's main customer portal.",
          "highlights": [
            "Improved page load speed by 30% using Next.js optimization techniques",
            "Implemented an accessible design system following WCAG guidelines"
          ]
        }
      ],
      "education": [
        {
          "institution": "University of Technology",
          "area": "Computer Science",
          "studyType": "Bachelor's",
          "startDate": "2018-09-01",
          "endDate": "2022-06-01",
          "score": "3.8 GPA"
        }
      ],
      "skills": [
        {
          "name": "JavaScript",
          "level": "Advanced",
          "keywords": ["React", "Node.js", "TypeScript"]
        }
      ],
      "projects": [
        {
          "name": "Personal Portfolio",
          "startDate": "2023-03-01",
          "description": "A portfolio website showcasing my projects and skills.",
          "highlights": [
            "Built with Next.js and Tailwind CSS",
            "Implemented dark mode using CSS variables"
          ],
          "url": ["https://johndoe.dev"]
        }
      ]
    },
    {
      "basics": {
        "name": "Jane Smith",
        "label": "Data Scientist",
        "email": "janesmith@example.com",
        "phone": "987-654-3210",
        "url": "https://janesmith.ai",
        "summary": "Experienced data scientist specializing in machine learning and AI.",
        "location": {
          "address": "456 AI Lane",
          "postalCode": "67890",
          "city": "New York",
          "countryCode": "US",
          "region": "New York"
        },
        "profiles": [
          {
            "network": "LinkedIn",
            "url": "https://linkedin.com/in/janesmith"
          }
        ]
      },
      "work": [
        {
          "name": "AI Innovations",
          "position": "Machine Learning Engineer",
          "startDate": "2021-09-01",
          "summary": "Developed and deployed machine learning models for predictive analytics.",
          "highlights": [
            "Optimized recommendation algorithms increasing engagement by 20%",
            "Led a team of 5 data scientists in model deployment"
          ]
        }
      ],
      "education": [
        {
          "institution": "AI University",
          "area": "Data Science",
          "studyType": "Master's",
          "startDate": "2019-09-01",
          "endDate": "2021-06-01",
          "score": "4.0 GPA"
        }
      ],
      "skills": [
        {
          "name": "Python",
          "level": "Expert",
          "keywords": ["TensorFlow", "Pandas", "Scikit-learn"]
        }
      ],
      "projects": [
        {
          "name": "AI Chatbot",
          "description": "A conversational AI chatbot for customer support.",
          "highlights": [
            "Trained using GPT-3 and fine-tuned for domain-specific responses",
            "Deployed on AWS Lambda for scalability"
          ],
          "url": ["https://github.com/janesmith/ai-chatbot"]
        }
      ]
    },
    {
      "basics": {
        "name": "Sam Taylor",
        "label": "Freelance Developer",
        "email": "samtaylor@example.com",
        "phone": "555-555-5555",
        "summary": "Self-taught full-stack developer with a focus on performance optimization.",
        "profiles": []
      },
      "work": [],
      "education": [],
      "skills": [
        {
          "name": "Web Development",
          "keywords": ["HTML", "CSS", "JavaScript"]
        }
      ],
      "projects": [
        {
          "name": "Minimal Blog CMS",
          "description": "A lightweight CMS for blogging.",
          "highlights": [
            "Designed a custom database schema for fast content retrieval",
            "Implemented markdown support for articles"
          ],
          "url": ["https://github.com/samtaylor/minimal-blog"]
        }
      ]
    },
    {},
];

export default sampleResumes;