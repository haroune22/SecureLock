"use client"

import { CardWrapper } from './CardWrapper'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '../ui/form'

import { ResetSchema } from '@/lib/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'


import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { reset } from '@/actions/reset'



export const ResetForm = () => {


  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues:{
      email:"",
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {

    setError('')
    setSuccess('')
    console.log(values)
    startTransition(()=> {
      reset(values)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    });

  };

  return (
    <CardWrapper
        headerLabel='Forget your password?'
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <FormControl>
                          <Input 
                            disabled={isPending}
                            {...field}
                            placeholder='johndoe@examole.com'
                            type='email'
                          />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
              >
               Send reset email
              </Button>
          </form>
        </Form>

    </CardWrapper>
  )
}
