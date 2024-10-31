interface Category {
  id: number;
  name: string;
  categoryItems: {
    id: string;
    name: string;
  }[];
  sort: string;
}

class GeneratedCategoryInfo {
  constructor(
    public level: string,
    public language: string,
    public tags: string[],
  ) {}
  static fromCategory(value: Category[]): GeneratedCategoryInfo {
    let level: string = '';
    let lang: string = '';
    let tags: string[] = [];
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      switch (v.name) {
        case 'Language':
          for (let i = 0; i < v.categoryItems.length; i++) {
            lang += v.categoryItems[i].name;
          }
          break;
        case 'Level':
          level = v.categoryItems.map((u) => u.name).join('');
          break;
        case 'Tags':
          tags = v.categoryItems.map((u) => u.name);
          break;
      }
    }
    return new GeneratedCategoryInfo(level, lang, tags);
  }
}

export interface Session {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: {
    id: string;
    name: string;
  }[];
  categories: Category[];
  generatedCategories?: GeneratedCategoryInfo;
  // roomId: number; unused
  room: string;
  liveUrl: string | null;
  recordingUrl: string | null;
  status: string;
  isInformed: boolean;
  isConfirmed: boolean;
}

export interface Schedule {
  date: string;
  isDefault: boolean;
  rooms: {
    id: number;
    name: string; // used to mapping with ExportedSchedule.tracks
  }[];
  timeSlots: {
    slotStart: string;
    rooms: {
      id: number;
      name: string;
      session: Session;
      index: number;
    }[];
  }[];
}

interface ExportedSession {
  complexity: string;
  description: string;
  language: string;
  presentation: string;
  speakers: string[]; // speaker_id
  tags: string[];
  title: string;
}

interface ExportedTimeslot {
  startTime: string;
  endTime: string;
  sessions: ({
    items: string[];
  } | null)[];
}

interface ExportedSchedule {
  date: string; // 2018-11-17
  // dateReadable: string; unused
  timeslots: ExportedTimeslot[];
  tracks: {
    title: string;
  }[];
  // tracks[i].title means room in sessionize
  // affects the order of ExportedTimeslot.sessions
}

import * as fs from 'fs';

const text = fs.readFileSync('./input/schedules.json', 'utf8');
const schedules: Schedule[] = JSON.parse(text);

const outputSession: Map<string, ExportedSession> = new Map();
const outputSchedule: Map<string, ExportedSchedule> = new Map();

for (const schedule of schedules) {
  const date = schedule.date.substring(0, 10);
  const timeslots: ExportedTimeslot[] = [];
  const tracks: string[] = [];
  // 將 tracks name mapping 回 id
  const invertedTracksTable: Map<string, number> = new Map();

  schedule.rooms.forEach((room, idx) => {
    tracks.push(room.name);
    invertedTracksTable.set(room.name, idx);
  });

  console.log(invertedTracksTable);

  for (const slot of schedule.timeSlots) {
    const sessions: ({
      items: string[];
    } | null)[] = new Array(tracks.length);
    let startsAt: string = '';
    let endsAt: string = '';
    for (const room of slot.rooms) {
      const session = room.session;
      session.generatedCategories = GeneratedCategoryInfo.fromCategory(
        session.categories,
      );

      outputSession.set(session.id, {
        complexity: session.generatedCategories.level,
        description: session.description ?? '',
        language: session.generatedCategories.language ?? '',
        presentation: '', // 投影片連結，但 sessionize 沒有這欄位
        speakers: session.speakers.map((v) => {
          return v.id;
        }),
        tags: session.generatedCategories.tags,
        title: session.title,
      });

      // 這部分是有順序性的
      // 反查 idx
      const idx = invertedTracksTable.get(session.room);
      if (idx === undefined) {
        console.error(`${session.room} not in rooms list`);
      } else {
        console.log(`${idx}: ${session.id}`);
        if (sessions[idx] === undefined) {
          sessions[idx] = { items: [session.id] };
        } else {
          sessions[idx]?.items?.push(session.id);
        }
      }

      startsAt = session.startsAt;
      endsAt = session.endsAt;
    }

    // remove tailing null
    let j = sessions.length;
    for (let i = sessions.length; i >= 0; i--) {
      if (sessions[i] != null) {
        break;
      } else {
        j = i;
      }
    }

    timeslots.push({
      startTime: startsAt,
      endTime: endsAt,
      sessions: sessions.slice(0, j),
    });
  }
  outputSchedule.set(date, {
    date: date,
    timeslots: timeslots,
    tracks: tracks.map((t) => {
      return {
        title: t,
      };
    }),
  });
}

fs.writeFileSync(
  './output/schedules.json',
  JSON.stringify(Object.fromEntries(outputSchedule)),
);

fs.writeFileSync(
  './output/sessions.json',
  JSON.stringify(Object.fromEntries(outputSession)),
);
