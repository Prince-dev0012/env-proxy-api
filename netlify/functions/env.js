export async function handler(event) {

  const repo = event.queryStringParameters.repo;

  if(!repo){
    return {
      statusCode:400,
      body:JSON.stringify({
        error:"Missing repo"
      })
    };
  }

  try{

    /* Fetch from InfinityFree */

    const res = await fetch(
      `https://myenv.my-style.in/export.php?repo=${repo}`
    );

    const text = await res.text();

    /* Extract JSON from JS */

    const json = text
      .replace("window.ENV=","")
      .replace(";","");

    return {
      statusCode:200,
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:json
    };

  }catch(err){

    return {
      statusCode:500,
      body:JSON.stringify({
        error:"Failed to fetch ENV"
      })
    };

  }

}
