import axios from "axios";

const reorderProject = async (payload) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  let response = null;

  await axios
    .post(`${baseUrl}/project/admin/reorder`, payload)
    .then((res) => (response = res))
    .catch((e) => {
      console.error("Reorder project failed", e);
    });

  return response;
};

export default reorderProject;
