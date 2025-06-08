import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">About FyreDrill</h1>
        <p className="text-base text-gray-700">
          Hello! I'm Eric, and I created FyreDrill. The idea for FyreDrill came from a coworker (thanks Jeff!) running a training for our whole analytics team. 
          Since then, I've taken inspiration and run similar trainings for every analytics team I've been a part of.
        </p>
        <br></br>
        <p className="text-base text-gray-700">
          FyreDrill is an analytics training platform designed to sharpen your intuition by simulating real-world scenarios. You're placed in the role of an analyst at a fictional tech company, tasked with diagnosing issues—like a sudden drop in signups—using a provided dataset. Your mission: figure out what went wrong, fast.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Why FyreDrill?</h2>
        <p className="text-base text-gray-700">
          There are 4 things it takes to become an expert according to the great explainer Derek Muller at Veritasium
          (<a className="underline text-primary hover:text-primary/80" href="https://www.youtube.com/watch?v=5eW6Eagr9XA" target="_blank">link</a>):
        </p>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4 mb-2">
          <li>Don't get too comfortable</li>
          <li>Repeated attempts with feedback</li>
          <li>Valid environment</li>
          <li>Timely feedback</li>
        </ul>
        <p className="text-base text-gray-700">
          In real world scenarios, when an analyst is asked "why is this number down?" they will not have any of these. 
          Typically, you never learn what has truly happened, and many times there are too many conflicting variables to draw useful conclusions.
          FyreDrill gives users a safe and easy way to build their intuition through repeated trials in a valid environment with timely feedback that scales in difficulty. 
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Who Is This For?</h2>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
          <li>Analytics teams looking to sharpen their investigative instincts</li>
          <li>New analysts seeking hands-on practice</li>
          <li>Anyone who would like to sharpen their critical thinking and data skills</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Roadmap</h2>
        <p className="text-base text-gray-700">
          My long term vision for FyreDrill would be both a consulting company available for bespoke trainings 
          (get in touch if you're interested!) 
          and a library of scenarios similar to Duolingo and Khan Academy with branching paths a user can take based on the different metrics and company types they're interested in.
          Ultimately, scenarios could even be created and uploaded by the community for private and public use.
        </p>
        <br></br>
        <p className="text-base text-gray-700">
          The next steps I'm taking for FyreDrill include:
        </p>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
          <li>Many more scenarios, I have tons of ideas especially for higher difficulty</li>
          <li>Improved answer AI</li>
          <li>Support for multiple datasets in a single scenario</li>
          <li>Industry-specific scenarios (think, a set of scenarios for B2B or two sided markets or subscription businesses, etc...)</li>
          <li>Allow users to upload their own scenarios along with a generalized, easy to use scenario generator tool</li>
          <li>SQL mode where users can also learn or sharpen their SQL skills</li>
        </ul>
        <br></br>
        <p className="text-base text-gray-700">
          FyreDrill is far from perfect and I welcome any and all feedback! 
          <br></br><br></br>
          One of the issues I'd like to solve for is when to push back against stakeholders and not look into a question. 
          Another issue is rating responses. 
          Currently, answer keys do not care if you describe next steps which is hugely important for any analyst communication with stakeholders.
          Finally, I think having a certificate or better way to track progress will be key. 
          <br></br><br></br>
          I am also aware of how AI will change these types of tasks, 
          but I believe this type of thinking and investigating will always be a useful skill and these types of questions will go to analysts for quite a while yet.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p className="text-base text-gray-700">
          Interested in a bespoke training or have feedback or ideas for FyreDrill? I'd love to hear from you! Reach out directly or share your experience with your team and network to help us grow.
        </p>
        <p className="text-base text-gray-700 mt-2">
          Email: <a href="mailto:erichb@fyredrill.dev" className="text-blue-600 underline">erichb@fyredrill.dev</a>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
