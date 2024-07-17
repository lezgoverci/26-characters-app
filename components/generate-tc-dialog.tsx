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

  const [previewStandardLink, setPreviewStandardLink] = useState<string>('');
  const [previewPremiumLink, setPreviewPremiumLink] = useState<string>('');

  const generateTC = async (
    user: Client,
    googleDriveLink: string
  ) => {

    setLoading(true);
    const data = {
      user: user,
      link: googleDriveLink,
    };
    axios.post(`https://n8n.xponent.ph/webhook/api/treasure-chest?type=premium`, data)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setPreviewStandardLink(response.data["standard-link"]);
        setPreviewPremiumLink(response.data["premium-link"]);

      })
      .catch(error => {
        console.error('Error updating data:', error);
        setLoading(false);

      });
  }

  const handleOpenChange = (isOpen: boolean) => {
    setShowDialog(isOpen);

    if (!isOpen) {
      setPreviewStandardLink('');
      setPreviewPremiumLink('');
    }
  }

  return (
    <Dialog open={showDialog} onOpenChange={handleOpenChange} >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview TC</DialogTitle>
          <DialogDescription>
            Preview the generated TC before sending it to {client.first_name} {client.last_name}.
          </DialogDescription>
        </DialogHeader>
  
        <DialogFooter>
          <Button onClick={() => setShowDialog(false)} variant="outline">Cancel</Button>
          {!previewStandardLink &&  <Button onClick={() =>  generateTC(client, googleDriveLink)} disabled={loading} >{loading ? 'Generating...' : 'Generate'}</Button>}
          {previewStandardLink && (
            <Button onClick={() => window.open(previewStandardLink, '_blank')} variant="outline">Preview Standard</Button>
          )}

          {previewPremiumLink && (
            <Button onClick={() => window.open(previewPremiumLink, '_blank')} variant="outline">Preview Premium</Button>
          )}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateTc;