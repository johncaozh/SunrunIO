import env from '../env'

export default {
  methods: {
    download(id) {
      var a = document.createElement('a');
      a.href = env.serverConfig.serverDownloadUrl + "/" + id;
      a.click();
    }
  }
}
