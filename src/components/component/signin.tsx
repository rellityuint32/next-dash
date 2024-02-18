'use client'
import { useState, useRef } from 'react'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/utils/statetore'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type Inputs = {
  username: string
  password: string
}

export const SignIn = () => {
  const closeModal = useModalStore((state) => state.closeModal)
  const [showpass, setShowpass] = useState<boolean>(false)
  const passwd = () => setShowpass(!showpass)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-[350px]">
        <div className="flex flex-row-reverse">
          <span
            className="hover:cursor-pointer text-2xl relative top-[10px] right-[10px]"
            role="button"
            id="close"
            title="Close"
            onClick={closeModal}
          >
            &times;
          </span>
        </div>
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register('username', { required: true })}
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex flex-row">
                <Input
                  {...register('password', { required: true })}
                  id="password"
                  placeholder="Password"
                  type={showpass ? 'text' : 'password'}
                  className="w-full peer-[type=password]:"
                  ref={inputRef}
                />
                <button
                  className="absolute m-2.5 right-1"
                  type="button"
                  id="showpass"
                  onClick={passwd}
                  onFocus={focusInput}
                >
                  {showpass ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full mt-5" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
