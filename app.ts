import "express-async-errors";
import { json } from "body-parser";
import express from "express";
import path from "path";
import dotenv from "dotenv";

import { signupRouter } from "./routes/auth/signup";
import { signoutRouter } from "./routes/auth/signout";
import { signinRouter } from "./routes/auth/signin";
import { currentUserRouter } from "./routes/auth/current-user";

import { createMeetingRouter } from "./routes/meetings/create";
import { editMeetingRouter } from "./routes/meetings/edit";
import { showMeetingRouter } from "./routes/meetings/show";
import { viewMeetingsRouter } from "./routes/meetings/index";
import { deleteMeetingRouter } from "./routes/meetings/delete";

import { createElectionRouter } from "./routes/elections/create";
import { editElectionRouter } from "./routes/elections/edit";
import { showElectionRouter } from "./routes/elections/show";
import { viewElectionsRouter } from "./routes/elections/index";
import { deleteElectionRouter } from "./routes/elections/delete";

import { createCredentialRouter } from "./routes/credentials/create";
import { editCredentialRouter } from "./routes/credentials/edit";
import { showCredentialRouter } from "./routes/credentials/show";
import { viewCredentialsRouter } from "./routes/credentials/index";
import { deleteCredentialRouter } from "./routes/credentials/delete";

import { createAnnouncementRouter } from "./routes/announcements/create";
import { editAnnouncementRouter } from "./routes/announcements/edit";
import { showAnnouncementRouter } from "./routes/announcements/show";
import { viewAnnouncementsRouter } from "./routes/announcements/index";
import { deleteAnnouncementRouter } from "./routes/announcements/delete";

import { createSyllabusRouter } from "./routes/syllabi/create";
import { editSyllabusRouter } from "./routes/syllabi/edit";
import { showSyllabusRouter } from "./routes/syllabi/show";
import { viewSyllabiRouter } from "./routes/syllabi/index";
import { deleteSyllabusRouter } from "./routes/syllabi/delete";

import { createEventRouter } from "./routes/events/create";
import { editEventRouter } from "./routes/events/edit";
import { showEventRouter } from "./routes/events/show";
import { viewEventsRouter } from "./routes/events/index";
import { deleteEventRouter } from "./routes/events/delete";

import { createFacultyRouter } from "./routes/faculty/create";
import { editFacultyRouter } from "./routes/faculty/edit";
import { showFacultyRouter } from "./routes/faculty/show";
import { viewFacultyRouter } from "./routes/faculty/index";
import { deleteFacultyRouter } from "./routes/faculty/delete";

import { createCourseRouter } from "./routes/courses/create";
import { editCourseRouter } from "./routes/courses/edit";
import { showCourseRouter } from "./routes/courses/show";
import { viewCourseRouter } from "./routes/courses/index";
import { deleteCourseRouter } from "./routes/courses/delete";

import { NotFoundError, errorHandler } from "./services/errors";
import cookieParser from "cookie-parser";
import cors from "cors";


let app = express();
app.use(cookieParser());

dotenv.config();
app.set("trust proxy", true);

app.use(json());

app.use(cors());

// console.log(process.env.NODE_ENV);

// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== "test",
//     // secure: true,
//   })
// );

// import routers
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(currentUserRouter);

app.use(createMeetingRouter);
app.use(editMeetingRouter);
app.use(showMeetingRouter);
app.use(viewMeetingsRouter);
app.use(deleteMeetingRouter);

app.use(createElectionRouter);
app.use(editElectionRouter);
app.use(showElectionRouter);
app.use(viewElectionsRouter);
app.use(deleteElectionRouter);

app.use(createCredentialRouter);
app.use(editCredentialRouter);
app.use(showCredentialRouter);
app.use(viewCredentialsRouter);
app.use(deleteCredentialRouter);

app.use(createAnnouncementRouter);
app.use(editAnnouncementRouter);
app.use(showAnnouncementRouter);
app.use(viewAnnouncementsRouter);
app.use(deleteAnnouncementRouter);

app.use(createSyllabusRouter);
app.use(editSyllabusRouter);
app.use(showSyllabusRouter);
app.use(viewSyllabiRouter);
app.use(deleteSyllabusRouter);

app.use(createEventRouter);
app.use(editEventRouter);
app.use(showEventRouter);
app.use(viewEventsRouter);
app.use(deleteEventRouter);

app.use(createFacultyRouter);
app.use(editFacultyRouter);
app.use(showFacultyRouter);
app.use(viewFacultyRouter);
app.use(deleteFacultyRouter);

app.use(createCourseRouter);
app.use(editCourseRouter);
app.use(showCourseRouter);
app.use(viewCourseRouter);
app.use(deleteCourseRouter);



app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();

});

export { app };