import {  Routes, Route } from "react-router-dom";
import { ResponsiveAppBar } from "../components/ResponsiveAppBar"
import { Home } from "../pages/Home"
import { Ranking } from "../pages/Ranking";
import { Events } from "../pages/Events";
import { Teams } from "../pages/Teams";
import { Team } from "../pages/Team";
import { Event } from "../pages/Event";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Tickets } from "../pages/TicketBuy";
import { Participate } from "../pages/Participate";
import { Athlete } from "../pages/Athlete";
import { Athletes } from "../pages/Athletes";
import { MyEvents } from "../pages/MyEvents";
import { MyTickets } from "../pages/MyTickets";
import { Profile } from "../pages/Profile";
import { ManageEvent } from "../pages/ManageEvent";
import { ManageTeam } from "../pages/ManageTeam";
import { AccountCreated } from "../pages/AccountCreated";
import { TicketPurchased } from "../pages/TicketPurchased";
import { TicketFailed } from "../pages/TicketFailed";
import { TicketPending } from "../pages/TicketPending";
import { Brackets } from "../pages/Brackets";
import { RegisteredAthletes } from "../pages/RegisteredAthletes";
import { Matches } from "../pages/Matches";
import { UserConfiguration } from "../pages/UserConfiguration";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

function Root() {
  useFadeInOnScroll();

  return (
    <div>
        <ResponsiveAppBar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="rankings" element={<Ranking  />} />
          <Route exact path="events" element={<Events />} />
          <Route exact path="news" element={<Home />} />
          <Route exact path="teams" element={<Teams />} />
          <Route exact path="team/:id" element={<Team />} />
          <Route exact path="events/:id" element={<Event />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="buy-ticket" element={<Tickets />} />
          <Route exact path="participate" element={<Participate />} />
          <Route exact path="athletes" element={<Athletes />} />
          <Route exact path="athlete/:id" element={<Athlete />} />
          <Route exact path="my-events" element={<MyEvents />} />
          <Route exact path="my-tickets/:id" element={<MyTickets />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="manage-event" element={<ManageEvent />} />
          <Route exact path="manage-team" element={<ManageTeam />} />
          <Route exact path="account-created" element={<AccountCreated />} />
          <Route exact path="ticket-purchased" element={<TicketPurchased />} />
          <Route exact path="ticket-failed" element={<TicketFailed />} />
          <Route exact path="ticket-pending" element={<TicketPending />} />
          <Route exact path="brackets" element={<Brackets />} />
          <Route exact path="registered-athletes" element={<RegisteredAthletes />} />
          <Route exact path="events/:id/matches" element={<Matches />} />
          <Route exact path="config" element={<UserConfiguration />} />

          <Route exact path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
         
        </Routes>
    </div>
  );
}

export default Root;