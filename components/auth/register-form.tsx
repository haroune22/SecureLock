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

import { RegisterSchema } from '@/lib/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'


import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from '@/actions/register'



export const RegisterForm = () => {

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError('')
    setSuccess('')

    startTransition(()=> {
    register(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    });

  };

  return (
    <CardWrapper
        headerLabel='Create an account'
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
    >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>
                        Name
                      </FormLabel>
                      <FormControl>
                          <Input 
                            disabled={isPending}
                            {...field}
                            placeholder='john'
                          />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
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
                   <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              {...field}
                              placeholder="******"
                              type="password"
                            />
                          </FormControl>
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                          >
                            <Link href="/auth/reset">
                              Forgot password?
                            </Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                    )}
                />
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
              >
               Register
              </Button>
          </form>
        </Form>

    </CardWrapper>
  )
}
