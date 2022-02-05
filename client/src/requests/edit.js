import { axiosInstance } from "../config";
import moment from "moment";
import { couldStartTrivia } from "typescript";

const editRequest = async (
  resource,
  resources,
  setResources,
  id,
  requestInfo,
  setDataStrings,
  setDataArrays,
  edit,
  setEdit,
  setErrors,
  setSuccess
) => {
  try {
    const res = await axiosInstance.put(`/api/${resource}/${id}`, requestInfo);
    let oldResources = resources;
    oldResources[edit] = res.data;
    console.log(res.data);
    setResources(oldResources);
    setDataStrings.map((setData) => setData(""));
    setDataArrays.map((setData) => setData([]));
    setEdit("");

    if (resource === "meetings") {
      setSuccess({
        message: `${moment(oldResources[edit].date).format(
          "MMMM Do YYYY"
        )} meeting edited`,
      });
    } else if (resource === "faculty") {
      setSuccess({ message: `${oldResources[edit].name} edited` });
    } else {
      setSuccess({ message: `${oldResources[edit].title} edited` });
    }
  } catch (err) {
    setErrors(err.response.data.errors);
  }
};

export default editRequest;