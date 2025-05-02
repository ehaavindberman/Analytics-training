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
        <p className="text-base text-gray-700 mb-4">
          This app was born from a simple but underused idea in analytics: simulate the kinds of problems analysts actually face on the job. It's inspired by the experience of being asked, “Why is this number down?” and having to get to the root cause quickly—often under pressure.
        </p>
        <p className="text-base text-gray-700">
          Another important idea that FyreDrill stresses comes from the great explainer Derek Muller at Veritasium. There are 4 things it takes to become an expert 
          (<a href="https://www.youtube.com/watch?v=5eW6Eagr9XA" target="_blank">link</a>):
        </p>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4 mb-2">
          <li>Don't get too comfortable</li>
          <li>Repeated attempts with feedback</li>
          <li>Valid environment</li>
          <li>Timely feedback</li>
        </ul>
        <p className="text-base text-gray-700">
          FyreDrill gives users a repeated valid environment with timely feedback that scales in difficulty over time. Analysts are able to hone their skills whereas in real scenarios, you often never learn what's truly happened.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Who Is This For?</h2>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
          <li>Analytics teams looking to sharpen their investigative instincts</li>
          <li>New analysts seeking hands-on practice</li>
          <li>Stakeholders learning when not to overreact to data blips</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Roadmap</h2>
        <p className="text-base text-gray-700">
          Ultimately, FyreDrill should look like a tree where any user can take multiple branching paths to get industry-specific metrics and practice in real-world scenarios. 
          These can be created by the team here or by anyone who can upload a CSV file and some metadata. 
          I'm also available to run bespoke trainings for tech teams, get in touch!
        </p>
        <ul className="list-disc list-inside text-base text-gray-700 ml-4">
          {/* <li>Track and display wrong answer count</li> */}
          <li>Offer hints or help when users are stuck</li>
          {/* <li>Natural language scoring of written answers</li> */}
          <li>Support for multiple datasets in a single scenario</li>
          <li>User-generated and uploaded scenarios</li>
          <li>Industry-specific scenarios (think, a set of scenarios for </li>
          <li>A generalized, easy to use scenario generator tool</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p className="text-base text-gray-700">
          Interested in a bespoke trainin or have feedback or ideas for FyreDrill? We'd love to hear from you! Reach out directly or share your experience with your team and network to help us grow.
        </p>
        <p className="text-base text-gray-700 mt-2">
          Email: <a href="mailto:eric@fyredrill.dev" className="text-blue-600 underline">eric@fyredrill.dev</a>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
