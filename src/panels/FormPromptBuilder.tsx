"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import form from "@/lib/form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  durationOfStay: z
    .number({
      message: "Duration of your trip must be a number greater than 0.",
      required_error: "Duration of your trip is required",
      invalid_type_error: "Duration of your trip must be a number",
    })
    .gt(0),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="durationOfStay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many days are you going for?</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} />
              </FormControl>
              <FormDescription>
                This is the length of your trip.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What would you like recommendations for?</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Select as many options as you'd like.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: Add checkboxes for recommendations, using card and switch UI components */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
