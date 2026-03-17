"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddApplicationModal() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Applied");

const handleSubmit = async () => {
  await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company,
      role,
      status,
      jobLink: link,
      notes,
    }),
  })

  window.location.reload()
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          + Add Application
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-950 border-neutral-800 text-white">

        <DialogHeader>
          <DialogTitle className="text-xl">
            Add Job Application
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-neutral-900 border-neutral-800"
          />

          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-neutral-900 border-neutral-800"
          />
          <Select onValueChange={(value) => setStatus(value)} defaultValue="Applied">
  <SelectTrigger className="bg-neutral-900 border-neutral-800">
    <SelectValue placeholder="Select status" />
  </SelectTrigger>

  <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
    <SelectItem value="Applied">Applied</SelectItem>
    <SelectItem value="OA">Online Assessment</SelectItem>
    <SelectItem value="Interview">Interview</SelectItem>
    <SelectItem value="Offer">Offer</SelectItem>
    <SelectItem value="Rejected">Rejected</SelectItem>
  </SelectContent>
</Select>

          <Input
            placeholder="Job link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-neutral-900 border-neutral-800"
          />

          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-neutral-900 border-neutral-800"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Save Application
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}