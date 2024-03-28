let hostname: string;

if (process.env.NODE_ENV === "development") {
  hostname = "http://localhost:3000";
} else {
  hostname = "https://code-chronicle-seven.vercel.app";
}

export default hostname;