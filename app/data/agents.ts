export type Agent = {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  description: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  established: number;
  website: string;
};

export const AGENTS: Agent[] = [
  {
    id: "au-1",
    name: "Sydney Study Connect",
    countryCode: "AUS",
    countryName: "オーストラリア",
    description: "オーストラリア全州の大学・語学学校への留学をサポート。ビザ申請から現地生活まで徹底サポート。",
    specialties: ["大学進学", "語学学校", "ワーキングホリデー"],
    rating: 4.8,
    reviewCount: 142,
    established: 2010,
    website: "#",
  },
  {
    id: "au-2",
    name: "Down Under Education",
    countryCode: "AUS",
    countryName: "オーストラリア",
    description: "メルボルン・シドニーを中心に、専門学校・大学院への進学をサポートする中堅エージェント。",
    specialties: ["大学院", "専門学校", "IELTS対策"],
    rating: 4.6,
    reviewCount: 87,
    established: 2014,
    website: "#",
  },
  {
    id: "ca-1",
    name: "Maple Leaf Study",
    countryCode: "CAN",
    countryName: "カナダ",
    description: "バンクーバー・トロントの現地スタッフが直接サポート。コミュニティカレッジへの進学に強い。",
    specialties: ["コミュニティカレッジ", "大学編入", "語学学校"],
    rating: 4.7,
    reviewCount: 203,
    established: 2008,
    website: "#",
  },
  {
    id: "ca-2",
    name: "Canada Dreams",
    countryCode: "CAN",
    countryName: "カナダ",
    description: "ケベック州・フランス語圏への留学に特化した唯一のエージェント。バイリンガル教育を目指す方に。",
    specialties: ["フランス語圏留学", "バイリンガル教育", "語学学校"],
    rating: 4.5,
    reviewCount: 56,
    established: 2016,
    website: "#",
  },
  {
    id: "gb-1",
    name: "British Study Partners",
    countryCode: "GBR",
    countryName: "イギリス",
    description: "ロンドン・エジンバラの名門大学への進学をサポート。UCASの出願代行に圧倒的な実績。",
    specialties: ["大学進学", "UCAS出願", "プレセッショナル"],
    rating: 4.9,
    reviewCount: 318,
    established: 2005,
    website: "#",
  },
  {
    id: "gb-2",
    name: "UK Gateway",
    countryCode: "GBR",
    countryName: "イギリス",
    description: "語学学校から大学院まで幅広く対応。ティア4ビザのサポート実績が豊富。",
    specialties: ["語学学校", "大学院", "ビザサポート"],
    rating: 4.4,
    reviewCount: 95,
    established: 2012,
    website: "#",
  },
  {
    id: "us-1",
    name: "USA Study Bridge",
    countryCode: "USA",
    countryName: "アメリカ",
    description: "Community CollegeからUC・CSUへの編入ルートを得意とする。カリフォルニア州立大学へのコネクションが強い。",
    specialties: ["コミカレ編入", "大学院", "F-1ビザ"],
    rating: 4.7,
    reviewCount: 176,
    established: 2007,
    website: "#",
  },
  {
    id: "nz-1",
    name: "Kiwi Education",
    countryCode: "NZL",
    countryName: "ニュージーランド",
    description: "ニュージーランド8大学全校と提携。オークランド・ウェリントン・クライストチャーチへの留学をサポート。",
    specialties: ["大学進学", "語学学校", "高校留学"],
    rating: 4.6,
    reviewCount: 64,
    established: 2011,
    website: "#",
  },
  {
    id: "ie-1",
    name: "Celtic Study",
    countryCode: "IRL",
    countryName: "アイルランド",
    description: "ダブリンの語学学校・大学への留学に特化。英語圏で最もコスパが良いと評判のアイルランド留学を徹底サポート。",
    specialties: ["語学学校", "大学進学", "コスパ重視"],
    rating: 4.8,
    reviewCount: 43,
    established: 2015,
    website: "#",
  },
  {
    id: "de-1",
    name: "Deutschland Studium",
    countryCode: "DEU",
    countryName: "ドイツ",
    description: "学費無料のドイツ公立大学への留学サポート。ドイツ語コースから大学院進学まで一貫サポート。",
    specialties: ["公立大学", "ドイツ語コース", "大学院"],
    rating: 4.5,
    reviewCount: 38,
    established: 2013,
    website: "#",
  },
  {
    id: "my-1",
    name: "マレーシア留学サポートセンター",
    countryCode: "MYS",
    countryName: "マレーシア",
    description: "留学希望者が選ぶマレーシア留学専門店部門10冠達成。カウンセラー全員がマレーシア・欧米大学の卒業者で、何度でも無料カウンセリング対応。",
    specialties: ["大学進学", "語学留学", "現地生活サポート"],
    rating: 4.9,
    reviewCount: 312,
    established: 2010,
    website: "https://malaysia-ryugaku.jp/",
  },
];

export const AGENTS_BY_COUNTRY = AGENTS.reduce((acc, agent) => {
  if (!acc[agent.countryCode]) acc[agent.countryCode] = [];
  acc[agent.countryCode].push(agent);
  return acc;
}, {} as Record<string, Agent[]>);

export const SUPPORTED_COUNTRIES: Record<string, string> = {
  AUS: "オーストラリア",
  CAN: "カナダ",
  GBR: "イギリス",
  USA: "アメリカ",
  NZL: "ニュージーランド",
  IRL: "アイルランド",
  DEU: "ドイツ",
  MYS: "マレーシア",
};
