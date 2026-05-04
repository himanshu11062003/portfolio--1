import Timeline from './Timeline';

const data = [
  { title: 'B.Tech – Computer Science & Engineering', org: 'Lovely Professional University, Punjab, India', date: 'August 2022 – Present' },
  { title: 'Intermediate', org: 'Global International School, Muzaffarpur, Bihar', date: 'April 2020 – March 2022' },
  { title: 'Matriculation', org: 'Delhi Public School International, Muzaffarpur, Bihar', date: 'April 2019 – March 2020' },
];

export default function Education() {
  return <Timeline id="education" title="Education" items={data} />;
}
