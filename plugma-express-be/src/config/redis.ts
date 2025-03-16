import Queue from "bull";

const queue = new Queue("email-blast", {
  redis: { host: "127.0.0.1", port: 6379 },
});

export default queue;
