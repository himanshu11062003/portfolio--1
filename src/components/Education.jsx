import Timeline from './Timeline';

const data = [
  {
    title: 'B.Tech – Computer Science & Engineering',
    org: 'Lovely Professional University',
    location: 'Punjab, India',
    date: 'August 2022 – June 2026'
  },
  {
    title: 'Intermediate',
    org: 'Global International School',
    location: 'Muzaffarpur, Bihar',
    date: 'April 2020 – March 2022'
  },
  {
    title: 'Matriculation',
    org: 'Delhi Public School International',
    location: 'Muzaffarpur, Bihar',
    date: 'April 2019 – March 2020'
  },
];

export default function Education() {
  return <Timeline id="education" title="Education" items={data} />;
}