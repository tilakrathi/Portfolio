import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, FolderGit2, Briefcase } from "lucide-react";

export default function ProfessionalPortfolio() {
  const CONTACT_EMAIL = "iamtilakrathi16@gmail.com";
  const GITHUB_URL = "https://github.com/tilakrathi";
  const LINKEDIN_URL = "https://www.linkedin.com/in/tilak-rathi-41b92b328";

  const NAV = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const RESUME = {
    headline:
      "B.Tech IT student (Minor: ENTC) focused on building web, ML, and IoT projects.",
    skills: {
      Programming: ["Java", "Python", "C", "ML"],
      Web: ["HTML", "CSS", "JavaScript"],
      Databases: ["Oracle DB", "MySQL"],
      Tools: ["Git", "VS Code", "Eclipse", "Flask", "Arduino/ESP32", "scikit-learn"],
      "CS Core": ["DS", "OOP", "OS", "CN"],
    },
    educationOneLine: "B.Tech IT (Minor: ENTC) — YCCE Nagpur (2023–2027) | CGPA: 7.83*",
    experience: [
      {
        title: "Java Programming Intern",
        org: "CCIT Authorized by MKCL, MCED (Dhamangaon Rly)",
        period: "15th Jun–15th Jul 2025",
        bullets: [
          "Completed a 4-week Java internship applying OOP, exception handling, arrays, and file I/O.",
          "Built Java games (Tic-Tac-Toe, RPS) improving logic, debugging, and code quality.",
          "Gained experience with Java Swing/JavaFX, Collections Framework, and Git/GitHub.",
        ],
      },
      {
        title: "Hackathons and Innovation Competition",
        org: "Hackathons + TBI Innovation Competition (Finalist)",
        period: "—",
        bullets: [
          "Built ML and IoT-based prototype solutions under time constraints.",
          "Strengthened problem-solving, teamwork, and rapid project-development skills.",
        ],
      },
    ],
    projects: [
      {
        title: "Automated Medicine Dispenser (IoT)",
        tags: ["IoT", "ESP32", "Sensors"],
        desc: [
          "Built an IoT-based pill dispenser using servo + IR/weight sensing for accurate dose release.",
          "Added smart alerts (buzzer/notification) with caregiver escalation to reduce missed doses.",
          "Designed a low-cost prototype (~₹1,500) suitable for home and clinic use.",
        ],
        github: GITHUB_URL,
      },
      {
        title: "House Price Prediction (Machine Learning)",
        tags: ["ML", "EDA", "scikit-learn"],
        desc: [
          "Processed a 7,000-row dataset with EDA, cleaning, outlier removal, and feature engineering.",
          "Built ML pipeline; KNN achieved R² = 0.8300 (Linear Regression: 0.8077).",
          "Improved results by standardizing sqft values and handling 1300+ location categories.",
        ],
        github: GITHUB_URL,
      },
      {
        title: "Student Management System (Flask + Oracle DB)",
        tags: ["Flask", "Oracle 21c", "CRUD"],
        desc: [
          "Developed a web app enabling real-time CRUD operations for student records.",
          "Integrated Flask backend with Oracle Database 21c using the oracledB connector.",
          "Created a 4-module interface ensuring reliable data handling and schema integrity.",
        ],
        github: GITHUB_URL,
      },
    ],
    // Keeping achievements/certifications in code for later reuse,
    // but not rendering them on the “normal portfolio” homepage.
    achievements: {
      responsibility: [
        "Event Management, Sponsorship & Publicity Co-Head for Techfests (operations, sponsorships, promotions).",
      ],
      certifications: [
        "Stanford University (Coursera) — Supervised Machine Learning",
        "IIT Kharagpur (NPTEL) — E-Business",
        "Infosys Springboard — HTML5, XML & Algorithms",
        "Swayam — Community Engagement",
      ],
      hobbies: ["Algorithmic problem-solving", "Mentoring peers", "Chess and puzzles"],
    },
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      alert("Email copied to clipboard");
    } catch {
      // Fallback for older browsers / permission denial
      try {
        const ta = document.createElement("textarea");
        ta.value = CONTACT_EMAIL;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert("Email copied to clipboard");
      } catch {
        alert(`Copy this email: ${CONTACT_EMAIL}`);
      }
    }
  };

  const [backendStatus, setBackendStatus] = useState({ state: "loading" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setBackendStatus({ state: "ok", data });
      } catch (err) {
        if (!cancelled) setBackendStatus({ state: "error", error: String(err) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tilak Rathi</h1>
            <p className="text-sm text-gray-600">{RESUME.educationOneLine}</p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap md:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => window.open("/Tilak_Rathi_Resume.txt", "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />Download Resume
            </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio%20Contact`}
          >
            <Mail className="w-4 h-4 mr-2" />Contact
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
          >
            <Github className="w-4 h-4 mr-2" />GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer")}
          >
            <Linkedin className="w-4 h-4 mr-2" />LinkedIn
          </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        <section className="py-10">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold tracking-tight">Hi, I’m Tilak.</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                I’m a B.Tech IT student who builds web apps, ML models, and practical IoT prototypes. I like clean UI,
                solid logic, and shipping real projects.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio%20Contact`}>
                  <Mail className="w-4 h-4 mr-2" />Email
                </Button>
                <Button variant="outline" onClick={copyEmail}>Copy Email</Button>
                <Button variant="outline" onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}>View GitHub</Button>
                <Button variant="outline" onClick={() => window.open("/Tilak_Rathi_Resume.txt", "_blank")}>
                  <Download className="w-4 h-4 mr-2" />Resume
                </Button>
              </div>
            </div>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-semibold">Quick Info</h3>
                <ul className="mt-3 text-sm text-gray-700 space-y-2">
                  <li><span className="font-medium">Email:</span> <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
                  <li><span className="font-medium">GitHub:</span> <a className="underline" href={GITHUB_URL} target="_blank" rel="noreferrer">tilakrathi</a></li>
                  <li><span className="font-medium">LinkedIn:</span> <a className="underline" href={LINKEDIN_URL} target="_blank" rel="noreferrer">tilak-rathi</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Backend status:</span>{" "}
              {backendStatus.state === "loading" && (
                <span className="text-gray-500">Checking…</span>
              )}
              {backendStatus.state === "ok" && (
                <span className="text-green-700">OK</span>
              )}
              {backendStatus.state === "error" && (
                <span className="text-red-700">Offline</span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.open("/api/health", "_blank")}
              >
                Open /api/health
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("/api/hello", "_blank")}
              >
                Open /api/hello
              </Button>
            </div>
          </CardContent>
        </Card>

        {backendStatus.state === "error" && (
          <p className="mt-2 text-sm text-gray-500">
            Tip: start the backend with <code className="font-mono">cd backend</code> → <code className="font-mono">npm install</code> → <code className="font-mono">npm run start</code> (it runs on port 4000).
          </p>
        )}
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-16 grid gap-10">
        <section id="skills" className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-gray-700" />
                  <h2 className="text-2xl font-semibold">Skills</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(RESUME.skills).map(([group, items]) => (
                    <Card key={group} className="rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900">{group}</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {items.map((x) => (
                            <span key={x} className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                              {x}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>


              <section id="experience" className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-gray-700" />
                  <h2 className="text-2xl font-semibold">Experience</h2>
                </div>

                <div className="grid gap-4">
                  {RESUME.experience.map((x) => (
                    <Card key={x.title} className="rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold">{x.title}</h3>
                            <p className="text-gray-600">{x.org}</p>
                          </div>
                          <div className="text-sm text-gray-600">{x.period}</div>
                        </div>
                        <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
                          {x.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-gray-700" />
                  <h2 className="text-2xl font-semibold">Contact</h2>
                </div>

                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">
                      Want to collaborate or discuss opportunities? Email me and I’ll respond as soon as possible.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio%20Contact`}>
                        <Mail className="w-4 h-4 mr-2" />Email Me
                      </Button>
                      <Button variant="outline" onClick={copyEmail}>Copy Email</Button>
                      <Button variant="outline" onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}>
                        <Github className="w-4 h-4 mr-2" />GitHub
                      </Button>
                      <Button variant="outline" onClick={() => window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer")}>
                        <Linkedin className="w-4 h-4 mr-2" />LinkedIn
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </p>
                  </CardContent>
                </Card>
              </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 text-center py-10 text-gray-500">
        © {new Date().getFullYear()} Tilak — All Rights Reserved
      </footer>
    </div>
  );
}
