export interface MatchType {
  params: object;
  path: string;
}

export class Match {
  params: object = {};
  path: string = '';

  constructor() {
  }

  set(m: Partial<MatchType>) {
    this.params = m.params || this.params;
    this.path = m.path || this.path;
  }
}

export default new Match();
