'use client'

import { Store } from "@prisma/client"
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStoreSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteStore, updateStore } from "@/actions/store";
import { AlertModal } from "../modals/alert-modal";

interface SettingsFormProps{
  initialData: Store;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<Store>(initialData);

  const form = useForm<z.infer<typeof updateStoreSchema>>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: storeData
  });

  async function onSubmit(values: z.infer<typeof updateStoreSchema>) {
    try {
      const data = await updateStore(values);
      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error as string
        })
      } else if (data.success) {
        toast({
          title: 'Success',
          description: data.success
        })
        setStoreData({ ...storeData, ...values });

        form.reset(values);
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong'
      })
    } finally {
      form.reset();
    }
  }

  async function handleDelete() {
    try {
      const data = await deleteStore({id: initialData.id});
      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error as string
        })
      } else if (data.success) {
        toast({
          title: 'Success',
          description: data.success
        })
        router.refresh();
        router.push('/');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Make sure you removed all products and categories first'
      })
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={handleDelete} disabled={form.formState.isSubmitting} />
      <div className="flex items-center justify-between">
        <Heading title='Settings' description='Manage Store preferences' />
        <Button variant='destructive' size='icon' onClick={() => setOpen(true)} disabled={form.formState.isSubmitting}>
          <Trash className="size-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name='name' render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Store name" type="" disabled={form.formState.isSubmitting} {...field} />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <Button className="ml-auto" disabled={form.formState.isSubmitting}>
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  )
}