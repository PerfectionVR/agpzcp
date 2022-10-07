import type { NextPage } from "next";
import Layout from "@components/layout";
import CharacterPlanner from "@components/characterPlanner";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="hello world">
      <CharacterPlanner />
    </Layout>
  );
};

export default Home;
