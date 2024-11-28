interface ExportedSession {
  complexity: string;
  description: string;
  language: string;
  presentation: string;
  speakers: string[]; // speaker_id
  tags: string[];
  title: string;
}

import * as fs from 'fs';

const text = fs.readFileSync('./output/sessions.json', 'utf8');
const sessions: Map<string, ExportedSession> = new Map(
  Object.entries(JSON.parse(text)),
);

const tagMap: Set<string> = new Set();

sessions.forEach((v: ExportedSession) => {
  v.tags.forEach((e: string) => {
    tagMap.add(e);
  });
});

console.log(tagMap);
