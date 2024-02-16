"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold border-b p-5">To-Do</h1>
      <div className="p-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusIcon /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Link</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
