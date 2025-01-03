import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'


type ConfimationModalProps = {
  isOpen: boolean
}

const ConfimationModal: React.FC<ConfimationModalProps> = () => {
  return (
    <Dialog >
      <DialogTrigger>asdf
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>

    </Dialog>
  )
}

export default ConfimationModal