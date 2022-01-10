import { axiosInstance } from "../config";
import moment from "moment";

const deleteRequest = async (
  resource,
  resources,
  deleteIndex,
  setDeleteFirst,
  setSuccess,
  setErrors
) => {
  try {
    const res = await axiosInstance.delete(
      `/api/${resource}/${resources[deleteIndex].id}`
    );

    const deleted = resources.splice(deleteIndex, 1);
    setDeleteFirst("");
    if (resource === "meetings") {
      setSuccess({
        message: `${moment(deleted[0].date).format(
          "MMMM Do YYYY"
        )} meeting deleted`,
      });
    } else if (resource === "faculty") {
      setSuccess({ message: `${deleted[0].name} deleted` });
    } else {
      setSuccess({ message: `${deleted[0].title} deleted` });
    }
  } catch (err) {
    setErrors(err.response.data.errors);
    // console.log(err);
  }
};

export default deleteRequest;
