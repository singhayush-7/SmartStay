import http from "http";

const checkEndpoint = (path, method = "GET") => {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 5001,
        path,
        method,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode, path, data });
        });
      }
    );
    req.on("error", (e) => resolve({ status: 500, path, error: e.message }));
    req.end();
  });
};

const runTests = async () => {
  const endpoints = [
    "/api/properties",
    "/api/rooms",
  ];

  console.log("Running API Tests...");
  for (const ep of endpoints) {
    const res = await checkEndpoint(ep);
    console.log(`[${res.status}] ${ep}`);
    if (res.status === 500) {
      console.log(`Error on ${ep}:`, res.data || res.error);
    }
  }
};

runTests();
