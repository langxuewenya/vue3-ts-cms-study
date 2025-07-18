enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage;
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage;
  }
  // 设置缓存
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 获取缓存
  getCache(key: string) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // 删除缓存
  deleteCache(key: string) {
    this.storage.removeItem(key);
  }

  // 清空缓存
  clearCache() {
    this.storage.clear();
  }
}

const localCache = new Cache(CacheType.Local);
const sessionCache = new Cache(CacheType.Session);

export { localCache, sessionCache };
