'use client'

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const data = await login(values);
      if (data?.error) console.log(data.error)
      if(data.success) console.log(data.success)
    } catch (error) {
      console.log('An unexpected error ocurred. Please try again')
    } finally {
      form.reset();
    }
  }

  return (
    <CardWrapper headerTitle="🔐 Login" headerDescription="Welcome back!" backButtonLabel="Don't have an account?" backButtonHref="/register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" disabled={form.formState.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" disabled={form.formState.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button className="w-full" disabled={form.formState.isSubmitting}>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}