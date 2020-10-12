const root = document.documentElement;

const setDarkTheme = () => {
  root.style.setProperty('--main-bg-color', '#170033');
  root.style.setProperty('--second-bg-color', '#210048');
  root.style.setProperty('--third-bg-color', '#85196a');
  root.style.setProperty('--forth-bg-color', '#531957');
  root.style.setProperty('--main-infobox-color', '#170033');
  root.style.setProperty('--main-btn-color', '#eb4939');
  root.style.setProperty('--main-btn-text-color', '#fff');
  root.style.setProperty('--main-text-color', '#fff');
  root.style.setProperty('--main-green', '#6ce365');
  root.style.setProperty('--main-red', '#e95b5b');
};

const setLightTheme = () => {
  root.style.setProperty('--main-bg-color', '#000');
  root.style.setProperty('--second-bg-color', '#eee');
  root.style.setProperty('--third-bg-color', '#e4455b');
  root.style.setProperty('--forth-bg-color', '#fff');
  root.style.setProperty('--main-infobox-color', '#ddd');
  root.style.setProperty('--main-btn-color', '#2d92fa');
  root.style.setProperty('--main-btn-text-color', '#000');
  root.style.setProperty('--main-text-color', '#000');
  root.style.setProperty('--main-green', '#0ba102');
  root.style.setProperty('--main-red', '#df2020');
};

module.exports = {
  setDarkTheme,
  setLightTheme,
};
