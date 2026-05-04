import Timeline from './Timeline';

const data = [
  {
    title: 'Cyber Security Analyst',
    org: 'Embtel Web Solutions',
    date: 'April 2026 – Present',
    points: [
      'Performed comprehensive VAPT on various web applications to ensure robust security postures.',
      'Identified and documented critical vulnerabilities including XSS, SQL Injection, and security misconfigurations.',
      'Intercepted and manipulated HTTP requests utilizing Burp Suite for deep vulnerability analysis.',
      'Created detailed and actionable security reports offering strategic fixes and mitigations.',
    ],
  },
];

export default function Experience() {
  return <Timeline id="experience" title="Experience" items={data} />;
}
