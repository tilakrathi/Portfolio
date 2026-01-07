import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ProfessionalPortfolio() {
  const CONTACT_EMAIL = "tilakrathi@example.com";
  const GITHUB_URL = "https://github.com/tilakrathi";
  const LINKEDIN_URL = "https://www.linkedin.com/in/tilakrathi/";

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
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <header className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">Hi, I'm Tilak 👋</h1>
          <p className="text-lg text-gray-600">
            A passionate IT student and aspiring software developer focused on building scalable,
            user‑friendly applications with modern web technologies.
          </p>
        </div>
        <div className="flex md:justify-end gap-3">
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
      </header>

      <div className="max-w-5xl mx-auto mt-6">
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

      <main className="max-w-5xl mx-auto mt-10 grid gap-8">

        <section>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <Card className="rounded-2xl">
            <CardContent className="p-6 text-gray-700 leading-relaxed">
              I enjoy designing clean user interfaces, solving complex logical problems, and continuously
              improving my development skills. I work primarily with JavaScript, React, and backend APIs,
              and I am always exploring new technologies.
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["React.js","JavaScript","HTML / CSS","Tailwind CSS","Git & GitHub","REST APIs"].map((skill,index)=>(
              <motion.div
                key={skill}
                initial={{opacity:0,y:10}}
                whileInView={{opacity:1,y:0}}
                transition={{delay:index*0.05}}
              >
                <Card className="rounded-2xl">
                  <CardContent className="p-4 font-medium">{skill}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
              title:"Portfolio Website",
              desc:"A fully‑responsive portfolio website built using React and Tailwind CSS."
            },{
              title:"Connect‑4 Game",
              desc:"A fun interactive game implementing game logic, UX, and state‑management."
            }].map((project,index)=>(
              <motion.div key={project.title} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} transition={{delay:index*0.05}}>
                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.desc}</p>
                    <Button variant="outline">View Project</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                If you'd like to collaborate or just say hi, feel free to reach out.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio%20Contact`}
                >
                  <Mail className="w-4 h-4 mr-2" />Email Me
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
                <Button variant="outline" onClick={copyEmail}>
                  Copy Email
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto text-center mt-10 text-gray-500">
        © {new Date().getFullYear()} Tilak — All Rights Reserved
      </footer>
    </div>
  );
}
