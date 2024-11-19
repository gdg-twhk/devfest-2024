interface Link {
  title: string;
  url: string;
  linkType: string;
  /*
    Twitter
    LinkedIn
    Instagram
    Sessionize
    Blog
    Company_Website
    Facebook
    Other
  */
}

interface Session {
  id: number;
  name: string;
}

interface QuestionAnswers {
  id: number;
  question: string; // "Display Name",
  // questionType: "Short_Text",
  answer: string;
  // "sort": 20,
  // "answerExtra": null
}

interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string | null;
  tagLine: string | null;
  profilePicture: string | null;
  isTopSpeaker: boolean;
  links: Link[];
  sessions: Session[];
  questionAnswers: QuestionAnswers[];
}

import * as fs from 'fs';
const text = fs.readFileSync('./input/speakers.json', 'utf8');
const speakers: Speaker[] = JSON.parse(text);

interface ExportedLink {
  name: string;
  link: string;
}

interface ExportedSpeaker {
  bio: string;
  name: string;
  order: number;
  photo: string;
  shortBio: string;
  title: string;
  socials: ExportedLink[];
}

// sessionze 平台名稱欄位不好用因此我們可以從
// Question Answers 抓 display name
function extractDisplayNameFromQuestionAnswers(
  qaList: QuestionAnswers[],
): string | null {
  for (let i = 0; i < qaList.length; i++) {
    if (qaList[i].question == 'Display Name') {
      return qaList[i].answer;
    }
  }
  return null;
}

function truncate(value: string): string {
  if (value.length > 150) {
    return value.substring(0, 150) + '...';
  }
  return value;
}

const output = new Map<string, ExportedSpeaker>();

for (let i = 0; i < speakers.length; i++) {
  const speaker = speakers[i];
  const links: ExportedLink[] = [];

  for (let j = 0; j < speaker.links?.length; j++) {
    const link = speaker.links[j];
    links.push({
      name: link.linkType,
      link: link.url,
    });
  }
  output.set(speaker.id, {
    bio: speaker.bio,
    name:
      extractDisplayNameFromQuestionAnswers(speaker.questionAnswers) ??
      speaker.fullName,
    order: i,
    photo: speaker.profilePicture,
    shortBio: truncate(speaker.bio ?? ''),
    title: speaker.tagLine,
    socials: links,
  } as ExportedSpeaker);
}

fs.writeFileSync(
  './output/speakers.json',
  JSON.stringify(Object.fromEntries(output)),
);
