export interface Character {
  id: string;
  name: string;
  playerName: string;
  imageUrl?: string;
  virtue: string;
  vice: string;
  concept: string;
  maxHealth: number;
  health: HealthPoints;
  maxWillpower: number;
  willpower: number;
  maxIntegrity: number;
  integrity: number;
  merits: Merits;
  size: number;
  speed: number;
  defense: number;
  armor?: number;
  initiative: number;
  beats: number;
  experience: number;
  attributes: Attributes;
  skills: Skills;
}

export enum HealthPoint {
  Healthy = 'healthy',
  Bashing = 'bashing',
  Lethal = 'lethal',
  Agravated = 'agravated'
}

export type HealthPoints = HealthPoint[];

export interface Merit {
  name: string;
  level: number;
}

export type Merits = Merit[];

export interface Attributes {
  mental: {
    intelligence: number,
    wits: number,
    resolve: number
  },
  physical: {
    strenght: number,
    dextery: number,
    stamina: number
  },
  social: {
    presence: number,
    manipulation: number,
    composure: number
  }
}

export interface Skills {
  mental: {
    academics: Skill,
    computer: Skill,
    crafts: Skill,
    investigation: Skill,
    medicine: Skill,
    occult: Skill,
    politics: Skill,
    science: Skill,
  },
  physical: {
    athletics: Skill,
    brawl: Skill,
    drive: Skill,
    firearms: Skill,
    larceny: Skill,
    stealth: Skill,
    survival: Skill,
    weaponry: Skill,
  },
  social: {
    animalKen: Skill,
    empathy: Skill,
    expression: Skill,
    intimidation: Skill,
    persuasion: Skill,
    socialize: Skill,
    streetwise: Skill,
    subterfuge: Skill,
  }
}

export interface SkillWithSpecification {
  level: number,
  specification: string
}

export type Skill = SkillWithSpecification | number;
