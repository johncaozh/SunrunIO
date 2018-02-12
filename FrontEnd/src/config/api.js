import axios from 'axios'
import env from './env'

axios.defaults.baseURL = env.serverConfig.serverEndPoint;
axios.defaults.timeout = env.serverConfig.requestTimeout;
axios.defaults.withCredentials = true;

export default {
  iamLogin(st) {
    var url = `${env.serverConfig.iamLoginSegment}?st=${st}`;
    return axios.get(url);
  },

  iamLogout() {
    return axios.post(env.serverConfig.iamLogoutSegment);
  },

  getIamUsers(sync = false) {
    var url = env.serverConfig.iamUsersSegment;

    if (sync)
      url = `${url}?sync=true`;

    return axios.get(url);
  },

  getProducts() {
    return axios.get(env.serverConfig.productsSegment);
  },

  createProduct(data) {
    return axios.post(env.serverConfig.productsSegment, data);
  },

  getProduct(id) {
    return axios.get(env.serverConfig.productsSegment + "/" + id);
  },

  deleteProduct(id) {
    return axios.delete(env.serverConfig.productsSegment + "/" + id);
  },

  updateProduct(id, data) {
    return axios.put(env.serverConfig.productsSegment + "/" + id, data);
  },

  getVersions(id) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.versionSegment;
    return axios.get(url);
  },

  getVersion(id) {
    var url = `${env.serverConfig.versionSegment}/${id}`;
    return axios.get(url);
  },

  createVersion(data) {
    return axios.post(env.serverConfig.versionSegment, data);
  },

  deleteVersion(id) {
    return axios.delete(env.serverConfig.versionSegment + "/" + id);
  },

  updateVersion(id, data) {
    return axios.put(env.serverConfig.versionSegment + "/" + id, data);
  },

  getPlatforms(id) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.platformSegment;
    return axios.get(url);
  },

  getPlatform(id) {
    var url = `${env.serverConfig.platformSegment}/${id}`;
    return axios.get(url);
  },

  createPlatform(data) {
    return axios.post(env.serverConfig.platformSegment, data);
  },

  deletePlatform(id) {
    return axios.delete(env.serverConfig.platformSegment + "/" + id);
  },

  updatePlatform(id, data) {
    return axios.put(env.serverConfig.platformSegment + "/" + id, data);
  },

  getFaqs(id) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.faqsSegment;
    return axios.get(url);
  },

  createFaq(data) {
    return axios.post(env.serverConfig.faqsSegment, data);
  },

  getFaq(id) {
    return axios.get(env.serverConfig.faqsSegment + "/" + id);
  },

  deleteFaq(id) {
    return axios.delete(env.serverConfig.faqsSegment + "/" + id);
  },

  updateFaq(id, data) {
    return axios.put(env.serverConfig.faqsSegment + "/" + id, data);
  },

  getDocs(id) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.docsSegment;
    return axios.get(url);
  },

  createDoc(data) {
    return axios.post(env.serverConfig.docsSegment, data);
  },

  getDoc(id) {
    return axios.get(env.serverConfig.docsSegment + "/" + id);
  },

  deleteDoc(id) {
    return axios.delete(env.serverConfig.docsSegment + "/" + id);
  },

  updateDoc(id, data) {
    return axios.put(env.serverConfig.docsSegment + "/" + id, data);
  },

  getPackages(id, versionId, platformId) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.packagesSegment;

    if (versionId && platformId) {
      url += ("?versionId=" + versionId);
      url += ("&platformId=" + platformId);
    } else if (versionId)
      url += ("?versionId=" + versionId);
    else if (platformId)
      url += ("?platformId=" + platformId);

    return axios.get(url);
  },

  createPackage(data) {
    return axios.post(env.serverConfig.packagesSegment, data);
  },

  getPackage(id) {
    return axios.get(env.serverConfig.packagesSegment + "/" + id);
  },

  deletePackage(id) {
    return axios.delete(env.serverConfig.packagesSegment + "/" + id);
  },

  updatePackage(id, data) {
    return axios.put(env.serverConfig.packagesSegment + "/" + id, data);
  },

  getLinks(id) {
    var url = env.serverConfig.linksSegment;
    return axios.get(url);
  },

  createLink(data) {
    return axios.post(env.serverConfig.linksSegment, data);
  },

  getLink(id) {
    return axios.get(env.serverConfig.linksSegment + "/" + id);
  },

  deleteLink(id) {
    return axios.delete(env.serverConfig.linksSegment + "/" + id);
  },

  updateLink(id, data) {
    return axios.put(env.serverConfig.linksSegment + "/" + id, data);
  },

  getUsers(id) {
    var url = env.serverConfig.productsSegment + "/" + id + "/" + env.serverConfig.usersSegment;
    return axios.get(url);
  },

  getUser(id) {
    var url = `${env.serverConfig.usersSegment}/${id}`;
    return axios.get(url);
  },

  createUser(data) {
    return axios.post(env.serverConfig.usersSegment, data);
  },

  deleteUser(id) {
    return axios.delete(env.serverConfig.usersSegment + "/" + id);
  },

  updateUser(id, data) {
    return axios.put(env.serverConfig.usersSegment + "/" + id, data);
  }
}
