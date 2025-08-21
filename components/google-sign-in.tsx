import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";


const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full" variant="outline">
       
        Continue with Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };