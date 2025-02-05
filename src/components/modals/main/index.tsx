import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

type Props = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    title: string;
    description?: string;
    classname?: string;
}

const Modal = ({children,trigger, title, classname, description}: Props) => {
  return (
    <Dialog>
        <DialogTrigger className={classname} asChild >
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                   
                </DialogTitle>
                <DialogDescription>
                {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default Modal