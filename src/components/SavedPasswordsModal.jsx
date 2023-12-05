import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const SavedPasswordsModal = ({ open, handleOpen, savedPasswords, clearPasswords }) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Saved Passwords</DialogHeader>
      <DialogBody divider style={{ maxHeight: "500px", overflowY: "auto" }}>
        {savedPasswords.map((password, index) => (
          <div key={index} className="font-bold">
            <span className="text-black">{index + 1}:</span> {password}
          </div>
        ))}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
          <span>Close</span>
        </Button>
        <Button variant="text" color="blue" onClick={clearPasswords} className="mr-1">
          <span>Clear Passwords</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SavedPasswordsModal;
