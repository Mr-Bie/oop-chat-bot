import Loading from "@/components/common/loading";
import ChatForm from "@/components/ui/ChatForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getUserInfo } from "@/models/user";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = await getUserInfo(session?.user?.id);

  console.log(session, user);

  return (<>
    (user ? (
    <ChatForm></ChatForm>) : (
    <Loading />
    ))

  </>);
}
