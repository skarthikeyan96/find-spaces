// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const baseUrl = "https://api.twitter.com/2/spaces";
const querParam =
  "state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld";

let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${process.env.TWITTER_BEARER_TOKEN}`);

let requestOptions = {
  method: "GET",
  headers: myHeaders,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search = req.query.search || "tech";

    const response = await fetch(
      `${baseUrl}/search?query=${search}&${querParam}`,
      requestOptions
    );
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    if (data.meta.result_count !== 0) {
      const spacesData = data.data;
      const usersData = data.includes["users"];

      for (let i = 0; i < spacesData.length; i++) {
        const hosts = spacesData[i].host_ids;

        const temp = [];
        for (let i = 0; i < hosts.length; i++) {
          const response = usersData.find((user: any) => hosts[i] === user.id);

          temp.push(response);
        }
        // add an host value to existing spacesData

        spacesData[i]["host_profile"] = temp;
      }

      return res.status(200).send(spacesData);
    }

    res.status(404).send([]);
  } catch (error) {
    res.status(500);
  }
}
