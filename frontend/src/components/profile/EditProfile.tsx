import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateProfileMutation } from "@/lib/redux/api/userApiSlice";
import type { User } from "@/types/userType";
import { useToast } from "@/hooks/use-toast";

function EditProfile({
  handleEdit,
  isEdited,
  user,
}: {
  handleEdit: Function;
  isEdited: boolean;
  user: User;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [updateProfile] = useUpdateProfileMutation();
  const { toast } = useToast();

  // check if user data exist
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const { username, email, password } = formData;

    try {
      const data = await updateProfile({
        data: { username, email, password },
        accessToken: user.user.accessToken,
      }).unwrap();

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated",
        variant: "success",
      });

      handleEdit(false);
    } catch (error: any) {
      toast({
        title: "Opps! Something wen wrong!",
        description: error.message,
      });
    }
  };

  return (
    <>
      {isEdited && (
        <div className="editProfile inset-0 flex min-h-screen w-full items-center justify-center">
          <form className="flex min-h-screen w-44 flex-col justify-center gap-4 py-6 sm:w-64">
            <h1 className="text-2xl font-bold sm:text-center sm:text-3xl md:text-start">
              Edit Profile
            </h1>
            <label htmlFor="username">Username</label>
            <Input
              className="text-black"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <label htmlFor="email">Email</label>
            <Input
              className="text-black"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <Input
              className="text-black"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            <Input
              className="text-black"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />

            <div className="flex gap-4">
              <Button
                variant="main"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate(e);
                }}
              >
                Save
              </Button>

              <Button
                variant={"destructive"}
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProfile;
