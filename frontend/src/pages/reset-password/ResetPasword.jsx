'use client'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ResetPassword() {

  return (

    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

      <div
        className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <Card  className="flex flex-col w-full h-fit pt-5">
          <CardContent  >
            <div className="flex flex-col  gap-4 ">

              <h3 className="text-2xl font-bold tracking-tight">
                Reset Password
              </h3>
              <Input type="text" placeholder="Username" />
              <Input type="password" placeholder="Old Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm New Password" />

              <Button className="mt-2 bg-green-500 hover:bg-green-700 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg rounded-xl text-primary hover:text-foreground hover:bg-green-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">Reset</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>

  )
}
