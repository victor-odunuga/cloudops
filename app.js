"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const serverName = document.getElementById("server-name");
  const serverId = document.getElementById("server-id");
  const serverDescription = document.getElementById("server-description");
  const serverFootnote = document.getElementById("server-footnote");

  async function identifyServer() {
    try {
      const response = await fetch("/server-info", {
        cache: "no-store",
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Server identification endpoint is unavailable.");
      }

      const data = await response.json();

      if (!data.hostname) {
        throw new Error("No hostname was returned.");
      }

      serverName.textContent = data.hostname;
      serverId.textContent = data.hostname;
      serverDescription.textContent =
        "This server responded to your request.";

      serverFootnote.textContent =
        "Identity supplied by the web server.";
    } catch (error) {
      serverName.textContent = "Not configured yet";
      serverId.textContent = "Unavailable";
      serverDescription.textContent =
        "The server identity endpoint has not been configured.";
      serverFootnote.textContent =
        "This is expected during local development. " +
        "We will configure /server-info when setting up Nginx.";
    }
  }

  identifyServer();
});
