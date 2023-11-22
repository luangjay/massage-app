import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "./ui/toaster";

const formDataSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof formDataSchema>;

type LoginFormProps = {
  setOpen: (open: boolean) => void;
  setOption: (option: "login" | "signUp") => void;
};

export function LoginForm({
  setOpen,
  setOption,
}: LoginFormProps) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      toast({
        title: "Error",
        description: "Failed to login.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "You are now logged in.",
      });
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <DialogContent className="w-full max-w-sm">
      <Form {...form}>
        <form
          className="grid gap-6"
          onSubmit={(...a) => void handleSubmit(onSubmit)(...a)}
        >
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Welcome back. Need some relaxation?
            </DialogDescription>
          </DialogHeader>
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              variant="soft"
              type="button"
              onClick={() => void setOption("signUp")}
            >
              Sign up
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
