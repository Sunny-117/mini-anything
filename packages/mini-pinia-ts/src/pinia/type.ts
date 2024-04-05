export interface Options {
  state?: () => Record<string, unknown>;
  actions?: Record<string, (...args: any[]) => void>;
  getters?: Record<string, () => any>;
}
