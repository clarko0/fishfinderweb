import Router from "next/router";

export const RerouteHandler = () => {
  const routes: any = {
    ff: "/toolbox/ff",
    cove: "/toolbox/cove",
    home: "/",
  };
  let params: any = new URLSearchParams(window.location.search);
  const reroute = params.get("reroute");
  if (reroute === null) {
    Router.push("/toolbox");
  } else {
    const route = routes[reroute];
    if (route === undefined) {
      Router.push("/toolbox");
    } else {
      Router.push(routes[reroute]);
    }
  }
};

export const CreateRerouteUrl = (url: string) => {
  const newRoutes: any = {
    "/toolbox/ff": "ff",
    "/toolbox/cove": "cove",
  };
  const currentPath = window.location.pathname;
  let newPath = newRoutes[currentPath];
  if (newPath === undefined) {
    newPath = "";
  }

  let urlObject = new URL(url);
  urlObject.searchParams.append("reroute", newPath);
  console.log(urlObject);
  return urlObject;
};
