import Header from "@/components/layouts/PageHeader/PageHeader";
import styles from "./About.module.scss";

const About = () => {
  return (
    <>
      <Header
        pageHeading="College Alumni"
        subHeading="Welcome College alumni and undergraduates! We hope you will explore the many ways to connect with the NIT Arunachal Pradesh community."
        bgImage="/header-bg/2023-06-07-1.jpg"
      />
      <div className="__page-content container">

      <section className={styles.__pageContentContainer}>
        <h1>About</h1>

        <div className={styles.body}>

          <h2>Message from President</h2>

          <div className={styles.Section_1}>


            <div className={styles.cardsContainer}>
              <div className={styles.card_1}>
                <img src="/images/SKCsir.jpg" className={styles.cardImg} alt="SKC sir" />
                <p className={styles.cardTitle_1}>Dr. Swarnendu Kumar Chakraborty</p>
                <div className={styles.cardInfo_1}> Dean Academic,<br></br>
                  NIT, Arunachal Pradesh</div><br></br>
                <div className={styles.contactInfo_1}>
                  <ul>
                    <div className={styles.contactInfo_mail}>
                      <div><img src="/icons/icons8-mail-20.png" /></div>
                      <div>swarnendu@nitap.ac.in</div>
                    </div>
                    <div className={styles.contactInfo_mail}>
                      <div><img src="/icons/icons8-phone-20.png" /></div>
                      <div>+91-9436271053</div>
                    </div>


                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.message}>
              <p>Dear Alumni,<br></br><br></br>

                Greetings from NITAP Alumni Association!<br></br><br></br>

                As a President, it is indeed an honour for me to be a part of this remarkable initiative that seeks to establish a lasting relationship with our alumni.<br></br><br></br>

                For any educational institution, alumni serve as a beacon to their present budding scholars. The tremendous support rendered from the former can grant our institution notable influence in our society and nation. Seemingly, it becomes our responsibility to maintain a healthy relationship with you all.<br></br><br></br>

                To achieve such an ambition, we need your proactive support and active involvement. This certainly calls for greater responsibility from my end and I don't intend to abstain from it.

                Join us, as the NITAP Alumni Association team endeavours for Excellence and Glory.

                Your cooperation is required to catalyze ideas for the purposeful growth of NITAP Alumni Association.<br></br></p>
            </div>

          </div>

          <h2>Coordinators</h2>

          <div className={styles.Section_2}>



            <div className={styles.cardsContainer}>



              <div className={styles.card}>
                <img src="/images/chandrasekhar.jpeg" className={styles.cardImg} alt="Chandrashekhar Tripathi" />
                <p className={styles.cardTitle}>Chandrashekhar Tripathi </p>
                <div className={styles.cardInfo}>B.tech-CSE Batch-24'</div>
                <div className={styles.social_media}>
                  <ul>
                    <a href="#"><img src="/icons/icons8-facebook-40.png" /></a>
                    <a href="#"><img src="/icons/icons8-github-48.png" /></a>
                    <a href="https://www.linkedin.com/in/tripathics/"><img src="/icons/icons8-linkedin-40.png" /></a>
                  </ul>
                </div>
              </div>

              <div className={styles.card}>
                <img src="/images/pursottam.jpeg" className={styles.cardImg} alt="Pursottam Sah " />
                <p className={styles.cardTitle}>Pursottam Sah </p>
                <div className={styles.cardInfo}>B.tech-CSE Batch-24'</div>
                <div className={styles.social_media}>
                  <ul>
                    <a href="#"><img src="/icons/icons8-facebook-40.png" /></a>
                    <a href="#"><img src="/icons/icons8-github-48.png" /></a>
                    <a href="https://www.linkedin.com/in/pursottamsah/"><img src="/icons/icons8-linkedin-40.png" /></a>
                  </ul>
                </div>
              </div>

              <div className={styles.card}>
                <img src="/images/harshit.jpeg" className={styles.cardImg} alt="Harshit Raj " />
                <p className={styles.cardTitle}>Harshit Raj </p>
                <div className={styles.cardInfo}>B.tech-CSE Batch-25'</div>
                <div className={styles.social_media}>
                  <ul>
                    <a href="#"><img src="/icons/icons8-facebook-40.png" /></a>
                    <a href="#"><img src="/icons/icons8-github-48.png" /></a>
                    <a href="https://www.linkedin.com/in/harshit-raj-2ph29/"><img src="/icons/icons8-linkedin-40.png" /></a>
                  </ul>
                </div>
              </div>

              <div className={styles.card}>
                <img src="/images/smrutee.jpg" className={styles.cardImg} alt="Smrutee Behera" />
                <p className={styles.cardTitle}>Smrutee Behera</p>
                <div className={styles.cardInfo}>B.tech-CSE Batch-25'</div>
                <div className={styles.social_media}>
                  <ul>
                    <a href="#"><img src="/icons/icons8-facebook-40.png" /></a>
                    <a href="#"><img src="/icons/icons8-github-48.png" /></a>
                    <a href="https://www.linkedin.com/in/smrutee-behera-174b7521b/"><img src="/icons/icons8-linkedin-40.png" /></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                  </ul>
                </div>
              </div>

              <div className={styles.card}>
                <img src="/images/ayush.jpeg" className={styles.cardImg} alt="Ayush Rathour" />
                <p className={styles.cardTitle}>Ayush Rathour</p>
                <div className={styles.cardInfo}>B.tech-ECE Batch-25'</div>
                <div className={styles.social_media}>
                  <ul>
                    <a href="#"><img src="/icons/icons8-facebook-40.png" /></a>
                    <a href="#"><img src="/icons/icons8-github-48.png" /></a>
                    <a href="https://www.linkedin.com/in/ayushrathour/"><img src="/icons/icons8-linkedin-40.png" /></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                  </ul>
                </div>
              </div>


            </div>
          </div>


        </div>

        <div className={styles.foot}>
          <div className={styles.Line}>
            <div className={styles.creator}>
              Developed by :

              <a href="https://www.linkedin.com/in/tripathics/"> Chandrashekhar Tripathi  , </a>
              <a href="https://www.linkedin.com/in/pursottamsah/"> Pursottam Sah , </a>
              <a href="https://www.linkedin.com/in/smrutee-behera-174b7521b/"> Smrutee Behera , </a>
              <a href="https://www.linkedin.com/in/harshit-raj-2ph29/"> Harshit Raj  , </a>
              <a href="https://www.linkedin.com/in/ayushrathour/"> Ayush Rathour  </a>

            </div>
          </div>
        </div>

      </section>
      
      </div>
    </>
  );
};

export default About;
