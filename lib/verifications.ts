import router from "next/router";
import { request } from "./req";

const verifyProfile = async (userId: string) => {
  try {
    const profileVerify = await request(
      `/profile/verifyProfile/${userId}`,
      "GET",
      {}
    );
    let userData: { name: string } = {
      name: profileVerify.data.name,
    };

    localStorage.setItem("user_info", JSON.stringify(userData));
    if (profileVerify?.status !== 200) {
      router.push(`/create-profile`);
    }
  } catch (error) {
    console.error("verifyProfile failed", error);
  }
};
export { verifyProfile };
