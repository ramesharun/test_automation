module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  silent: true,
  drivers: {
    chrome: {
      version: '2.40',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    }
  }
};