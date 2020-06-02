import fetch from "isomorphic-fetch";

export function fetchPopularRepos(language = "all") {
  const encodedURI = encodeURI(
    `https://www.ford.com/aemservices/brand/syndicatedModulesAsHtml.set-globalowner.header.footer.json`
  );

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}
