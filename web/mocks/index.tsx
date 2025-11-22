import {
  Candidate,
  DashboardData,
  GeneratedJobOffer,
  StoredJobOffer,
} from "@/types";

export const mockCandidates: Candidate[] = [
  {
    id: "CAND-005",
    name: "Alice Johnson",
    current_title: "Java Architect",
    job_id: "JOB-001",
    years_experience: 10,
    email: "alice@example.com",
    cv_summary: "Former architect with focus on performance.",
    fit_score: 92, // High Match
    metrics: {
      skills_match_score: 98,
      experience_relevance_score: 9,
      education_fit_score: 8,
      achievement_impact_score: 9,
      keyword_density_score: 90,
      employment_gap_score: 10,
      readability_score: 8,
      ai_confidence_score: 95,
    },
  } as Candidate,
  {
    id: "CAND-006",
    name: "Bob Williams",
    current_title: "Junior Backend Dev",
    job_id: "JOB-001",
    years_experience: 2,
    email: "bob@example.com",
    cv_summary: "Recent graduate with strong Python focus.",
    fit_score: 49,
    metrics: {
      skills_match_score: 55,
      experience_relevance_score: 4,
      education_fit_score: 9,
      achievement_impact_score: 6,
      keyword_density_score: 70,
      employment_gap_score: 10,
      readability_score: 7,
      ai_confidence_score: 90,
    },
  } as Candidate,
  {
    id: "CAND-007",
    name: "Carlos Diaz",
    current_title: "DevOps Engineer",
    job_id: "JOB-001",
    years_experience: 7,
    email: "carlos@example.com",
    cv_summary:
      "Highly skilled in AWS infrastructure and DevOps, less Java experience.",
    fit_score: 81,
    metrics: {
      skills_match_score: 75,
      experience_relevance_score: 8,
      education_fit_score: 7,
      achievement_impact_score: 8,
      keyword_density_score: 80,
      employment_gap_score: 10,
      readability_score: 9,
      ai_confidence_score: 92,
    },
  } as Candidate,
];

export const mockDashboardData: DashboardData = {
  metrics: {
    total_open_jobs: 5,
    total_applications: 128,
    avg_time_to_fill_days: 35,
    top_score_candidate_name: "Alice Johnson",
  },
  active_jobs: [
    {
      id: "JOB-001",
      job_title: "Senior Backend Engineer",
      department: "Engineering",
      location: {
        city: "Lisbon",
        work_type: "Hybrid",
      },
      employment_type: "Full-time",
      salary_range: {
        min: "60000",
        max: "80000",
        currency: "EUR",
      },
      job_summary:
        "We are seeking an experienced Senior Backend Engineer to join our dynamic engineering team. As a Senior Backend Engineer, you will be responsible for designing, developing, and maintaining high-performance backend systems and APIs. You will play a key role in building scalable and secure solutions using modern technologies.",
      key_responsibilities: [
        "Design, develop, and maintain backend services and APIs.",
        "Collaborate with cross-functional teams to ensure high-quality product delivery.",
        "Build and maintain scalable, high-availability systems.",
        "Optimize backend performance and troubleshoot issues.",
        "Mentor junior engineers and contribute to technical documentation.",
      ],
      required_skills: [
        "Proven experience in backend development with expertise in Java, Node.js, or Python.",
        "Experience with cloud platforms like AWS, GCP, or Azure.",
        "Strong understanding of RESTful API design and microservices architecture.",
        "Proficiency in databases (SQL and NoSQL).",
        "Experience with CI/CD pipelines and version control systems like Git.",
      ],
      required_skills_keywords: [
        "Java",
        "Node.js",
        "Python",
        "AWS",
        "Microservices",
        "CI/CD",
      ],
      preferred_skills: [
        "Experience with containerization (Docker, Kubernetes).",
        "Familiarity with GraphQL and serverless architectures.",
        "Knowledge of event-driven systems and message queues (Kafka, RabbitMQ).",
      ],
      preferred_skills_keywords: [
        "Docker",
        "Kubernetes",
        "GraphQL",
        "Serverless",
        "Kafka",
      ],
      soft_skills: [
        "Strong communication skills and ability to collaborate with cross-functional teams.",
        "Problem-solving mindset and ability to troubleshoot complex issues.",
        "Self-motivated and proactive in learning new technologies.",
      ],
      soft_skills_keywords: [
        "Communication",
        "Problem-solving",
        "Self-motivation",
      ],
      company_values_and_culture: {
        collaboration:
          "We encourage collaboration across teams to drive innovation and deliver high-quality products.",
        ownership:
          "We trust our engineers to take full ownership of their projects from start to finish.",
        diversity_and_inclusion:
          "We are committed to creating a diverse and inclusive work environment where everyone can thrive.",
        continuous_improvement:
          "We foster a culture of continuous learning and improvement, encouraging feedback and growth.",
        transparency:
          "We maintain open and transparent communication, ensuring everyone is aligned on goals and challenges.",
      },
      application_encouragement:
        "We encourage applicants from all backgrounds to apply, even if you don't meet every requirement. If you have a passion for backend engineering and thrive in a collaborative environment, we’d love to hear from you.",
      status: "Open",
      created_at: "2025-11-01",
    },
    {
      id: "JOB-002",
      job_title: "Product Manager",
      department: "Product",
      location: {
        city: "Remote",
        work_type: "Remote",
      },
      employment_type: "Full-time",
      salary_range: {
        min: "80000",
        max: "100000",
        currency: "EUR",
      },
      job_summary:
        "We are looking for a proactive and innovative Product Manager to lead the development of new product features and improvements. In this role, you will work closely with cross-functional teams including engineering, design, and marketing to create exceptional products that delight our customers. You will be the driving force behind product strategy, roadmap, and execution.",
      key_responsibilities: [
        "Define and prioritize product features based on business goals, customer needs, and technical feasibility.",
        "Work with engineering and design teams to deliver high-quality product releases on time.",
        "Gather and analyze customer feedback to inform product decisions and improvements.",
        "Collaborate with marketing and sales teams to ensure successful product launches.",
        "Monitor key product metrics and iterate on features to drive user engagement and satisfaction.",
      ],
      required_skills: [
        "Proven experience as a Product Manager in a fast-paced environment.",
        "Strong understanding of the product development lifecycle from ideation to delivery.",
        "Excellent communication and leadership skills, with the ability to influence cross-functional teams.",
        "Experience with Agile development methodologies.",
        "Ability to analyze market trends and customer feedback to drive product strategy.",
      ],
      required_skills_keywords: [
        "Product Management",
        "Agile",
        "Leadership",
        "Market Analysis",
        "Customer Feedback",
      ],
      preferred_skills: [
        "Experience with SaaS products and cloud technologies.",
        "Familiarity with A/B testing and user research methods.",
        "Knowledge of UX/UI design principles.",
      ],
      preferred_skills_keywords: ["SaaS", "A/B Testing", "UX/UI", "Cloud"],
      soft_skills: [
        "Strong problem-solving skills and attention to detail.",
        "Ability to work in a collaborative and fast-moving environment.",
        "Adaptability and comfort with ambiguity and change.",
      ],
      soft_skills_keywords: [
        "Problem-solving",
        "Collaboration",
        "Adaptability",
      ],
      company_values_and_culture: {
        collaboration:
          "We value teamwork and believe in the power of diverse perspectives to drive innovation.",
        ownership:
          "We take responsibility for our work and strive for excellence in everything we do.",
        diversity_and_inclusion:
          "We are committed to fostering an inclusive and welcoming environment for all employees.",
        continuous_improvement:
          "We believe in continuous learning, growth, and adapting to changing needs in the market.",
        transparency:
          "We are open and transparent about our goals, challenges, and progress towards achieving them.",
      },
      application_encouragement:
        "If you're passionate about product management and excited about building products that make a difference, we encourage you to apply, even if you don't meet every single requirement. We value curiosity and a willingness to learn.",
      status: "Open",
      created_at: "2025-11-10",
    },
  ],
  recent_candidates: [
    {
      id: "CAND-005",
      name: "Alice Johnson",
      current_title: "Java Architect",
      job_id: "JOB-001",
      fit_score: 92,
      email: "",
      years_experience: 10,
      cv_summary: "",
      metrics: {} as any,
    },
    {
      id: "CAND-006",
      name: "Bob Williams",
      current_title: "Data Scientist",
      job_id: "JOB-002",
      fit_score: 85,
      email: "",
      years_experience: 5,
      cv_summary: "",
      metrics: {} as any,
    },
  ],
};

