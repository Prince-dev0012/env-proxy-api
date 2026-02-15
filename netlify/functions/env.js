import fs from "fs";
import path from "path";

export async function handler(event) {

  const repo =
    event.queryStringParameters.repo;

  if (!repo) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing repo"
      })
    };
  }

  try {

    /* Build file path */

    const filePath = path.join(
      process.cwd(),
      "env",
      `${repo}.json`
    );

    /* Read ENV file */

    const data =
      fs.readFileSync(filePath, "utf8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };

  } catch {

    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Env not found"
      })
    };

  }

}
