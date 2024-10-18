import { getCookies } from "@/app/actions";
import ProfileList from "./ProfileList";

async function Profile() {
  const user = await getCookies("user");
  return <ProfileList user={user} />;
}

export default Profile;
