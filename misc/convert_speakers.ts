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
    name: speaker.fullName,
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
