'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Client } from '@/types';
import { useEffect, useState } from "react";
import axios from 'axios';




export function GenerateTc({ showDialog, client, googleDriveLink, setShowDialog }: { showDialog: boolean, client: Client, googleDriveLink: string,  setShowDialog: (show: boolean) => void }) {

  const [loading, setLoading] = useState(false);

  const [previewLink, setPreviewLink] = useState<string>('');

  const generateStandardTC = async (
    user: Client,
    googleDriveLink: string
  ) => {

    setLoading(true);
    const data = {
      user: user,
      link: googleDriveLink,
    };
    axios.post(`https://n8n.xponent.ph/webhook/api/treasure-chest`, data)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setPreviewLink(response.data.link);

      })
      .catch(error => {
        console.error('Error updating data:', error);
        setLoading(false);

      });
  }

  const handleOpenChange = (isOpen: boolean) => {
    setShowDialog(isOpen);

    if (!isOpen) {
      setPreviewLink('');
    }
  }

  return (
    <Dialog open={showDialog} onOpenChange={handleOpenChange} >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview Standard TC for {client.first_name} {client.last_name}</DialogTitle>
          <DialogDescription>
            Preview the generated TC before sending it to the client.
          </DialogDescription>
        </DialogHeader>
  
        <DialogFooter>
          <Button onClick={() => setShowDialog(false)} variant="outline">Cancel</Button>
          {!previewLink &&  <Button onClick={() =>  generateStandardTC(client, googleDriveLink)} disabled={loading} >{loading ? 'Generating...' : 'Generate'}</Button>}
          {previewLink && (
            <Button onClick={() => window.open(previewLink, '_blank')} variant="outline">Preview</Button>
          )}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateTc;