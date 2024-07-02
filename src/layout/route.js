import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import PremenstrualDysporic from "../pages/mental-health/premenstrualDysphoric";
import PostTraumatic from "../pages/mental-health/postTraumatic";
import PostPartumDepression from "../pages/mental-health/postpartumDepression";
import PersonalityDisorder from "../pages/mental-health/personalityDisorder";

const Home = loadable(() => import("../pages/home/Home"));
const About = loadable(() => import("../pages/about/about"));
const Blog = loadable(() => import("../pages/blog/blog"));
const BlogDetails = loadable(() => import("../pages/blog/blogDetails"));
const MentalHealth = loadable(() =>
  import("../pages/mental-health/mentalHealth")
);
const Adhd = loadable(() => import("../pages/mental-health/adhd"));
const Faq = loadable(() => import("../pages/faq/faq"));
const ContactUs = loadable(() => import("../pages/contactUs/contactUs"));
const ImportantNotes = loadable(() =>
  import("../pages/importantNotes/importantNotes")
);
const Fees = loadable(() => import("../pages/fees/fees"));
const Service = loadable(() => import("../pages/ourService/service"));
const Depression = loadable(() => import("../pages/mental-health/depression"));
const Disorder = loadable(() => import("../pages/mental-health/disorder"));
const PanicAttacks = loadable(() =>
  import("../pages/mental-health/panicAttacks")
);
const Team = loadable(() => import("../pages/meetTheTeam/team"));
const MAT = loadable(() => import("../pages/mat/MAT"));
const OpioidAddication = loadable(() =>
  import("../pages/opioidAddication/opioidAddication")
);
const Anger = loadable(() => import("../pages/mental-health/anger"));
const MoodDisorder = loadable(() =>
  import("../pages/mental-health/moodDisorder")
);
const Community = loadable(() => import("../pages/mental-health/community"));
const WeightLoss = loadable(() => import("../pages/weightLoss/WeightLoss"));
const TermsCondition = loadable(() =>
  import("../pages/termsCondition/termsCondiion")
);
const PrivayPolicy = loadable(() =>
  import("../pages/privacyPolicy/privacyPolicy")
);
const NotFound = loadable(() => import("../components/NotFound"));

const Router = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/blogs" element={<Blog />} />
        <Route exact path="/blog/:id" element={<BlogDetails />} />
        <Route exact path="/mental-health" element={<MentalHealth />} />
        <Route exact path="/adhd" element={<Adhd />} />
        <Route exact path="/depression" element={<Depression />} />
        <Route exact path="/generalized-anxity-disorder" element={<Disorder />} />
        <Route exact path="/panic-attacks" element={<PanicAttacks />} />
        <Route exact path="/anger" element={<Anger />} />
        <Route exact path="/mood-disorder" element={<MoodDisorder />} />
        <Route exact path="/LGNTQUIA-community" element={<Community />} />
        <Route exact path="/pmdd" element={<PremenstrualDysporic />} />
        <Route exact path="/post-traumatic-stress-disorder" element={<PostTraumatic />} />
        <Route exact path="/postpartum-depression" element={<PostPartumDepression />} />
        <Route exact path="/personality-disorder" element={<PersonalityDisorder />} />



        <Route exact path="/services" element={<Service />} />
        <Route exact path="/faq" element={<Faq />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/important-info" element={<ImportantNotes />} />
        <Route exact path="/fees-insurance" element={<Fees />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/medication-assitant-therapy" element={<MAT />} />
        <Route exact path="/opioid-addication" element={<OpioidAddication />} />
        <Route exact path="/weight-loss-program" element={<WeightLoss />} />

        <Route exact path="/terms-condition" element={<TermsCondition />} />
        <Route exact path="/privacy-policy" element={<PrivayPolicy />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
};

export default Router;
