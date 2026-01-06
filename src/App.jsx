import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ProfessionalPortfolio() {
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
          <Button variant="outline"><Mail className="w-4 h-4 mr-2"/>Contact</Button>
          <Button variant="outline"><Github className="w-4 h-4 mr-2"/>GitHub</Button>
          <Button variant="outline"><Linkedin className="w-4 h-4 mr-2"/>LinkedIn</Button>
        </div>
      </header>

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
              <Button>Send Message</Button>
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
