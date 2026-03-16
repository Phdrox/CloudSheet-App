import withTM from "next-transpile-modules";

const transpileModules = withTM(["name-of-the-package-causing-error"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  
};

export default transpileModules(nextConfig);