'use client'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ResetPassword() {

  return (

    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

      <div
        className="flex flex-1 w-full p-6 rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <Card  className="flex flex-col w-1/2 h-fit pt-5">
          <CardContent  >
            <div className="flex flex-col  gap-4 ">

              <h3 className="text-2xl font-bold tracking-tight">
                Password
              </h3>
              <p className="mb">Username</p>
              <Input type="text" placeholder="Username" />
              <Input type="password" placeholder="Old Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm New Password" />

              <Button className=" w-1/2">Change Password</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>

  )
}
