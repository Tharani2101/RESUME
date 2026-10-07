export const SAMPLE_RESUME = `ALEX MORGAN
Software Engineer | Full Stack & Backend Developer
Email: alex.morgan@example.com | GitHub: github.com/alexmorgan | LinkedIn: linkedin.com/in/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 3+ years of experience building scalable backend microservices and web applications using Java, Spring Boot, and SQL databases. Passionate about clean code, RESTful API design, and modern web frameworks.

SKILLS & TECHNOLOGIES
• Programming Languages: Java, JavaScript, HTML, CSS
• Frameworks: Spring Boot, React, REST APIs
• Databases: MySQL
• Tools & Version Control: Git, GitHub, Maven, Postman

WORK EXPERIENCE
Software Developer | TechCorp Solutions
2022 - Present
• Designed and developed high-throughput REST APIs using Java and Spring Boot.
• Optimized MySQL database queries, reducing average API response latency by 35%.
• Integrated React frontend components with Java backend services for enterprise dashboards.
• Collaborated in an Agile team using Git for version control and code reviews.

TECHNICAL PROJECTS
E-Commerce API Service: Built a robust backend utilizing Java, Spring Boot, MySQL, and REST APIs.
Portfolio Website: Developed an interactive single-page application using React, JavaScript, HTML, and CSS.`;

// Demo deadline = 18 days from today
function get18DaysFromNow() {
  const d = new Date();
  d.setDate(d.getDate() + 18);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}
export const SAMPLE_DEADLINE = get18DaysFromNow();

export const SAMPLE_JOB_DESCRIPTION = `Java Backend Developer

Requirements:
- Java
- Spring Boot
- REST APIs
- MySQL
- Docker
- AWS
- Git
- System Design

We are seeking a talented Java Backend Developer to join our Cloud Platform Team.

Key Requirements & Technical Skills:
- Strong proficiency in Java and Spring Boot.
- Experience developing and maintaining REST APIs.
- solid database skills with MySQL or PostgreSQL.
- Hands-on experience with Docker and containerization.
- Experience with AWS (Amazon Web Services) cloud infrastructure.
- Proficient with Git for version control.

Responsibilities:
- Build high-scale microservices and backend architectures.
- Deploy and monitor applications in AWS cloud environments using Docker.
- Collaborate with frontend engineers to integrate APIs.`;
