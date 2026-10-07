/**
 * CareerAI - Resume & Job Description Analysis Service
 * Supports Gemini API / OpenAI API with smart local NLP fallback.
 * Extended with Deadline-Aware Career GPS feature.
 */

const COMMON_SKILLS = [
  "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin",
  "React", "React Native", "Angular", "Vue", "Vue.js", "Next.js", "Node.js", "Express", "Spring", "Spring Boot",
  "Django", "Flask", "FastAPI", "HTML", "HTML5", "CSS", "CSS3", "Tailwind", "Tailwind CSS", "Bootstrap",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "SQLite", "DynamoDB",
  "REST", "REST APIs", "GraphQL", "gRPC", "Microservices", "System Design", "OOP",
  "AWS", "Docker", "Kubernetes", "Azure", "GCP", "Google Cloud", "CI/CD", "Git", "GitHub", "GitLab", "Jenkins", "Terraform",
  "Unit Testing", "Jest", "JUnit", "Mockito", "Selenium", "Cybersecurity", "Agile", "Scrum", "Jira",
  "Machine Learning", "Data Analysis", "Pandas", "NumPy", "TensorFlow", "PyTorch"
];

// ─── Deadline Helper ─────────────────────────────────────────────────────────
export function calcDaysRemaining(deadlineDate) {
  if (!deadlineDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadlineDate);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────
export async function analyzeResumeWithAI(resumeText, jobDescription, deadlineDate = null) {
  const daysRemaining = calcDaysRemaining(deadlineDate);

  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openAiKey = import.meta.env.VITE_OPENAI_API_KEY;

  let baseResult = null;

  if (geminiKey) {
    try {
      baseResult = await callGeminiAPI(resumeText, jobDescription, geminiKey);
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local engine:", err);
    }
  }

  if (!baseResult && openAiKey) {
    try {
      baseResult = await callOpenAIAPI(resumeText, jobDescription, openAiKey);
    } catch (err) {
      console.warn("OpenAI API call failed, falling back to local engine:", err);
    }
  }

  if (!baseResult) {
    baseResult = analyzeLocally(resumeText, jobDescription);
  }

  // Always generate GPS data locally (deterministic + instant)
  if (daysRemaining !== null) {
    const gps = generateCareerGPS(baseResult, daysRemaining);
    return { ...baseResult, ...gps };
  }

  return baseResult;
}

// ─── Gemini API ───────────────────────────────────────────────────────────────
async function callGeminiAPI(resumeText, jobDescription, apiKey) {
  const prompt = `You are an expert ATS resume analyzer and technical recruiter.
Analyze the following resume against the job description and return ONLY a valid JSON object with NO markdown formatting or backticks.

Expected JSON structure:
{
  "atsScore": number (0-100),
  "matchScore": number (0-100),
  "summary": "Short AI summary of the candidate's fit",
  "skills": ["Extracted skill from resume 1", "Skill 2"],
  "matchedSkills": ["Matched skill 1", "Matched skill 2"],
  "missingSkills": ["Missing skill 1 required by JD", "Missing skill 2"],
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "matchExplanation": "Explanation of why the score was given"
}

Resume:
${resumeText}

Job Description:
${jobDescription}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) throw new Error(`Gemini API returned status ${response.status}`);
  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}

// ─── OpenAI API ───────────────────────────────────────────────────────────────
async function callOpenAIAPI(resumeText, jobDescription, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an ATS Resume Analyzer. Return JSON with keys: atsScore, matchScore, summary, skills, matchedSkills, missingSkills, strengths, weaknesses, recommendations, matchExplanation." },
        { role: "user", content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}` }
      ]
    })
  });

  if (!response.ok) throw new Error(`OpenAI API returned status ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

// ─── Local NLP Fallback ───────────────────────────────────────────────────────
function analyzeLocally(resumeText, jobDescription) {
  const rLower = resumeText.toLowerCase();

  const resumeSkills = COMMON_SKILLS.filter(skill => new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(resumeText));
  const jdSkills = COMMON_SKILLS.filter(skill => new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(jobDescription));
  const matchedSkills = jdSkills.filter(skill => new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(resumeText));
  const missingSkills = jdSkills.filter(skill => !matchedSkills.includes(skill));

  const matchRatio = jdSkills.length > 0 ? matchedSkills.length / jdSkills.length : 0.75;
  const matchScore = Math.min(98, Math.max(35, Math.round(matchRatio * 100)));

  const actionVerbs = ['developed', 'built', 'created', 'implemented', 'managed', 'led', 'designed', 'optimized', 'engineered', 'maintained'];
  const foundVerbs = actionVerbs.filter(verb => rLower.includes(verb));

  let atsScore = 70;
  if (resumeSkills.length >= 5) atsScore += 10;
  if (foundVerbs.length >= 3) atsScore += 10;
  if (resumeText.length > 300) atsScore += 5;
  if (missingSkills.length > 3) atsScore -= 10;
  atsScore = Math.min(95, Math.max(40, atsScore));

  const strengths = [];
  if (matchedSkills.length > 0) strengths.push(`Strong proficiency in core required technologies: ${matchedSkills.slice(0, 3).join(', ')}.`);
  if (foundVerbs.length > 0) strengths.push('Uses impactful action verbs in project descriptions.');
  if (resumeSkills.length >= 4) strengths.push(`Solid technical foundation with ${resumeSkills.length} identified skills.`);
  if (strengths.length === 0) strengths.push('Clean resume format and relevant experience text provided.');

  const weaknesses = [];
  if (missingSkills.length > 0) weaknesses.push(`Missing key role requirements: ${missingSkills.join(', ')}.`);
  if (!/\d+%|\$\d+|\d+\s*years/i.test(resumeText)) weaknesses.push('Lacks quantifiable metrics and measurable project outcomes.');
  if (foundVerbs.length < 2) weaknesses.push('Could benefit from stronger action-oriented bullet points.');
  if (weaknesses.length === 0) weaknesses.push('Minor gaps in domain-specific advanced certifications.');

  const recommendations = missingSkills.map(s => `Gain foundational hands-on experience or project exposure in ${s}.`);
  recommendations.push('Quantify your achievements with concrete numbers and percentage improvements.');
  recommendations.push('Tailor your summary section to directly highlight matched requirements from this job description.');

  const candidateSkillsSummary = matchedSkills.length > 0 ? matchedSkills.join(', ') : 'the key area';
  const summary = `Candidate demonstrates clear capabilities in ${candidateSkillsSummary}, matching ${matchedSkills.length} out of ${jdSkills.length || matchedSkills.length} primary skills for this position.`;
  const matchExplanation = jdSkills.length > 0
    ? `You match ${matchedSkills.length} of ${jdSkills.length} important skills for this role. Adding experience in ${missingSkills.length > 0 ? missingSkills.join(' and ') : 'additional advanced tools'} will significantly boost your fit.`
    : `Your resume shows strong alignment with the job requirements overall, with a ${matchScore}% match grade.`;

  return {
    atsScore, matchScore, summary,
    skills: Array.from(new Set([...resumeSkills, ...matchedSkills])),
    matchedSkills, missingSkills, strengths, weaknesses,
    recommendations: recommendations.slice(0, 4), matchExplanation
  };
}

// ─── Career GPS Generator ─────────────────────────────────────────────────────
function generateCareerGPS(baseResult, daysRemaining) {
  const { missingSkills, matchScore, matchedSkills } = baseResult;

  // Priority skill map: skill → { impact score, hours to learn }
  const SKILL_META = {
    "Docker":        { impact: 9,  hours: 8,  priority: "HIGH",   topic: "Docker Fundamentals",       learn: ["Containers & Images", "Dockerfile basics", "Docker Compose", "Running containers"], practice: ["Dockerize a Spring Boot application", "Set up a multi-container dev environment"] },
    "AWS":           { impact: 12, hours: 10, priority: "HIGH",   topic: "AWS Cloud Basics",           learn: ["EC2 & S3 fundamentals", "IAM roles", "Elastic Load Balancing", "Basic deployment"], practice: ["Deploy a Java backend to EC2", "Host static assets on S3"] },
    "Kubernetes":    { impact: 8,  hours: 10, priority: "HIGH",   topic: "Kubernetes Orchestration",   learn: ["Pods & Deployments", "Services & Ingress", "ConfigMaps & Secrets"], practice: ["Deploy app with kubectl", "Scale a deployment"] },
    "System Design": { impact: 7,  hours: 6,  priority: "MEDIUM-HIGH", topic: "System Design Concepts", learn: ["REST API design patterns", "Caching strategies", "Database indexing", "Scalability basics"], practice: ["Design a URL shortener", "Explain microservice architecture"] },
    "TypeScript":    { impact: 6,  hours: 5,  priority: "MEDIUM", topic: "TypeScript Essentials",      learn: ["Types & interfaces", "Generics", "Utility types"], practice: ["Convert a React project to TypeScript"] },
    "GraphQL":       { impact: 5,  hours: 6,  priority: "MEDIUM", topic: "GraphQL API Design",         learn: ["Queries & mutations", "Resolvers", "Schema design"], practice: ["Build a GraphQL API in Node.js"] },
    "CI/CD":         { impact: 6,  hours: 5,  priority: "MEDIUM", topic: "CI/CD Pipelines",            learn: ["GitHub Actions basics", "Build & test automation", "Deploy stages"], practice: ["Create a CI pipeline for a Java project"] },
    "PostgreSQL":    { impact: 5,  hours: 4,  priority: "MEDIUM", topic: "PostgreSQL Database",        learn: ["SQL query optimization", "Indexes & explain plans", "Joins & aggregates"], practice: ["Optimize slow queries", "Write complex joins"] },
    "MongoDB":       { impact: 5,  hours: 4,  priority: "MEDIUM", topic: "MongoDB NoSQL",              learn: ["Documents & collections", "CRUD operations", "Aggregation pipeline"], practice: ["Build a CRUD API with Mongoose"] },
    "Redis":         { impact: 5,  hours: 3,  priority: "MEDIUM", topic: "Redis Caching",              learn: ["Key-value store", "TTL & expiry", "Pub/Sub basics"], practice: ["Cache API responses with Redis"] },
    "Microservices": { impact: 7,  hours: 6,  priority: "MEDIUM-HIGH", topic: "Microservices Design",  learn: ["Service boundaries", "API gateway pattern", "Event-driven architecture"], practice: ["Split a monolith into two services"] },
  };

  // Rank missing skills by impact
  const rankedSkills = missingSkills
    .map(skill => ({ skill, ...(SKILL_META[skill] || { impact: 4, hours: 4, priority: "MEDIUM", topic: skill, learn: [`${skill} fundamentals`, "Core concepts", "Best practices"], practice: [`Build a project using ${skill}`] }) }))
    .sort((a, b) => b.impact - a.impact);

  // Calculate readiness
  const currentReadiness = Math.max(30, Math.round(matchScore * 0.9));
  const maxGain = rankedSkills.reduce((sum, s) => sum + s.impact, 0);
  const cappedGain = Math.min(maxGain, 30);
  const estimatedReadinessAfterPlan = Math.min(95, currentReadiness + cappedGain);

  // Application strategy
  let applicationStrategy;
  if (matchScore >= 75) {
    applicationStrategy = { status: "APPLY_NOW_AND_PREPARE", label: "🟢 Apply Now + Prepare", reason: "You already meet most core requirements for this role. Apply now while following the preparation plan to strengthen your profile." };
  } else if (matchScore >= 50) {
    applicationStrategy = { status: "PREPARE_THEN_APPLY", label: "🟡 Prepare Then Apply", reason: "You have several important skill gaps. Focus on the highest-impact requirements first, then submit a stronger application." };
  } else {
    applicationStrategy = { status: "MAJOR_GAPS", label: "🔴 Address Major Gaps First", reason: "Several core requirements are currently missing from your resume. Follow the preparation plan to close the most critical gaps before applying." };
  }

  // Build personalized preparation plan from ranked skills + days
  const preparationPlan = buildPreparationPlan(rankedSkills, matchedSkills, daysRemaining);

  // Priority skills for display
  const prioritySkills = rankedSkills.slice(0, 5).map(s => ({
    skill: s.skill,
    priority: s.priority,
    reason: `Required by the job description and currently missing from your resume.`,
    estimatedMatchImprovement: s.impact
  }));

  return {
    daysRemaining,
    currentReadiness,
    estimatedReadinessAfterPlan,
    applicationStrategy,
    prioritySkills,
    preparationPlan
  };
}

function buildPreparationPlan(rankedSkills, matchedSkills, daysRemaining) {
  const plan = [];
  let currentDay = 1;

  // Emergency mode: ≤7 days
  if (daysRemaining <= 7) {
    const mustLearn = rankedSkills.filter(s => s.priority === "HIGH").slice(0, 2);
    const ifTimeAllows = rankedSkills.filter(s => s.priority !== "HIGH").slice(0, 2);
    const skip = rankedSkills.filter(s => !mustLearn.includes(s) && !ifTimeAllows.includes(s));

    mustLearn.forEach(s => {
      const daysForThisSkill = Math.min(Math.ceil(daysRemaining / mustLearn.length), 3);
      plan.push({ days: currentDay === currentDay + daysForThisSkill - 1 ? `Day ${currentDay}` : `Days ${currentDay}–${currentDay + daysForThisSkill - 1}`, topic: s.topic, estimatedHours: s.hours, priority: s.priority, learn: s.learn.slice(0, 3), practice: s.practice.slice(0, 1), mustLearn: true });
      currentDay += daysForThisSkill;
    });

    if (daysRemaining >= 5 && currentDay <= daysRemaining) {
      plan.push({ days: `Day ${currentDay}`, topic: "Resume Polish & Quick Interview Prep", estimatedHours: 3, priority: "HIGH", learn: ["Tailor resume summary to the JD", "Prepare 3 STAR-method answers", "Review matched skills for depth"], practice: ["Submit the application"], mustLearn: true });
    }

    plan.forEach(p => { p.emergencyMode = true; p.ifTimeAllows = ifTimeAllows.map(s => s.skill); p.skipForNow = skip.map(s => s.skill); });
    return plan;
  }

  // Normal mode: assign days proportionally to ranked missing skills
  const highPriority = rankedSkills.filter(s => s.priority === "HIGH");
  const medPriority = rankedSkills.filter(s => s.priority !== "HIGH");

  // Reserve last 3 days for: DSA/revision, mock interview, final prep
  const skillDays = Math.max(1, daysRemaining - 3);
  const totalImpact = rankedSkills.reduce((s, x) => s + x.impact, 0) || 1;

  rankedSkills.forEach((s, idx) => {
    const allocated = Math.max(2, Math.round((s.impact / totalImpact) * skillDays));
    const endDay = Math.min(currentDay + allocated - 1, daysRemaining - 3);
    const daysLabel = currentDay === endDay ? `Day ${currentDay}` : `Days ${currentDay}–${endDay}`;
    plan.push({ days: daysLabel, topic: s.topic, estimatedHours: s.hours, priority: s.priority, learn: s.learn, practice: s.practice });
    currentDay = endDay + 1;
    if (currentDay >= daysRemaining - 2) return;
  });

  // Add matched skills revision if days allow
  if (currentDay <= daysRemaining - 3 && matchedSkills.length > 0) {
    plan.push({
      days: `Days ${currentDay}–${daysRemaining - 2}`,
      topic: "Core Skills Revision",
      estimatedHours: 4,
      priority: "MEDIUM",
      learn: matchedSkills.slice(0, 4).map(s => `Deepen ${s} with advanced patterns`),
      practice: ["Review projects on your resume", "Prepare strong talking points for matched skills"]
    });
  }

  // Day N-1: Mock Interview
  plan.push({
    days: `Day ${daysRemaining - 1}`,
    topic: "🎤 Mock Interview Preparation",
    estimatedHours: 3,
    priority: "HIGH",
    learn: ["Practice STAR-method answers", "Review common technical Q&A for this role", "Behavioral questions: leadership, teamwork, conflict"],
    practice: ["Mock interview with a peer or record yourself", "Time your answers to 2 minutes each"]
  });

  // Final day: Application checklist
  plan.push({
    days: `Day ${daysRemaining}`,
    topic: "🚀 Final Application Day",
    estimatedHours: 2,
    priority: "HIGH",
    learn: ["Final resume review against job description", "Check all required skills are highlighted", "Review company & role details"],
    practice: ["Submit the application", "Write a tailored cover letter paragraph", "Connect with a team member on LinkedIn"]
  });

  return plan;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
