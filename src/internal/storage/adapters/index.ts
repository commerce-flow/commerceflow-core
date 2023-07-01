export default interface BaseStorageAdapter {
  init(): Promise<Record<string, unknown>>;
}
