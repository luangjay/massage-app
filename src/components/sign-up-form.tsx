import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { register } from "@/actions/register";
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

const firstPageSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  tel: z
    .string()
    .trim()
    .min(1, { message: "Telephone number is required" })
    .regex(/\b\d{10}\b/g, {
      message: "Telephone number must be 10-digit number",
    }),
});

const secondPageSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const formDataSchema = firstPageSchema.merge(secondPageSchema);

type FormData = z.infer<typeof formDataSchema>;

type SignUpFormProps = {
  setOpen: (open: boolean) => void;
  setOption: (option: "login" | "signUp") => void;
};

export function SignUpForm({ setOpen, setOption }: SignUpFormProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: "",
      tel: "",
      email: "",
      password: "",
    },
  });

  const nextPage = async () => {
    const valid = await trigger(firstPageSchema.keyof().options, {
      shouldFocus: true,
    });
    if (valid) {
      setPage(1);
    }
  };

  const prevPage = () => void setPage(0);

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    control,
  } = form;

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    const response = await register({ ...data, role: "user" });
    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to sign up.",
        variant: "danger",
      });
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      toast({
        title: "Error",
        description: "Failed to log in after sign up.",
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
          onSubmit={(e) => {
            e.preventDefault();
            if (page === 0) {
              void nextPage();
            } else {
              void handleSubmit(onSubmit)(e);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
            <DialogDescription>
              Gain full access to our services for free.
            </DialogDescription>
          </DialogHeader>
          {page === 0 ? (
            <FormField
              key="name"
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key="email"
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {page === 0 ? (
            <FormField
              key="tel"
              name="tel"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your telephone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key="password"
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
          )}
          <DialogFooter>
            {page === 0 ? (
              <Button
                variant="soft"
                type="button"
                disabled={isSubmitting}
                onClick={() => void setOption("login")}
              >
                Login
              </Button>
            ) : (
              <Button
                type="button"
                variant="soft"
                onClick={() => void prevPage()}
              >
                <ChevronLeftIcon className="h-4 w-4 shrink-0" />
                Back
              </Button>
            )}
            {page === 0 ? (
              <Button type="submit">
                Next
                <ChevronRightIcon className="h-4 w-4 shrink-0" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                Sign up
              </Button>
            )}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