export const mockGeneratedJobOffer: GeneratedJobOffer = {
  job_title: "Senior Backend Developer (Java & AWS)",
  department: "Engineering",
  location: { city: "Lisbon", work_type: "Hybrid" },
  employment_type: "Full-time",
  salary_range: { min: "60000", max: "80000", currency: "EUR" },
  job_summary:
    "We are seeking a Senior Backend Developer with strong Java and AWS experience to design, build, and maintain scalable, secure, and high-performance backend services. You will work closely with cross-functional teams to deliver robust APIs, integrate with cloud-native services, and drive technical decisions that shape our platform architecture.",
  key_responsibilities: [
    "Design, develop, and maintain backend services and RESTful APIs using Java and AWS.",
    "Architect and optimize scalable, secure, and high-availability cloud solutions in AWS.",
    "Collaborate with product, frontend, and DevOps teams to deliver end-to-end features from concept to production.",
    "Mentor junior engineers and contribute to technical documentation.",
  ],
  required_skills: [
    "Strong hands-on experience with Java for backend development.",
    "Practical experience designing, deploying, and operating applications on AWS.",
    "Proficiency in RESTful API design and implementation.",
  ],
  required_skills_keywords: ["Java", "AWS", "REST"],
  preferred_skills: [
    "Experience with microservices architectures and containerization (Docker, Kubernetes).",
    "Experience with relational and NoSQL databases, performance tuning, and monitoring tools.",
  ],
  preferred_skills_keywords: ["Microservices", "Docker", "Kubernetes"],
  soft_skills: [
    "Excellent communication and collaboration skills in cross-functional teams.",
    "Strong sense of ownership, problem-solving abilities, and proactive attitude.",
  ],
  soft_skills_keywords: ["Collaboration", "Ownership"],
  company_values_and_culture: {
    collaboration:
      "We work in cross-functional, supportive teams where everyone's input is valued and knowledge-sharing is encouraged.",
    ownership:
      "We trust our engineers to take end-to-end responsibility for their services, from design to production support.",
    diversity_and_inclusion:
      "We are committed to building an inclusive environment where people from all backgrounds can thrive and feel respected.",
    continuous_improvement:
      "We promote learning, experimentation, and regular feedback to continually improve our product, processes, and ourselves.",
    transparency:
      "We communicate openly about goals, decisions, and challenges so everyone understands how their work contributes to our mission.",
  },
  application_encouragement:
    "We encourage you to apply even if you don't meet every requirement. If you are excited about backend development with Java and AWS and are eager to learn and grow, we'd love to hear from you.",
};

export const mockPartialDashboardData: DashboardData = {
  metrics: {
    total_open_jobs: 5,
    total_applications: 128,
    avg_time_to_fill_days: 35,
    top_score_candidate_name: "Alice Johnson",
  },
  active_jobs: [],
  recent_candidates: [],
};
