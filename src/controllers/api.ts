"use strict";

import * as async from "async";
import { Response, Request, NextFunction } from "express";
import * as request from "request-promise";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = async (req: Request, res: Response) => {
  const urls: string[] | void = await getRedditImageUrls("aww");
  const urlData = [];

  if (urls) {
    for (const url of urls) {
      let urlType: string;
      const split = url.split(".");
      const extension = split[split.length - 1];
      let finalUrl = url;
      if (extension === "gifv") {
        urlType = "gif";
        finalUrl = url.replace("gifv", "mp4");
      } else if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        urlType = "image";
      }
      urlData.push({
        url: finalUrl,
        format: urlType
      });
    }
  }

  res.render("api/index", {
    title: "API Examples",
    urls: urlData
  });
};

async function getRedditImageUrls(subreddit: string) {
  const options = {
    uri: `http://www.reddit.com/r/${subreddit}.json?limit=30`,
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true // Automatically parses the JSON string in the response
  };
  const imageUrls: string[] = [];

  return request(options)
    .then(function (redditData) {
      redditData.data.children.forEach(function (child: any) {
        if (child.data.domain == "i.imgur.com") {
          console.log(child.data.url);
          imageUrls.push(child.data.url);
        }
      });
      return imageUrls;
    })
    .catch(function (err) {
      console.log(err);
    });
}