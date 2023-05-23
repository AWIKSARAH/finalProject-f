import "../../App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Header from "../../container/header/Header";
import Find from "../FindPeople";
import Announcement from "../announcment";
import News from "../feed/listingFeed";
import Contact from "../contactus";
import About from "../about";
import NotFound from "../404Page/NotFound";
import People from "../people";
import SingleAnnouncemnet from "../announcment/announcmentPage";
import E from "../embeded"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Header />} />
        <Route path="/about" element={<About />} />
        <Route path="/find" element={<Find />}>
          <Route path="/find/people" element={<People />} />
        </Route>
        <Route path="/announcement" element={<News />} />
        <Route path="/feed" element={<E />} />
        <Route path="/a/:id" element={<SingleAnnouncemnet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* Add the 404 route */}{" "}
      </Route>
    </Routes>
  );
}

export default App;
