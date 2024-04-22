import PageHeader from "@/components/layouts/PageHeader/PageHeader";

const Home: React.FC = () => {
  return (
    <>
      <PageHeader
        bgImage="hero.png"
        variant="large"
        pageHeading="Celebrating the 10th convocation of NIT Arunachal Pradesh"
        subHeading="On December 19, we welcomed approximately 200, 2023 graduates to the 10th convocation ceremony of the National Institute of Technology Arunachal Pradesh"
      />
      <div className="__page-content container">
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
