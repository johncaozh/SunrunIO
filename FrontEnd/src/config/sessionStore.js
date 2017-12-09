import env from './env'

export default {
  setStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },

  getStore(name) {
    if (!name) return;
    return window.sessionStorage.getItem(name);
  },

  removeStore(name) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },

  getProductId() {
    return this.getStore(env.store.productId);
  },

  setProductId(data) {
    this.setStore(env.store.productId, data);
  },

  getLogonUser() {
    var value = this.getStore(env.store.user);
    return value ? JSON.parse(value) : null;
  },

  setLogonUser(data) {
    this.setStore(env.store.user, data);
  },
}
