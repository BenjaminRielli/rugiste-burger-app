"use client"

import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle2 } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="border-green-500 bg-green-50/90 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0" />
              <div className="grid gap-1">
                {title && <ToastTitle className="text-green-800">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-green-900">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-16 right-4 flex flex-col gap-2 w-[340px] max-w-full z-[100]" />
    </ToastProvider>
  )
}
