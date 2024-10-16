'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createStore } from "@/actions/store";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

export function StoreModal() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })
  const { isOpen, onClose } = useStoreModal();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createStore(values);

      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error
        })
      } else if (data.success) {
        toast({
          title: 'Success',
          description: data.success
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'An unexpected error have ocurred',
        action: <ToastAction altText="Try Again">Try Again</ToastAction>
      })
      console.log(error);
    } finally {
      form.reset();
    }
  }

  return (
    <Modal title="Create Store" description="Add a new store" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="E-Commerce" disabled={form.formState.isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant='outline' onClick={onClose} disabled={form.formState.isSubmitting}>Cancel</Button>
                <Button disabled={form.formState.isSubmitting}>Continue</Button>
              </div>
            </form>
          </div>
        </div>
      </Form>
    </Modal>
  )
}