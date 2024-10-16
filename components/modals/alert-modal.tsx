'use client'

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  disabled: boolean
}

export function AlertModal({isOpen, onClose, onConfirm, disabled}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <Modal title="Are you sure?" description="This action cannot be undone" isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant='outline' disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={disabled} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}