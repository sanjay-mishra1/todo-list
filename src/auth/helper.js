export const setNameToPageURL = (pageName) => {
  let tempUrl = window.location.href.split("?");
  let searchParams = "?";
  if (tempUrl.length > 1) {
    const url = new URLSearchParams(tempUrl[1]);
    searchParams = `?page=${pageName}&nexturl=${url.get("nexturl")}`;
  } else {
    searchParams = `?page=${pageName}&nexturl=${"/"}`;
  }
  window.history.pushState(
    "",
    "",
    window.location.origin + window.location.pathname + searchParams
  );
  //console.log(searchParams);
};
