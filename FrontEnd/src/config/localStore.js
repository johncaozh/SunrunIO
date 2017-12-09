import env from './env'

export default {
  setStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  getStore(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },

  removeStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },

  getProductId() {
    return this.getStore(env.store.productId);
  },

  setProductId(data) {
    this.setStore(env.store.productId, data);
  },
}
