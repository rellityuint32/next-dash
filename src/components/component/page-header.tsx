'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/utils/statetore'
import { SignIn } from '@/components/component/signin'
import { routestack as routes } from '@/utils/routes'

type PageHeaderProps = {
  showSignIn?: boolean
  showSignUp?: boolean
}

export function PageHeader({ showSignIn, showSignUp }: PageHeaderProps) {
  const isModalOpen = useModalStore((state) => state.isModalOpen)
  const openModal = useModalStore((state) => state.openModal)

  return (
    <div
      className="flex h-16 shrink-0 items-center px-4 md:px-6"
      style={{
        backgroundColor: '#F2F2F2',
      }}
    >
      <nav className="flex h-full items-center space-x-4">
        <Link
          className="flex h-full items-center rounded-md bg-gray-100/50 px-3 text-sm font-medium [&[data-active]:bg-gray-100]:bg-gray-100 dark:bg-gray-800/50 dark:[&[data-active]:bg-gray-800]:bg-gray-800"
          href={routes.home}
        >
          Home
        </Link>
        <Link
          className="flex h-full items-center rounded-md bg-gray-100/50 px-3 text-sm font-medium dark:bg-gray-800/50"
          href={routes.about}
        >
          About
        </Link>
        <Link
          className="flex h-full items-center rounded-md bg-gray-100/50 px-3 text-sm font-medium dark:bg-gray-800/50"
          href={routes.todos}
        >
          Todos
        </Link>
      </nav>
      <div className="flex flex-end items-end space-x-4 ml-auto">
        {showSignIn && (
          <Button
            className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            size="sm"
            variant="outline"
            onClick={openModal}
          >
            Sign In
          </Button>
        )}
        {showSignUp && (
          <Button className="bg-gray-900 text-white dark:bg-gray-800" size="sm">
            Sign Up
          </Button>
        )}
      </div>

      {isModalOpen && <SignIn />}
    </div>
  )
}
